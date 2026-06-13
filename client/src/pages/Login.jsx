import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const { login }               = useAuth();
  const navigate                = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  }

  const inp = { width: '100%', border: '1.5px solid #e2e8f0', borderRadius: 8, padding: '9px 12px', fontSize: 14, outline: 'none', boxSizing: 'border-box' };
  const lbl = { fontSize: 12, fontWeight: 700, color: '#64748b', display: 'block', marginBottom: 4, textTransform: 'uppercase' };

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 420, background: '#fff', borderRadius: 16, padding: 36, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>
          Hire<span style={{ color: '#3B82F6' }}>Path</span>
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', margin: '0 0 20px' }}>Welcome back</h2>

        {error && <div style={{ background: '#fef2f2', color: '#ef4444', padding: '10px 14px', borderRadius: 8, marginBottom: 16, fontSize: 14 }}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 14 }}>
            <label style={lbl}>Email</label>
            <input style={inp} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={lbl}>Password</label>
            <input style={inp} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          <button type="submit" style={{ width: '100%', background: '#3B82F6', color: '#fff', border: 'none', borderRadius: 8, padding: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            Login
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: '#64748b' }}>
          Don't have an account? <a href="/register" style={{ color: '#3B82F6', fontWeight: 600 }}>Register</a>
        </p>
      </div>
    </div>
  );
}