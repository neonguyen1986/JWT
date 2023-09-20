import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: {
            allUsers: null,
            isFetching: false,
            error: false,
        },

        delUser: {
            isFetching: false,
            error: false,
            msg: null,
        }
    },
    reducers: {
        //GET ALL USERS
        getUsersStart: (state) => {
            state.users.isFetching = true;
        },
        getUsersSuccess: (state, action) => {
            state.users.allUsers = action.payload;
            state.users.isFetching = false;
        },
        getUsersFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },

        //DELETE USER
        deleteUsersStart: (state) => {
            state.delUser.isFetching = true;
        },
        deleteUsersSuccess: (state, action) => {
            state.delUser.msg = action.payload;
            state.delUser.isFetching = false;
        },
        deleteUsersFailed: (state, action) => {
            state.delUser.msg = action.payload;
            state.delUser.isFetching = false;
            state.delUser.error = true;
        }
    }
})

export const {
    getUsersStart,
    getUsersSuccess,
    getUsersFailed,
    deleteUsersStart,
    deleteUsersSuccess,
    deleteUsersFailed,
} = userSlice.actions;

export default userSlice.reducer;