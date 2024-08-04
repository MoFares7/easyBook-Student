import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../core/network/api';

export const removeStudentService = createAsyncThunk(
        'Student/Remove',
        async ({ Id }, { rejectWithValue }) => {
                try {
                        const response = await api.delete(`Student/Remove`, { params: { Id } });
                        console.log("removeStudentService success: ", response.data);

                        return response.data;
                } catch (error) {
                        if (error.response) {
                                return rejectWithValue(error.response.data);
                        } else if (error.request) {
                                throw { error: "Can't connect with the server. Please check your network connection." };
                        } else {
                                throw { error: "Error setting up the request." };
                        }
                }
        }
);


const removeStudentServiceSlice = createSlice({
        name: 'removeStudentService',
        initialState: {
                status: null,
                loading: false,
                error: null,
        },
        reducers: {},
        extraReducers: (builder) => {
                builder
                        .addCase(removeStudentService.pending, (state) => {
                                state.loading = true;
                        })
                        .addCase(removeStudentService.fulfilled, (state, action) => {
                                state.loading = false;
                                state.error = null;
                                state.user = action.payload.user;
                        })
                        .addCase(removeStudentService.rejected, (state, action) => {
                                state.loading = false;
                                state.error = action.payload.error;
                        });
        },
});

export default removeStudentServiceSlice.reducer;
