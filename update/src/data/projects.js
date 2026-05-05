// 用 import 引入图片，让 Vite 处理路径，无论 base 怎么配都不会出错
import imgTrader   from '../assets/images/AI_Trader_demo.jpg';
import imgETH      from '../assets/images/ETHanormaly_demo.png';
import imgPersona  from '../assets/images/Persona_demo1.png';

export const projects = [
  {
    id: '01',
    status: 'active',
    titleZh: 'AI 量化交易系统',
    titleEn: 'AI Quant Trading System',
    tags: ['Python', 'Docker', 'WSL2', 'LLM API', 'AkShare', '飞书API'],
    github: 'https://github.com/Fisheraaa/ETHanomaly',
    image: imgTrader,
    shortDescZh: '事件驱动信号流水线，MACD 多因子体系，LLM 辩论框架过滤信号，正在迭代回测与风控模块',
    shortDescEn: 'Event-driven signal pipeline with MACD multi-factor system, LLM debate-style filtering, and risk module in progress',
    detailZh: {
      background: '这是我的核心项目，起点是「不想只看行情推送，而是想知道一个判断在历史上是否真的成立」目标是把一个信息工具升级成可回测、有风控的完整交易系统',
      highlights: [
        '设计事件驱动型信号流水线：数据采集 → 特征工程 → 多因子信号生成 → 决策推送，各模块解耦，支持热替换',
        '构建 MACD / 均线等多维技术因子体系，引入 LLM 多角色辩论框架对信号做二次过滤，抑制低质量噪声',
        '基于 Docker + WSL2 搭建容器化基础设施，数据层 / 分析层 / 执行层三层分离，为后续接入全自动执行预留接口',
        '正在迭代加入回测引擎（含手续费 / 滑点建模）与风控模块，目标指标：Sharpe Ratio、Max Drawdown、年化收益率',
      ],
      status: '飞书推送已上线，回测引擎迭代中',
    },
    detailEn: {
      background: "This is my core project — the starting point: I didn't want to just watch signal alerts, I wanted to know whether a trading judgment actually holds up historically The goal is to evolve an information tool into a full trading system with backtesting and risk control",
      highlights: [
        'Designed an event-driven signal pipeline: data ingestion → feature engineering → multi-factor signal generation → decision push Each module is decoupled and hot-swappable',
        'Built a multi-dimensional factor system (MACD, moving averages), integrated an LLM multi-role debate framework for secondary signal filtering to suppress low-quality noise',
        'Set up containerized infrastructure with Docker + WSL2, separating data / analysis / execution layers, leaving a clean interface for future automated order execution',
        'Actively iterating a backtest engine (with commission/slippage modeling) and a risk control module Target metrics: Sharpe Ratio, Max Drawdown, Annualized Return',
      ],
      status: 'Feishu push live — Backtest engine in progress',
    },
  },
  {
    id: '02',
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
    id: '03',
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
