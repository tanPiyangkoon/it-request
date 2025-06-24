import React, { useState } from 'react';
import './RequestForm.css';
import itWorkerImg from '../assets/it-work.png';

function RequestForm() {
  const [formData, setFormData] = useState({
    full_name: '',
    employee_id: '',
    department: '',
    email: '',
    description: ''
  });
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    try {
      const res = await fetch('http://localhost:3001/api/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSuccessMsg('ส่งคำขอเรียบร้อยแล้ว');
        setFormData({
          full_name: '',
          employee_id: '',
          department: '',
          email: '',
          description: ''
        });
      } else {
        setErrorMsg('เกิดข้อผิดพลาดในการส่งข้อมูล');
      }
    } catch (err) {
      setErrorMsg('เชื่อมต่อ backend ไม่ได้');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-image">
        <img src={itWorkerImg} alt="IT worker" style={{maxWidth: '100%', maxHeight: '260px', objectFit: 'contain'}} />
      </div>
      <div className="form-fields">
        <h2>IT Request Form</h2>
        {successMsg && <div className="success-msg">{successMsg}</div>}
        {errorMsg && <div className="error-msg">{errorMsg}</div>}
        <input
          placeholder="ชื่อ-นามสกุล"
          value={formData.full_name}
          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
          required
        />
        <input
          placeholder="เลขบัตรพนักงาน"
          value={formData.employee_id}
          onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })}
          required
        />
        <input
          placeholder="แผนก"
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <textarea
          placeholder="รายละเอียด"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        ></textarea>
        <button type="submit">ส่งคำขอ</button>
      </div>
    </form>
  );
}

export default RequestForm;
