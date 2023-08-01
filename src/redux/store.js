import {configureStore} from "@reduxjs/toolkit";
import mangoReducer from './slices/mangaSlice'
import genreReducer from './slices/genreSlice'

export const store = configureStore({
    reducer: {
        mangoReducer,
        genreReducer,
    }
})