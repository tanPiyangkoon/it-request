import React, {useState} from 'react';
import RequestForm from './components/RequestForm';
import Sidebar from './components/Sidebar';

function App() {
  const [selectedMenu, setSelectedMenu] = useState('form');

  
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar onSelect={setSelectedMenu} />
     <div style={{ marginLeft: '200px', padding: '2rem', width: '100%' }}>
        {selectedMenu === 'form' && <RequestForm />}
        {selectedMenu === 'view' && <p>หน้านี้จะโชว์รายการคำขอ</p>}
        {selectedMenu === 'settings' && <p>ตั้งค่า (เช่น เปลี่ยนสถานะ ฯลฯ)</p>}
      </div>
      
    </div>
  );
}

export default App;
