"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        const data = await res.json();
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title serif">Admin Portal</h1>
        <p className="auth-subtitle">Verify your identity to proceed.</p>
        
        <form onSubmit={handleLogin} className="auth-form">
          <div className="input-group">
            <label>Email ID</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <label>Master Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          
          {error && <p className="error-msg">{error}</p>}
          
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Verifying..." : "Authenticate"}
          </button>
        </form>
      </div>

      <style jsx>{`
        .auth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--surface);
          padding: 20px;
        }
        .auth-box {
          background: var(--surface-low);
          border: 1px solid var(--glass-border);
          padding: 60px;
          border-radius: var(--radius-lg);
          max-width: 480px;
          width: 100%;
          text-align: center;
        }
        .auth-title {
          font-size: 2.5rem;
          color: var(--primary-container);
          margin-bottom: 12px;
        }
        .auth-subtitle {
          color: var(--on-surface-variant);
          font-size: 0.9rem;
          margin-bottom: 40px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
          text-align: left;
        }
        .input-group label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--on-surface-variant);
          display: block;
          margin-bottom: 8px;
        }
        .input-group input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--glass-border);
          padding: 12px 0;
          color: var(--on-surface);
          font-family: inherit;
          font-size: 1.1rem;
          outline: none;
          transition: border-color 0.3s;
        }
        .input-group input:focus {
          border-color: var(--primary-container);
        }
        .error-msg {
          color: #ff6b6b;
          font-size: 0.85rem;
          margin-top: -10px;
        }
        .btn-primary {
          width: 100%;
          padding: 16px;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
}
