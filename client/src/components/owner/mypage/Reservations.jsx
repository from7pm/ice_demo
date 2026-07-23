import React from 'react';
import './Reservations.css';

// 데모용 예약 완료 화면: 서버 호출 없이 빈 상태를 표시합니다.
export default function Reservations() {
  return (
    <div className="reservations-tab-container">
      <p className="reservations-top-notice">지난 1년간의 예약 내역입니다.</p>
      <p className="reservations-no-items">아직 완료된 예약 내역이 없습니다.</p>
    </div>
  );
}
