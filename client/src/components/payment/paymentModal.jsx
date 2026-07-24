import { useState } from 'react';
import './paymentModal.css';

export default function PaymentModal({ onClose }) {
  const [loading, setLoading] = useState(false);
  const paymentInfo = { storeName: '아이스 카페', storeAddress: '서울시 강남구 테헤란로 123', cleanerName: '김민수', amount: 120000 };
  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('데모 결제가 완료되었습니다. 실제 결제는 진행되지 않습니다.');
      onClose?.();
    }, 300);
  };
  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal-container">
        <h3 className="payment-modal-title">예약 내역 확인</h3>
        <div className="payment-modal-request-info-section">
          <div className="payment-modal-info-row"><span className="payment-modal-info-label">매장명</span><span className="payment-modal-info-value">{paymentInfo.storeName}</span></div>
          <div className="payment-modal-info-row"><span className="payment-modal-info-label">매장 주소</span><span className="payment-modal-info-value">{paymentInfo.storeAddress}</span></div>
          <hr />
          <div className="payment-modal-info-row"><span className="payment-modal-info-label">담당 기사</span><span className="payment-modal-info-value">{paymentInfo.cleanerName} 기사님</span></div>
          <div className="payment-modal-info-row"><span className="payment-modal-info-label">최종 결제 금액</span><span className="payment-modal-info-value-price">{paymentInfo.amount.toLocaleString()}원</span></div>
        </div>
        <p className="payment-modal-help-text">데모 결제 화면입니다.<br />실제 결제는 진행되지 않습니다.</p>
        <div className="payment-modal-button-group">
          <button className="payment-modal-cancel-action" onClick={onClose}>돌아가기</button>
          <button className="payment-request-action" onClick={handlePayment} disabled={loading}>{loading ? '처리 중...' : '결제하기'}</button>
        </div>
      </div>
    </div>
  );
}
