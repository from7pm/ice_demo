import React from 'react';
import './FavoriteCleaner.css';

// 데모용 찜 목록 화면: 서버 호출 없이 빈 상태를 표시합니다.
export default function FavoriteCleaner() {
  return (
    <div className="favoritecleaner-tab-container">
      <p className="favoritecleaner-no-items">찜한 기사님이 없습니다.</p>
    </div>
  );
}
