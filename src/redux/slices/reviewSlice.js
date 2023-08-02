import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {link} from "../link/link";

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

export const getReviews = createAsyncThunk(
    "getReviews",
    async (id, {rejectWithValue}) => {
        try {
            const { data } = await apiClient.get(`${id}/comments/`)
            console.log(data)
            return data
        } catch (error) {
            console.error("Error", error.message)
            return rejectWithValue(error.message)
        }
})

const initialState = {
    review: [],
    loading: true,
    offset: 1
}

const reviewSlice = createSlice({
    name: "reviewSlice",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getReviews.pending, (state) => {
                state.loading = true
            })
            .addCase(getReviews.fulfilled, (state, action) => {
                state.loading = false
                state.review = action.payload
            })
            .addCase(getReviews.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                console.log("Произошла ошибка", action.error.message)
            })
    }
})

export default reviewSlice.reducer