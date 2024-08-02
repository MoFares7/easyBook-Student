import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../core/network/api'

export const getStudentsService = createAsyncThunk(
        'params/index',
        async () => {
                try {
                        const response = await api.get(`Student/GetAll`);
                        return response.data.data;
                } catch (error) {
                        throw Error(error.response.data.message);
                }
        }
);

const getStudentsSlice = createSlice({
        name: 'getStudentsService',
        initialState: {
                data: [],
                error: null,
                loading: false,
        },
        reducers: {},
        extraReducers: (builder) => {
                builder
                        .addCase(getStudentsService.pending, (state) => {
                                state.loading = true;
                                state.error = null;
                        })
                        .addCase(getStudentsService.fulfilled, (state, action) => {
                                state.loading = false;
                                state.data = action.payload;
                        })
                        .addCase(getStudentsService.rejected, (state, action) => {
                                state.loading = false;
                                state.error = action.error.message;
                        });
        },
});

export default getStudentsSlice.reducer;