import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../core/network/api'

export const getGendersService = createAsyncThunk(
        'Settings/GetAllGenders',
        async () => {
                try {
                        const response = await api.get(`Settings/GetAllGenders`);
                        return response.data;
                } catch (error) {
                        throw Error(error.response.data.message);
                }
        }
);

const getGendersSlice = createSlice({
        name: 'getGendersService',
        initialState: {
                data: [],
                error: null,
                loading: false,
        },
        reducers: {},
        extraReducers: (builder) => {
                builder
                        .addCase(getGendersService.pending, (state) => {
                                state.loading = true;
                                state.error = null;
                        })
                        .addCase(getGendersService.fulfilled, (state, action) => {
                                state.loading = false;
                                state.data = action.payload;
                        })
                        .addCase(getGendersService.rejected, (state, action) => {
                                state.loading = false;
                                state.error = action.error.message;
                        });
        },
});

export default getGendersSlice.reducer;