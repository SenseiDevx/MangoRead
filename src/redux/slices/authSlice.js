// authSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {link} from "../link/link";

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const data = { username, password };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            };

            const response = await fetch(`${link.AUTH_BASE_URL}signin/`, options);
            if (response.ok) {
                return response.json();
            }

            if (!response.ok) {
                throw new Error('Пароль или логин не совпадает');
            }

            return response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchUserData = createAsyncThunk(
    'auth/fetchUserData',
    async (id, { rejectWithValue }) => {
        try {
            console.log(id);
            const { data } = await axios.get(`http://68.183.214.2:8666/api/auth/profile/${id}/`);
            return data;
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
