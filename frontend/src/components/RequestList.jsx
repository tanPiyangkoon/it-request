import React, { useEffect, useState } from 'react';
import './RequestList.css';

function RequestList({ role, userId }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests(query = '') {
    setLoading(true);
    setError('');
    try {
      let url = 'http://localhost:3001/api/requests';
      if (role === 'user') {
        url += `?userId=${encodeURIComponent(userId)}`;
      }
      if (query) {
        url += (url.includes('?') ? '&' : '?') + `search=${encodeURIComponent(query)}`;
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error('ไม่สามารถดึงข้อมูลได้');
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      setError(err.message || 'เกิดข้อผิดพลาด');
    }
    setLoading(false);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRequests(search);
  };

  return (
    <div className="request-list-container">
      <h2 className="request-list-title">รายการคำขอ IT</h2>
      <form onSubmit={handleSearch} className="request-list-search-form">
        <input
          type="text"
          placeholder="ค้นหาด้วยชื่อ/แผนก/สถานะ..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="request-list-search-input"
        />
        <button type="submit" className="request-list-search-btn">ค้นหา</button>
      </form>
      {loading ? (
        <p className="request-list-loading">กำลังโหลด...</p>
      ) : error ? (
        <p className="request-list-error">{error}</p>
      ) : requests.length === 0 ? (
        <p className="request-list-empty">ไม่พบรายการคำขอ</p>
      ) : (
        <div className="request-list-table-wrapper">
          <table className="request-list-table">
            <thead>
              <tr>
                <th>#</th>
                <th>ชื่อ</th>
                <th>แผนก</th>
                <th>ตำแหน่ง</th>
                <th>อีเมล</th>
                <th>เบอร์โทร</th>
                <th>รายละเอียด</th>
                <th>สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, idx) => (
                <tr key={req.id || idx}>
                  <td>{idx + 1}</td>
                  <td>{req.full_name}</td>
                  <td>{req.department}</td>
                  <td>{req.position}</td>
                  <td>{req.email}</td>
                  <td>{req.phone}</td>
                  <td>{req.description}</td>
                  <td>
                    <span className={`status-badge status-${(req.status || 'pending').toLowerCase()}`}>
                      {req.status || 'รอดำเนินการ'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RequestList;
