import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import './ChatList.css';

const initialRooms = [
  { id: 1, opponentName: '김민수 기사님', lastMessage: '내일 오후 2시에 방문드리겠습니다.', lastMessageAt: '2026-07-24T16:20:00', unreadCount: 1, profile: '/icons/default-profile.png' },
  { id: 2, opponentName: '이서준 기사님', lastMessage: '견적서를 확인해 주세요.', lastMessageAt: '2026-07-23T11:10:00', unreadCount: 0, profile: '/icons/default-profile.png' },
];

export default function ChatList() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [chatRooms, setChatRooms] = useState(initialRooms);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState(new Set());

  const filteredRooms = useMemo(() => chatRooms.filter((room) =>
    room.opponentName.toLowerCase().includes(searchTerm.toLowerCase())
  ), [chatRooms, searchTerm]);

  const handleRoomClick = (roomId) => {
    if (!isEditMode) return navigate(`/chatroom/${roomId}`);
    const next = new Set(selectedRooms);
    next.has(roomId) ? next.delete(roomId) : next.add(roomId);
    setSelectedRooms(next);
  };

  const handleLeaveRooms = () => {
    if (!selectedRooms.size) return;
    if (!window.confirm(`${selectedRooms.size}개의 채팅방에서 나가시겠습니까?`)) return;
    setChatRooms((rooms) => rooms.filter((room) => !selectedRooms.has(room.id)));
    setSelectedRooms(new Set());
    setIsEditMode(false);
  };

  return (
    <div className="chatlist-container">
      <div className="chatlist-header-flex">
        <h2 className="chatlist-title">채팅</h2>
        <button className={`chatlist-edit-toggle ${isEditMode ? 'active' : ''}`} onClick={() => { setIsEditMode(!isEditMode); setSelectedRooms(new Set()); }}>
          {isEditMode ? '취소' : '편집'}
        </button>
      </div>
      <div className="chatlist-search-box">
        <input type="text" placeholder="이름을 검색해 주세요." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <span className="chatlist-search-icon">🔍</span>
      </div>
      <div className="chatlist-tabs">
        <button className={activeTab === 'all' ? 'chatlist-active' : ''} onClick={() => setActiveTab('all')}>전체</button>
      </div>
      <div className={`chatlist-items-wrapper ${isEditMode ? 'is-editing' : ''}`}>
        {!filteredRooms.length ? <p className="chatlist-no-data">진행 중인 채팅이 없습니다.</p> : filteredRooms.map((room) => (
          <div
            key={room.id}
            className={`chatlist-item ${selectedRooms.has(room.id)
                ? "chatlist-item-selected"
                : ""
              }`}
            onClick={() => handleRoomClick(room.id)}
          >
            {isEditMode && (
              <div className="chatlist-edit-checkbox">
                <input
                  type="checkbox"
                  checked={selectedRooms.has(room.id)}
                  readOnly
                />
              </div>
            )}

            <div className="chatlist-avatar">
              <img
                className="chatlist-profile-img"
                src={room.profile || "/icons/default-profile.png"}
                alt=""
              />
            </div>

            <div className="chatlist-info">
              <div className="chatlist-info-top">
                <strong className="chatlist-cleaner-name">
                  {room.opponentName}
                </strong>
              </div>

              <div className="chatlist-info-bottom">
                <p className="chatlist-last-message">
                  {room.lastMessage}
                </p>

                <div className="chatlist-meta">
                  <span className="chatlist-last-time">
                    {dayjs(room.lastMessageAt).format("M.D A h:mm")}
                  </span>

                  {room.unreadCount > 0 && (
                    <span className="chatlist-unread-badge">
                      {room.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isEditMode && <button className="chatlist-leave-btn" onClick={handleLeaveRooms}>선택한 채팅방 나가기</button>}
    </div>
  );
}
