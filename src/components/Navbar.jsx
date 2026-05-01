import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Navbar.css';

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  const toggleLang = () => {
    const next = i18n.language === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(next);
    localStorage.setItem('lang', next);
  };

  const navItems = [
    { path: '/about',    key: 'nav.about'    },
    { path: '/projects', key: 'nav.projects' },
    { path: '/blog',     key: 'nav.blog'     },
    { path: '/contact',  key: 'nav.contact'  },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="nav-logo">YQX</Link>

      {/* 桌面导航 */}
      <div className="nav-links">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
          >
            {t(item.key)}
          </Link>
        ))}
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
          <button className="lang-toggle" onClick={toggleLang} style={{ marginTop: 24 }}>
            {i18n.language === 'zh' ? 'EN' : '中'}
          </button>
        </div>
      )}
    </nav>
  );
}
