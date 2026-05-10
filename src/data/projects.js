// 用 import 引入图片，让 Vite 处理路径，无论 base 怎么配都不会出错
import imgTrader   from '../assets/images/AI_Trader_demo.jpg';
import imgETH      from '../assets/images/ETHanormaly_demo.png';
import imgPersona  from '../assets/images/Persona_demo1.png';

export const projects = [
  {
    id: '01',
    status: 'active',
    titleZh: 'SystematicAlpha',
    titleEn: 'SystematicAlpha',
    tags: ['Python', 'Tushare Pro', 'Pandas', 'SciPy', 'Plotly'],
    github: 'https://github.com/Fisheraaa/SystematicAlpha',
    image: null,
    shortDescZh: '针对A股（沪深300/中证500）的偏差控制量化研究框架：点位成分股消除幸存者偏差、6因子库含前视检测、15窗口Walk-Forward验证',
    shortDescEn: 'Bias-controlled quant research framework on A-shares (CSI 300/500): point-in-time universe, 6-factor library with look-ahead detection, 15-window walk-forward validation',
    detailZh: {
      background: '大多数回测有三个隐性缺陷：用当前成分股回看历史（幸存者偏差）、因子计算泄露未来信息（前视偏差）、忽略印花税和滑点（成本失真）。这个项目把这三个问题当成一等约束来处理——核心目标不是做出好看的Sharpe，而是诚实地回答「这个因子在真实成本下、在样本外数据上，真的有统计显著的预测力吗？」',
      highlights: [
        '通过Tushare历史成分股快照重建点位（Point-in-Time）股票池，消除幸存者偏差——文献表明该偏差可虚增Sharpe 0.3–0.8',
        '构建6因子库（动量反转、均值回归、风险代理），所有滚动计算强制 closed="left" + shift(1)；编写单元测试自动检测前视偏差，全部4个预测因子达到 p<0.001 显著性',
        '精确建模A股成本结构：佣金0.025%（双向）、印花税0.05%（仅卖出）、滑点0.05–0.10%；单次换仓约0.25–0.30%',
        '采用15窗口Walk-Forward验证（训练24月/测试6月/步进3月），输出性能分布而非单一数字；Sharpe跨窗口区间[-3.3, +2.8]，识别出强烈的市场状态依赖性',
        '核心发现：因子截面预测力统计显著（ICIR最高0.22），但纯多头结构无法对冲系统性Beta——将这一结构性局限明确识别为下一步迭代方向',
      ],
      status: '研究框架已完成，做空/对冲层迭代中',
    },
    detailEn: {
      background: "Most retail backtests silently carry three flaws: survivorship bias (testing on today's constituents), look-ahead bias (leaking future prices into factors), and optimistic costs (ignoring stamp duty and slippage). This project treats all three as first-class engineering constraints. The goal isn't a flattering Sharpe — it's to honestly answer: does this factor have statistically significant predictive power on unseen data, after realistic costs?",
      highlights: [
        'Reconstructed point-in-time index constituents from historical Tushare snapshots, eliminating survivorship bias — literature shows this can inflate Sharpe by 0.3–0.8',
        'Built a 6-factor library (short-term reversal, mean reversion, risk proxies); enforced closed="left" + shift(1) across all rolling computations; automated look-ahead unit tests — all 4 predictive factors achieve p < 0.001',
        'Modeled A-share cost structure precisely: 0.025% commission (both sides), 0.05% stamp duty (sell only), 0.05–0.10% slippage; round-trip ≈ 0.25–0.30%',
        '15-window walk-forward validation (train 24mo / test 6mo / step 3mo) — reports a performance distribution, not a single number; Sharpe ranged from −3.3 to +2.8, revealing strong regime dependency',
        'Key finding: factors achieve statistically significant cross-sectional predictive power (ICIR up to 0.22), but long-only construction cannot neutralise systematic Beta — identified as the primary structural limitation and next iteration target',
      ],
      status: 'Research framework complete — short/hedge layer in progress',
    },
  },
  {
    id: '02',
    status: 'done',
    titleZh: 'AI 量化交易系统',
    titleEn: 'AI Quant Trading System',
    tags: ['Python', 'Docker', 'WSL2', 'LLM API', 'AkShare', '飞书API'],
    github: 'https://github.com/Fisheraaa/ETHanomaly',
    image: imgTrader,
    shortDescZh: '事件驱动信号流水线，MACD 多因子体系，LLM 辩论框架过滤信号，飞书实时推送',
    shortDescEn: 'Event-driven signal pipeline with MACD multi-factor system, LLM debate-style filtering, and Feishu real-time push',
    detailZh: {
      background: '起点是「不想只看行情推送，而是想知道一个判断在历史上是否真的成立」目标是把一个信息工具升级成可回测、有风控的完整交易系统',
      highlights: [
        '设计事件驱动型信号流水线：数据采集 → 特征工程 → 多因子信号生成 → 决策推送，各模块解耦，支持热替换',
        '构建 MACD / 均线等多维技术因子体系，引入 LLM 多角色辩论框架对信号做二次过滤，抑制低质量噪声',
        '基于 Docker + WSL2 搭建容器化基础设施，数据层 / 分析层 / 执行层三层分离，为后续接入全自动执行预留接口',
        '飞书推送已上线，接收实时交易信号通知',
      ],
      status: '已完成',
    },
    detailEn: {
      background: "Starting point: I didn't want to just watch signal alerts, I wanted to know whether a trading judgment actually holds up historically The goal is to evolve an information tool into a full trading system with backtesting and risk control",
      highlights: [
        'Designed an event-driven signal pipeline: data ingestion → feature engineering → multi-factor signal generation → decision push Each module is decoupled and hot-swappable',
        'Built a multi-dimensional factor system (MACD, moving averages), integrated an LLM multi-role debate framework for secondary signal filtering to suppress low-quality noise',
        'Set up containerized infrastructure with Docker + WSL2, separating data / analysis / execution layers, leaving a clean interface for future automated order execution',
        'Feishu push live — receiving real-time trading signal notifications',
      ],
      status: 'Completed',
    },
  },
  {
    id: '03',
    status: 'done',
    titleZh: 'ETH 链上异常检测',
    titleEn: 'ETH On-Chain Anomaly Detector',
    tags: ['Python', 'Web3.py', 'Pandas', 'Streamlit', 'Plotly', 'Infura API'],
    github: 'https://github.com/Fisheraaa/ETHanomaly',
    image: imgETH,
    shortDescZh: '接入以太坊测试网，用 IQR 统计方法自动标注可疑转账，Streamlit 交互式可视化看板',
    shortDescEn: 'Connected to Ethereum testnet, IQR-based statistical anomaly detection, interactive Streamlit dashboard',
    detailZh: {
      background: '探索链上数据分析，尝试用统计方法而非规则库来发现异常交易行为，项目覆盖了数据获取、特征计算、异常标注、可视化的完整流程',
      highlights: [
        '通过 Infura API 接入以太坊 Sepolia 测试网，实时拉取链上交易数据并持久化',
        '设计基于四分位距（IQR）与百分位阈值的统计异常检测算法，对高额 / 高频可疑转账自动标注',
        '使用 Streamlit + Plotly 构建交互式仪表板，支持异常筛选、时间切片与地址追踪',
        '纯统计驱动，无需人工规则库，可迁移至主网或其他链',
      ],
      status: '已完成',
    },
    detailEn: {
      background: 'An exploration of on-chain data analysis — using statistical methods rather than hardcoded rule sets to surface anomalous transaction behavior Covers the full pipeline: data ingestion, feature engineering, anomaly labeling, and visualization',
      highlights: [
        'Connected to Ethereum Sepolia testnet via Infura API, with real-time transaction data ingestion and persistence',
        'Designed an IQR + percentile-threshold statistical detection algorithm to automatically flag high-value / high-frequency suspicious transfers',
        'Built an interactive dashboard with Streamlit + Plotly, supporting anomaly filtering, time slicing, and address tracking',
        'Fully statistics-driven — no hardcoded rule sets Architecture is portable to mainnet or other chains',
      ],
      status: 'Completed',
    },
  },
  {
    id: '04',
    status: 'done',
    titleZh: 'PersonaSphere 人脉管理器',
    titleEn: 'PersonaSphere',
    tags: ['FastAPI', 'React', 'TypeScript', 'Cytoscape.js', 'LLM API'],
    github: 'https://github.com/Fisheraaa/PersonaSphere',
    image: imgPersona,
    shortDescZh: '自然语言输入，LLM 抽取结构化人物档案，力导向关系网络图与圈子泡泡图可视化',
    shortDescEn: 'Natural language input, LLM-powered profile extraction, force-directed relationship graph and bubble chart',
    detailZh: {
      background: '想解决「脑子里记不住所有人和关系」的问题，核心思路是：不要让用户填表，而是用自然语言描述，让大模型去做结构化抽取',
      highlights: [
        '以自然语言为输入，调用大模型提取关键词并结构化为人物档案、事件节点与资源向量',
        '实现智能冲突检测与用户确认机制，通过自定义优先级策略保证数据一致性，避免重复录入',
        '构建力导向关系网络图与圈子泡泡图，将抽象社交关系可视化为可交互的图结构',
        'FastAPI 后端 + React 前端全栈实现，支持本地部署',
      ],
      status: '已完成（本地 Web 版）',
    },
    detailEn: {
      background: "Built to solve the problem of keeping track of everyone and their relationships in your head The core idea: don't make users fill out forms — let them describe people in natural language and have the model do the structured extraction",
      highlights: [
        'Natural language input → LLM extraction → structured person profiles, event nodes, and resource vectors',
        'Intelligent conflict detection and user confirmation flow, with custom priority rules to ensure data consistency and prevent duplicate entries',
        'Force-directed relationship network graph and bubble chart for social circles — turning abstract relationships into interactive graph structures',
        'Full-stack: FastAPI backend + React + TypeScript frontend Locally deployable',
      ],
      status: 'Completed (local web version)',
    },
  },
];