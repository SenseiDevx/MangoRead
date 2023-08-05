import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {link} from "../link/link";


// Создаем экземпляр Axios с базовым URL
const instance = axios.create({
    baseURL: link.AUTH_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Создаем Axios Interceptor для обработки ошибок
instance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                // Обработка ошибки аутентификации (неверный пароль или логин)
                return Promise.reject(new Error('Пароль или логин не совпадает'));
            }
        }
        return Promise.reject(error);
    }
);

// Создаем функцию для аутентификации пользователя
export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const data = { username, password };
            const response = await instance.post('signin/', data);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


//функция для получения данных пользователя
export const fetchUserData = createAsyncThunk(
    'auth/fetchUserData',
    async (id, { rejectWithValue }) => {
        try {
            const response = await instance.get(`/profile/${id}/`);
            console.log('response', response)
            return response.data;
        } catch (error) {
            console.error('Ошибка при выполнении запроса fetchUserData:', error);
            return rejectWithValue('Ошибка при получении данных пользователя');
        }
    }
);

const initialState = {
    loading: false,
    error: null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '',
    token: localStorage.getItem('token') || '',
};

const authSlice = createSlice({
    name: 'authSlice',
    initialState: initialState,
    reducers: {
        logoutUser: (state) => {
            state.token = '';
            state.user = '';
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.token = action.payload.access;
                localStorage.setItem('user', JSON.stringify(action.payload));
                localStorage.setItem('token', action.payload.access);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                localStorage.setItem('token', JSON.stringify(action.payload));
                console.log('Пароль или логин не совпадает');
            })
            .addCase(fetchUserData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.log('Ошибка при получении данных пользователя:', action.payload);
            });
    },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
