import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './paymentSuccess.css';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('processing');

  useEffect(() => {
    const timer = setTimeout(() => setStatus('success'), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="payment-success-overlay">
      <div className="payment-success-container">
        {status === 'processing' && (
          <div className="payment-success-processing-status">
            <h2 className="payment-success-status-title">결제 승인 중입니다</h2>
            <p className="payment-success-status-desc">데모 예약을 처리하고 있습니다.</p>
          </div>
        )}
        {status === 'success' && (
          <div className="payment-success-content">
            <div className="payment-success-icon-box"><span className="payment-success-check">✓</span></div>
            <h2 className="payment-success-status-title">데모 결제가 완료되었습니다!</h2>
            <p className="payment-success-status-desc">실제 결제 없이 예약 흐름만 체험할 수 있습니다.</p>
            <div className="payment-success-button-group">
              <button className="payment-success-button-primary" onClick={() => navigate('/owners/mypage')}>예약 내역 확인</button>
              <button className="payment-success-button-secondary" onClick={() => navigate('/')}>홈으로 가기</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default PaymentSuccess;
