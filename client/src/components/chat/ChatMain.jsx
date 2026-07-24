import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ChatMain.css';
import ChatRoom from './ChatRoom.jsx';
import ChatSidebarProfile from './ChatSidebarProfile.jsx';

export default function ChatMain() {
  const { id } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const listeners = useMemo(() => ({}), []);
  const socket = useMemo(() => ({
    on(event, fn) { (listeners[event] ||= []).push(fn); },
    off(event, fn) { listeners[event] = (listeners[event] || []).filter((item) => item !== fn); },
    emit(event, data) {
      if (event === 'send_message') {
        const message = { id: Date.now(), chatRoomId: data.roomId, senderId: 1, senderType: 'OWNER', messageType: data.type, content: data.content, createdAt: new Date().toISOString(), isRead: 1 };
        (listeners.receive_message || []).forEach((fn) => fn(message));
      }
    },
  }), [listeners]);

  const profileData = { cleanerId: 2, cleanerName: '김민수', career: '5년', region: '서울 전체', estimateId: 1 };
  const reviews = [{ id: 1, star: 5, content: '친절하고 꼼꼼했습니다.' }];

  return (
    <div className="chatmain-container">
      <div className="chatmain-center">
        <ChatRoom roomId={id || '1'} socket={socket} onOpenSidebar={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
      </div>
      <div className={`chatmain-right ${isSidebarOpen ? 'open' : ''}`}>
        <ChatSidebarProfile onClose={() => setIsSidebarOpen(false)} data={profileData} reviews={reviews} sideType="OWNER" />
      </div>
      {isSidebarOpen && <div className="chatmain-overlay" onClick={() => setIsSidebarOpen(false)} />}
    </div>
  );
}
