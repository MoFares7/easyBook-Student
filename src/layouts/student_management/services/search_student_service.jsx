import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../core/network/api';

export const searchStudentService = createAsyncThunk(
        'Student/GetyId',
        async ({ Id }, { rejectWithValue }) => {
                try {
                        const response = await api.get('Student/GetyId', { params: { Id } });
                        console.log("searchStudentService success: ", response.data);
                        return response.data;
                } catch (error) {
                        console.error("searchStudentService error: ", error);
                        if (error.response) {
                                return rejectWithValue(error.response.data);
                        } else if (error.request) {
                                throw new Error("Can't connect with the server. Please check your network connection.");
                        } else {
                                throw new Error("Error setting up the request.");
                        }
                }
        }
);

const searchStudentServiceSlice = createSlice({
        name: 'searchStudentService',
        initialState: {
                status: null,
                loading: false,
                error: null,
                student: null,  
        },
        reducers: {},
        extraReducers: (builder) => {
                builder
                        .addCase(searchStudentService.pending, (state) => {
                                state.loading = true;
                        })
                        .addCase(searchStudentService.fulfilled, (state, action) => {
                                state.loading = false;
                                state.error = null;
                                state.student = action.payload;  
                        })
                        .addCase(searchStudentService.rejected, (state, action) => {
                                state.loading = false;
                                state.error = action.payload;
                        });
        },
});

export default searchStudentServiceSlice.reducer;