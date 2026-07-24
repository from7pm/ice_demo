const today = new Date();
const toYmd = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

let todayJobs = [
  {
    id: 101,
    date: toYmd(today),
    time: '10:30:00',
    status: 'APPROVED',
    createdAt: `${toYmd(today)} 09:00:00`,
    store: { name: '아이스 카페 시청점', addr1: '서울특별시 중구 세종대로 110' },
    owner: { name: '김점주', phone: '010-1234-5678' },
  },
];

let pendingJobs = [
  {
    id: 102,
    date: toYmd(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2)),
    time: '14:00:00',
    status: 'APPROVED',
    createdAt: `${toYmd(today)} 11:20:00`,
    store: { name: '블루빈 카페', addr1: '서울특별시 마포구 월드컵북로 21' },
    owner: { name: '박점주', phone: '010-2222-3333' },
  },
];

const settlementList = [
  {
    id: 201,
    settlement_amount: 120000,
    status: '지급 대기',
    canceled: false,
    createdAt: `${toYmd(today)} 16:00:00`,
    reservation: {
      date: toYmd(today),
      store: { name: '아이스 카페 시청점' },
    },
  },
];

const ok = (data) => Promise.resolve({ data: { success: true, data } });

export const getPendingJobs = () => ok(pendingJobs);
export const getTodayJobs = () => ok(todayJobs);
export const getCleanerInquiries = () => ok([
  {
    id: 1,
    title: '정산 일정 문의',
    content: '<p>완료된 작업의 정산 예정일을 확인하고 싶습니다.</p>',
    status: '답변완료',
    answerContent: '<p>데모 화면에서는 정산 대기 탭에서 일정을 확인할 수 있습니다.</p>',
    answerDate: toYmd(today),
  },
]);
export const getCleanerReviews = () => ok([
  {
    id: 1,
    star: 5,
    content: '약속 시간에 맞춰 방문해 주셨고 청소도 꼼꼼했습니다.',
    createdAt: `${toYmd(today)} 18:00:00`,
    reservationData: {
      date: toYmd(today),
      store: { name: '아이스 카페 시청점' },
    },
  },
]);
export const getSettlementSummary = () => ok({
  summary: { pending: 120000, completed: 480000 },
  list: settlementList,
});
export const getAccountThunk = () => ok({
  id: 1,
  bank: '국민은행',
  accountNumber: '123456-78-901234',
  accountHolder: '이기사',
});
export const getCleanerJobDetail = (id) => {
  const job = [...todayJobs, ...pendingJobs].find((item) => String(item.id) === String(id)) || todayJobs[0];
  return ok({
    reservation: {
      ...job,
      description: '제빙기 내부 세척과 필터 상태 확인을 부탁드립니다.',
      estimate: { estimated_amount: 120000 },
    },
    submissions: [
      { question: { content: '제빙기 종류' }, answerText: '업소용 수냉식 제빙기' },
      { question: { content: '최근 청소 시기' }, answerText: '약 6개월 전' },
    ],
  });
};
export const completeJob = (id) => {
  todayJobs = todayJobs.filter((job) => String(job.id) !== String(id));
  pendingJobs = pendingJobs.filter((job) => String(job.id) !== String(id));
  return ok({ id });
};
export const getLocationsThunk = () => ok({
  rows: [
    { id: 1, city: '서울특별시', district: '전체' },
    { id: 2, city: '대구광역시', district: '중구' },
    { id: 3, city: '부산광역시', district: '해운대구' },
  ],
});
