export default function Timeline() {
  const items = [
    ['2025.09 至今', '香港浸会大学（珠海）计算机科学与技术\nCGPA 3.83 / 4.0'],
    ['2025.11', 'BNBU 程序设计大赛 银奖'],
    ['2024.11', '全国中学生数学联赛 广东省三等奖']
  ];

  return (
    <div className="timeline">
      {items.map(([date, text]) => (
        <div key={date} className="timeline-item">
          <div className="timeline-dot" />
          <div>
            <div className="mono" style={{ color: 'var(--text-muted)', fontSize: 13 }}>{date}</div>
            <div style={{ whiteSpace: 'pre-line', marginTop: 6, color: 'var(--text-secondary)' }}>{text}</div>
          </div>
        </div>
      ))}
    </div>
  );
}