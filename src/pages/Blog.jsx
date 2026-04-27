import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { blogPosts } from '../data/blogPosts';

export default function Blog() {
  return (
    <PageWrapper>
      <Helmet><title>Blog | Yu Qiuhang</title></Helmet>
      <section className="container" style={{ maxWidth: 760, padding: '56px 0' }}>
        <h1 className="section-title">思考 / Blog</h1>
        {blogPosts.map((p) => (
          <article key={p.slug} className="card" style={{ padding: 24, marginBottom: 16 }}>
            <div className="mono" style={{ color: 'var(--text-muted)' }}>{p.date}</div>
            <h3>{p.title}</h3>
            <p style={{ color: 'var(--text-secondary)' }}>{p.excerpt}</p>
            <Link to={`/blog/${p.slug}`}>阅读 →</Link>
          </article>
        ))}
      </section>
    </PageWrapper>
  );
}