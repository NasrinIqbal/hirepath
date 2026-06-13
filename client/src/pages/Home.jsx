import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', background: '#fff' }}>

      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 60px', borderBottom: '1px solid #f1f5f9', position: 'sticky', top: 0, background: '#fff', zIndex: 100 }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#0f172a' }}>
          Hire<span style={{ color: '#3B82F6' }}>Path</span>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => navigate('/login')}
            style={{ background: 'transparent', border: '1.5px solid #e2e8f0', borderRadius: 8, padding: '8px 20px', fontWeight: 600, fontSize: 14, cursor: 'pointer', color: '#334155' }}>
            Login
          </button>
          <button onClick={() => navigate('/register')}
            style={{ background: '#3B82F6', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 600, fontSize: 14, cursor: 'pointer', color: '#fff' }}>
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '90px 60px 70px', background: 'linear-gradient(135deg, #f8faff 0%, #eff6ff 100%)' }}>
        <div style={{ display: 'inline-block', background: '#eff6ff', color: '#3B82F6', border: '1px solid #bfdbfe', borderRadius: 99, padding: '6px 18px', fontSize: 13, fontWeight: 700, marginBottom: 24 }}>
          Built for Freshers & Students
        </div>
        <h1 style={{ fontSize: 52, fontWeight: 900, color: '#0f172a', lineHeight: 1.15, margin: '0 0 20px', maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
          Your Smart Career
          <span style={{ color: '#3B82F6' }}> Development </span>
          Platform
        </h1>
        <p style={{ fontSize: 18, color: '#64748b', maxWidth: 560, margin: '0 auto 36px', lineHeight: 1.7 }}>
          Don't just find jobs — build a career. HirePath helps you improve your profile, analyze skill gaps, and land your dream role.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button onClick={() => navigate('/register')}
            style={{ background: '#3B82F6', color: '#fff', border: 'none', borderRadius: 10, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            Start For Free
          </button>
          <button onClick={() => navigate('/login')}
            style={{ background: '#fff', color: '#334155', border: '1.5px solid #e2e8f0', borderRadius: 10, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            Login
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 48, marginTop: 56 }}>
          {[['500+', 'Jobs Posted'], ['2000+', 'Students Helped'], ['85%', 'Placement Rate']].map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#3B82F6' }}>{v}</div>
              <div style={{ fontSize: 14, color: '#64748b', marginTop: 4, fontWeight: 600 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 60px', background: '#fff' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: '#0f172a', margin: '0 0 12px' }}>Everything you need to get hired</h2>
          <p style={{ color: '#64748b', fontSize: 16 }}>One platform for your entire career journey</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 1000, margin: '0 auto' }}>
          {[
            { title: 'Career Readiness Score',  desc: 'Get a personalized score showing exactly how ready you are for the job market.',       color: '#3B82F6', bg: '#eff6ff' },
            { title: 'Skill Gap Analyzer',       desc: 'See exactly which skills you are missing for any job and get a roadmap to learn them.', color: '#6366f1', bg: '#eef2ff' },
            { title: 'Resume Analyzer',          desc: 'Upload your resume and get instant suggestions to make it stand out to recruiters.',    color: '#10b981', bg: '#f0fdf4' },
            { title: 'Job Match Score',          desc: 'Every job shows your match percentage so you know where to apply first.',               color: '#f59e0b', bg: '#fffbeb' },
            { title: 'Interview Preparation',    desc: 'Practice HR and technical questions with expert tips and the STAR method.',             color: '#ef4444', bg: '#fef2f2' },
            { title: 'Career Chatbot',           desc: 'Get instant answers to career questions anytime with our smart rule-based assistant.',  color: '#8b5cf6', bg: '#f5f3ff' },
          ].map(f => (
            <div key={f.title} style={{ background: f.bg, borderRadius: 16, padding: 28, border: `1px solid ${f.color}22` }}>
              <div style={{ width: 44, height: 44, background: f.color, borderRadius: 10, marginBottom: 16 }} />
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', margin: '0 0 8px' }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '80px 60px', background: '#f8fafc' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: '#0f172a', margin: '0 0 12px' }}>How HirePath works</h2>
          <p style={{ color: '#64748b', fontSize: 16 }}>Get hired in 4 simple steps</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 0, maxWidth: 900, margin: '0 auto', position: 'relative' }}>
          {[
            { step: '01', title: 'Create Profile',    desc: 'Sign up and fill in your skills, education, and projects.' },
            { step: '02', title: 'Get Your Score',    desc: 'See your Career Readiness and Resume Score instantly.' },
            { step: '03', title: 'Analyze Skill Gaps', desc: 'Find out exactly what skills you need to learn.' },
            { step: '04', title: 'Apply & Get Hired', desc: 'Apply to matched jobs and track your applications.' },
          ].map((s, i) => (
            <div key={s.step} style={{ flex: 1, textAlign: 'center', padding: '0 20px' }}>
              <div style={{ width: 56, height: 56, background: '#3B82F6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#fff', fontSize: 16, fontWeight: 800 }}>
                {s.step}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 8px' }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '80px 60px', background: '#fff' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: '#0f172a', margin: '0 0 12px' }}>What students say</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, maxWidth: 1000, margin: '0 auto' }}>
          {[
            { name: 'Priya S.',    role: 'Got hired at TechWave',   text: 'HirePath showed me exactly which skills I was missing. I learned them in 3 weeks and got my first job offer!' },
            { name: 'Rahul M.',   role: 'React Intern at StartupNest', text: 'The Skill Gap Analyzer is amazing. It told me to learn Git and Node.js — I did, and my match score went from 40% to 85%.' },
            { name: 'Sneha K.',   role: 'Full Stack at CloudBase',  text: 'The Interview Prep section helped me crack my first technical interview. The STAR method tips were super helpful.' },
          ].map(t => (
            <div key={t.name} style={{ background: '#f8fafc', borderRadius: 16, padding: 28, border: '1px solid #e8edf5' }}>
              <p style={{ fontSize: 14, color: '#334155', lineHeight: 1.7, margin: '0 0 20px', fontStyle: 'italic' }}>"{t.text}"</p>
              <div style={{ fontWeight: 700, color: '#0f172a', fontSize: 14 }}>{t.name}</div>
              <div style={{ fontSize: 12, color: '#3B82F6', fontWeight: 600, marginTop: 2 }}>{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '80px 60px', background: '#f8fafc' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: '#0f172a', margin: '0 0 12px' }}>Frequently Asked Questions</h2>
        </div>
        <div style={{ maxWidth: 700, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { q: 'Is HirePath free to use?',               a: 'Yes! HirePath is completely free for job seekers and students.' },
            { q: 'How is the Career Readiness Score calculated?', a: 'It is based on your skills count, projects, certifications, resume, education, and GitHub profile.' },
            { q: 'Can recruiters post jobs?',              a: 'Yes. Register as a Recruiter to post jobs, manage listings, and view applicants.' },
            { q: 'Is my resume data safe?',                a: 'Yes. Resumes are stored securely on Cloudinary and only shared with recruiters when you apply.' },
            { q: 'What skills does HirePath recommend for freshers?', a: 'HTML, CSS, JavaScript, React, Node.js, Python, SQL, and Git are the most in-demand skills for freshers.' },
          ].map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 60px', background: 'linear-gradient(135deg, #1e40af, #3B82F6)', textAlign: 'center' }}>
        <h2 style={{ fontSize: 40, fontWeight: 900, color: '#fff', margin: '0 0 16px' }}>Ready to build your career?</h2>
        <p style={{ color: '#bfdbfe', fontSize: 16, marginBottom: 32 }}>Join thousands of students already using HirePath.</p>
        <button onClick={() => navigate('/register')}
          style={{ background: '#fff', color: '#3B82F6', border: 'none', borderRadius: 10, padding: '14px 36px', fontSize: 16, fontWeight: 800, cursor: 'pointer' }}>
          Get Started For Free
        </button>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0f172a', padding: '40px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>
          Hire<span style={{ color: '#3B82F6' }}>Path</span>
        </div>
        <div style={{ color: '#64748b', fontSize: 13 }}>© 2025 HirePath. Built with MERN Stack.</div>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Privacy', 'Terms', 'Contact'].map(l => (
            <span key={l} style={{ color: '#64748b', fontSize: 13, cursor: 'pointer' }}>{l}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e8edf5', overflow: 'hidden' }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        <span style={{ fontWeight: 700, color: '#0f172a', fontSize: 15 }}>{q}</span>
        <span style={{ color: '#3B82F6', fontSize: 20, fontWeight: 700 }}>{open ? '−' : '+'}</span>
      </button>
      {open && <div style={{ padding: '0 20px 16px', fontSize: 14, color: '#64748b', lineHeight: 1.7 }}>{a}</div>}
    </div>
  );
}