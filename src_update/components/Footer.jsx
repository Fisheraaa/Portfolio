export default function Footer() {
  return (
    <footer
      className="container"
      style={{ padding: '24px 0 40px', color: 'var(--text-3)', fontSize: 12, textAlign: 'center' }}
    >
      © {new Date().getFullYear()} Yu Qiuxing
    </footer>
  );
}
