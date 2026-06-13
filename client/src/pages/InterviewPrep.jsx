import { useState } from 'react';
import Layout from '../components/Layout';

const DATA = [
  { cat: 'HR', q: 'Tell me about yourself.', a: 'Start with your name, education, and a short summary of your skills and projects. Keep it under 90 seconds.' },
  { cat: 'HR', q: 'Why do you want this job?', a: 'Research the company. Mention their product or culture. Connect it to your own goals.' },
  { cat: 'Technical', q: 'Difference between == and ===?', a: '== checks value with type coercion. === checks both value and type. Always prefer ===.' },
  { cat: 'Technical', q: 'What is a REST API?', a: 'REST uses HTTP methods (GET, POST, PUT, DELETE) on resources identified by URLs. Responses are JSON.' },
  { cat: 'Technical', q: 'What is a closure?', a: 'A function that retains access to its outer scope even after the outer function has returned.' },
  { cat: 'Resume', tip: 'Use strong action verbs: Built, Designed, Implemented, Optimised, Led.' },
  { cat: 'Resume', tip: "Quantify achievements: 'Reduced load time by 40%' beats 'Improved performance'." },
  { cat: 'Communication', tip: 'Use the STAR method (Situation, Task, Action, Result) for behavioural questions.' },
  { cat: 'Communication', tip: 'Pause before answering complex questions. It shows you think carefully.' },
];

export default function InterviewPrep() {
  const [tab, setTab] = useState('HR');
  const tabs = ['HR', 'Technical', 'Resume', 'Communication'];

  return (
    <Layout>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>Interview Preparation</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            border: tab === t ? 'none' : '1.5px solid #3B82F6', borderRadius: 8, padding: '8px 18px',
            background: tab === t ? '#3B82F6' : 'transparent', color: tab === t ? '#fff' : '#3B82F6',
            fontWeight: 600, fontSize: 13, cursor: 'pointer',
          }}>{t}</button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {DATA.filter(d => d.cat === tab).map((item, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, padding: 20, border: '1px solid #e8edf5' }}>
            {item.q
              ? <>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: 15, marginBottom: 10 }}>Q: {item.q}</div>
                  <div style={{ background: '#f8fafc', borderRadius: 8, padding: '12px 14px', borderLeft: '3px solid #3B82F6', fontSize: 14, color: '#334155', lineHeight: 1.7 }}>A: {item.a}</div>
                </>
              : <div style={{ fontSize: 14, color: '#334155', lineHeight: 1.7 }}>💡 {item.tip}</div>
            }
          </div>
        ))}
      </div>
    </Layout>
  );
}