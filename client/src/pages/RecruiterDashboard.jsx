import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

export default function RecruiterDashboard() {
  const [analytics, setAnalytics] = useState({ totalJobs: 0, activeJobs: 0, totalApplications: 0 });
  const [jobs, setJobs]           = useState([]);
  const [showForm, setShowForm]   = useState(false);
  const [form, setForm]           = useState({ title: '', location: '', type: 'full-time', experienceLevel: 'fresher', description: '', requiredSkills: '', salaryMin: '', salaryMax: '' });

  useEffect(() => {
    api.get('/recruiter/analytics').then(r => setAnalytics(r.data));
    api.get('/recruiter/jobs').then(r => setJobs(r.data));
  }, []);

  async function postJob(e) {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        requiredSkills: form.requiredSkills.split(',').map(s => s.trim()),
        salaryMin: Number(form.salaryMin),
        salaryMax: Number(form.salaryMax),
      };
      const { data } = await api.post('/recruiter/jobs', payload);
      setJobs(j => [data, ...j]);
      setShowForm(false);
      setForm({ title: '', location: '', type: 'full-time', experienceLevel: 'fresher', description: '', requiredSkills: '', salaryMin: '', salaryMax: '' });
      api.get('/recruiter/analytics').then(r => setAnalytics(r.data));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to post job');
    }
  }

  async function deleteJob(id) {
    await api.delete(`/recruiter/jobs/${id}`);
    setJobs(j => j.filter(x => x._id !== id));
    api.get('/recruiter/analytics').then(r => setAnalytics(r.data));
  }

  const inp = { width: '100%', border: '1.5px solid #e2e8f0', borderRadius: 8, padding: '9px 12px', fontSize: 14, outline: 'none', boxSizing: 'border-box' };
  const lbl = { fontSize: 12, fontWeight: 700, color: '#64748b', display: 'block', marginBottom: 4, textTransform: 'uppercase' };

  return (
    <Layout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: 0 }}>Recruiter Dashboard</h1>
        <button onClick={() => setShowForm(!showForm)}
          style={{ background: '#3B82F6', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 20px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
          {showForm ? 'Cancel' : '+ Post a Job'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 20 }}>
        {[
          { label: 'Total Jobs',        value: analytics.totalJobs,        color: '#3B82F6' },
          { label: 'Active Jobs',       value: analytics.activeJobs,       color: '#10b981' },
          { label: 'Total Applicants',  value: analytics.totalApplications, color: '#6366f1' },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', borderRadius: 14, padding: 24, border: '1px solid #e8edf5', textAlign: 'center' }}>
            <div style={{ fontSize: 40, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 13, color: '#64748b', marginTop: 4, fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {showForm && (
        <div style={{ background: '#fff', borderRadius: 14, padding: 24, border: '1px solid #e8edf5', marginBottom: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 16px' }}>Post a New Job</h2>
          <form onSubmit={postJob}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[['Job Title','title'],['Location','location'],['Salary Min','salaryMin'],['Salary Max','salaryMax']].map(([l,k]) => (
                <div key={k}>
                  <label style={lbl}>{l}</label>
                  <input style={inp} value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} required />
                </div>
              ))}
              <div>
                <label style={lbl}>Type</label>
                <select style={inp} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                  {['full-time','part-time','internship','remote','hybrid'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={lbl}>Experience Level</label>
                <select style={inp} value={form.experienceLevel} onChange={e => setForm(f => ({ ...f, experienceLevel: e.target.value }))}>
                  {['fresher','junior','mid','senior'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={lbl}>Required Skills (comma separated)</label>
                <input style={inp} value={form.requiredSkills} onChange={e => setForm(f => ({ ...f, requiredSkills: e.target.value }))} placeholder="React, Node.js, MongoDB" required />
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={lbl}>Description</label>
                <textarea style={{ ...inp, height: 80, resize: 'vertical' }} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required />
              </div>
            </div>
            <button type="submit" style={{ marginTop: 16, background: '#3B82F6', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
              Post Job
            </button>
          </form>
        </div>
      )}

      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e8edf5', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: 0 }}>My Job Listings</h2>
        </div>
        {jobs.length === 0
          ? <p style={{ padding: 24, color: '#94a3b8', textAlign: 'center' }}>No jobs posted yet. Click Post a Job to start.</p>
          : jobs.map(job => (
              <div key={job._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid #f8fafc' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: 15 }}>{job.title}</div>
                  <div style={{ color: '#64748b', fontSize: 13 }}>{job.location} · {job.type} · {job.experienceLevel}</div>
                </div>
                <button onClick={() => deleteJob(job._id)}
                  style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', borderRadius: 8, padding: '7px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                  Delete
                </button>
              </div>
            ))
        }
      </div>
    </Layout>
  );
}