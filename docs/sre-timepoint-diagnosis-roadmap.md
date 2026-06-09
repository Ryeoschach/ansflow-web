# SRE 模板化诊断中心最终方案

## 定位

SRE 诊断中心用于把告警、流水线、Ansible、日志、指标和审批等上下文统一收集起来，交给 AI 生成可追溯的诊断结论、证据引用和处置建议。系统只提供分析和建议，不自动执行 SSH、kubectl、Arthas、tcpdump，也不自动创建或执行修复流水线。

入口：`/v1/sre/diagnosis`

## 核心能力

- 观测数据源：支持 VictoriaMetrics、VictoriaLogs、Elasticsearch、Loki、通用 HTTP 日志网关，以及通过代理接入的阿里云 SLS、腾讯云 CLS。
- 服务映射：用项目、服务标识、命名空间、指标标签、日志标签、指标查询和日志查询描述一个可诊断服务。
- 查询预览：在正式诊断前预览日志和指标，验证数据源、标签选择器、字段映射和响应映射是否正确。
- 诊断模板：把目标类型、上下文采集策略、日志关键词、数据源选择、AI Prompt 和结构化报告要求固化为可复用场景包，并支持版本历史、生命周期和回滚。
- 多源上下文：一次诊断可采集多个日志源和多个指标源，并按数据源分组保存到诊断上下文。
- 运行时诊断：支持服务告警、Kubernetes 工作负载、主机资产和 JVM 服务场景；只读采集资产与 Kubernetes API，不执行 SSH、kubectl 或 Arthas。
- 分析增强：生成日志模式聚类、指标趋势摘要、统一故障时间线和跨源根因候选。
- 证据索引：日志、指标、流水线、节点日志、Ansible TaskLog、告警、审批、主机、Pod 和 Kubernetes Event 都会进入统一 `evidence_index`。
- 质量闭环：每次诊断计算质量分、证据覆盖率和综合置信度；用户可反馈准确性、证据有效性和建议可执行性。
- 故障回放：可把历史诊断保存为脱敏回放用例，用预期根因关键词和证据引用评估模板变更。
- 安全与可靠性：项目目标强校验、递归脱敏、SSRF 防护、采集器并发隔离、AI 超时/熔断、任务幂等重试、超时恢复和历史保留。

## 诊断模板

模板分为全局模板和项目模板。项目模板与全局模板使用相同 `code` 时，项目模板优先。每次运行诊断时都会把模板快照保存到 `DiagnosisRun.query_params.template_snapshot`，保证后续模板修改不会影响历史诊断解释。

内置模板：

- `ci_pipeline_failure`：流水线失败诊断，聚焦失败流水线、失败节点日志、审批记录和关联告警。
- `ci_ansible_failure`：Ansible 节点失败诊断，聚焦 Ansible 执行摘要、失败主机和 TaskLog。
- `post_release_service_regression`：发布后服务异常诊断，关联最近发布流水线、服务日志、指标和告警。
- `service_alert_diagnosis`：服务告警综合诊断，关联服务日志、指标、告警和运行时资产。
- `k8s_workload_failure`：Kubernetes 工作负载异常诊断，采集集群、Pod、Deployment、Event 和 Pod Metrics。
- `host_runtime_failure`：主机运行异常诊断，关联项目主机资产、服务日志和指标。
- `jvm_runtime_failure`：JVM 应用异常诊断，使用服务映射中的 JVM 指标和日志分析运行异常。

模板保存不可变版本快照。普通模板可以查看版本历史并回滚；回滚不会覆盖历史版本，而是生成一个新的当前版本。模板生命周期包括 `draft`、`published` 和 `deprecated`。

模板编辑表单支持：

