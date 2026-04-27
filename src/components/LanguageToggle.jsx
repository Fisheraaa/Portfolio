import { useTranslation } from 'react-i18next';

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const next = i18n.language === 'zh' ? 'en' : 'zh';

  const onToggle = () => {
    i18n.changeLanguage(next);
    localStorage.setItem('lang', next);
  };

  return (
    <button className="lang-toggle mono" onClick={onToggle} aria-label="Toggle language">
      {i18n.language === 'zh' ? '[EN]' : '[中]'}
    </button>
  );
}