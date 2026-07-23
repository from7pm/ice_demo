import React from 'react';
import './InquiryHistory.css';
import { useNavigate } from 'react-router-dom';

// 데모용 문의 내역 화면: 서버 호출 없이 빈 상태를 표시합니다.
export default function InquiryHistory() {
  const navigate = useNavigate();

  return (
    <div className="inquiryhistory-tab-container">
      <div className="inquiryhistory-top-action">
        <button
          className="inquiryhistory-write-btn"
          onClick={() => navigate('/qnaposts/create')}
        >
          문의 작성하기 <span className="inquiryhistory-btn-icon">▶</span>
        </button>
      </div>
      <div className="text-center">작성하신 문의 내역이 없습니다.</div>
    </div>
  );
}
