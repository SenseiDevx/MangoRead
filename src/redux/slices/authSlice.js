import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {link} from "../link/link";
import axios from "axios";

const localStorageKey = 'token';

// Функция для загрузки токенов из localStorage (если они есть)
export const loadTokenFromLocalStorage = () => {
    try {
        const tokenData = localStorage.getItem(localStorageKey);
        if (tokenData) {
            return JSON.parse(tokenData);
        }
        return null;
    } catch (error) {
        return null;
    }
};

// При инициализации, загружаем токены из localStorage
const initialTokenState = loadTokenFromLocalStorage();

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({username, password}, {rejectWithValue}) => {
        try {
            const data = {username, password};
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            };

            const response = await fetch(`${link.AUTH_BASE_URL}signin/`, options);

            if (!response.ok) {
                throw new Error('Пароль или логин не совпадает');
            }

            return response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    });


export const fetchUserData = createAsyncThunk(
    'auth/fetchUserData',
    async (id, { rejectWithValue }) => {
        try {
            console.log(id)
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
    user: initialTokenState,
    token: initialTokenState,
};


const authSlice = createSlice({
    name: 'authSlice',
    initialState: initialState,
    reducers: {
        logoutUser: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem(localStorageKey);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                state.token = action.payload
                localStorage.setItem(localStorageKey, JSON.stringify(action.payload))
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                localStorage.setItem(localStorageKey, JSON.stringify(action.payload))
                console.log('Пароль или логин не совпадает')
            })
            .addCase(fetchUserData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.log('Ошибка при получении данных пользователя:', action.payload);
            });
    }
})
export const {logoutUser} = authSlice.actions;

export default authSlice.reducer