- 目标类型：流水线运行、Ansible 执行、发布后服务异常、服务告警、Kubernetes 工作负载、主机运行异常和 JVM 运行异常。
- 上下文采集：流水线、失败节点、节点日志、审批、告警、服务日志、指标、Ansible、运行时资产和 Kubernetes 运行时。
- 多日志源：选择多个启用的日志数据源，保存为 `log_datasource_ids`。
- 多指标源：选择多个启用的指标数据源，保存为 `metric_datasource_ids`。
- 日志关键词：用于日志片段高亮和证据抽取。
- AI Prompt 模板：必须包含 `{diagnosis_context}`。
- 结构化报告要求：用于约束 AI 输出的结构化报告。
- 高级 JSON：保留扩展字段，结构化字段会覆盖核心配置。

## 运行入口

### 手动创建

1. 进入 `/v1/sre/diagnosis`。
2. 选择项目、服务、诊断时间和时间窗口。
3. 可选选择诊断模板。
4. 如果是 CI/CD 模板，可填写流水线运行 ID、节点运行 ID 或 Ansible 执行 ID。
5. 提交后进入诊断详情查看采集摘要、结论和证据。

### 流水线失败进入

流水线运行详情页失败节点区域保留旧 AI 诊断入口，并新增 SRE 模板化诊断入口：

- 立即模板诊断：按节点类型自动选择模板并创建诊断任务，然后跳转到诊断详情。
- 预填诊断：跳转到诊断中心并预填模板、流水线运行 ID、节点运行 ID 和标题，用户确认后提交。

模板选择规则：

- Ansible / `host_deploy` 节点使用 `ci_ansible_failure`。
- 其他失败节点使用 `ci_pipeline_failure`。

## 上下文结构

诊断任务会把采集结果保存到 `DiagnosisRun.context_snapshot`。

关键字段：

- `service`：服务映射快照。
- `metrics`：兼容旧视图的首个成功指标源结果。
- `metric_contexts`：多指标源归一化上下文。
- `logs`：兼容旧视图的首个成功日志源结果。
- `log_contexts`：多日志源归一化上下文。
- `log_clusters`：跨日志源归一化后的高频日志模式、次数、级别、来源和样例。
- `log_highlights`：兼容旧视图的首个成功日志源高亮。
- `ci_cd_context`：流水线、节点、Ansible、审批上下文。
- `runtime_context`：主机、集群、Pod、Deployment、Kubernetes Event 和 Pod Metrics。
- `ansflow_events`：告警、流水线运行、Ansible 执行和审批事件。
- `timeline`：按时间排序的发布、节点失败、告警、日志和 Kubernetes Event。
- `correlation_analysis`：基于发布、日志、指标、Pod 和主机信号生成的根因候选。
- `quality`：证据覆盖率、综合置信度和质量分。
- `collection_summary`：每类上下文的采集状态、数据源、数量和错误。
- `evidence_index`：统一证据索引。
- `structured_report`：AI 结构化报告。
- `warnings`：降级、失败和格式化 warning。

### AI 上下文预算

`context_snapshot` 保存脱敏后的归一化采集结果，不重复保存日志供应商的完整原始响应。发送给 AI 的 `diagnosis_context` 使用独立的预算化副本，不再对 JSON 字符串做尾部硬截断：

- 默认字符预算为 24000，最终内容始终是完整、可解析的 JSON。
- 日志高亮按异常分数优先保留，告警按严重度优先保留，统一证据按类型、严重度和分数排序。
- 指标保留数据源、查询和少量结果样本；原始日志、Ansible 原始 TaskLog 和 `evidence_index.raw` 等重复大字段只保留在历史快照中。
- 日志、指标、CI/CD、AnsFlow 事件和证据索引分别分配预算，避免单一数据源占满全部上下文。
- 极端超限时继续降级为核心诊断标识和高优先级证据引用，不会产生半截 JSON。

压缩统计保存在 `collection_summary.prompt_context`：

```json
{
  "status": "success",
  "compressed": true,
  "truncated": true,
  "budget_chars": 24000,
  "original_chars": 48620,
  "final_chars": 17840,
  "removed_count": 96,
  "removed": {
    "raw_log_items": 50,
    "evidence_raw_payloads": 30,
    "log_highlights": 16
  }
}
```

### 多日志源

