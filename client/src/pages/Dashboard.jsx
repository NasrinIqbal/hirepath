import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import api from '../services/api';

function ScoreCard({ label, value, color }) {
  return (
    <div style={{ background: '#fff', borderRadius: 14, padding: 24, border: '1px solid #e8edf5', textAlign: 'center' }}>
      <div style={{ fontSize: 42, fontWeight: 800, color }}>{value}%</div>
      <div style={{ height: 8, background: '#f1f5f9', borderRadius: 99, margin: '12px 0 8px', overflow: 'hidden' }}>
        <div style={{ width: `${value}%`, height: '100%', background: color, borderRadius: 99, transition: 'width 0.7s ease' }} />
      </div>
      <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>{label}</div>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const [scores, setScores] = useState({ profileStrength: 0, careerReadiness: 0, resumeScore: 0, recommendations: [] });
  const [stats, setStats]   = useState({ applications: 0, savedJobs: 0 });

  useEffect(() => {
    api.get('/users/scores').then(r => setScores(r.data));
    api.get('/applications/mine').then(r => setStats(s => ({ ...s, applications: r.data.length })));
    api.get('/saved').then(r => setStats(s => ({ ...s, savedJobs: r.data.length })));
  }, []);

  return (
    <Layout>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', margin: '0 0 4px' }}>
        Welcome back, {user?.fullName?.split(' ')[0]} 👋
      </h1>
      <p style={{ color: '#64748b', fontSize: 14, marginBottom: 24 }}>Here is your career health overview.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 20 }}>
        <ScoreCard label="Profile Strength"  value={scores.profileStrength}  color="#3B82F6" />
        <ScoreCard label="Career Readiness"  value={scores.careerReadiness}  color="#6366f1" />
        <ScoreCard label="Resume Score"      value={scores.resumeScore}      color="#10b981" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 20 }}>
        <div style={{ background: '#fff', borderRadius: 14, padding: 24, border: '1px solid #e8edf5' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 14px' }}>Career Recommendations</h2>
          {scores.recommendations.length === 0
            ? <p style={{ color: '#10b981', fontWeight: 600, fontSize: 14 }}>✓ Your profile looks great!</p>
            : scores.recommendations.map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #f1f5f9', fontSize: 14, color: '#334155' }}>
                  <span style={{ color: '#f59e0b' }}>→</span> {r}
                </div>
              ))
          }
        </div>

        <div style={{ background: '#fff', borderRadius: 14, padding: 24, border: '1px solid #e8edf5' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 14px' }}>Quick Stats</h2>
          {[
            { label: 'Applications', value: stats.applications, color: '#3B82F6' },
            { label: 'Saved Jobs',   value: stats.savedJobs,   color: '#6366f1' },
            { label: 'Skills',       value: user?.skills?.length || 0, color: '#10b981' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>{s.label}</span>
              <span style={{ fontWeight: 800, color: s.color, fontSize: 20 }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}