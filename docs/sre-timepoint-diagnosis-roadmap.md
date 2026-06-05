# SRE 模板化诊断中心方案

## 定位

SRE 诊断中心用于把告警、流水线、Ansible、日志、指标和审批等上下文统一收集起来，交给 AI 生成可追溯的诊断结论、证据引用和处置建议。系统只提供分析和建议，不自动执行 SSH、kubectl、Arthas、tcpdump，也不自动创建或执行修复流水线。

入口：`/v1/sre/diagnosis`

## 核心能力

- 观测数据源：支持 VictoriaMetrics、VictoriaLogs、Elasticsearch、Loki、通用 HTTP 日志网关，以及通过代理接入的阿里云 SLS、腾讯云 CLS。
- 服务映射：用项目、服务标识、命名空间、指标标签、日志标签、指标查询和日志查询描述一个可诊断服务。
- 查询预览：在正式诊断前预览日志和指标，验证数据源、标签选择器、字段映射和响应映射是否正确。
- 诊断模板：把目标类型、上下文采集策略、日志关键词、数据源选择、AI Prompt 和结构化报告要求固化为可复用场景包。
- 多源上下文：一次诊断可采集多个日志源和多个指标源，并按数据源分组保存到诊断上下文。
- 证据索引：日志、指标、流水线、节点日志、Ansible TaskLog、告警和审批都会进入统一 `evidence_index`。
- 结构化详情：诊断详情按 CI/CD、日志源、指标源、结构化报告、AI Markdown、采集摘要、证据索引和原始 JSON 展示。

## 诊断模板

模板分为全局模板和项目模板。项目模板与全局模板使用相同 `code` 时，项目模板优先。每次运行诊断时都会把模板快照保存到 `DiagnosisRun.query_params.template_snapshot`，保证后续模板修改不会影响历史诊断解释。

内置模板：

- `ci_pipeline_failure`：流水线失败诊断，聚焦失败流水线、失败节点日志、审批记录和关联告警。
- `ci_ansible_failure`：Ansible 节点失败诊断，聚焦 Ansible 执行摘要、失败主机和 TaskLog。
- `post_release_service_regression`：发布后服务异常诊断，关联最近发布流水线、服务日志、指标和告警。

模板编辑表单支持：

- 目标类型：流水线运行、Ansible 执行、发布后服务异常。
- 上下文采集：流水线、失败节点、节点日志、审批记录、关联告警、服务日志、指标、Ansible 执行、Ansible TaskLog。
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
- `log_highlights`：兼容旧视图的首个成功日志源高亮。
- `ci_cd_context`：流水线、节点、Ansible、审批上下文。
- `ansflow_events`：告警、流水线运行、Ansible 执行和审批事件。
- `collection_summary`：每类上下文的采集状态、数据源、数量和错误。
- `evidence_index`：统一证据索引。
- `structured_report`：AI 结构化报告。
- `warnings`：降级、失败和格式化 warning。

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

旧字段 `LOG-<index>`、`METRIC-<index>` 会继续保留，用于兼容已有诊断结果和前端展示。

## 降级策略

- 没有服务映射时，只采集 AnsFlow 内部上下文。
- 没有日志源或模板关闭服务日志采集时，跳过日志并写入 warning。
- 没有指标源或模板关闭指标采集时，跳过指标并写入 warning。
- 某个日志源或指标源失败时，其他源继续采集；采集摘要状态显示为 `partial`。
- Prompt 格式化失败时，自动降级到系统默认 Prompt，并保留 warning。
- AI 未返回结构化报告或结构化报告解析失败时，保留 Markdown 结果，并显示空结构化报告。

## 前端展示

诊断详情抽屉按以下顺序展示：

1. 基本信息：状态、模板、服务、时间、错误。
2. 结构化报告：摘要、影响范围、证据、可能原因、建议动作、风险和下一步检查。
3. AI Markdown 正文。
4. 上下文采集摘要。
5. CI/CD 上下文：流水线、失败节点、节点日志、Ansible、审批记录。
6. 指标源上下文：按指标数据源分组展示查询和结果数量。
7. 日志源上下文：按日志数据源分组展示查询、命中高亮和证据编号。
8. 兼容日志高亮。
9. 证据索引。
10. 原始上下文 JSON。

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
POST   /api/v1/sre/diagnosis-runs/
```

`POST /api/v1/sre/diagnosis-runs/` 支持：

- `template`
- `template_code`
- `pipeline_run_id`
- `pipeline_node_run_id`
- `ansible_execution_id`

当只传 `pipeline_node_run_id` 时，后端会自动推导对应 `pipeline_run_id`，并校验项目归属。

## 配置建议

- 先创建观测数据源，再创建服务映射。
- 服务映射中保留一个主日志源和主指标源，模板可在此基础上选择更多数据源。
- 日志源字段映射至少应能归一出 `timestamp`、`level`、`message`、`service`、`instance`、`labels`。
- 指标查询应使用稳定名称，例如 `up`、`cpu_usage`、`memory_available`、`jvm_heap_used`。
- 项目模板覆盖全局模板时保持相同 `code`，便于流水线入口按固定规则选择模板。
