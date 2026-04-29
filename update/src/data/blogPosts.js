export const blogPosts = [
  {
    id: 'lda-1',
    date: '2025.12',
    tags: ['线代杂谈'],
    titleZh: '线性变化 — 零空间 — 奇异性',
    titleEn: 'Linear Maps — Null Space — Singularity',
    summaryZh: '矩阵不是在"作用"，而是在"选择性失明"。零空间不是被消掉的东西，而是等价类的生成器',
    summaryEn: 'A matrix doesn\'t "act" — it selectively ignores. The null space isn\'t what gets erased — it\'s the generator of equivalence classes',
    sections: [
      {
        titleZh: '1.1 线性变换不是"作用"，而是"选择性失明"',
        titleEn: '1.1 Linear maps don\'t "act" — they selectively ignore',
        contentZh: `矩阵 A 只保留它能看到的方向，其余全部压成 0

因此 AB = A 的本质不是"B 被约束"，而是：只要 B 的改动落在 A 看不见的方向上，就等价于没发生

类比：一个只看黑白的相机，颜色怎么变都一样`,
        contentEn: `Matrix A only preserves the directions it can "see" — everything else gets collapsed to 0

So the essence of AB = A isn't "B is constrained" — it's: as long as B's change lies in a direction A cannot see, it's as if nothing happened

Analogy: a camera that only sees black and white — colors can change all they want`,
      },
      {
        titleZh: '1.2 零空间不是"被消掉的东西"，而是"等价类的生成器"',
        titleEn: '1.2 The null space isn\'t what gets erased — it generates equivalence classes',
        contentZh: `x ~ x + z, z ∈ Null(A)

这意味着：A 定义的不是一个映射，而是一种"等价关系"

所有相差一个零空间向量的输入，在 A 看来是同一个点

所以问题从"解一个方程"变成：在一个等价类里选一个代表

这才是所有"建模 / 还原 / 生成"的本质难点`,
        contentEn: `x ~ x + z, z ∈ Null(A)

This means: A doesn't define a mapping — it defines an equivalence relation

All inputs that differ by a null space vector look identical to A

So the problem shifts from "solve an equation" to: pick a representative from an equivalence class

That's the fundamental difficulty in all modeling / reconstruction / generation`,
      },
      {
        titleZh: '1.3 解结构 = 约束 + 自由度',
        titleEn: '1.3 Solution structure = constraint + degrees of freedom',
        contentZh: `欠定系统的通解结构是固定的：x = x₀ + z, z ∈ Null(A)

约束只决定 x₀，真正的选择发生在 z

联想：拉格朗日乘子法 — ∇f(x) + Σᵢ λᵢ∇gᵢ(x) = 0`,
        contentEn: `The general solution of an underdetermined system is fixed: x = x₀ + z, z ∈ Null(A)

The constraint only pins down x₀ — the real choice happens in z

Think of it like Lagrange multipliers: ∇f(x) + Σᵢ λᵢ∇gᵢ(x) = 0`,
      },
      {
        titleZh: '1.4 奇异性是降维，更是"信息的不可区分性"',
        titleEn: '1.4 Singularity is dimension loss — more precisely, indistinguishability',
        contentZh: `常见说法是"降维"，但我认为更精确的是：系统主动让不同状态变得不可区分，强制合并

这解释了为什么：
— 投影会丢信息
— 共线性会导致不稳定
— 逆问题会出现无限解

本质是区分能力被破坏，而不是表达能力不足

但这对反向构建升维系统何尝不是一种机遇呢？`,
        contentEn: `The common framing is "dimension reduction" — but more precisely: the system actively makes different states indistinguishable, forcing them to merge

This explains why:
— Projection loses information
— Collinearity causes instability
— Inverse problems have infinite solutions

The essence is a breakdown in distinguishing ability — not a lack of expressive capacity

But isn't this exactly an opportunity for building systems that go the other direction?`,
      },
    ],
  },
  {
    id: 'lda-2',
    date: '2025.12',
    tags: ['线代杂谈'],
    titleZh: '叉积 — 幻觉 — 自由度 — 人生',
    titleEn: 'Cross Product — Hallucination — Degrees of Freedom — Life',
    summaryZh: '叉积不是被发现的，而是被构造的。高维空间几乎处处正交。幻觉是在没有约束的地方做最优延拓',
    summaryEn: 'The cross product wasn\'t discovered — it was constructed. High-dimensional space is almost everywhere orthogonal. Hallucination is optimal extrapolation in unconstrained regions',
    sections: [
      {
        titleZh: '2.1 叉积来源：把面伪装成向量',
        titleEn: '2.1 Cross product: disguising a surface as a vector',
        contentZh: `叉积不是被发现的，而是被"构造"的：a × b = (S_yz, S_zx, S_xy)

先找到三个方向的投影面积，把它们打包成一个向量

关键：面的信息（面积 + 朝向）可以被编码成一个向量对象

这是一种典型操作：用已有结构（向量）去承载更复杂的对象（面）

很多高级结构本质上似乎也是这种"降阶编码"：
— 行列式 → 体积
— Jacobian → 局部变形
— embedding → 语义`,
        contentEn: `The cross product wasn't discovered — it was constructed: a × b = (S_yz, S_zx, S_xy)

First find the projected areas in three directions, then pack them into a vector

The key insight: surface information (area + orientation) can be encoded as a vector object

This is a recurring pattern: using an existing structure (vectors) to carry a more complex object (surfaces)

Many advanced structures seem to follow this same "downrank encoding":
— Determinant → volume
— Jacobian → local deformation
— Embedding → semantics`,
      },
      {
        titleZh: '2.2 高维空间"不大"反而"几乎处处正交"',
        titleEn: '2.2 High-dimensional space isn\'t "big" — it\'s "almost everywhere orthogonal"',
        contentZh: `高维最反直觉的点不是维度多，而是：随便取两个向量，几乎都是互相正交的

这带来一个重要后果：系统天然拥有大量"互不干扰的存储通道"

LLM 的能力不是来自"记住更多"，而是：能把不同语义放进彼此几乎不干扰的方向`,
        contentEn: `The most counterintuitive thing about high dimensions isn't that there are many dimensions — it's that any two random vectors are almost orthogonal

This has a major consequence: the system naturally has a huge number of "non-interfering storage channels"

LLM capability doesn't come from "remembering more" — it comes from placing different semantics into directions that barely interfere with each other`,
      },
      {
        titleZh: '2.3 推理不是线性延伸，而是在"约束流形"上行走',
        titleEn: '2.3 Reasoning isn\'t linear extension — it\'s walking on a constraint manifold',
        contentZh: `直觉上像"顺着一个方向继续"：每一步都在重新投影到一个高维约束面上

这些约束来自：语法结构、上下文、attention

因此"逻辑通顺"的来源是：始终没有离开那个流形

而它不一定"理解了真理"？`,
        contentEn: `Intuition says it's like "continuing in a direction" — but each step is actually a re-projection onto a high-dimensional constraint surface

These constraints come from: grammar, context, attention

So "logical coherence" means: never leaving that manifold

But that doesn't mean it "understands truth"`,
      },
      {
        titleZh: '2.4 幻觉不是错误，而是"在没有约束的地方做最优延拓"',
        titleEn: '2.4 Hallucination isn\'t an error — it\'s optimal extrapolation in unconstrained space',
        contentZh: `当数据没有覆盖某一区域时，模型只能：在已有结构上做最平滑的延伸，在错误流形上的最优解

问题在于：这个延伸可能完全偏离真实世界

这和逆问题似乎一致：解不唯一时，系统一定会引入某种隐含偏好`,
        contentEn: `When training data doesn't cover a region, the model can only: extend as smoothly as possible from existing structure — the optimal solution on the wrong manifold

The problem: this extension may deviate entirely from the real world

This mirrors inverse problems: when solutions aren't unique, the system always introduces some hidden preference`,
      },
      {
        titleZh: '2.5 真正的自由度存在于"观测不到的地方"',
        titleEn: '2.5 Real degrees of freedom live where observation can\'t reach',
        contentZh: `所有这些现象可以压成一句话：系统的自由度，只存在于它无法约束的方向上

— 零空间 → 数学上的自由度
— 高维正交 → 表达上的自由度
— 幻觉 → 认知上的自由度

而所有"能力"，似乎都是：如何在这些自由度中施加结构/限制？`,
        contentEn: `All of this compresses into one line: a system's degrees of freedom exist only in the directions it cannot constrain

— Null space → mathematical degrees of freedom
— High-dim orthogonality → expressive degrees of freedom
— Hallucination → cognitive degrees of freedom

And all "capability" seems to be: how do you impose structure within these degrees of freedom?`,
      },
      {
        titleZh: '2.6 人生',
        titleEn: '2.6 Life',
        contentZh: `如果人生是系统…有这么庞大的自由度

为什么要批评/懊悔困于之前约束的自己做出的决定？

为什么要逼迫自己在高压环境下短时间内定好方向？

或许不断修正限制地随心所欲地终身学习才是我想追求的..?`,
        contentEn: `If life is a system… with this many degrees of freedom

Why criticize or regret the decisions made by a past self constrained by different limits?

Why force yourself to lock in a direction under pressure in a short window?

Maybe what I actually want is: lifelong learning, following curiosity, revising constraints as I go..?`,
      },
    ],
  },
];
