import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { MdHomeWork } from "react-icons/md";
import { LuCalendarClock } from "react-icons/lu";
import './CleanersUserQuotations.css';

const demoReservations = [
  {
    id: 'demo-1',
    isAssign: '견적 발송 완료',
    date: '2026-07-30',
    time: '14:00',
    store: {
      addr1: '서울특별시',
      addr2: '중구 세종대로',
      name: '아이스 카페 중앙점',
      owner: { name: '김점주' }
    }
  },
  {
    id: 'demo-2',
    isAssign: '견적 검토 중',
    date: '2026-08-02',
    time: '11:30',
    store: {
      addr1: '서울특별시',
      addr2: '마포구 월드컵북로',
      name: '블루빈 카페',
      owner: { name: '이사장' }
    }
  },
  {
    id: 'demo-3',
    isAssign: '신규 요청',
    date: '2026-08-05',
    time: '16:00',
    store: {
      addr1: '경기도',
      addr2: '성남시 분당구',
      name: '카페 프로스트',
      owner: { name: '박점주' }
    }
  }
];

function CleanersUserQuotations() {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  return (
    <div className="all-container cleaners-user-quotations-container"> 
      <span className="cleaners-user-quotations-title">{`안녕하세요, ${user?.name || "기사"} 님! 견적서 목록입니다.`}</span>

      <div className="cleaners-user-quotations-main">
        {demoReservations.map(reservation => (
          <div 
            key={`cuq-${reservation.id}`} 
            className="cleaners-user-quotations-item"
            onClick={() => navigate(`/cleaners/quotations/${reservation.id}`)}
          >
            <div className="cleaners-user-quotations-item-status">{reservation.isAssign}</div>

            <div className="cleaners-user-quotations-icon-box cleaners-user-quotations-item-addr">
              <FaMapMarkerAlt size={25} className="cleaners-user-quotations-icon-flex" />
              <div className="cleaners-user-quotations-item-content-flex">
                <p>{reservation.store.addr1}</p>
                <p>{reservation.store.addr2}</p>
              </div>
            </div>

            <div className="cleaners-user-quotations-item-contents">
              <div className="cleaners-user-quotations-icon-box">
                <MdHomeWork size={25} />
                <div className="cleaners-user-quotations-item-content-flex"><p>{reservation.store.name}</p></div>
              </div>
              <div className="cleaners-user-quotations-icon-box">
                <CiUser size={25} />
                <div className="cleaners-user-quotations-item-content-flex"><p>{reservation.store.owner.name}</p></div>
              </div>
              <div className="cleaners-user-quotations-icon-box">
                <LuCalendarClock size={25} />
                <div className="cleaners-user-quotations-item-content-flex">
                  <p>{reservation.date}</p>
                  <p>{reservation.time}</p>
                </div>
              </div>
              <div className="cleaners-user-quotations-img-frame">
                <div className="cleaners-user-quotations-profile-placeholder" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CleanersUserQuotations;
