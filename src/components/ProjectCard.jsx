import Tag from './Tag';

export default function ProjectCard({ project, onOpen }) {
  return (
    <article className="project-card card">
      <div className="project-top">
        <span className="state-tag">{project.status}</span>
        <a href={project.github} target="_blank" rel="noreferrer" aria-label="GitHub">↗</a>
      </div>
      <div className="mono" style={{ color: 'var(--text-muted)', marginTop: 12 }}>{project.id}</div>
      <h3 className="project-title">{project.title}</h3>
      <div className="project-tags">{project.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
      <hr />
      <p className="project-desc">{project.description}</p>
      <div className="project-bottom">
        <button className="text-btn" onClick={onOpen}>查看详情</button>
        <a href={project.github} target="_blank" rel="noreferrer">→ GitHub</a>
      </div>
    </article>
  );
}