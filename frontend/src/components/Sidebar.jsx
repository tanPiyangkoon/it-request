import React, { useState } from 'react';
import './Sidebar.css';

function Sidebar({ onSelect, role }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <div className={`sidebar${collapsed ? ' collapsed' : ''}`} style={{ left: collapsed ? '-220px' : '0', transition: 'left 0.25s' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ margin: 0 }}>เมนู</h2>
          <button
            onClick={() => setCollapsed(c => !c)}
            style={{ background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer', marginLeft: 8 }}
            aria-label={collapsed ? 'ขยายเมนู' : 'ย่อเมนู'}
          >
            {collapsed ? '☰' : '⮜'}
          </button>
        </div>
        <ul style={{ display: collapsed ? 'none' : 'block', marginTop: 20 }}>
          {role === 'admin' ? (
            <>
              <li onClick={() => onSelect('dashboard')}>Dashboard</li>
              <li onClick={() => onSelect('view')}>รายการคำขอ</li>
              <li onClick={() => onSelect('settings')}>ตั้งค่า</li>
            </>
          ) : (
            <>
              <li onClick={() => onSelect('form')}>แบบฟอร์มแจ้งปัญหา</li>
            </>
          )}
        </ul>
      </div>
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          style={{
            position: 'fixed',
            top: 24,
            left: 12,
            zIndex: 1001,
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            fontSize: 22,
            padding: '6px 12px',
            boxShadow: '0 2px 8px rgba(25, 118, 210, 0.13)',
            cursor: 'pointer'
          }}
          aria-label="ขยายเมนู"
        >
          ☰
        </button>
      )}
    </>
  );
}

export default Sidebar;
