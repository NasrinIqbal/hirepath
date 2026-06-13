import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const NAV = [
  { path: '/dashboard',    label: 'Dashboard'           },
  { path: '/profile',      label: 'Profile'             },
  { path: '/jobs',         label: 'Browse Jobs'         },
  { path: '/internships',  label: 'Internships'         },
  { path: '/skillgap',     label: 'Skill Gap'           },
  { path: '/applications', label: 'Applications'        },
  { path: '/saved',        label: 'Saved Jobs'          },
  { path: '/resume',       label: 'Resume Analyzer'     },
  { path: '/interview',    label: 'Interview Prep'      },
  { path: '/chatbot',      label: 'Career Chatbot'      },
  { path: '/recruiter',    label: 'Recruiter Dashboard' },
];

export default function Sidebar() {
  const navigate           = useNavigate();
  const location           = useLocation();
  const { user, logout }   = useAuth();
  const { dark, setDark }  = useTheme();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div style={{ width: 220, background: '#0f172a', minHeight: '100vh', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
      <div style={{ padding: '24px 20px', borderBottom: '1px solid #1e293b' }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>
          Hire<span style={{ color: '#3B82F6' }}>Path</span>
        </div>
        <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{user?.fullName}</div>
        <div style={{ fontSize: 11, color: '#475569', marginTop: 2, background: '#1e293b', display: 'inline-block', padding: '2px 8px', borderRadius: 4, marginTop: 6 }}>
          {user?.role}
        </div>
      </div>

      <div style={{ padding: '16px 12px', flex: 1, overflowY: 'auto' }}>
        {NAV.filter(n => {
          if (n.path === '/recruiter') return user?.role === 'recruiter';
          return true;
        }).map(n => (
          <button key={n.path} onClick={() => navigate(n.path)} style={{
            display: 'block', width: '100%', border: 'none', borderRadius: 8,
            padding: '10px 14px', cursor: 'pointer', fontWeight: 600,
            fontSize: 13, textAlign: 'left', marginBottom: 2,
            background: location.pathname === n.path ? '#3B82F6' : 'transparent',
            color: location.pathname === n.path ? '#fff' : '#94a3b8',
            transition: 'all 0.12s',
          }}>
            {n.label}
          </button>
        ))}
      </div>

      <div style={{ padding: '12px 12px', borderTop: '1px solid #1e293b' }}>
        <button onClick={() => setDark(!dark)} style={{
          width: '100%', border: '1px solid #334155', borderRadius: 8,
          padding: '9px 14px', background: 'transparent',
          color: '#94a3b8', cursor: 'pointer', fontWeight: 600,
          fontSize: 13, marginBottom: 8,
        }}>
          {dark ? '☀ Light Mode' : '◑ Dark Mode'}
        </button>
        <button onClick={handleLogout} style={{
          width: '100%', border: '1px solid #334155', borderRadius: 8,
          padding: '9px 14px', background: 'transparent',
          color: '#94a3b8', cursor: 'pointer', fontWeight: 600, fontSize: 13,
        }}>
          Logout
        </button>
      </div>
    </div>
  );
}