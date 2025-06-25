import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Sidebar({ onSelect, role }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <div className={`bg-warning text-white position-fixed h-100 p-4 ${collapsed ? 'sidebar-collapsed' : ''}`} style={{ width: collapsed ? 0 : 220, left: collapsed ? -220 : 0, top: 0, transition: 'left 0.25s, width 0.25s', zIndex: 1000, overflow: 'hidden' }}>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h2 className="m-0 fs-5 fw-bold">เมนู</h2>
          <button
            onClick={() => setCollapsed(c => !c)}
            className="btn btn-link text-white p-0 ms-2 fs-4"
            aria-label={collapsed ? 'ขยายเมนู' : 'ย่อเมนู'}
            style={{ textDecoration: 'none' }}
          >
            {collapsed ? '☰' : '⮜'}
          </button>
        </div>
        <ul className="nav flex-column" style={{ display: collapsed ? 'none' : 'block' }}>
          {role === 'admin' ? (
            <>
              <li className="nav-item mb-2">
                <button className="nav-link text-white bg-transparent border-0 text-start" onClick={() => onSelect('dashboard')}>Dashboard</button>
              </li>
              <li className="nav-item mb-2">
                <button className="nav-link text-white bg-transparent border-0 text-start" onClick={() => onSelect('view')}>รายการคำขอ</button>
              </li>
              <li className="nav-item mb-2">
                <button className="nav-link text-white bg-transparent border-0 text-start" onClick={() => onSelect('settings')}>ตั้งค่า</button>
              </li>
            </>
          ) : (
            <li className="nav-item mb-2">
              <button className="nav-link text-white bg-transparent border-0 text-start" onClick={() => onSelect('form')}>แบบฟอร์มแจ้งปัญหา</button>
            </li>
          )}
        </ul>
      </div>
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="btn btn-warning position-fixed"
          style={{ top: 24, left: 12, zIndex: 1001, borderRadius: 6, fontSize: 22, padding: '6px 12px', boxShadow: '0 2px 8px rgba(255,152,0,0.13)' }}
          aria-label="ขยายเมนู"
        >
          ☰
        </button>
      )}
    </>
  );
}

export default Sidebar;
