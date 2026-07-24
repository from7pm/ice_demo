import { createAsyncThunk } from '@reduxjs/toolkit';

const today = new Date();
const ymd = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const demoLocations = {
  rows: [
    { id: 1, city: '서울특별시', district: '전체' },
    { id: 2, city: '대구광역시', district: '중구' },
    { id: 3, city: '부산광역시', district: '해운대구' },
  ],
};

const demoReservations = [
  {
    id: 301,
    date: ymd(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3)),
    time: '11:00:00',
    status: 'REQUESTED',
    store: { name: '카페 라임', addr1: '서울특별시 성동구 왕십리로 10' },
    owner: { name: '최점주' },
  },
  {
    id: 302,
    date: ymd(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5)),
    time: '15:30:00',
    status: 'REQUESTED',
    store: { name: '브리즈 커피', addr1: '서울특별시 강남구 테헤란로 20' },
    owner: { name: '정점주' },
  },
];

const locationThunk = createAsyncThunk('cleaners/locationThunk', async () => demoLocations);

const indexThunk = createAsyncThunk('cleaners/indexThunk', async (_, { getState }) => {
  const currentPage = (getState()?.cleaners?.page || 0) + 1;
  return {
    success: true,
    data: {
      total: demoReservations.length,
      currentPage,
      reservations: currentPage === 1 ? demoReservations : [],
    },
  };
});

const showThunk = createAsyncThunk('cleaners/showThunk', async (id) => {
  const reservation = demoReservations.find((item) => String(item.id) === String(id)) || demoReservations[0];
  return {
    success: true,
    data: {
      reservation: {
        ...reservation,
        description: '제빙기 내부 전체 세척과 살균을 요청합니다.',
      },
      submissions: [
        { question: { content: '제빙기 종류' }, answerText: '업소용 공랭식' },
        { question: { content: '희망 작업 시간' }, answerText: '영업 시작 전' },
      ],
      locations: demoLocations,
    },
  };
});

const fetchAccounts = createAsyncThunk('cleaners/fetchAccounts', async () => ({
  data: {
    id: 1,
    bank: '국민은행',
    accountNumber: '123456-78-901234',
    accountHolder: '이기사',
  },
}));

export const saveAccount = createAsyncThunk('cleaners/saveAccount', async (accountData) => ({
  data: { id: 1, ...accountData },
}));

const deleteAccount = createAsyncThunk('cleaners/deleteAccount', async () => ({ success: true }));
const quotationStore = createAsyncThunk('cleaners/quotationStore', async (data) => ({ success: true, data }));

export default {
  indexThunk,
  showThunk,
  locationThunk,
  saveAccount,
  fetchAccounts,
  deleteAccount,
  quotationStore,
};
