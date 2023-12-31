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


const initialState = {
    review: [],
    loading: true,
    offset: 1,
    text: '',
    showModal: false,
    page: 1
}

export const getReviews = createAsyncThunk(
    "getReviews",
    async (review, { dispatch, rejectWithValue, getState }) => {
        try {
            const currentPage = getState().reviewReducer.page;
            const { data } = await apiClient.get(`manga/${review.id}/comments/`, {
                params: {
                    page: currentPage,
                },
            });
            return data;
        } catch (error) {
            console.error("Error", error.message);
            return rejectWithValue(error.message);
        }
    }
);




export const addReview = createAsyncThunk(
    "addReview",
    async function (review, {dispatch, rejectWithValue}) {
        try {
            const {response} = await fetch(`${link.BASE_URL}manga/${review.id}/add-comment/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(review.post)
            })
            if (response.status === 201) {
                await dispatch(getReviews(
                    {id: review.id}
                ))
                return "Успех"
            } else {
                throw Error(`что-то пошло не так: ${response.status}`)
            }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);



const reviewSlice = createSlice({
    name: "reviewSlice",
    initialState: initialState,
    reducers: {
        setShowModal: (state, action) => {
            state.showModal = action.payload;
        },
        setOffset: (state, action) => {
            state.offset = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getReviews.pending, (state) => {
                state.loading = true
            })
            .addCase(getReviews.fulfilled, (state, action) => {
                state.loading = false
                state.review = action.payload.reverse()
            })
            .addCase(getReviews.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                console.log("Произошла ошибка", action.error.message)
            })
            .addCase(addReview.pending, (state) => {
                state.loading = true
            })
            .addCase(addReview.fulfilled, (state, action) => {
                state.review = [...state.review, action.payload];
                state.showModal = false
            })
            .addCase(addReview.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                console.log('Произошла ошибка при попытке комента', action.error.message)
            })
    }
})
export const {setShowModal, setOffset, setPage} = reviewSlice.actions
export default reviewSlice.reducer
