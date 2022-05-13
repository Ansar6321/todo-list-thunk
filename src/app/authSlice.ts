import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";
import { LoginRequest } from "../models";
import { RootState } from "./store";

export const loginAsync = createAsyncThunk(
    'auth/login',
    async (request: LoginRequest) => {
        const response = await api.login(request);
        return response.token;
    }
)
export const logoutAsync = createAsyncThunk(
    'auth/logout',
    async (args, { getState }) => {
        const token: string = (getState() as { auth: { token: string } }).auth.token;
        try {
            await api.logOut(token);
            return true;
        } catch (error) {
            return false;
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: ''
    },
    reducers: {
        init: (state) => {
            state.token = localStorage.getItem('TOKEN') || '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.token = action.payload;
                localStorage.setItem('TOKEN', state.token);
            })
            .addCase(loginAsync.rejected, (state) => {
                state.token = '';
                localStorage.clear();
            });

        builder.addCase(logoutAsync.fulfilled, (state, action) => {
            if (action.payload) {
                state.token = '';
                localStorage.clear();
            }
        })
    }
});

export const selectToken = (state: RootState) => state.auth.token;
export const { init } = authSlice.actions;

export default authSlice.reducer;