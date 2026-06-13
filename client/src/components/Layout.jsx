import Sidebar from './Sidebar';
import { useTheme } from '../context/ThemeContext';

export default function Layout({ children }) {
  const { dark } = useTheme();

  return (
    <div style={{
      display: 'flex', minHeight: '100vh',
      background: dark ? '#0f172a' : '#f1f5f9',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <Sidebar />
      <main style={{
        flex: 1, padding: '28px 32px', overflowY: 'auto',
        background: dark ? '#0f172a' : '#f1f5f9',
        color: dark ? '#e2e8f0' : '#0f172a',
      }}>
        {children}
      </main>
    </div>
  );
}