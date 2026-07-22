import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

/**
 * 共用 CV 语言选择弹窗
 * 用法：<CvModal open={cvOpen} onClose={() => setCvOpen(false)} />
 * CSS 依赖：Navbar.css 中已定义的 .cv-modal / .cv-lang-btn 等，
 *           以及 globals.css 中的 .modal-overlay / .modal-box / .modal-close
 */
export default function CvModal({ open, onClose }) {
  const { i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  // ESC 关闭
  useEffect(() => {
    if (!open) return;
    const fn = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box cv-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <p className="cv-modal-label">
          {isZh ? '选择简历语言' : 'Select CV Language'}
        </p>

        <div className="cv-modal-btns">
          <a
            className="cv-lang-btn"
            href={`${import.meta.env.BASE_URL}resume.pdf`}
            target="_blank"
            rel="noopener"
            onClick={onClose}
          >
            <span className="cv-lang-char">文</span>
            <span className="cv-lang-name">中文</span>
            <span className="cv-lang-sub">Chinese</span>
          </a>
          <a
            className="cv-lang-btn"
            href={`${import.meta.env.BASE_URL}resume_En.pdf`}
            target="_blank"
            rel="noopener"
            onClick={onClose}
          >
            <span className="cv-lang-char">EN</span>
            <span className="cv-lang-name">English</span>
            <span className="cv-lang-sub">英文</span>
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}
