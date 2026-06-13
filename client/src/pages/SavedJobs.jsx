import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

export default function SavedJobs() {
  const [saved, setSaved]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/saved').then(r => { setSaved(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  async function remove(jobId) {
    await api.delete(`/saved/${jobId}`);
    setSaved(s => s.filter(x => x.job?._id !== jobId));
  }

  return (
    <Layout>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>Saved Jobs</h1>
      {loading ? <p>Loading...</p> : saved.length === 0 ? (
        <div style={{ background: '#fff', borderRadius: 14, padding: 32, textAlign: 'center', border: '1px solid #e8edf5', color: '#94a3b8' }}>
          No saved jobs yet. Click Save on any job listing.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
          {saved.map((s, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 14, padding: 20, border: '1px solid #e8edf5' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', fontSize: 15, marginBottom: 4 }}>{s.job?.title}</div>
              <div style={{ color: '#64748b', fontSize: 13, marginBottom: 12 }}>{s.job?.location}</div>
              <button onClick={() => remove(s.job?._id)} style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', borderRadius: 8, padding: '7px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}