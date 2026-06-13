import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';

function calcResumeScore(user) {
  let score = 0; const suggestions = [];
  if (user?.resumeUrl) score += 20; else suggestions.push('Upload a PDF resume');
  if (user?.resumeHeadline?.length > 20) score += 10; else suggestions.push('Write a stronger resume headline');
  if (user?.skills?.length >= 5) score += 20; else suggestions.push('Add more technical skills (need 5+)');
  if (user?.projects?.length >= 2) score += 20; else suggestions.push('Add 2+ projects with tech stack');
  if (user?.certifications?.length) score += 10; else suggestions.push('Add certifications');
  if (user?.githubUrl) score += 10; else suggestions.push('Add your GitHub URL');
  if (user?.linkedinUrl) score += 10; else suggestions.push('Add your LinkedIn URL');
  return { score, suggestions };
}

export default function ResumeAnalyzer() {
  const { user } = useAuth();
  const { score, suggestions } = calcResumeScore(user);
  const color = score >= 70 ? '#10b981' : score >= 40 ? '#3B82F6' : '#ef4444';

  return (
    <Layout>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>Resume Analyzer</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>
        <div style={{ background: '#fff', borderRadius: 14, padding: 32, border: '1px solid #e8edf5', textAlign: 'center' }}>
          <div style={{ fontSize: 56, fontWeight: 800, color }}>{score}%</div>
          <div style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>Resume Score</div>
          <div style={{ height: 8, background: '#f1f5f9', borderRadius: 99, marginTop: 16, overflow: 'hidden' }}>
            <div style={{ width: `${score}%`, height: '100%', background: color, borderRadius: 99, transition: 'width 0.7s ease' }} />
          </div>
        </div>
        <div style={{ background: '#fff', borderRadius: 14, padding: 24, border: '1px solid #e8edf5' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 16px' }}>Improvement Suggestions</h2>
          {suggestions.length === 0
            ? <p style={{ color: '#10b981', fontWeight: 600 }}>✓ No issues found. Great resume!</p>
            : suggestions.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: '1px solid #f1f5f9', fontSize: 14, color: '#334155' }}>
                  <span style={{ color: '#ef4444', fontWeight: 700 }}>✗</span>
                  <span>{s}</span>
                </div>
              ))
          }
        </div>
      </div>
    </Layout>
  );
}