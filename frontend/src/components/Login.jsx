import React, { useState } from 'react';

const mockUsers = [
  { id: 'u001', name: 'User 1', role: 'user' },
  { id: 'u002', name: 'User 2', role: 'user' },
  { id: 'admin', name: 'Admin', role: 'admin' }
];

function Login({ onLogin }) {
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const found = mockUsers.find(u => u.id === userId.trim());
    if (found) {
      onLogin(found);
    } else {
      setError('ไม่พบผู้ใช้งานนี้');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
      <form onSubmit={handleLogin} style={{ background: 'linear-gradient(135deg, #ff9800 60%, #ffb300 100%)', padding: '2.5rem 2rem', borderRadius: 14, boxShadow: '0 2px 16px rgba(255,152,0,0.13)', minWidth: 320, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ color: '#fff', marginBottom: 24, textAlign: 'center', textShadow: '0 2px 8px rgba(255,152,0,0.18)' }}>เข้าสู่ระบบ IT Request</h2>
        <input
          type="text"
          placeholder="กรอก User ID หรือ Admin ID"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          style={{ width: '100%', maxWidth: 320, padding: '0.8rem 1rem', borderRadius: 8, border: '1px solid #ffe0b2', marginBottom: 18, fontSize: '1rem', background: '#fff8e1', display: 'block', boxSizing: 'border-box' }}
        />
        {error && <div style={{ color: '#d84315', marginBottom: 12, width: '100%', maxWidth: 320, textAlign: 'center' }}>{error}</div>}
        <button type="submit" style={{ width: '100%', maxWidth: 320, padding: '0.9rem 0', borderRadius: 8, background: '#fff', color: '#ff9800', border: 'none', fontWeight: 600, fontSize: '1.1rem', boxShadow: '0 2px 8px rgba(255,152,0,0.10)', display: 'block' }}>เข้าสู่ระบบ</button>
      </form>
    </div>
  );
}

export default Login;
