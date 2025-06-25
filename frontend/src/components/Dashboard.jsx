import React from 'react';
import './Dashboard.css';

function Dashboard({ stats = {}, recentRequests = [] }) {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>
      <div className="dashboard-stats">
        <div className="dashboard-card">
          <div className="dashboard-card-label">คำขอทั้งหมด</div>
          <div className="dashboard-card-value">{stats.total || 0}</div>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-label">รอดำเนินการ</div>
          <div className="dashboard-card-value dashboard-pending">{stats.pending || 0}</div>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-label">สำเร็จ</div>
          <div className="dashboard-card-value dashboard-success">{stats.success || 0}</div>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-label">ยกเลิก/ปฏิเสธ</div>
          <div className="dashboard-card-value dashboard-cancel">{stats.cancel || 0}</div>
        </div>
      </div>
      <div className="dashboard-section">
        <h3>รายการคำขอล่าสุด</h3>
        <div className="dashboard-table-wrapper">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>#</th>
                <th>ชื่อ</th>
                <th>เลขบัตรพนักงาน</th>
                <th>แผนก</th>
                <th>รายละเอียด</th>
                <th>สถานะ</th>
                <th>วันที่</th>
              </tr>
            </thead>
            <tbody>
              {recentRequests.length === 0 ? (
                <tr><td colSpan="7" style={{ textAlign: 'center', color: '#888' }}>ไม่มีข้อมูล</td></tr>
              ) : recentRequests.map((req, idx) => (
                <tr key={req.id || idx}>
                  <td>{idx + 1}</td>
                  <td>{req.full_name}</td>
                  <td>{req.employee_id}</td>
                  <td>{req.department}</td>
                  <td>{req.description}</td>
                  <td>
                    <span className={`status-badge status-${(req.status || 'pending').toLowerCase()}`}>
                      {req.status || 'รอดำเนินการ'}
                    </span>
                  </td>
                  <td>{req.created_at ? new Date(req.created_at).toLocaleString('th-TH') : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
