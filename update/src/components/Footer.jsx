export default function Footer() {
  return (
    <footer style={{
      position: 'fixed',
      bottom: 0, left: 0, right: 0,
      height: 28,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 72px',
      zIndex: 50,
      borderTop: '1px solid rgba(201,168,76,0.06)',
      background: 'rgba(4,5,14,0.75)',
      backdropFilter: 'blur(8px)',
    }}>
      <span style={{ fontFamily:'var(--font-mono)', fontSize:9, color:'rgba(201,168,76,0.2)', letterSpacing:'0.08em' }}>
        BNU-HKBU UIC · 2025
      </span>
      <span style={{ fontFamily:'var(--font-mono)', fontSize:9, color:'rgba(201,168,76,0.2)', letterSpacing:'0.08em' }}>
        ● SYS_OK
      </span>
      <span style={{ fontFamily:'var(--font-mono)', fontSize:9, color:'rgba(201,168,76,0.2)', letterSpacing:'0.08em' }}>
        © 2026
      </span>
    </footer>
  );
}
