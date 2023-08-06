import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {link} from "../link/link";
import {getMangas} from "./mangaSlice";

const apiClient = axios.create({
    baseURL: link.BASE_URL,
});

// Interceptor для запросов
apiClient.interceptors.request.use(
    (config) => {
        console.log("Request:", config.method, config.url);
        return config;
    },
    (error) => {
        console.error("Request Error:", error.message);
        return Promise.reject(error);
    }
);

// Interceptor для ответов
apiClient.interceptors.response.use(
    (response) => {
        console.log("Response:", response.status, response.data);
        return response;
    },
    (error) => {
        console.error("Response Error:", error.message);
        return Promise.reject(error);
    }
);


export const getGenres = createAsyncThunk(
    'getGenres',
    async (params, {rejectWithValue}) => {
        try {
            const {data} = await axios.get(`${link.BASE_URL}genre/`)
            return data
        } catch (error) {
            console.error('Error', error.message)
            return rejectWithValue(error.message)
        }
    })

export const getTypes = createAsyncThunk(
    'getTypes',
    async ({ rejectWithValue }) => {
        try {
            const {data} = await axios.get(`${link.BASE_URL}manga/`)
            return data
        } catch (error) {
            console.error("Error", error)
        }
    }
);




const initialState = {
    genres: [],
    loading: true,
    selectedGenres: [],
    types: [],
    selectedTypes: []
}

const genreSlice = createSlice({
    name: "genreSlice",
    initialState: initialState,
    reducers: {
        updateSelectedGenres: (state, action) => {
            state.selectedGenres = action.payload;
        },
        updateSelectedTypes: (state, action) => {
            state.selectedTypes = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGenres.pending, (state) => {
                state.loading = true
            })
            .addCase(getGenres.fulfilled, (state, action) => {
                state.loading = false
                state.genres = action.payload
            })
            .addCase(getGenres.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                console.log("Произошла ошибка" + action.error.message)
            })
            .addCase(getMangas.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMangas.fulfilled, (state, action) => {
                state.loading = false;
                state.types = action.payload;
            })
            .addCase(getMangas.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                alert("Произошла ошибка" + action.error.message);
            })
    }
})

export const { updateSelectedGenres, updateSelectedTypes } = genreSlice.actions;
export default genreSlice.reducer
