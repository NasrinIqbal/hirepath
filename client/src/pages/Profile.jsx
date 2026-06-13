import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import api from '../services/api';

export default function Profile() {
  const { user, setUser } = useAuth();
  const [form, setForm]   = useState({ ...user });
  const [skill, setSkill] = useState('');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  async function handleSave() {
    try {
      const { data } = await api.put('/users/me', form);
      setUser(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError('Failed to save. Try again.');
    }
  }

  function addSkill(e) {
    if ((e.key === 'Enter' || e.key === ',') && skill.trim()) {
      e.preventDefault();
      const s = skill.trim().replace(/,$/, '');
      if (!form.skills?.includes(s)) setForm(f => ({ ...f, skills: [...(f.skills || []), s] }));
      setSkill('');
    }
  }

  const inp = { width: '100%', border: '1.5px solid #e2e8f0', borderRadius: 8, padding: '9px 12px', fontSize: 14, outline: 'none', boxSizing: 'border-box' };
  const lbl = { fontSize: 12, fontWeight: 700, color: '#64748b', display: 'block', marginBottom: 4, textTransform: 'uppercase' };

  return (
    <Layout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: 0 }}>My Profile</h1>
        <button onClick={handleSave} style={{ background: '#3B82F6', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 20px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
          {saved ? '✓ Saved!' : 'Save Changes'}
        </button>
      </div>

      {error && <div style={{ background: '#fef2f2', color: '#ef4444', padding: '10px 14px', borderRadius: 8, marginBottom: 16, fontSize: 14 }}>{error}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ background: '#fff', borderRadius: 14, padding: 24, border: '1px solid #e8edf5' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 16px' }}>Personal Info</h2>
          {[
            ['Full Name',       'fullName'],
            ['Phone',           'phone'],
            ['Location',        'location'],
            ['Resume Headline', 'resumeHeadline'],
            ['LinkedIn URL',    'linkedinUrl'],
            ['GitHub URL',      'githubUrl'],
          ].map(([l, k]) => (
            <div key={k} style={{ marginBottom: 14 }}>
              <label style={lbl}>{l}</label>
              <input style={inp} value={form[k] || ''} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} />
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', borderRadius: 14, padding: 24, border: '1px solid #e8edf5' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 12px' }}>Skills</h2>
            <input value={skill} onChange={e => setSkill(e.target.value)} onKeyDown={addSkill}
              placeholder="Type skill and press Enter"
              style={{ ...inp, marginBottom: 10 }} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {(form.skills || []).map(s => (
                <span key={s} onClick={() => setForm(f => ({ ...f, skills: f.skills.filter(x => x !== s) }))}
                  style={{ background: '#eff6ff', color: '#3B82F6', border: '1px solid #bfdbfe', borderRadius: 6, padding: '4px 10px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                  {s} ×
                </span>
              ))}
            </div>
          </div>

          <div style={{ background: '#fff', borderRadius: 14, padding: 24, border: '1px solid #e8edf5' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 12px' }}>Education</h2>
            {(form.education || []).map((e, i) => (
              <div key={i} style={{ background: '#f8fafc', borderRadius: 8, padding: '10px 12px', marginBottom: 8, fontSize: 13, color: '#334155' }}>
                <div style={{ fontWeight: 700 }}>{e.degree} — {e.field}</div>
                <div style={{ color: '#64748b' }}>{e.institution} · {e.startYear}–{e.endYear}</div>
              </div>
            ))}
            {(!form.education || form.education.length === 0) && (
              <p style={{ color: '#94a3b8', fontSize: 13 }}>No education added yet. Edit directly in database or add via API.</p>
            )}
          </div>
        </div>
      </div>

     <div style={{ background: '#fff', borderRadius: 14, padding: 24, border: '1px solid #e8edf5' }}>
  <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 12px' }}>Resume Upload</h2>
  {form.resumeUrl ? (
    <div>
      <p style={{ color: '#10b981', fontWeight: 600, fontSize: 14, marginBottom: 10 }}>✓ Resume uploaded</p>
      <a href={form.resumeUrl} target="_blank" rel="noreferrer"
        style={{ color: '#3B82F6', fontSize: 13, fontWeight: 600, marginRight: 12 }}>View Resume</a>
    </div>
  ) : (
    <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 10 }}>No resume uploaded yet.</p>
  )}
  <input type="file" accept=".pdf" onChange={async e => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('resume', file);
    try {
      const { data } = await api.post('/users/resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setForm(f => ({ ...f, resumeUrl: data.resumeUrl }));
      alert('Resume uploaded successfully!');
    } catch (err) {
      alert('Upload failed. Try again.');
    }
  }} style={{ marginTop: 8 }} />
</div> 
    </Layout>
  );
}