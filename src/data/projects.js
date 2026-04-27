export const projects = [
  {
    id: "01",
    status: "进行中",
    title: "AI 量化交易系统",
    tags: ["Python", "Docker", "LLM API", "AkShare"],
    github: "https://github.com/Fisheraaa/ETHanomaly",
    keywords: "信号系统, 回测, 风控",
    description: "设计事件驱动型信号流水线，MACD 多因子体系，接入 LLM 多角色辩论框架进行信号过滤，正在迭代加入回测引擎与风控模块。",
    highlights: ["事件驱动流水线", "LLM 信号过滤", "风控模块迭代中"]
  },
  {
    id: "02",
    status: "已完成",
    title: "ETH 异常检测",
    tags: ["Python", "Web3.py", "Pandas", "Streamlit"],
    github: "https://github.com/Fisheraaa/ETHanomaly",
    keywords: "链上分析, 统计异常检测",
    description: "基于 IQR + 分位阈值的链上交易异常检测，支持地址追踪与时间切片分析。",
    highlights: ["链上特征工程", "统计阈值检测", "可视化看板"]
  },
  {
    id: "03",
    status: "已完成",
    title: "PersonaSphere",
    tags: ["FastAPI", "React", "TypeScript", "LLM API"],
    github: "https://github.com/Fisheraaa/PersonaSphere",
    keywords: "图结构, LLM抽取",
    description: "NLP 驱动的人脉管理器，支持关系图谱与结构化画像抽取。",
    highlights: ["关系图谱", "结构化抽取", "冲突检测"]
  }
];