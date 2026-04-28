import { motion } from 'framer-motion';
import './Contact.css';

const CONTACT_METHODS = [
  {
    id: 'email',
    icon: '@',
    label: 'Email',
    value: 'yuqiuxing@example.com', /* 换成你的真实邮箱 */
    link: 'mailto:yuqiuxing@example.com'
  },
  {
    id: 'github',
    icon: 'GH',
    label: 'GitHub',
    value: 'github.com/Fisheraaa',
    link: 'https://github.com/Fisheraaa'
  },
  {
    id: 'wechat',
    icon: 'WX',
    label: 'WeChat',
    value: 'Scan QR Code / Search ID',
    link: '#'
  }
];

export default function Contact() {
  return (
    <motion.section 
      className="contact-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <h1 className="section-title title-italic">Let's Connect</h1>
      <p style={{ color: 'var(--text-2)', marginBottom: '40px', fontSize: '15px' }}>
        I'm always open to discussing quant strategies, system architecture, or potential opportunities. 
      </p>

      <div className="contact-list">
        {CONTACT_METHODS.map(method => (
          <a key={method.id} href={method.link} target="_blank" rel="noreferrer" className="contact-btn">
            <div className="contact-btn-icon">{method.icon}</div>
            <div>
              <div className="contact-btn-label">{method.label}</div>
              <div className="contact-btn-value">{method.value}</div>
            </div>
            <div className="contact-btn-arrow">→</div>
          </a>
        ))}
      </div>
    </motion.section>
  );
}