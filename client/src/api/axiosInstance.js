const wait = (data, status = 200) => Promise.resolve({ data, status });

const demoInquiries = [
  { id: 1, status: '답변 완료', category: '서비스 문의', title: '정기 청소 주기가 궁금합니다.', guestName: null, owner: { name: '데모 점주' }, cleaner: null, createdAt: '2026-07-20', content: '<p>매장 제빙기 정기 청소 주기를 알고 싶습니다.</p>', answer: { content: '<p>일반적으로 3개월 주기를 권장합니다.</p>', createdAt: '2026-07-21' } },
  { id: 2, status: '대기중', category: '견적 문의', title: '대형 제빙기 견적 문의', guestName: 'guest@example.com', owner: null, cleaner: null, createdAt: '2026-07-22', content: '<p>대형 제빙기 청소 비용이 궁금합니다.</p>', answer: null },
  { id: 3, status: '답변 완료', category: '기술 지원', title: '예약 변경 방법 문의', guestName: null, owner: { name: '카페 얼음' }, cleaner: null, createdAt: '2026-07-23', content: '<p>예약 날짜를 변경하고 싶습니다.</p>', answer: { content: '<p>마이페이지 예약 관리에서 변경할 수 있습니다.</p>', createdAt: '2026-07-23' } },
];

const demoChatRooms = [
  { id: 1, opponentName: '김민수 기사님', lastMessage: '내일 오후 2시에 방문드리겠습니다.', lastMessageAt: '2026-07-24T16:20:00', unreadCount: 1, profile: '/icons/default-profile.png' },
  { id: 2, opponentName: '이서준 기사님', lastMessage: '견적서를 확인해 주세요.', lastMessageAt: '2026-07-23T11:10:00', unreadCount: 0, profile: '/icons/default-profile.png' },
];

const demoMessages = [
  { id: 1, senderId: 2, senderType: 'CLEANER', messageType: 'TEXT', content: '안녕하세요. 제빙기 청소 문의 확인했습니다.', createdAt: '2026-07-24T16:00:00', isRead: 1 },
  { id: 2, senderId: 1, senderType: 'OWNER', messageType: 'TEXT', content: '네, 내일 오후 방문 가능하실까요?', createdAt: '2026-07-24T16:05:00', isRead: 1 },
  { id: 3, senderId: 2, senderType: 'CLEANER', messageType: 'TEXT', content: '내일 오후 2시에 방문드리겠습니다.', createdAt: '2026-07-24T16:20:00', isRead: 0 },
];

function inquiryById(url) {
  const id = Number(url.match(/(\d+)(?:\?|$)/)?.[1] || 1);
  return demoInquiries.find((item) => item.id === id) || demoInquiries[0];
}

function route(method, url, payload) {
  if (url.includes('/api/chat/rooms') && method === 'get' && !url.includes('/sidebar') && !url.includes('/messages')) {
    return wait({ code: '00', data: demoChatRooms });
  }
  if (url.includes('/api/chat/rooms/') && url.includes('/messages') && method === 'get') {
    return wait({ code: '00', data: demoMessages });
  }
  if (url.includes('/api/chat/rooms/') && url.includes('/sidebar')) {
    return wait({ code: '00', data: { sideType: 'OWNER', data: { cleanerId: 2, cleanerName: '김민수', career: '5년', region: '서울 전체', estimateId: 1 }, reviews: [] } });
  }
  if (url.includes('/api/chat/rooms/') && url.includes('/reviews')) {
    return wait({ code: '00', data: { reviews: [{ id: 1, star: 5, content: '친절하고 꼼꼼했습니다.' }] } });
  }
  if (url.includes('/api/files/chat')) {
    return wait({ code: '00', data: { path: '/icons/default-profile.png' } });
  }
  if (url.includes('/api/posts/inquiries/show/')) {
    return wait({ code: '00', data: { inquiry: inquiryById(url) } });
  }
  if (url.includes('/api/posts/inquiries') && method === 'get') {
    return wait({ code: '00', data: { rows: demoInquiries, count: demoInquiries.length } });
  }
  if (url.includes('/api/posts/inquiries') && method === 'post') {
    return wait({ code: '00', data: { id: 99 } }, 201);
  }
  if (url.includes('/api/posts/owner/reviews/') && method === 'get') {
    return wait({ code: '00', data: { id: 1, cleanerName: '김민수', star: 5, storeName: '아이스 카페', reservationDate: '2026-07-18', price: 120000, content: '시간 약속을 잘 지키고 청소도 꼼꼼했습니다.', reviewPicture1: null, reviewPicture2: null } });
  }
  if (url.includes('/api/posts/owner/reviews') && method === 'post') {
    return wait({ code: '00', data: { id: 1 } }, 201);
  }
  if (url.includes('/api/owners/cleaners/') && url.includes('/like')) {
    const current = JSON.parse(localStorage.getItem('ice_demo_favorites') || '{}');
    const id = url.match(/cleaners\/(\d+)/)?.[1] || '1';
    current[id] = !current[id];
    localStorage.setItem('ice_demo_favorites', JSON.stringify(current));
    return wait({ code: '00', data: { isFavorited: current[id] } });
  }
  if (url.includes('/api/payments/ready')) {
    return wait({ code: '00', data: { orderId: 'DEMO_ORDER_001', reservationName: '제빙기 청소 예약', storeName: '아이스 카페', storeAddress: '서울시 강남구 테헤란로 123', cleanerName: '김민수', amount: 120000 } });
  }
  if (url.includes('/api/payments/confirm')) {
    return wait({ code: '00', msg: '데모 결제가 완료되었습니다.' });
  }
  if (url.includes('/api/auth/signup/complete')) {
    return wait({ code: '00', data: { user: payload || {} } }, 201);
  }
  return wait({ code: '00', data: {} });
}

const axiosInstance = {
  get: (url, config) => route('get', url, config),
  post: (url, data, config) => route('post', url, data, config),
  patch: (url, data, config) => route('patch', url, data, config),
  put: (url, data, config) => route('put', url, data, config),
  delete: (url, config) => route('delete', url, config),
  interceptors: { request: { use: () => {} }, response: { use: () => {} } },
};

let store = null;
export function injectStoreInAxios(_store) { store = _store; return store; }
export default axiosInstance;
