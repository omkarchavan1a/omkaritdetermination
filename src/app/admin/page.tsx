"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [content, setContent] = useState<any>(null);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"content" | "inquiries">("content");
  const [isDbConnected, setIsDbConnected] = useState(true);

  useEffect(() => {
    // Initial fetch for content
    fetch("/api/content")
      .then((res) => {
        if (!res.ok) setIsDbConnected(false);
        return res.json();
      })
      .then((data) => {
        setContent(data);
        if (activeTab === "content") setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsDbConnected(false);
        setLoading(false);
      });

    // Fetch inquiries
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/inquiries");
      const data = await res.json();
      setInquiries(Array.isArray(data) ? data : []);
      if (activeTab === "inquiries") setLoading(false);
    } catch (err) {
      console.error("Failed to fetch inquiries", err);
    }
  };

  useEffect(() => {
    if (content && inquiries) setLoading(false);
  }, [content, inquiries]);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setMessage("Changes saved and deployed successfully!");
      } else {
        setMessage("Failed to save changes.");
      }
    } catch (err) {
      setMessage("An error occurred while saving.");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 5000);
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      const res = await fetch(`/api/inquiries?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setInquiries(inquiries.filter((q) => q._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete inquiry", err);
    }
  };

  const updateHero = (field: string, value: string) => {
    setContent({ ...content, hero: { ...content.hero, [field]: value } });
  };
  
  const updateAbout = (field: string, value: string) => {
    setContent({ ...content, about: { ...content.about, [field]: value } });
  };

  if (loading) return <div className="loading">Loading Portfolio Data...</div>;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>OmniPanel <span className="admin-badge">Admin</span></h1>
        <div className="header-actions">
          <button 
            className={`tab-btn ${activeTab === 'content' ? 'active' : ''}`}
            onClick={() => setActiveTab('content')}
          >
            Site Content
          </button>
          <button 
            className={`tab-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('inquiries')}
          >
            Inquiries {inquiries.length > 0 && <span className="count-dot">{inquiries.length}</span>}
          </button>
          {activeTab === 'content' && (
            <button className="btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? "Deploying..." : "Save Changes"}
            </button>
          )}
        </div>
      </div>
      
      {!isDbConnected && (
        <div className="db-warning">
          <strong>Database Disconnected:</strong> Your <code>.env.local</code> has an invalid <code>MONGODB_URI</code> password. 
          Changes saved here will <strong>not</strong> persist until fixed.
        </div>
      )}

      {message && (
        <div className={`status-message ${message.includes("error") || message.includes("Failed") ? "error" : "success"}`}>
          {message}
        </div>
      )}

      {activeTab === "content" ? (
        <div className="editor-grid">
          <div className="editor-section">
            <h2>Hero Section</h2>
            <div className="input-group">
              <label>Service Label</label>
              <input 
                value={content?.hero?.label || ""} 
                onChange={(e) => updateHero("label", e.target.value)} 
              />
            </div>
            <div className="input-group">
              <label>Headline (HTML Allowed)</label>
              <textarea 
                rows={3}
                value={content?.hero?.title || ""} 
                onChange={(e) => updateHero("title", e.target.value)} 
              />
            </div>
            <div className="input-group">
              <label>Sub-description</label>
              <textarea 
                rows={4}
                value={content?.hero?.description || ""} 
                onChange={(e) => updateHero("description", e.target.value)} 
              />
            </div>
          </div>

          <div className="editor-section">
            <h2>About Section</h2>
            <div className="input-group">
              <label>Heading</label>
              <input 
                value={content?.about?.title || ""} 
                onChange={(e) => updateAbout("title", e.target.value)} 
              />
            </div>
            <div className="input-group">
              <label>Narrative</label>
              <textarea 
                rows={6}
                value={content?.about?.description || ""} 
                onChange={(e) => updateAbout("description", e.target.value)} 
              />
            </div>
          </div>
          <p className="note">Note: Complex array editing (Services/Portfolio) currently requires direct JSON modification in <code>content.json</code>.</p>
        </div>
      ) : (
        <div className="inquiries-section">
          <h2>Client Inquiries</h2>
          {inquiries.length === 0 ? (
            <div className="empty-state">No inquiries received yet.</div>
          ) : (
            <div className="inquiry-list">
              {inquiries.map((inquiry) => (
                <div key={inquiry._id} className="inquiry-card">
                  <div className="inquiry-header">
                    <div className="inquiry-meta">
                      <h3>{inquiry.subject}</h3>
                      <span className="inquiry-date">{new Date(inquiry.createdAt).toLocaleString()}</span>
                    </div>
                    <button className="btn-delete" onClick={() => deleteInquiry(inquiry._id)}>Delete</button>
                  </div>
                  <div className="inquiry-body">
                    <p><strong>From:</strong> {inquiry.name} ({inquiry.email})</p>
                    <div className="message-text">{inquiry.message}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .dashboard { max-width: 1200px; margin: 0 auto; color: var(--on-surface); }
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          border-bottom: 1px solid var(--glass-border);
          padding-bottom: 20px;
        }
        .admin-badge {
          font-size: 0.8rem;
          background: var(--primary-container);
          color: white;
          padding: 2px 8px;
          border-radius: 4px;
          vertical-align: middle;
          margin-left: 10px;
          text-transform: uppercase;
        }
        .header-actions { display: flex; gap: 12px; align-items: center; }
        
        .tab-btn {
          background: transparent;
          border: 1px solid var(--glass-border);
          color: var(--on-surface-variant);
          padding: 10px 20px;
          cursor: pointer;
          border-radius: 6px;
          font-size: 0.9rem;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .tab-btn.active {
          background: var(--surface-low);
          border-color: var(--primary-container);
          color: var(--primary-container);
          font-weight: 500;
        }
        .count-dot {
          background: var(--primary-container);
          color: white;
          font-size: 0.7rem;
          padding: 2px 6px;
          border-radius: 10px;
        }

        .loading { padding: 100px; text-align: center; font-style: italic; opacity: 0.7; }

        .status-message {
          padding: 16px 24px;
          border-radius: 8px;
          margin-bottom: 32px;
          border-left: 4px solid;
          animation: slideIn 0.3s ease-out;
        }
        @keyframes slideIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .status-message.success { background: rgba(46, 204, 113, 0.1); border-color: #2ecc71; color: #2ecc71; }
        .status-message.error { background: rgba(231, 76, 60, 0.1); border-color: #e74c3c; color: #e74c3c; }

        .editor-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
        .editor-section {
          background: var(--surface-low);
          padding: 32px;
          border: 1px solid var(--glass-border);
          border-radius: 12px;
        }
        h2 { color: var(--primary-container); margin-bottom: 24px; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 0.1em; }
        
        .input-group { margin-bottom: 20px; }
        .input-group label { display: block; font-size: 0.7rem; color: var(--on-surface-variant); margin-bottom: 6px; text-transform: uppercase; }
        .input-group input, .input-group textarea {
          width: 100%;
          background: var(--surface-container);
          border: 1px solid var(--glass-border);
          padding: 12px;
          color: var(--on-surface);
          font-family: inherit;
          font-size: 0.95rem;
          border-radius: 6px;
        }
        .input-group input:focus, .input-group textarea:focus { outline: none; border-color: var(--primary-container); }

        .inquiries-section { background: var(--surface-low); padding: 32px; border-radius: 12px; border: 1px solid var(--glass-border); }
        .inquiry-list { display: flex; flex-direction: column; gap: 16px; margin-top: 24px; }
        .inquiry-card {
          background: var(--surface-container);
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          padding: 24px;
          transition: transform 0.2s;
        }
        .inquiry-card:hover { border-color: var(--primary-container); }
        .inquiry-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
        .inquiry-meta h3 { margin: 0; font-size: 1.1rem; color: var(--on-surface); }
        .inquiry-date { font-size: 0.75rem; color: var(--on-surface-variant); }
        .message-text { margin-top: 12px; background: rgba(0,0,0,0.1); padding: 16px; border-radius: 6px; white-space: pre-wrap; font-size: 0.9rem; line-height: 1.5; }

        .btn-delete {
          background: transparent;
          color: #e74c3c;
          border: 1px solid rgba(231, 76, 60, 0.3);
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.75rem;
          transition: all 0.2s;
        }
        .btn-delete:hover { background: #e74c3c; color: white; }
        .btn-primary { padding: 10px 24px; border-radius: 6px; }
        .empty-state { text-align: center; padding: 60px; color: var(--on-surface-variant); font-style: italic; }
        .note { grid-column: 1 / -1; margin-top: 20px; font-size: 0.8rem; color: var(--on-surface-variant); }
        .db-warning {
          background: rgba(231, 76, 60, 0.15);
          border: 1px solid #e74c3c;
          color: #e74c3c;
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 30px;
          font-size: 0.9rem;
        }
        .db-warning code { background: rgba(0,0,0,0.2); padding: 2px 4px; border-radius: 4px; }
      `}</style>
    </div>
  );
}
