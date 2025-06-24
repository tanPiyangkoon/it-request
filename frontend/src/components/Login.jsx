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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f6fb' }}>
      <form onSubmit={handleLogin} style={{ background: '#fff', padding: '2.5rem 2rem', borderRadius: 14, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', minWidth: 320 }}>
        <h2 style={{ color: '#1976d2', marginBottom: 24, textAlign: 'center' }}>เข้าสู่ระบบ IT Request</h2>
        <input
          type="text"
          placeholder="กรอก User ID หรือ Admin ID"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: 8, border: '1px solid #e0e0e0', marginBottom: 18, fontSize: '1rem' }}
        />
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        <button type="submit" style={{ width: '100%', padding: '0.9rem 0', borderRadius: 8, background: '#1976d2', color: '#fff', border: 'none', fontWeight: 500, fontSize: '1.1rem' }}>เข้าสู่ระบบ</button>
      </form>
    </div>
  );
}

export default Login;
