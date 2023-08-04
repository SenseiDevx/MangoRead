import {configureStore} from "@reduxjs/toolkit";
import mangoReducer from './slices/mangaSlice'
import genreReducer from './slices/genreSlice'
import reviewReducer from './slices/reviewSlice'
import authReducer from './slices/authSlice'

export const store = configureStore({
    reducer: {
        mangoReducer,
        genreReducer,
        reviewReducer,
        authReducer
    }
})