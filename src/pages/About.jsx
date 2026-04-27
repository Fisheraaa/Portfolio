import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import PageWrapper from '../components/PageWrapper';
import Timeline from '../components/Timeline';
import Tag from '../components/Tag';

export default function About() {
  const { t } = useTranslation();
  const skills = ['Python', 'AkShare', 'Docker', 'Web3.py', 'React', 'TypeScript', 'FastAPI', 'Streamlit', 'Pandas', 'MACD分析', '蒙特卡洛', 'AHP/TOPSIS'];

  return (
    <PageWrapper>
      <Helmet><title>About | Yu Qiuhang</title></Helmet>
      <section className="container" style={{ maxWidth: 720, padding: '56px 0' }}>
        <h1 className="section-title">{t('about.title')}</h1>
        <div className="mono" style={{ color: 'var(--text-muted)', marginBottom: 24 }}>{t('about.whoami')}</div>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>{t('about.intro')}</p>
        <h2 style={{ marginTop: 40 }}>教育 & 竞赛</h2>
        <Timeline />
        <h2 style={{ marginTop: 40 }}>技能矩阵</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{skills.map((s) => <Tag key={s}>{s}</Tag>)}</div>
      </section>
    </PageWrapper>
  );
}