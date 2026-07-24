import React, { useState } from 'react';
import './Estimates.css';

const demoRequests = [
  { id: 1, store: '아이스 카페 중앙점', date: '2026-07-28', machine: '업소용 제빙기 1대' },
  { id: 2, store: '블루빈 동성로점', date: '2026-07-30', machine: '수냉식 제빙기 2대' },
  { id: 3, store: '카페 설빙 대구점', date: '날짜 협의', machine: '공랭식 제빙기 1대' },
];

const demoQuotes = [
  { id: 101, name: '김민수 기사님', career: '경력 7년 · 리뷰 4.9', area: '대구 전 지역', price: '120,000원' },
  { id: 102, name: '박지훈 기사님', career: '경력 5년 · 리뷰 4.8', area: '중구 · 수성구', price: '135,000원' },
  { id: 103, name: '이도현 기사님', career: '경력 9년 · 리뷰 5.0', area: '대구 · 경산', price: '150,000원' },
];

export default function Estimates() {
  const [selectedRequest, setSelectedRequest] = useState(1);

  return (
    <div className="estimates-page">
      <div className="estimates-tab-container">
        <h3 className="estimates-tab-title">견적 요청 목록</h3>

        <div className="estimates-request-scroll-container">
          {demoRequests.map((request) => (
            <article className="estimates-quote-request-card" key={request.id}>
              <div className="estimates-req-header">{request.store}</div>
              <div className="estimates-req-body">
                <p>희망일: {request.date}</p>
                <p>{request.machine}</p>
              </div>
              <button
                type="button"
                className={`estimates-confirm-quote-btn ${selectedRequest === request.id ? 'active' : ''}`}
                onClick={() => setSelectedRequest(request.id)}
              >
                받은 견적 보기
              </button>
            </article>
          ))}
        </div>

        <section className="estimates-bottom-blue-section">
          <h3 className="estimates-store-selection-banner">도착한 데모 견적서</h3>
          <div className="estimates-driver-quote-grid">
            {demoQuotes.map((quote) => (
              <article className="estimates-driver-selection-card" key={quote.id}>
                <div className="estimates-driver-profile-row">
                  <div className="estimates-driver-image-box">
                    <img className="estimates-driver-img" src="/icons/default-profile.png" alt="기사님 기본 프로필" />
                  </div>
                  <div className="estimates-driver-brief">
                    <div className="estimates-driver-name"><h4>{quote.name}</h4></div>
                    <p>{quote.career}</p>
                    <p>활동 지역: {quote.area}</p>
                    <p>세척·살균 및 작동 점검 포함</p>
                  </div>
                </div>
                <div className="estimates-quote-price-section">
                  <div className="estimates-price-info">
                    <span className="estimates-label">견적 금액</span>
                    <strong className="estimates-price">{quote.price}</strong>
                  </div>
                </div>
                <div className="estimates-card-action-row">
                  <button type="button" className="estimates-btn-light" onClick={() => alert('데모 견적 상세입니다.')}>상세 보기</button>
                  <button type="button" className="estimates-btn-primary" onClick={() => alert('데모에서는 예약이 실제로 생성되지 않습니다.')}>견적 선택</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
