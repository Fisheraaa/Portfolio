import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import LanguageToggle from './LanguageToggle';

export default function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const links = [
    { to: '/about', label: t('nav.about') },
    { to: '/projects', label: t('nav.projects') },
    { to: '/blog', label: t('nav.blog') },
    { to: '/contact', label: t('nav.contact') }
  ];

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <NavLink to="/" className="logo mono">YQ</NavLink>

        <nav className="nav-links desktop">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className="nav-link">{l.label}</NavLink>
          ))}
          <LanguageToggle />
        </nav>

        <button className="hamburger" aria-label="Menu" onClick={() => setOpen((v) => !v)}>☰</button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className="mobile-link" onClick={() => setOpen(false)}>{l.label}</NavLink>
            ))}
            <LanguageToggle />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}