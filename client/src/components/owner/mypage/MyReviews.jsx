import React from 'react';
import './MyReviews.css';

// 데모용 리뷰 관리 화면: 서버 호출 없이 빈 상태를 표시합니다.
export default function MyReviews() {
  return (
    <div className="myreviews-tab-container">
      <div className="myreviews-section-group">
        <p className="myreviews-section-label">작성한 리뷰 목록</p>
        <p className="myreviews-no-items">작성한 리뷰가 없습니다.</p>
      </div>
    </div>
  );
}
