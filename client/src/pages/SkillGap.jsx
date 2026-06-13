import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import api from '../services/api';

export default function SkillGap() {
  const { user }            = useAuth();
  const [jobs, setJobs]     = useState([]);
  const [selected, setSelected] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    api.get('/jobs').then(r => { setJobs(r.data); if (r.data.length) setSelected(r.data[0]._id); });
  }, []);

  useEffect(() => {
    if (!selected || !user) return;
    const job = jobs.find(j => j._id === selected);
    if (!job) return;

    const userSkills = (user.skills || []).map(s => s.toLowerCase());
    const jobSkills  = (job.requiredSkills || []).map(s => s.toLowerCase());
    const matched    = jobSkills.filter(s => userSkills.includes(s));
    const missing    = jobSkills.filter(s => !userSkills.includes(s));
    const skillScore = jobSkills.length ? (matched.length / jobSkills.length) * 70 : 70;
    const eduBonus   = job.requiredEducation && user.education?.length ? 15 : 0;
    const expBonus   = user.experience?.length >= 1 ? 15 : 0;
    const total      = Math.min(100, Math.round(skillScore + eduBonus + expBonus));

    setResult({ job, total, matched, missing, jobSkills });
  }, [selected, jobs, user]);

  const color = result ? (result.total >= 70 ? '#10b981' : result.total >= 40 ? '#3B82F6' : '#f59e0b') : '#3B82F6';

  return (
    <Layout>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>Skill Gap Analyzer</h1>

      <div style={{ background: '#fff', borderRadius: 14, padding: 20, border: '1px solid #e8edf5', marginBottom: 16 }}>
        <label style={{ fontSize: 12, fontWeight: 700, color: '#64748b', display: 'block', marginBottom: 6, textTransform: 'uppercase' }}>Select a Job to Analyze</label>
        <select value={selected} onChange={e => setSelected(e.target.value)}
          style={{ width: '100%', border: '1.5px solid #e2e8f0', borderRadius: 8, padding: '9px 12px', fontSize: 14, outline: 'none' }}>
          {jobs.map(j => <option key={j._id} value={j._id}>{j.title} — {j.location}</option>)}
        </select>
      </div>

      {result && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ background: '#fff', borderRadius: 14, padding: 24, border: '1px solid #e8edf5' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 16px' }}>Match Score</h2>
            <div style={{ fontSize: 56, fontWeight: 800, color, textAlign: 'center', marginBottom: 12 }}>{result.total}%</div>
            <div style={{ height: 10, background: '#f1f5f9', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{ width: `${result.total}%`, height: '100%', background: color, borderRadius: 99, transition: 'width 0.7s ease' }} />
            </div>
            <p style={{ color: '#64748b', fontSize: 13, marginTop: 12, textAlign: 'center' }}>
              {result.total >= 70 ? 'Great match! Apply now.' : result.total >= 40 ? 'Good match. Learn missing skills.' : 'Low match. Focus on required skills first.'}
            </p>
          </div>

          <div style={{ background: '#fff', borderRadius: 14, padding: 24, border: '1px solid #e8edf5' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 16px' }}>Skills Breakdown</h2>
            {result.jobSkills.map(s => {
              const has = (user?.skills || []).map(x => x.toLowerCase()).includes(s);
              return (
                <div key={s} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#334155', textTransform: 'capitalize' }}>{s}</span>
                  <span style={{
                    background: has ? '#f0fdf4' : '#fef2f2',
                    color: has ? '#16a34a' : '#ef4444',
                    border: `1px solid ${has ? '#86efac' : '#fecaca'}`,
                    borderRadius: 6, padding: '3px 10px', fontSize: 12, fontWeight: 700,
                  }}>{has ? '✓ You have it' : '✗ Missing'}</span>
                </div>
              );
            })}
          </div>

          {result.missing.length > 0 && (
            <div style={{ gridColumn: '1/-1', background: '#fff7ed', borderRadius: 14, padding: 24, border: '1px solid #fed7aa' }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#c2410c', margin: '0 0 14px' }}>Skills to Learn</h2>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {result.missing.map(s => (
                  <div key={s} style={{ background: '#fff', border: '1.5px solid #fed7aa', borderRadius: 10, padding: '12px 18px' }}>
                    <div style={{ fontWeight: 700, color: '#c2410c', fontSize: 14, textTransform: 'capitalize' }}>{s}</div>
                    <div style={{ fontSize: 12, color: '#92400e', marginTop: 4 }}>Search on YouTube / Udemy</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}