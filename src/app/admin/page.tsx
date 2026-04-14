"use client";

import { useEffect, useState } from "react";
import ArrayEditor from "@/components/admin/ArrayEditor";

export default function AdminDashboard() {
  const [content, setContent] = useState<Record<string, any> | null>(null);
  const [inquiries, setInquiries] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"content" | "inquiries">("content");
  const [activeSection, setActiveSection] = useState("hero");
  const [isDbConnected, setIsDbConnected] = useState(true);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => {
        if (!res.ok) setIsDbConnected(false);
        return res.json();
      })
      .then((data) => {
        // Ensure all sections exist in state to avoid crashes
        const sanitized = {
          hero: data.hero || { label: "", title: "", description: "" },
          about: data.about || { title: "", description: "", stats: [], features: [] },
          services: data.services || { title: "", description: "", list: [] },
          portfolio: data.portfolio || { title: "", description: "", projects: [] },
          marquee: data.marquee || { items: [] },
          process: data.process || { title: "", steps: [] },
          contact: data.contact || { title: "", email: "", phone: "", address: "" },
          footer: data.footer || { trademark: "", links: [], social: [] },
        };
        setContent(sanitized);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsDbConnected(false);
        setLoading(false);
      });

    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/inquiries");
      const data = await res.json();
      setInquiries(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch inquiries", err);
    }
  };

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

  const updateSection = (section: string, field: string, value: unknown) => {
    if (!content) return;
    setContent({
      ...content,
      [section]: { ...(content[section] as Record<string, unknown>), [field]: value }
    });
  };

  // Schema definitions for ArrayEditor
  const schemas = {
    stats: [
      { key: "value", label: "Value (e.g. 150+)", type: "text" as const },
      { key: "label", label: "Label", type: "text" as const },
    ],
    services: [
      { key: "title", label: "Service Title", type: "text" as const },
      { key: "description", label: "Description", type: "textarea" as const },
      { key: "tags", label: "Tags (Comma separated)", type: "array" as const },
    ],
    portfolio: [
      { key: "title", label: "Project Title", type: "text" as const },
      { key: "category", label: "Category", type: "text" as const },
      { key: "year", label: "Year", type: "text" as const },
      { key: "description", label: "Summary", type: "text" as const },
      { key: "desc", label: "Full Description", type: "textarea" as const },
      { key: "link", label: "Project URL", type: "text" as const },
      { key: "favicon", label: "Favicon URL", type: "text" as const },
      { key: "tags", label: "Tags (Comma separated)", type: "array" as const },
    ],
    process: [
      { key: "num", label: "Symbol/Number (e.g. α)", type: "text" as const },
      { key: "title", label: "Step Title", type: "text" as const },
      { key: "desc", label: "Description", type: "textarea" as const },
    ],
    footerLinks: [
      { key: "label", label: "Link Label", type: "text" as const },
      { key: "url", label: "URL", type: "text" as const },
    ],
    footerSocial: [
      { key: "platform", label: "Platform", type: "text" as const },
      { key: "url", label: "Profile URL", type: "text" as const },
      { key: "icon", label: "Icon Name (from CSS)", type: "text" as const },
    ]
  };

  if (loading) return <div className="loading">Loading Portfolio Engine...</div>;

  const sections = [
    { id: "hero", label: "Hero" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "portfolio", label: "Portfolio" },
    { id: "process", label: "Process" },
    { id: "contact", label: "Contact Info" },
    { id: "footer", label: "Footer" },
    { id: "marquee", label: "Marquee" },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>OmniPanel <span className="admin-badge">v2.0</span></h1>
        <div className="header-actions">
          <button 
            className={`tab-btn ${activeTab === 'content' ? 'active' : ''}`}
            onClick={() => setActiveTab('content')}
          >
            Content Management
          </button>
          <button 
            className={`tab-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('inquiries')}
          >
            Inquiries {inquiries.length > 0 && <span className="count-dot">{inquiries.length}</span>}
          </button>
          {activeTab === 'content' && (
            <button className="btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? "Deploying..." : "Sync Changes"}
            </button>
          )}
        </div>
      </div>
      
      {!isDbConnected && (
        <div className="db-warning">
          <strong>Database Sync Failed:</strong> Changes will not persist. Check <code>MONGODB_URI</code>.
        </div>
      )}

      {message && (
        <div className={`status-message ${message.includes("error") || message.includes("Failed") ? "error" : "success"}`}>
          {message}
        </div>
      )}

      {activeTab === "content" && content ? (
        <div className="editor-container">
          <div className="section-sidebar">
            {sections.map(s => (
              <button 
                key={s.id} 
                className={`section-link ${activeSection === s.id ? 'active' : ''}`}
                onClick={() => setActiveSection(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="main-editor">
            {activeSection === "hero" && (
              <div className="editor-view">
                <h2>Hero Section</h2>
                <div className="input-group">
                  <label>Service Label</label>
                  <input 
                    value={content.hero.label} 
                    onChange={(e) => updateSection("hero", "label", e.target.value)} 
                  />
                </div>
                <div className="input-group">
                  <label>Headline (HTML Allowed)</label>
                  <textarea 
                    rows={3}
                    value={content.hero.title} 
                    onChange={(e) => updateSection("hero", "title", e.target.value)} 
                  />
                </div>
                <div className="input-group">
                  <label>Sub-description</label>
                  <textarea 
                    rows={4}
                    value={content.hero.description} 
                    onChange={(e) => updateSection("hero", "description", e.target.value)} 
                  />
                </div>
              </div>
            )}

            {activeSection === "about" && (
              <div className="editor-view">
                <h2>About Section</h2>
                <div className="input-group">
                  <label>Heading</label>
                  <input 
                    value={content.about.title} 
                    onChange={(e) => updateSection("about", "title", e.target.value)} 
                  />
                </div>
                <div className="input-group">
                  <label>Narrative</label>
                  <textarea 
                    rows={6}
                    value={content.about.description} 
                    onChange={(e) => updateSection("about", "description", e.target.value)} 
                  />
                </div>
                
                <hr className="divider" />
                
                <ArrayEditor 
                  title="Stats counters"
                  items={content.about.stats || []}
                  schema={schemas.stats}
                  onUpdate={(items) => updateSection("about", "stats", items)}
                  addItemLabel="Add Stat"
                />

                <div className="input-group">
                  <label>Capabilities (Comma separated)</label>
                  <input 
                    value={content.about.features?.join(", ") || ""} 
                    onChange={(e) => updateSection("about", "features", e.target.value.split(",").map(s => s.trim()))} 
                  />
                </div>
              </div>
            )}

            {activeSection === "services" && (
              <div className="editor-view">
                <h2>Services Portfolio</h2>
                <div className="input-group">
                  <label>Introduction Title</label>
                  <input 
                    value={content.services.title} 
                    onChange={(e) => updateSection("services", "title", e.target.value)} 
                  />
                </div>
                <div className="input-group">
                  <label>Introduction Description</label>
                  <textarea 
                    rows={2}
                    value={content.services.description} 
                    onChange={(e) => updateSection("services", "description", e.target.value)} 
                  />
                </div>
                
                <ArrayEditor 
                  title="Service Offerings"
                  items={content.services.list || []}
                  schema={schemas.services}
                  onUpdate={(items) => updateSection("services", "list", items)}
                  addItemLabel="Add Service"
                />
              </div>
            )}

            {activeSection === "portfolio" && (
              <div className="editor-view">
                <h2>Selected Artifacts</h2>
                <div className="input-group">
                  <label>Portfolio Title</label>
                  <input 
                    value={content.portfolio.title} 
                    onChange={(e) => updateSection("portfolio", "title", e.target.value)} 
                  />
                </div>
                <div className="input-group">
                  <label>Portfolio Description</label>
                  <textarea 
                    rows={2}
                    value={content.portfolio.description} 
                    onChange={(e) => updateSection("portfolio", "description", e.target.value)} 
                  />
                </div>

                <ArrayEditor 
                  title="Projects"
                  items={content.portfolio.projects || []}
                  schema={schemas.portfolio}
                  onUpdate={(items) => updateSection("portfolio", "projects", items)}
                  addItemLabel="Add Project"
                />
              </div>
            )}

            {activeSection === "process" && (
              <div className="editor-view">
                <h2>Work Methodology</h2>
                <div className="input-group">
                  <label>Process Title</label>
                  <input 
                    value={content.process.title} 
                    onChange={(e) => updateSection("process", "title", e.target.value)} 
                  />
                </div>

                <ArrayEditor 
                  title="Steps"
                  items={content.process.steps || []}
                  schema={schemas.process}
                  onUpdate={(items) => updateSection("process", "steps", items)}
                  addItemLabel="Add Step"
                />
              </div>
            )}

            {activeSection === "contact" && (
              <div className="editor-view">
                <h2>Direct Channels</h2>
                <div className="input-group">
                  <label>Contact Title</label>
                  <input 
                    value={content.contact.title} 
                    onChange={(e) => updateSection("contact", "title", e.target.value)} 
                  />
                </div>
                <div className="input-group">
                  <label>Email Address</label>
                  <input 
                    value={content.contact.email} 
                    onChange={(e) => updateSection("contact", "email", e.target.value)} 
                  />
                </div>
                <div className="input-group">
                  <label>Phone Number</label>
                  <input 
                    value={content.contact.phone} 
                    onChange={(e) => updateSection("contact", "phone", e.target.value)} 
                  />
                </div>
                <div className="input-group">
                  <label>Physical/Digital Address</label>
                  <input 
                    value={content.contact.address} 
                    onChange={(e) => updateSection("contact", "address", e.target.value)} 
                  />
                </div>
              </div>
            )}

            {activeSection === "footer" && (
              <div className="editor-view">
                <h2>Footer Configuration</h2>
                <div className="input-group">
                  <label>Trademark / Copyright</label>
                  <input 
                    value={content.footer.trademark} 
                    onChange={(e) => updateSection("footer", "trademark", e.target.value)} 
                  />
                </div>

                <ArrayEditor 
                  title="Internal Links"
                  items={content.footer.links || []}
                  schema={schemas.footerLinks}
                  onUpdate={(items) => updateSection("footer", "links", items)}
                  addItemLabel="Add Link"
                />

                <ArrayEditor 
                  title="Social Profiles"
                  items={content.footer.social || []}
                  schema={schemas.footerSocial}
                  onUpdate={(items) => updateSection("footer", "social", items)}
                  addItemLabel="Add Social"
                />
              </div>
            )}

            {activeSection === "marquee" && (
              <div className="editor-view">
                <h2>Marquee Tech Strip</h2>
                <div className="input-group">
                  <label>Marquee Items (Comma separated)</label>
                  <textarea 
                    rows={10}
                    value={content.marquee.items?.join(", ") || ""} 
                    onChange={(e) => updateSection("marquee", "items", e.target.value.split(",").map(s => s.trim()))} 
                  />
                </div>
              </div>
            )}
          </div>
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
        .dashboard { max-width: 1400px; margin: 0 auto; color: var(--on-surface); padding: 40px; }
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          border-bottom: 1px solid var(--glass-border);
          padding-bottom: 20px;
        }
        .admin-badge {
          font-size: 0.7rem;
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

        .editor-container {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 40px;
          min-height: 70vh;
        }

        .section-sidebar {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .section-link {
          text-align: left;
          background: transparent;
          border: none;
          padding: 12px 16px;
          color: var(--on-surface-variant);
          cursor: pointer;
          border-radius: 8px;
          font-size: 0.95rem;
          transition: all 0.2s;
        }
        .section-link:hover { background: rgba(255,255,255,0.05); color: var(--on-surface); }
        .section-link.active { background: var(--surface-low); color: var(--primary-container); font-weight: 500; }

        .main-editor {
          background: var(--surface-low);
          padding: 40px;
          border: 1px solid var(--glass-border);
          border-radius: 16px;
        }
        .editor-view h2 { margin-bottom: 30px; font-size: 1.4rem; color: var(--primary-container); }
        
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

        .input-group { margin-bottom: 24px; }
        .input-group label { display: block; font-size: 0.7rem; color: var(--on-surface-variant); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em; }
        .input-group input, .input-group textarea {
          width: 100%;
          background: var(--surface-container);
          border: 1px solid var(--glass-border);
          padding: 14px;
          color: var(--on-surface);
          font-family: inherit;
          font-size: 0.95rem;
          border-radius: 8px;
          transition: border-color 0.2s;
        }
        .input-group input:focus, .input-group textarea:focus { outline: none; border-color: var(--primary-container); }

        .divider { border: none; border-top: 1px solid var(--glass-border); margin: 30px 0; }

        .inquiries-section { background: var(--surface-low); padding: 40px; border-radius: 16px; border: 1px solid var(--glass-border); }
        .inquiry-list { display: flex; flex-direction: column; gap: 20px; }
        .inquiry-card {
          background: var(--surface-container);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          padding: 24px;
        }
        .inquiry-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
        .inquiry-meta h3 { margin: 0; font-size: 1.1rem; color: var(--on-surface); }
        .inquiry-date { font-size: 0.75rem; color: var(--on-surface-variant); }
        .message-text { margin-top: 12px; background: rgba(0,0,0,0.1); padding: 20px; border-radius: 8px; white-space: pre-wrap; font-size: 0.95rem; line-height: 1.6; }

        .btn-delete {
          background: transparent;
          color: #e74c3c;
          border: 1px solid rgba(231, 76, 60, 0.3);
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.8rem;
          transition: all 0.2s;
        }
        .btn-delete:hover { background: #e74c3c; color: white; }
        .btn-primary { padding: 12px 28px; border-radius: 8px; font-weight: 600; }
        .empty-state { text-align: center; padding: 100px; color: var(--on-surface-variant); font-style: italic; }
        .db-warning {
          background: rgba(231, 76, 60, 0.15);
          border: 1px solid #e74c3c;
          color: #e74c3c;
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 30px;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}
