import { createSlice, current } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            currentUser: null,//all res from backend login will store in here
            isFetching: false,//for loading function
            error: false,
            message: null,
        },
        register: {
            isFetching: false,
            error: false,
            success: false,
            message: null,
        },
        logout: {
            isFetching1: false,
            error: false,
        },
    },
    reducers: {
        // LOGIN
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
            state.login.message = null;
        },
        loginFailed: (state, action) => {
            state.login.isFetching = false;
            state.login.error = true;
            state.login.currentUser = null;
            state.login.message = action.payload;
        },

        // REGISTER
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.error = false;
            state.register.success = true
            state.register.message = null;
        },
        registerFailed: (state, action) => {
            state.register.message = action.payload;
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false;
        },

        // LOGOUT
        logoutStart: (state) => {
            state.logout.isFetching1 = true;
        },
        logoutSuccess: (state) => {
            state.logout.isFetching1 = false;
            state.logout.error = false;
            state.login.currentUser = null;
        },
        logoutFailed: (state) => {
            state.logout.isFetching1 = false;
            state.logout.error = true;
        }
    }
});

export const {
    loginStart,
    loginFailed,
    loginSuccess,
    registerStart,
    registerSuccess,
    registerFailed,
    logoutStart,
    logoutSuccess,
    logoutFailed,
} = authSlice.actions

export default authSlice.reducer;