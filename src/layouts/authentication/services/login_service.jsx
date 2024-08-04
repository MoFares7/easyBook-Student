import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../core/network/api';
import { getValue, setValue } from '../../../core/storage/storage';
const lang = getValue('lang');

export const authLogin = createAsyncThunk(
        'authLogin',
        async ({ payload }, { rejectWithValue }) => {
                try {
                        const response = await api.post('User/SignIn', payload, {
                                headers: {
                                        'Content-Type': 'application/json',
                                },
                        });
                        setValue('token', response.data.token);
                        if (lang === null || lang === "") {
                                setValue('lang', 'en');
                        }
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

const authLoginSlice = createSlice({
        name: 'authLogin',
        initialState: {
                user: null,
                loading: false,
                error: null,
        },
        reducers: {},
        extraReducers: (builder) => {
                builder
                        .addCase(authLogin.pending, (state) => {
                                state.loading = true;
                        })
                        .addCase(authLogin.fulfilled, (state, action) => {
                                state.loading = false;
                                state.error = null;
                                state.user = action.payload.user;
                        })
                        .addCase(authLogin.rejected, (state, action) => {
                                state.loading = false;
                                state.error = action.payload.error;
                        });
        },
});

export default authLoginSlice.reducer;
