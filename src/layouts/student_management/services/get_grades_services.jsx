import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../core/network/api';

export const getGradesService = createAsyncThunk(
        'getGradesService/getAll',
        async () => {
                try {
                        const response = await api.get(`Settings/GetAllGrades`);
                        return response.data;
                } catch (error) {
                        throw new Error(error.response?.data?.message || 'Failed to fetch grades');
                }
        }
);

const getGradesSlice = createSlice({
        name: 'getGradesService',
        initialState: {
                data: [],
                error: null,
                loading: false,
        },
        extraReducers: (builder) => {
                builder
                        .addCase(getGradesService.pending, (state) => {
                                state.loading = true;
                                state.error = null;
                        })
                        .addCase(getGradesService.fulfilled, (state, action) => {
                                state.loading = false;
                                state.data = action.payload;
                        })
                        .addCase(getGradesService.rejected, (state, action) => {
                                state.loading = false;
                                state.error = action.error.message;
                        });
        },
});

export default getGradesSlice.reducer;
