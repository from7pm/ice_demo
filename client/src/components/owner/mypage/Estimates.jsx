import React from 'react';
import './Estimates.css';

// 데모용 받은 견적 화면: 서버 호출 없이 빈 상태를 표시합니다.
export default function Estimates() {
  return (
    <div className="estimates-page">
      <div className="estimates-tab-container">
        <h3 className="estimates-tab-title">견적 요청 목록</h3>
        <div className="estimates-request-scroll-container">
          <p>현재 받은 견적이 없습니다.</p>
        </div>
      </div>
    </div>
  );
}
