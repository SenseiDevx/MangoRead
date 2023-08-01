import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {link} from "../link/link";

const initialState = {
    genres: [],
    loading: true,
}

export const getGenres = createAsyncThunk(
    'getGenres',
    async (params, {rejectWithValue}) => {
        try {
            const {data} = await axios.get(`${link.BASE_URL}genre/`)
            return data
        } catch (error) {
            console.error('Error', error.message)
        }
    })

const genreSlice = createSlice({
    name: "genreSlice",
    initialState: initialState,
    reducers: {},
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
                alert("Произошла ошибка" + action.error.message)
            })
    }
})

export default genreSlice.reducer