import { createAsyncThunk } from "@reduxjs/toolkit";

const STORAGE_KEY = 'ice-doctor-demo-user';

const DEMO_USERS = {
  'owner@icedoctor.demo': {
    id: 1,
    name: '김점주',
    email: 'owner@icedoctor.demo',
    password: '12345678',
    role: 'OWNER',
    phone: '010-1234-5678',
    profile: '/icons/default-profile.png',
  },
  'cleaner@icedoctor.demo': {
    id: 2,
    name: '이기사',
    email: 'cleaner@icedoctor.demo',
    password: '12345678',
    role: 'CLEANER',
    phoneNumber: '010-9876-5432',
    profile: '/icons/default-profile.png',
  },
};

function readUser() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

function saveUser(user) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export const loginThunk = createAsyncThunk('auth/loginThunk', async ({ email, password }, { rejectWithValue }) => {
  const storedUsers = JSON.parse(localStorage.getItem('ice-doctor-demo-accounts') || '{}');
  const account = storedUsers[email] || DEMO_USERS[email];
  if (!account || account.password !== password) {
    return rejectWithValue({ message: '이메일 또는 비밀번호를 확인해주세요.' });
  }
  const { password: _password, ...user } = account;
  saveUser(user);
  return { data: { user } };
});

export const reissueThunk = createAsyncThunk('auth/reissueThunk', async (_, { rejectWithValue }) => {
  const user = readUser();
  return user ? { data: { user } } : rejectWithValue({ message: '로그인 정보가 없습니다.' });
});

export const getMeThunk = createAsyncThunk('auth/getMeThunk', async (_, { rejectWithValue }) => {
  const user = readUser();
  return user ? { data: { user } } : rejectWithValue({ message: '비로그인 상태입니다.' });
});

export const logoutThunk = createAsyncThunk('auth/logoutThunk', async () => {
  localStorage.removeItem(STORAGE_KEY);
  return { data: true };
});

export const updateOwnerInfoThunk = createAsyncThunk('auth/updateOwnerInfoThunk', async (updateData) => {
  const user = { ...readUser(), ...updateData };
  saveUser(user);
  return { data: { user } };
});

export const updateCleanerInfoThunk = createAsyncThunk('auth/updateCleanerInfoThunk', async (updateData) => {
  const user = { ...readUser(), ...updateData };
  saveUser(user);
  return { data: { user } };
});

export const changeCleanerPasswordThunk = createAsyncThunk('auth/changeCleanerPasswordThunk', async () => ({ data: true }));
export const uploadProfileImageThunk = createAsyncThunk('auth/uploadProfileImageThunk', async () => ({ data: { user: readUser() } }));
export const uploadFileThunk = createAsyncThunk('files/upload', async () => '/icons/default-profile.png');
export const getCleanerProfileThunk = createAsyncThunk('cleaner/getProfile', async () => readUser());
