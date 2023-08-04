import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { link} from "../link/link";

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

export const getMangas = createAsyncThunk(
    "getMangas",
    async (params, { rejectWithValue }) => {
        try {
            const { data } = await apiClient.get("manga/");
            return data;
        } catch (error) {
            console.error("Error", error.message);
            return rejectWithValue(error.message);
        }
    }
);

export const getMangaById = createAsyncThunk(
    "getMangaById",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${link.BASE_URL}manga/${id}`);
            console.log(data)
            return data;
        } catch (error) {
            console.error("Error", error.message);
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    mangas: [],
    loading: true,
    offset: 1,
    manga: null
};

const mangaSlice = createSlice({
    name: "mangaSlice",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMangas.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMangas.fulfilled, (state, action) => {
                state.loading = false;
                state.mangas = action.payload;
            })
            .addCase(getMangas.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                alert("Произошла ошибка" + action.error.message);
            })
            .addCase(getMangaById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMangaById.fulfilled, (state, action) => {
                state.loading = false;
                state.manga = action.payload;
            })
            .addCase(getMangaById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                alert("Произошла ошибка" + action.error.message);
            });
    },
});

export default mangaSlice.reducer;
