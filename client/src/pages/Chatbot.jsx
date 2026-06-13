import { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';

const RULES = [
  { p: ['improve profile', 'profile strength'], r: 'Fill in all sections: skills, education, projects, certifications, GitHub URL, and resume headline. A complete profile boosts your chances by 3×.' },
  { p: ['match score', 'job match'],            r: 'Your match score is based on skills, education, and experience. Add skills listed in job descriptions to improve it.' },
  { p: ['upload resume', 'resume upload'],       r: 'Go to Profile page and fill in your details. Resume upload connects to Cloudinary via the backend.' },
  { p: ['apply', 'how to apply'],                r: 'Go to Browse Jobs, find a listing, and click Apply Now. Track your applications in the Applications page.' },
  { p: ['skills', 'what to learn'],              r: 'Top skills for freshers: HTML/CSS/JS, React, Node.js, Python, SQL, Git, and communication skills.' },
  { p: ['career readiness', 'employability'],    r: 'Complete all profile sections, add 2+ projects, upload your resume, and add certifications to boost your Career Readiness Score.' },
  { p: ['interview', 'prepare'],                 r: 'Check the Interview Prep page for HR questions, technical Q&A, and the STAR method for behavioural questions.' },
];

function getReply(input) {
  const l = input.toLowerCase();
  for (const { p, r } of RULES) if (p.some(x => l.includes(x))) return r;
  return "I can help with profile tips, job matching, and career advice. Try: 'How do I improve my profile?' or 'What skills should I learn?'";
}

export default function Chatbot() {
  const [msgs, setMsgs] = useState([{ role: 'bot', text: 'Hi! I am your HirePath Career Assistant. Ask me anything about jobs, profiles, or career advice.' }]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);

  function send() {
    if (!input.trim()) return;
    setMsgs(m => [...m, { role: 'user', text: input }, { role: 'bot', text: getReply(input) }]);
    setInput('');
  }

  const SUGGESTIONS = ['How do I improve my profile?', 'What skills should I learn?', 'How do I apply for jobs?', 'How to prepare for interviews?'];

  return (
    <Layout>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>Career Chatbot</h1>
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e8edf5', overflow: 'hidden' }}>
        <div style={{ background: '#0f172a', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>HirePath Assistant</span>
        </div>
        <div style={{ height: 360, overflowY: 'auto', padding: '16px 20px', background: '#f8fafc' }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: 12 }}>
              <div style={{
                maxWidth: '75%', padding: '10px 14px', fontSize: 14, lineHeight: 1.6,
                background: m.role === 'user' ? '#3B82F6' : '#fff',
                color: m.role === 'user' ? '#fff' : '#334155',
                borderRadius: m.role === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
                border: m.role === 'bot' ? '1px solid #e2e8f0' : 'none',
              }}>{m.text}</div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <div style={{ padding: '8px 16px', background: '#f1f5f9', borderTop: '1px solid #e2e8f0', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {SUGGESTIONS.map(s => (
            <button key={s} onClick={() => setInput(s)} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: '5px 12px', fontSize: 12, color: '#3B82F6', cursor: 'pointer', fontWeight: 600 }}>{s}</button>
          ))}
        </div>
        <div style={{ padding: '12px 16px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: 10 }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Ask anything about your career…"
            style={{ flex: 1, border: '1.5px solid #e2e8f0', borderRadius: 8, padding: '9px 14px', fontSize: 14, outline: 'none' }} />
          <button onClick={send} style={{ background: '#3B82F6', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 20px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Send</button>
        </div>
      </div>
    </Layout>
  );
}