import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './Contact.css';

const EMAILS = ['3137933563@qq.com', '2625123959g@gmail.com'];
const GITHUB  = 'https://github.com/Fisheraaa';

export default function Contact() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const [copiedIdx, setCopiedIdx]   = useState(null);
  const [showWechat, setShowWechat] = useState(false);

  const copyEmail = (email, idx) => {
    navigator.clipboard.writeText(email).then(() => {
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    });
  };

  const resumeHref = `${import.meta.env.BASE_URL}resume.pdf`;

  return (
    <motion.section className="contact-section"
      initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
      transition={{duration:0.45,ease:[0.16,1,0.3,1]}}>
      <div className="page-inner--narrow">

        <motion.h1 className="section-title title-italic"
          initial={{opacity:0,y:14}} animate={{opacity:1,y:0}}
          transition={{delay:0.05,duration:0.45,ease:[0.16,1,0.3,1]}}>
          {t('contact.title')}
        </motion.h1>

        <motion.p className="contact-subtitle"
          initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
          transition={{delay:0.1,duration:0.4,ease:[0.16,1,0.3,1]}}>
          {t('contact.subtitle')}
        </motion.p>

        <motion.div className="contact-list"
          initial={{opacity:0}} animate={{opacity:1}}
          transition={{delay:0.15,duration:0.4}}>

          {/* Email */}
          {EMAILS.map((email, idx) => (
            <button key={email} className="contact-btn" onClick={()=>copyEmail(email,idx)}>
              <div className="contact-btn-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M2 7l10 7 10-7"/>
                </svg>
              </div>
              <div className="contact-btn-body">
                <div className="contact-btn-label">Email {idx===1?'(Gmail)':'(QQ)'}</div>
                <div className="contact-btn-value">{email}</div>
              </div>
              {/* 一行显示，不换行 */}
              <div className="contact-btn-action">
                {copiedIdx===idx
                  ? <span className="contact-copied">{t('contact.copied')}</span>
                  : <span className="contact-copy-icon">⎘</span>}
              </div>
            </button>
          ))}

          {/* GitHub */}
          <a href={GITHUB} target="_blank" rel="noreferrer" className="contact-btn">
            <div className="contact-btn-icon">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </div>
            <div className="contact-btn-body">
              <div className="contact-btn-label">GitHub</div>
              <div className="contact-btn-value">github.com/Fisheraaa</div>
            </div>
            <div className="contact-btn-action">→</div>
          </a>

          {/* WeChat — 点击弹出二维码 */}
          <button className="contact-btn" onClick={()=>setShowWechat(true)}>
            <div className="contact-btn-icon">
              {/* WeChat 图标 SVG */}
              <svg width="19" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.7 5C4.6 5 1.3 7.8 1.3 11.2c0 1.9 1 3.6 2.6 4.7l-.6 2 2.2-1.1c.7.2 1.5.3 2.2.3h.4c-.1-.4-.1-.8-.1-1.2 0-3.1 2.9-5.6 6.4-5.6h.4C14.2 7.5 11.7 5 8.7 5zM6.5 9.3a.8.8 0 110-1.6.8.8 0 010 1.6zm4.4 0a.8.8 0 110-1.6.8.8 0 010 1.6z"/>
                <path d="M22.7 15.5c0-2.9-2.8-5.2-6.3-5.2s-6.3 2.3-6.3 5.2 2.8 5.2 6.3 5.2c.6 0 1.3-.1 1.9-.3l1.9.9-.5-1.8c1.3-1 2-2.5 2-4zm-8.5-.5a.7.7 0 110-1.4.7.7 0 010 1.4zm4.4 0a.7.7 0 110-1.4.7.7 0 010 1.4z"/>
              </svg>
            </div>
            <div className="contact-btn-body">
              <div className="contact-btn-label">WeChat</div>
              <div className="contact-btn-value">{isZh?'点击查看二维码':'Tap to see QR code'}</div>
            </div>
            <div className="contact-btn-action">⊕</div>
          </button>

          {/* 简历 */}
          <a id="resume-link" href={resumeHref} target="_blank" rel="noopener" className="contact-btn">
            <div className="contact-btn-icon">
              <svg viewBox="0 0 30 24" width="22" height="18" fill="none">
                <rect x="1.2" y="1.2" width="27.6" height="21.6" rx="3.4" stroke="currentColor" strokeWidth="1.7"/>
                <text x="15" y="15.7" textAnchor="middle" fontSize="10" fontWeight="700" fill="currentColor">CV</text>
              </svg>
            </div>
            <div className="contact-btn-body">
              <div className="contact-btn-label">{isZh?'简历 / Résumé':'Résumé / CV'}</div>
              <div className="contact-btn-value">{isZh?'下载 PDF':'Download PDF'}</div>
            </div>
            <div className="contact-btn-action">↗</div>
          </a>

          <p className="contact-star-hint">
            {isZh?'觉得还不错的话，欢迎去 GitHub 点个 star ⭐':'If you like what you see, a GitHub star would mean a lot ⭐'}
          </p>
        </motion.div>
      </div>

      {/* WeChat 二维码 Modal */}
      <AnimatePresence>
        {showWechat && (
          <motion.div className="wechat-overlay"
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            onClick={()=>setShowWechat(false)}>
            <motion.div className="wechat-modal"
              initial={{opacity:0,scale:0.9,y:16}}
              animate={{opacity:1,scale:1,y:0}}
              exit={{opacity:0,scale:0.95}}
              transition={{duration:0.25,ease:[0.16,1,0.3,1]}}
              onClick={e=>e.stopPropagation()}>
              <button className="wechat-close" onClick={()=>setShowWechat(false)}>×</button>
              <div className="wechat-label">WeChat</div>
              <img
                src={`${import.meta.env.BASE_URL}wechat-qr.png`}
                alt="WeChat QR Code"
                className="wechat-qr"
              />
              <p className="wechat-hint">{isZh?'扫码添加微信':'Scan to add on WeChat'}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
