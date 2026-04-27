import { Helmet } from 'react-helmet-async';
import PageWrapper from '../components/PageWrapper';

export default function Contact() {
  return (
    <PageWrapper>
      <Helmet><title>Contact | Yu Qiuhang</title></Helmet>
      <section className="container" style={{ maxWidth: 560, padding: '56px 0' }}>
        <h1 className="section-title">打个招呼 / Say Hi</h1>
        <p style={{ color: 'var(--text-secondary)' }}>找实习 / 合作 / 随便聊都行</p>
        <a className="contact-btn" href="mailto:3137933563@qq.com">Email → 3137933563@qq.com</a>
        <a className="contact-btn" href="https://github.com/Fisheraaa" target="_blank" rel="noreferrer">GitHub → github.com/Fisheraaa</a>
      </section>
    </PageWrapper>
  );
}