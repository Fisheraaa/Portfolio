import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageWrapper from '../components/PageWrapper';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';

export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <PageWrapper>
      <Helmet><title>Projects | Yu Qiuhang</title></Helmet>
      <section className="container" style={{ padding: '56px 0' }}>
        <h1 className="section-title">项目 / Projects</h1>
        <div className="projects-grid">
          {projects.map((p) => <ProjectCard key={p.id} project={p} onOpen={() => setSelected(p)} />)}
        </div>
        <ProjectModal open={!!selected} project={selected || { tags: [], highlights: [] }} onClose={() => setSelected(null)} />
      </section>
    </PageWrapper>
  );
}