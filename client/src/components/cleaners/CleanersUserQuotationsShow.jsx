import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { CiUser } from "react-icons/ci";
import { MdHomeWork } from "react-icons/md";
import { LuCalendarClock } from "react-icons/lu";
import { RiArrowDropDownFill } from "react-icons/ri";
import { RiArrowDropUpFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./CleanersUserQuotationsShow.css";
import styles from "./CleanersUserQuotations.module.css";

function CleanersUserQuotationsShow() {
  const navigate = useNavigate();
  const params = useParams();
  const reservation = {
    id: params.id || 'demo-1',
    isAssign: '신규 요청',
    date: '2026-07-30',
    time: '14:00',
    store: {
      name: '아이스 카페 중앙점',
      phoneNumber: '02-1234-5678',
      addr1: '서울특별시',
      addr2: '중구 세종대로 110',
      addr3: '1층'
    },
    owner: { name: '김점주' }
  };
  const submissions = [
    {
      id: 1,
      questionOptionId: 1,
      answerText: '1대',
      question: {
        code: 'Q1',
        content: '청소가 필요한 제빙기 수량을 선택해주세요.',
        questionOptions: [
          { id: 1, correct: '1대' },
          { id: 2, correct: '2대' },
          { id: 3, correct: '3대 이상' }
        ]
      }
    },
    { id: 2, question: null, answerText: '오후 2시 이후 방문을 희망합니다.' }
  ];
  const { user } = useSelector(state => state.auth);
  const [toggleDetails, setToggleDetails] = useState(false);

  const toggleMenuDetailsMenu = () => {
    setToggleDetails(!toggleDetails)
  };

  // --- 견적서 입력을 위한 상태 관리 ---
  const [quoteData, setQuoteData] = useState({
    estimatedAmount: '120000', // 가격 필드명 반영
    description: "제빙기 1대 분해 세척 및 살균 작업 견적입니다."
  });

  // ---  견적서 입력 변경시 스테이트 수정 ---
  function changeQuoteData(key, val) {
    setQuoteData({ ...quoteData, [key]: val });
  }

  // 데모에서는 서버 요청 없이 견적 내용을 저장하고 목록 페이지로 이동합니다.
  const handleSubmit = (e) => {
    e.preventDefault();

    const demoQuote = {
      reservationId: reservation.id,
      estimatedAmount: quoteData.estimatedAmount || '120000',
      description: quoteData.description || '제빙기 1대 분해 세척 및 살균 작업 견적입니다.',
      sentAt: new Date().toISOString()
    };

    localStorage.setItem('iceDoctorDemoSentQuote', JSON.stringify(demoQuote));
    alert('견적서가 전송되었습니다.');
    navigate('/cleaners/quotations', { replace: true });
  };

  // ----------------------------------
  // 모달 관련
  // ----------------------------------
  // --- 모달에서 "불러오기" 클릭 시 실행될 함수 --- 
  // TODO: 시간 남으면 하기
  // const handleSelectTemplate = (template) => {
  //   setQuoteData({
  //     estimatedAmount: template.estimatedAmount, // DB 필드명에 맞춤
  //     description: template.content || template.description // 템플릿의 내용 반영
  //   });
  //   closeModal();
  // };
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const openModal = () => setIsModalOpen(true);
  // const closeModal = () => setIsModalOpen(false);




  return (
    <>
      <div className="all-container cleaners-user-quotations-container">
        <p className="cleaners-user-quotations-title">{`안녕하세요, ${user?.name || "기사"} 님! 요청 의뢰서입니다.`}</p>

        {
          reservation && (
            <>
              {/* 기본 정보 */}
              <div className="cleaners-user-quotations-items-box cleaners-user-quotations-base-info">
                <span className="cleaners-user-quotations-like-status">{reservation?.isAssign}</span>
                <div className="cleaners-user-quotations-icon-set">
                  <MdHomeWork size={20} />
                  <div className="cleaners-user-quotations-place">{reservation?.store.name}</div>
                </div>
                <div className="cleaners-user-quotations-icon-set">
                  <CiUser size={20} />
                  <div className="cleaners-user-quotations-user">{reservation?.owner.name}</div>
                </div>
                <div className="cleaners-user-quotations-icon-set">
                  <LuCalendarClock size={20} />
                  <div className="cleaners-user-quotations-date">{`${reservation?.date} ${reservation?.time}`}</div>
                </div>
              </div>

              {/* 첨부파일 미리보기 */}
              <div className="cleaners-user-quotations-items-box-column">
                <span className="cleaners-user-quotations-items-box-title">첨부파일</span>
                <div className="cleaners-user-quotations-items-box-images">
                  <div className="cleaners-user-quotations-items-box-image" style={{ backgroundImage: `url('/icons/임시1.jpg')` }}></div>
                </div>
              </div>

              {/* 매장 정보 */}
              <div className="cleaners-user-quotations-items-box-column">
                <span className="cleaners-user-quotations-items-box-title">매장 정보</span>
                <div className="cleaners-user-quotations-grid-1">
                  <div className="cleaners-user-quotations-input-box">
                    <label htmlFor="placeName">매장명</label>
                    <input type="text" className="cleaners-user-quotations-input-layout" id="placeName" value={reservation?.store.name || ''} readOnly />
                  </div>
                  <div className="cleaners-user-quotations-input-box">
                    <label htmlFor="call">전화번호</label>
                    <input type="text" className="cleaners-user-quotations-input-layout" id="call" value={reservation?.store.phoneNumber || ''} readOnly />
                  </div>
                </div>
                <div className="cleaners-user-quotations-input-box">
                  <label htmlFor="address1">주소</label>
                  <input type="text" className="cleaners-user-quotations-input-layout" id="address1" value={`${reservation?.store.addr1 || ''} ${reservation?.store.addr2 || ''}`} readOnly />
                </div>
                <div className="cleaners-user-quotations-input-box">
                  <label htmlFor="address2">상세주소</label>
                  <input type="text" className="cleaners-user-quotations-input-layout" id="adderss2" value={`${reservation?.store.addr3}`} readOnly />
                </div>
              </div>
            </>
          )
        }

        {/* 추가 정보 */}
        <div className="cleaners-user-quotations-items-box-column">
          <span className="cleaners-user-quotations-items-box-title cleaners-user-quotations-toggle-question" onClick={toggleMenuDetailsMenu}>추가 정보{toggleDetails ? <RiArrowDropUpFill size={20} /> : <RiArrowDropDownFill size={20} />}</span>
          {
            submissions && submissions.map(submission => {
              return (
                <div className="cleaners-user-quotations-items-box-question" key={`${submission.id}`}>
                  {
                    submission.question && (
                      <>
                        <span className="cleaners-user-quotations-items-box-question-title" htmlFor={submission.question.code}>{`${submission.question.code}. ${submission.question.content}`}</span>
                        <div className="cleaners-user-quotations-items-box-question-answers">

                          {
                            submission.question.questionOptions.map(questionOption => {
                              return (
                                <div className="cleaners-user-quotations-items-box-question-answer" key={`${submission.id}-${questionOption.id}`}>
                                  <input
                                    type="radio"
                                    name={submission.question.code}
                                    id={`${submission.question.code}-${questionOption.id}`}
                                    checked={
                                      // Case 1: ID가 정상적으로 저장된 경우
                                      (submission.questionOptionId === questionOption.id) ||
                                      // Case 2: ID가 null이고 answerText가 옵션 텍스트와 일치하는 경우 (현재 문제 상황)
                                      (submission.questionOptionId === null && submission.answerText === questionOption.correct)
                                    }
                                    value={questionOption.id}
                                    readOnly
                                    className={styles.radioInput} // 클래스 추가
                                  />
                                  <label
                                    htmlFor={`${submission.question.code}-${questionOption.id}`}
                                    className={styles.radioLabel} // 클래스 추가
                                  >
                                    {questionOption.correct}
                                  </label>
                                </div>
                              )
                            })
                          }
                        </div>
                      </>
                    )
                  }
                  {
                    !submission.question && (
                      <div className="cleaners-user-quotations-items-box-question-grid-col2">
                        <span className="cleaners-user-quotations-items-box-question-title">추가 요청 사항</span>
                        <textarea name="at" className="cleaners-user-quotations-textarea" readOnly value={submission.answerText}></textarea>
                      </div>
                    )
                  }
                </div>
              )
            })
          }
        </div>

        <form onSubmit={handleSubmit}>
          {/* 기사님 견적서 작성 카드 */}
          <div className="cleaners-user-quotations-items-box-column">
            <div className="cleaners-user-quotations-items-box-title-box">
              <span className="cleaners-user-quotations-items-box-title">기사님 견적서</span>
              {/* <button type="button" className="cleaners-user-quotations-btn" onClick={openModal} style={{display: 'none'}}>임시 저장 견적서 불러오기</button> */}

              {/* 모달 렌더링 */}
              {
                // isModalOpen && (
                //   <div className="modal-overlay" onClick={closeModal}>
                //     <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                //       <button type="button" className="modal-close-x" onClick={closeModal}>&times;</button>
                //       {/* 모달에 데이터 선택 함수를 props로 전달 */}
                //       <CleanersQuotationsPreparationSave onSelect={handleSelectTemplate} />
                //     </div>
                //   </div>
                // )
              }
            </div>

            {/* 견적 금액 입력 필드 */}
            <div className="cleaners-user-quotations-input-box cleaners-user-quotations-grid-1">
              <label htmlFor="estimatedAmount">견적 금액</label>
              <input
                type="number"
                className="cleaners-user-quotations-input-layout input-remove-arrows"
                id="estimatedAmount"
                value={quoteData.estimatedAmount}
                onChange={(e) => changeQuoteData('estimatedAmount', e.target.value)}
                placeholder="0"
              />
            </div>

            {/* 견적 설명 입력 필드 */}
            <div className="cleaners-user-quotations-textarea-box">
              <label htmlFor="description">견적 설명</label>
              <textarea
                id="description"
                className="cleaners-user-quotations-textarea"
                value={quoteData.description}
                onChange={(e) => changeQuoteData('description', e.target.value)}
                placeholder="견적에 대한 상세 설명을 입력해주세요."
              ></textarea>
            </div>
          </div>

          <button type="submit" className="btn-medium bg-light">견적서 보내기</button>
        </form>
      </div>
    </>
  )
}

export default CleanersUserQuotationsShow;
