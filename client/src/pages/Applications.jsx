import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

const STATUS_COLORS = {
  applied: '#3B82F6', under_review: '#f59e0b', shortlisted: '#6366f1',
  interview_scheduled: '#8b5cf6', rejected: '#ef4444', selected: '#10b981',
};

export default function Applications() {
  const [apps, setApps]       = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/applications/mine').then(r => { setApps(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>My Applications</h1>
      {loading ? <p>Loading...</p> : apps.length === 0 ? (
        <div style={{ background: '#fff', borderRadius: 14, padding: 32, textAlign: 'center', border: '1px solid #e8edf5', color: '#94a3b8' }}>
          No applications yet. Browse jobs and hit Apply!
        </div>
      ) : (
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e8edf5', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9', background: '#f8fafc' }}>
                {['Role', 'Company', 'Date', 'Status'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: 12, color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {apps.map((a, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f8fafc' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a', fontSize: 14 }}>{a.job?.title || 'N/A'}</td>
                  <td style={{ padding: '12px 16px', color: '#64748b', fontSize: 14 }}>{a.job?.location || '—'}</td>
                  <td style={{ padding: '12px 16px', color: '#94a3b8', fontSize: 13 }}>{new Date(a.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ background: (STATUS_COLORS[a.status] || '#64748b') + '18', color: STATUS_COLORS[a.status] || '#64748b', border: `1px solid ${(STATUS_COLORS[a.status] || '#64748b')}44`, borderRadius: 6, padding: '3px 10px', fontSize: 12, fontWeight: 700 }}>
                      {a.status?.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}