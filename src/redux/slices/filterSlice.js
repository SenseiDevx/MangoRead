import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMangaData = createAsyncThunk('manga/fetchMangaData', async (searchText) => {
    try {
        const response = await axios.get(`http://68.183.214.2:8666/api/v1/manga/?search=${searchText}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching data:', error);
    }
});

const mangaSlice = createSlice({
    name: 'manga',
    initialState: {
        searchText: '',
        filteredData: [],
        isDropdownVisible: false,
        status: 'idle',
        error: null,
    },
    reducers: {
        setSearchText(state, action) {
            state.searchText = action.payload;
        },
        setFilteredData(state, action) {
            state.filteredData = action.payload;
        },
        setDropdownVisible(state, action) {
            state.isDropdownVisible = action.payload;
        },
        clearSearch(state) {
            state.searchText = '';
            state.filteredData = [];
            state.isDropdownVisible = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMangaData.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchMangaData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.filteredData = action.payload;
                state.isDropdownVisible = true;
            })
            .addCase(fetchMangaData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const {
    setSearchText,
    setFilteredData,
    setDropdownVisible,
    clearSearch,
} = mangaSlice.actions;

export default mangaSlice.reducer;
