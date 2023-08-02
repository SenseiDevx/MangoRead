import {configureStore} from "@reduxjs/toolkit";
import mangoReducer from './slices/mangaSlice'
import genreReducer from './slices/genreSlice'
import reviewReducer from './slices/reviewSlice'

export const store = configureStore({
    reducer: {
        mangoReducer,
        genreReducer,
        reviewReducer
    }
})