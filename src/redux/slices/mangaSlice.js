import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { link} from "../link/link";
import {updateSelectedGenres} from "./genreSlice";

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
    async ({ offset, limit }, { rejectWithValue }) => {
        try {
            const { data } = await apiClient.get("manga/", {
                params: {
                    offset,
                    limit,
                },
            });

            const mangasArray = data.results; // Получаем массив mangas из возвращенных данных

            console.log("Mangas array:", mangasArray);

            return mangasArray;
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
    loading: false,
    offset: 1,
    manga: null,
    itemsPerPage: 12,
    mangaList: [],
    selectedGenres: []
};


const mangaSlice = createSlice({
    name: "mangaSlice",
    initialState: initialState,
    reducers: {
        updateMangaList: (state, action) => {
            state.mangaList = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMangas.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMangas.fulfilled, (state, action) => {
                state.loading = false;
                state.mangas = action.payload;
                state.mangaList = action.payload;
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
            })
            .addCase(updateSelectedGenres, (state, action) => {
                // Обновляем список манг при изменении выбранных жанров
                const selectedGenres = action.payload;
                if (selectedGenres.length === 0) {
                    // Если нет выбранных жанров, отображаем все манги
                    state.mangas = state.mangaList;
                } else {
                    // Иначе фильтруем манги по выбранным жанрам
                    state.mangas = state.mangaList.filter((manga) => {
                        return manga.genre.some((genreId) => selectedGenres.includes(genreId));
                    });
                }
            });
    },
});

export default mangaSlice.reducer;
