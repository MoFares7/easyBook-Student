import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../core/network/api';

export const addStudentService = createAsyncThunk(
        'addStudentService',
        async ({ payload }, { rejectWithValue }) => {
                try {
                        const response = await api.post('Student/Add', payload, {
                                headers: {
                                        'Content-Type': 'application/json',
                                },
                        });
                        console.log("addStudentService success: ", response.data);
                       return response.data;
                } catch (error) {
                        if (error.response) {
                                console.log("Detailed error response: ", error.response.data);
                                return rejectWithValue(error.response.data);
                        } else if (error.request) {
                                return rejectWithValue({ error: "Can't connect with the server. Please check your network connection." });
                        } else {
                                return rejectWithValue({ error: "Error setting up the request." });
                        }
                }
        }
);

const addStudentServiceSlice = createSlice({
        name: 'addStudentService',
        initialState: {
                user: null,
                loading: false,
                error: null,
        },
        reducers: {},
        extraReducers: (builder) => {
                builder
                        .addCase(addStudentService.pending, (state) => {
                                state.loading = true;
                        })
                        .addCase(addStudentService.fulfilled, (state, action) => {
                                state.loading = false;
                                state.error = null;
                                state.user = action.payload.user;
                        })
                        .addCase(addStudentService.rejected, (state, action) => {
                                state.loading = false;
                                state.error = action.payload.error;
                        });
        },
});

export default addStudentServiceSlice.reducer;
