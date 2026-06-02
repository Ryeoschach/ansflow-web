# SRE 时间点诊断中心后续开发计划

## 背景

当前第一版时间点诊断中心以 `vmagent + VictoriaMetrics + VictoriaLogs + vmalert + Alertmanager + AnsFlow` 作为推荐观测与告警链路。它适合快速形成从告警、日志、指标到 AI 诊断报告的闭环，但日志查询入口仍偏向 VictoriaLogs，后续如果接入 Elasticsearch、Loki、阿里云 SLS、腾讯云 CLS 或其他 HTTP 日志服务，会遇到重复改后端代码的问题。

后续方向是把“日志源”从固定实现升级为可配置、可扩展的数据源能力：常见日志系统通过内置适配器接入，普通 HTTP/JSON 日志接口通过配置接入，特殊签名或 SDK 场景再增加专用适配器。

## 总体目标

- 将“观测数据源”扩展为统一的数据源中心，覆盖指标、日志，未来可扩展到链路追踪。
- 时间点诊断不绑定单一日志后端，支持 VictoriaLogs、Elasticsearch、Loki、云日志与通用 HTTP 日志源。
- 服务映射可以描述指标标签、日志标签、字段映射、查询模板与返回结果解析规则。
- 没有日志源或日志源不可用时，诊断任务仍可基于指标、告警和 AnsFlow 内部上下文生成降级报告。
- 用户新增常规日志源时尽量不改后端代码，只通过数据源类型、查询模板、字段映射和响应映射完成接入。

## 阶段一：MVP 加固

- 补齐当前诊断中心的稳定性：
  - 数据源缺失、连接失败、查询超时要返回清晰 warning。
  - 诊断任务保存 `requested_context`、`collected_context`、`warnings`，便于排查。
  - 告警详情跳转诊断时自动带入时间点、项目、服务标签和告警标签。
  - 诊断报告明确标注本次是否采集到日志、指标、告警、自愈、流水线和 Ansible 上下文。
- 前端增强：
  - 数据源测试结果展示延迟、错误信息和采样返回。
  - 诊断任务详情展示上下文采集摘要。
  - 缺少日志源时提示用户先配置日志数据源或继续做降级诊断。

## 阶段二：日志源抽象

### 数据模型建议

- `ObservabilityDataSource`
  - `kind`: `metric`、`log`、`trace`。
  - `provider`: `victoriametrics`、`victorialogs`、`elasticsearch`、`loki`、`aliyun_sls`、`tencent_cls`、`generic_http`。
  - `base_url`: 数据源地址。
  - `auth_type`: `none`、`basic`、`bearer`、`header`、`query`、`cloud_signature`。
  - `auth_config`: 加密保存鉴权配置。
  - `query_config`: 查询路径、HTTP 方法、默认参数、超时时间。
  - `field_mapping`: 时间字段、日志内容字段、服务字段、实例字段、级别字段等映射。
  - `response_mapping`: 返回列表路径、分页字段、错误字段等映射。

- `ObservedService`
  - 指标标签选择器继续保留。
  - 日志标签选择器从固定格式改为 JSON 配置。
  - 增加 `log_query_template`，用于表达服务在某个时间窗口内的日志查询方式。
  - 增加 `default_log_datasource`，允许一个服务覆盖项目默认日志源。

### 适配器建议

- `MetricQueryAdapter`
  - 负责范围指标查询、瞬时指标查询、连接测试。
- `LogQueryAdapter`
  - 负责时间窗口日志查询、关键字过滤、标签过滤、连接测试。
- `GenericHttpLogAdapter`
  - 通过配置生成 HTTP 请求并解析 JSON 响应。
  - 适合内部日志网关、轻量日志 API、无复杂签名的第三方服务。
- 内置 Provider Adapter
  - `VictoriaLogsAdapter`
  - `ElasticsearchAdapter`
  - `LokiAdapter`
  - `AliyunSLSAdapter`
  - `TencentCLSAdapter`

## 阶段三：多日志源接入

- 优先级建议：
  - VictoriaLogs：延续当前推荐链路。
  - Elasticsearch：企业常见，查询 DSL 与字段映射需要优先支持。
  - Loki：云原生场景常见，LogQL 与标签模型适合服务映射。
  - 阿里云 SLS：国内云环境常见，需要处理签名、Project、Logstore。
  - 通用 HTTP：兜底支持自建日志网关。
- 每个日志源都提供：
  - 连接测试。
  - 时间窗口查询。
  - 服务标签过滤。
  - 关键字过滤。
  - 返回字段标准化：`timestamp`、`level`、`message`、`service`、`instance`、`labels`、`raw`。

## 阶段四：诊断质量提升

- 上下文采集：
  - 根据时间点自动扩展前后窗口，例如默认前后 10 分钟。
  - 支持按错误关键字、告警标签、服务名、实例名二次过滤日志。
  - 采集窗口内相关流水线运行、Ansible 执行、自愈动作、审批记录和资产变更。
- AI 分析：
  - 把日志、指标和内部事件分段输入，避免单次上下文过长。
  - 生成结构化报告：现象、影响范围、时间线、可能原因、证据、建议操作。
  - 标注证据来源，避免只有结论没有出处。
- 诊断历史：
  - 支持同一时间点多次重试。
  - 支持对比上一次诊断结果。
  - 支持手动追加上下文后重新诊断。

## 阶段五：自愈闭环

- 从诊断报告生成候选自愈动作，但默认只建议，不自动执行。
- 支持将诊断结论转为自愈策略草稿。
- 支持关联 Ansible 任务、流水线、审批流程。
- 对高风险动作增加审批和回滚提示。

## 验收标准

- 没有配置日志服务时，诊断任务不报错，并返回明确的降级说明。
- 配置 VictoriaLogs 后，可以按服务和时间窗口查询日志。
- 新增 Elasticsearch 或 Loki 支持时，不需要改诊断任务主流程。
- 通用 HTTP 日志源可以通过配置完成基本查询与字段解析。
- 诊断结果能展示本次实际使用的数据源、采集数量、失败项和 warning。
- 文档说明每类日志源的配置方式、字段映射示例和常见错误。

## 注意事项

- 日志源抽象不能只做成自由 JSON 表单，前端应提供结构化配置项，降低配置错误概率。
- 密钥、Token、云厂商 Secret 必须加密保存，导出备份时遵循现有敏感字段加密策略。
- 云日志源的签名、分页、限流差异较大，不能完全依赖通用 HTTP 适配器。
- 诊断中心第一版仍以“辅助分析”为目标，不直接执行 SSH、kubectl、Arthas、tcpdump 等实时采样命令。
