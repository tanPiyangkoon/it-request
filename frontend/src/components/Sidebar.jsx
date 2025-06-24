import React from 'react';
import './Sidebar.css';

function Sidebar({ onSelect }) {
  return (
    <div className="sidebar">
      <h2>เมนู</h2>
      <ul>
        <li onClick={() => onSelect('form')}>แบบฟอร์มแจ้งปัญหา</li>
        <li onClick={() => onSelect('view')}>รายการคำขอ</li>
        <li onClick={() => onSelect('settings')}>ตั้งค่า</li>
      </ul>
    </div>
  );
}

export default Sidebar;
