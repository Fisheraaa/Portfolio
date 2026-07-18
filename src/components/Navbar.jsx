import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Navbar.css';

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [hidden,    setHidden]    = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const lastY = useRef(0);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      // 向下快速滚动 → 隐藏；向上 → 显示
      if (y > lastY.current && y > 140) setHidden(true);
      else setHidden(false);
      lastY.current = y;
      // 滚动超过 80px → 磨砂玻璃
      setScrolled(y > 80);
    };
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  const toggleLang = () => {
    const next = i18n.language === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(next);
    localStorage.setItem('lang', next);
  };

  const navItems = [
    { path: '/projects', key: 'nav.projects' },
    { path: '/blog',     key: 'nav.blog'     },
    { path: '/contact',  key: 'nav.contact'  },
  ];

  return (
    <nav className={[
      'navbar',
      scrolled ? 'solid' : '',
      hidden   ? 'nav-hidden' : '',
    ].join(' ')}>

      <div className="nav-left">
        <Link to="/" className="nav-logo">YQX</Link>
        <div className="nav-primary">
          {/* 关于 → 首页滚动锚点 */}
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? '' : ''}`}
            onClick={e => {
              if (location.pathname === '/') {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {t('nav.about')}
          </Link>
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {t(item.key)}
            </Link>
          ))}
        </div>
      </div>

      <div className="nav-right">
        {/* CV 按钮 — f0xy SVG 卡片图标 */}
        <a
          id="resume-link"
          className="nav-ic"
          href={`${import.meta.env.BASE_URL}resume.pdf`}
          target="_blank"
          rel="noopener"
          aria-label="CV / 简历"
          title="CV / 简历"
        >
          <svg viewBox="0 0 30 24" width="29" height="22" fill="none" aria-hidden="true">
            <rect x="1.2" y="1.2" width="27.6" height="21.6" rx="3.4"
              stroke="currentColor" strokeWidth="1.6"/>
            <text x="15" y="15.7" textAnchor="middle" fontSize="10.5"
              fontWeight="700" fill="currentColor">CV</text>
          </svg>
        </a>

        {/* GitHub */}
        <a
          className="nav-ic"
          href="https://github.com/Fisheraaa"
          target="_blank"
          rel="noopener"
          aria-label="GitHub"
          title="GitHub"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
            <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56
              0-.27-.01-1.01-.02-1.99-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69
              -1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96
              .1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1
              -.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.07 11.07 0 0 1 5.79 0
              c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1
              0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2
              0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z"/>
          </svg>
        </a>

        {/* 语言切换 */}
        <button className="lang-toggle" onClick={toggleLang}>
          {i18n.language === 'zh' ? 'EN' : '中'}
        </button>
      </div>

      {/* 移动端汉堡 */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMenuOpen(v => !v)}
        aria-label="Toggle menu"
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* 移动全屏菜单 */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-nav-link" onClick={() => {
            setMenuOpen(false);
            setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior:'smooth' }), 100);
          }}>
            {t('nav.about')}
          </Link>
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className="mobile-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {t(item.key)}
            </Link>
          ))}
          <a className="mobile-nav-link" href={`${import.meta.env.BASE_URL}resume.pdf`} target="_blank" rel="noopener">CV ↗</a>
          <button className="lang-toggle" onClick={toggleLang} style={{ marginTop: 24 }}>
            {i18n.language === 'zh' ? 'EN' : '中'}
          </button>
        </div>
      )}
    </nav>
  );
}
