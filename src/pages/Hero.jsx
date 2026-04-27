import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <PageWrapper>
      <Helmet><title>Yu Qiuhang | Portfolio</title></Helmet>
      <section className="container hero">
        <div className="hero-left">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>{t('hero.badge')}</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="section-title">{t('hero.name')}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ whiteSpace: 'pre-line' }}>{t('hero.subtitle')}</motion.p>
          <div style={{ width: 40, height: 1, background: 'var(--accent)', margin: '24px 0' }} />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} style={{ color: 'var(--text-secondary)' }}>{t('hero.intro')}</motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }} style={{ marginTop: 40, display: 'flex', gap: 12 }}>
            <Link className="btn primary" to="/projects">{t('hero.ctaProjects')} →</Link>
            <Link className="btn ghost" to="/about">{t('hero.ctaAbout')}</Link>
          </motion.div>
        </div>
        <motion.div className="hero-right card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="mono" style={{ color: 'var(--accent)', opacity: 0.7 }}>
            $ python ai_trader.py --mode live<br />
            &gt; [09:32:01] Fetching MACD signals...<br />
            &gt; [09:32:02] LLM debate confirmed (0.87)<br />
            &gt; [09:32:03] Risk check passed ✓<br />
            &gt; [09:32:04] Signal dispatched.
          </div>
        </motion.div>
      </section>
    </PageWrapper>
  );
}