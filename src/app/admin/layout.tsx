export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout">
      <nav className="admin-nav">
        <div className="admin-brand serif">Omkar IT Admin</div>
        <a href="/" className="back-link">Return to Live Site ↗</a>
      </nav>
      <main className="admin-main">
        {children}
      </main>

      <style jsx>{`
        .admin-layout {
          min-height: 100vh;
          background: var(--surface);
          display: flex;
          flex-direction: column;
        }
        .admin-nav {
          background: var(--surface-low);
          padding: 24px 40px;
          border-bottom: 1px solid var(--glass-border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .admin-brand {
          font-size: 1.5rem;
          color: var(--primary-container);
        }
        .back-link {
          color: var(--on-surface-variant);
          text-decoration: none;
          font-size: 0.9rem;
          transition: opacity 0.3s;
        }
        .back-link:hover {
          opacity: 0.7;
        }
        .admin-main {
          flex: 1;
          padding: 40px;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }
      `}</style>
    </div>
  );
}
