import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

export default function Jobs() {
  const [jobs, setJobs]       = useState([]);
  const [search, setSearch]   = useState('');
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState({});
  const [saved, setSaved]     = useState({});

  useEffect(() => {
    api.get('/jobs').then(r => { setJobs(r.data); setLoading(false); });
    api.get('/saved').then(r => {
      const map = {};
      r.data.forEach(s => { map[s.job?._id] = true; });
      setSaved(map);
    });
  }, []);

  async function applyJob(jobId) {
    try {
      await api.post('/applications', { jobId });
      setApplied(a => ({ ...a, [jobId]: true }));
    } catch (err) {
      alert(err.response?.data?.message || 'Could not apply');
    }
  }

  async function toggleSave(jobId) {
    try {
      if (saved[jobId]) {
        await api.delete(`/saved/${jobId}`);
        setSaved(s => ({ ...s, [jobId]: false }));
      } else {
        await api.post('/saved', { jobId });
        setSaved(s => ({ ...s, [jobId]: true }));
      }
    } catch (err) {
      alert('Could not save job');
    }
  }

  const filtered = jobs.filter(j =>
    !search || j.title?.toLowerCase().includes(search.toLowerCase()) ||
    j.requiredSkills?.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Layout>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>Browse Jobs</h1>
      <input value={search} onChange={e => setSearch(e.target.value)}
        placeholder="Search by title or skill…"
        style={{ width: '100%', border: '1.5px solid #e2e8f0', borderRadius: 8, padding: '10px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box', marginBottom: 20 }} />

      {loading ? <p style={{ color: '#64748b' }}>Loading jobs...</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
          {filtered.map(job => (
            <div key={job._id} style={{ background: '#fff', borderRadius: 14, padding: 20, border: '1px solid #e8edf5' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', fontSize: 15, marginBottom: 4 }}>{job.title}</div>
              <div style={{ color: '#64748b', fontSize: 13, marginBottom: 4 }}>{job.location}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 10 }}>
                {job.type} · {job.experienceLevel}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                {(job.requiredSkills || []).slice(0, 4).map(s => (
                  <span key={s} style={{ background: '#eff6ff', color: '#3B82F6', borderRadius: 6, padding: '3px 8px', fontSize: 12, fontWeight: 600 }}>{s}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => applyJob(job._id)} disabled={applied[job._id]}
                  style={{ background: applied[job._id] ? '#10b981' : '#3B82F6', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 700, cursor: applied[job._id] ? 'default' : 'pointer' }}>
                  {applied[job._id] ? '✓ Applied' : 'Apply Now'}
                </button>
                <button onClick={() => toggleSave(job._id)}
                  style={{ background: saved[job._id] ? '#fef9c3' : '#f8fafc', color: saved[job._id] ? '#ca8a04' : '#64748b', border: '1.5px solid #e2e8f0', borderRadius: 8, padding: '8px 14px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                  {saved[job._id] ? '★ Saved' : '☆ Save'}
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p style={{ color: '#94a3b8', gridColumn: '1/-1' }}>No jobs found.</p>}
        </div>
      )}
    </Layout>
  );
}