`log_contexts` 中每个元素代表一个日志源：

```json
{
  "datasource": {
    "id": 1,
    "name": "VictoriaLogs",
    "kind": "log",
    "provider": "victorialogs"
  },
  "query": "{service=\"order-api\"}",
  "time_range": {
    "start": "2026-06-05T10:50:00+08:00",
    "end": "2026-06-05T11:10:00+08:00"
  },
  "items": [],
  "count": 0,
  "highlights": [],
  "highlight_count": 0
}
```

高亮日志会带有稳定证据编号：`log:<datasource_id>:<index>`。
系统还会把 UUID、数字和地址等动态部分归一化后生成 `log_clusters`，用于快速识别跨日志源重复出现的错误模式。

### 多指标源

`metric_contexts` 中每个元素代表一个指标源：

```json
{
  "datasource": {
    "id": 2,
    "name": "VictoriaMetrics",
    "kind": "metric",
    "provider": "victoriametrics"
  },
  "time_range": {
    "start": "2026-06-05T10:50:00+08:00",
    "end": "2026-06-05T11:10:00+08:00"
  },
  "metrics": [
    {
      "name": "up",
      "query": "up{job=\"order-api\"}",
      "result": [],
      "summary": {
        "sample_count": 20,
        "first": 1,
        "latest": 0,
        "min": 0,
        "max": 1,
        "change_percent": -100
      },
      "evidence_id": "metric:2:up"
    }
  ],
  "count": 1
}
```

指标证据编号格式：`metric:<datasource_id>:<metric_name>`。

## 证据索引

`evidence_index` 是 AI 结论引用证据的统一入口。

稳定引用格式：

- 日志：`log:<datasource_id>:<index>`
- 指标：`metric:<datasource_id>:<metric_name>`
- 流水线节点：`NODE-<index>`
- 节点日志：`NODELOG-<index>`
- Ansible 执行：`ANSIBLE-<index>`
- Ansible TaskLog：`TASKLOG-<index>`
- 告警：`ALERT-<index>`
- 审批：`APPROVAL-<index>`
- 主机：`HOST-<index>`
- Pod：`K8S-POD-<index>`
- Kubernetes Event：`K8S-EVENT-<index>`

旧字段 `LOG-<index>`、`METRIC-<index>` 会继续保留，用于兼容已有诊断结果和前端展示。

## 降级策略

- 没有服务映射时，只采集 AnsFlow 内部上下文。
- 没有日志源或模板关闭服务日志采集时，跳过日志并写入 warning。
- 没有指标源或模板关闭指标采集时，跳过指标并写入 warning。
- 某个日志源或指标源失败时，其他源继续采集；采集摘要状态显示为 `partial`。
- AnsFlow 内部事件或 CI/CD 采集器失败时，只记录 warning 和失败摘要，不中断 AI 诊断。
- Prompt 格式化失败时，自动降级到系统默认 Prompt，并保留 warning。
- AI 未返回结构化报告或结构化报告解析失败时，保留 Markdown 结果，并显示空结构化报告。

## 前端展示

诊断详情抽屉按以下顺序展示：

1. 基本信息与质量分、置信度、证据覆盖率。
2. 故障时间线与跨源根因候选。
3. 结构化报告和 AI Markdown。
4. 采集计划、实际结果和 Prompt 上下文预算。
5. CI/CD 与运行时上下文。
6. 指标源、日志源和日志模式聚类。
7. 证据索引和原始上下文 JSON。
8. 人工反馈、历史诊断对比和保存为回放用例。

诊断中心另提供“质量看板”和“故障回放”页签。质量看板汇总成功率、平均质量分、根因正确率、建议采纳率和回放通过率；故障回放可重新执行用例并查看最近评分。

## API 入口

