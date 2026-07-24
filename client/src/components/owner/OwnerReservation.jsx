import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from "../commons/DatePicker";
import StoreSelectModal from "../commons/StoreSelectModal.jsx";
import useKakaoPostcode from "../hooks/useKakaoPostcode.js";
import { storeGetThunk } from '../../store/thunks/storeGetThunk.js';
import OwnerOption, { RESERVATION_QUESTIONS } from "./OwnerOption.jsx";
import './OwnerReservation.css';

export default function OwnerReservation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location =useLocation();
  const { openPostcode } = useKakaoPostcode();

  const [cleanerId, setCleanerId] = useState(null);

  const { user: owner } = useSelector(state => state.auth || {});
  const { stores = [], status: storesStatus = 'idle' } = useSelector(state => state.store || {});
  const storesLoading = storesStatus === 'loading';

  // 상태 관리
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [storeName, setStoreName] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("02");
  const [phoneMiddle, setPhoneMiddle] = useState("");
  const [phoneLast, setPhoneLast] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [startDate, setStartDate] = useState("");
  const [isDateNegotiable, setIsDateNegotiable] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [files, setFiles] = useState([]);
  const [answers, setAnswers] = useState({});
  const [additionalRequest, setAdditionalRequest] = useState("");
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const areaCodes = ["02", "010", "031", "032", "033", "041", "042", "043", "044", "051", "052", "053", "054", "055", "061", "062", "063", "064", "070"];
  const timeSlots = ["09시 ~ 10시", "11시 ~ 12시", "12시 ~ 13시", "13시 ~ 14시", "14시 ~ 15시", "15시 ~ 16시", "16시 ~ 17시", "17시 ~ 18시", "18시 ~ 19시", "19시 ~ 20시"];

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('cleanerId');
    if(id) {
      setCleanerId(id);
    }
  }, [location]);

  // --- 추가된 핸들러 함수들 ---
  const handleInputChange = (setter, value) => {
    setter(value);
    if (selectedStoreId) setSelectedStoreId(null);
  };

  const handlePhonePartChange = (setter) => (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    setter(numericValue);
    if (selectedStoreId) setSelectedStoreId(null);
  };

  const handleAddressSearch = () => {
    openPostcode((addr) => {
      setAddress(addr);
      setSelectedStoreId(null);
    });
  };

  const handleLoadStoresClick = () => {
    dispatch(storeGetThunk());
    setIsStoreModalOpen(true);
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleAnswerChange = (qId, value) => {
    setAnswers(prev => ({ ...prev, [`q${qId}`]: value }));
  };

  const handleStoreSelect = (store) => {
    setSelectedStoreId(store.id);
    setStoreName(store.name || "");
    setAddress(`${store.addr1 || ''} ${store.addr2 || ''}`.trim());
    setDetailAddress(store.addr3 || "");
    // 전화번호 파싱 로직 (필요시 추가)
    setIsStoreModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 데모 버전에서는 서버로 요청서를 전송하지 않습니다.
    // 입력 여부와 관계없이 받은 견적 데모 화면으로 이동합니다.
    setLoading(true);
    localStorage.setItem('iceDoctorDemoReservationSubmitted', 'true');
    alert('요청서가 등록되었습니다. 데모 견적을 확인해주세요.');
    navigate('/owners/mypage', { replace: true });
  };

  return (
    <div className="all-container owner-reservation-container">
      <h1 className="owner-reservation-main-title">요청서 작성</h1>
      <form className="owner-reservation-form" onSubmit={handleSubmit}>
        {/* 내 정보 섹션 */}
        <section className="owner-reservation-card">
          <div className="owner-reservation-user-info">
            <div className="owner-reservation-avatar-circle">
              <img src={owner?.profile || "/icons/default-profile.png"} alt="프로필" className="owner-reservation-profile" />
            </div>
            <div className="owner-reservation-user-details">
              <strong>{owner?.name || "점주"} 점주님</strong>
              <span>{owner?.phoneNumber || owner?.phone || "전화번호 없음"}</span>
            </div>
          </div>
        </section>

        {/* 예약 정보 섹션 */}
        <section className="owner-reservation-card">
          <h2 className="owner-reservation-card-title">예약 정보<span className="required-star">*</span></h2>
          <div className="owner-reservation-date-row">
            <label>예약날짜</label>
            <div className="owner-reservation-date-input-set">
              <DatePicker selected={startDate} onChange={setStartDate} minDate={new Date()} placeholderText="예약 날짜 선택" className="owner-reservation-datepicker-input" />
              <div className="owner-reservation-negotiable-check">
                <input type="checkbox" id="date-negotiable" checked={isDateNegotiable} onChange={(e) => setIsDateNegotiable(e.target.checked)} />
                <label htmlFor="date-negotiable">날짜 협의 가능</label>
              </div>
            </div>
          </div>
          <div className="owner-reservation-time-row">
            <label>예약시간</label>
            <div className="owner-reservation-time-grid">
              {timeSlots.map(time => (
                <button key={time} type="button" className={`owner-reservation-time-btn ${selectedTime === time ? "active" : ""}`} onClick={() => setSelectedTime(time)}>{time}</button>
              ))}
            </div>
          </div>
          <div className="owner-reservation-file-section">
            <button type="button" className="owner-reservation-btn-file-select" onClick={() => document.getElementById('file-input').click()}>문의 사진 첨부</button>
            <input type="file" id="file-input" hidden onChange={handleFileChange} multiple accept="image/*" />
            <div className="owner-reservation-file-list">
              {files.map((file, index) => (
                <div key={index} className="owner-reservation-file-item">
                  <span>{file.name}</span>
                  <button type="button" onClick={() => removeFile(index)} className="owner-reservation-file-remove">X</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 매장 정보 섹션 */}
        <section className="owner-reservation-card">
          <div className="owner-reservation-title-with-btn">
            <h2 className="owner-reservation-card-title">매장 정보<span className="required-star">*</span></h2>
            <button type="button" className="owner-reservation-btn-blue-outline" onClick={handleLoadStoresClick}>매장 불러오기</button>
          </div>
          <div className="owner-reservation-grid-cols">
            <div className="owner-reservation-input-group">
              <label>매장명</label>
              <input type="text" value={storeName} onChange={(e) => handleInputChange(setStoreName, e.target.value)} placeholder="매장명을 입력하세요" />
            </div>
            <div className="owner-reservation-input-group">
              <label>매장 전화번호</label>
              <div className="owner-reservation-phone-inputs">
                <select value={phonePrefix} onChange={(e) => handleInputChange(setPhonePrefix, e.target.value)}>
                  {areaCodes.map(code => <option key={code} value={code}>{code}</option>)}
                </select>
                <span>-</span>
                <input type="text" maxLength="4" value={phoneMiddle} onChange={handlePhonePartChange(setPhoneMiddle)} />
                <span>-</span>
                <input type="text" maxLength="4" value={phoneLast} onChange={handlePhonePartChange(setPhoneLast)} />
              </div>
            </div>
          </div>
          <div className="owner-reservation-input-group">
            <label>주소</label>
            <div className="owner-reservation-address-search-row">
              <input type="text" value={address} readOnly placeholder="주소 검색을 해주세요" />
              <button type="button" className="owner-reservation-btn-blue" onClick={handleAddressSearch}>검색하기</button>
            </div>
          </div>
          <div className="owner-reservation-input-group">
            <label>상세주소</label>
            <input type="text" value={detailAddress} onChange={(e) => handleInputChange(setDetailAddress, e.target.value)} placeholder="나머지 상세 주소를 입력하세요" />
          </div>
        </section>

        <OwnerOption 
          answers={answers} 
          onAnswerChange={handleAnswerChange} 
          additionalRequest={additionalRequest} 
          onAdditionalRequestChange={setAdditionalRequest} 
        />

        <section className="owner-reservation-card owner-reservation-terms-card">
          <h2 className="owner-reservation-card-title">이용약관</h2>
          <div className="owner-reservation-terms-box">
            1. 아이스닥터는 통신판매중개자이며, 개별 판매자가 제공하는 서비스의 이행 및 계약 책임은 거래당사자에게 있습니다.
          </div>
        </section>

        <div className="owner-reservation-final-check">
          <label>
            <input type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} />
            이용약관을 확인했습니다.
          </label>
          <div className="owner-reservation-btn-center">
            <button type="submit" className="owner-reservation-btn-submit-final" disabled={loading}>
              {loading ? "전송 중..." : "요청서 보내기"}
            </button>
          </div>
        </div>
      </form>

      <StoreSelectModal isOpen={isStoreModalOpen} onClose={() => setIsStoreModalOpen(false)} onSelect={handleStoreSelect} stores={stores} loading={storesLoading} />
    </div>
  );
}