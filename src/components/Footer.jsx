export default function Footer() {
  return (
    <footer className="container" style={{ padding: '24px 0 40px', color: 'var(--text-muted)', fontSize: 12 }}>
      © {new Date().getFullYear()} Yu Qiuhang
    </footer>
  );
}