```http
GET    /api/v1/sre/observability-datasources/capabilities/
POST   /api/v1/sre/observed-services/{id}/preview-logs/
POST   /api/v1/sre/observed-services/{id}/preview-metrics/
GET    /api/v1/sre/diagnosis-templates/
POST   /api/v1/sre/diagnosis-templates/
PATCH  /api/v1/sre/diagnosis-templates/{id}/
DELETE /api/v1/sre/diagnosis-templates/{id}/
POST   /api/v1/sre/diagnosis-templates/{id}/run/
GET    /api/v1/sre/diagnosis-templates/{id}/versions/
POST   /api/v1/sre/diagnosis-templates/{id}/rollback/
POST   /api/v1/sre/diagnosis-runs/
POST   /api/v1/sre/diagnosis-runs/{id}/feedback/
POST   /api/v1/sre/diagnosis-runs/{id}/compare/
POST   /api/v1/sre/diagnosis-runs/{id}/create-replay-case/
GET    /api/v1/sre/diagnosis-replay-cases/
POST   /api/v1/sre/diagnosis-replay-cases/{id}/run/
GET    /api/v1/sre/diagnosis-quality/
```

`POST /api/v1/sre/diagnosis-runs/` 支持：

- `template`
- `template_code`
- `pipeline_run_id`
- `pipeline_node_run_id`
- `ansible_execution_id`
- `host_id`
- `k8s_cluster_id`
- `namespace`
- `workload_kind`
- `workload_name`
- `jvm_instance`

当只传 `pipeline_node_run_id` 时，后端会自动推导对应 `pipeline_run_id`，并校验项目归属。

列表接口不会返回 `query_params`、`context_snapshot` 和 `ai_result` 等大字段；详情通过
`GET /api/v1/sre/diagnosis-runs/{id}/` 单独获取。前端只在存在待执行或运行中任务时轮询列表和详情。

## 安全与运行维护

- 诊断目标、服务、项目模板、流水线节点和 Ansible 执行必须属于当前项目。
- 告警、审批和失败节点的时间窗口回退采集会按项目标签或资源归属过滤。
- 日志、节点输出、变量、数据源查询配置和审计请求体会递归脱敏。
- AI Prompt 明确把日志和输出视为不可信证据，不执行其中包含的指令。
- 观测数据源只允许 HTTP/HTTPS，默认阻止环回、私网、保留地址、链路本地地址、云元数据地址和跨站重定向。
- 私有观测端点通过 `SRE_OBSERVABILITY_ALLOWED_HOSTS` 显式放行；不建议开启全局私网放行。
- Celery 任务保存任务 ID 和尝试次数，重复或过期任务不会覆盖新任务结果；失败自动指数退避重试。
- 独立采集器并发执行并单独记录状态、数量、耗时和错误；一个采集器失败不会中断其他采集器。
- AI 调用有超时和连续失败熔断，分别通过 `SRE_DIAGNOSIS_AI_TIMEOUT_SECONDS`、`SRE_DIAGNOSIS_AI_CIRCUIT_FAILURES` 和 `SRE_DIAGNOSIS_AI_CIRCUIT_SECONDS` 调整。
- Kubernetes 运行时只读请求使用 `SRE_DIAGNOSIS_K8S_TIMEOUT_SECONDS` 限制响应时间。
- `SRE_DIAGNOSIS_EXTRA_COLLECTORS` 可注册只读扩展采集器，扩展类实现 `collect(run, start, end, template_snapshot)`。
- 运行超过 `SRE_DIAGNOSIS_STALE_MINUTES` 的任务会重新入队，默认阈值 30 分钟。
- 已结束诊断默认保留 `SRE_DIAGNOSIS_RETENTION_DAYS=90` 天，设置为 0 可关闭自动清理。

## 配置建议

- 先创建观测数据源，再创建服务映射。
- 服务映射中保留一个主日志源和主指标源，模板可在此基础上选择更多数据源。
- 日志源字段映射至少应能归一出 `timestamp`、`level`、`message`、`service`、`instance`、`labels`。
- 指标查询应使用稳定名称，例如 `up`、`cpu_usage`、`memory_available`、`jvm_heap_used`。
- 项目模板覆盖全局模板时保持相同 `code`，便于流水线入口按固定规则选择模板。
