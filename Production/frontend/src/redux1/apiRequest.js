import axios from '../utils/axios';
import {
    loginFailed,
    loginStart,
    loginSuccess,
    registerStart,
    registerSuccess,
    registerFailed,
    logoutStart,
    logoutSuccess,
    logoutFailed,
} from './authSlice';
// import {
//     logoutStart,
//     logoutSuccess,
//     logoutFailed,
// } from './logoutSlice'
import { deleteUsersFailed, deleteUsersStart, deleteUsersSuccess, getUsersFailed, getUsersStart, getUsersSuccess } from './userSlice';
// import{selectAuthState} from './selector'

export const loginUser = async (user, dispatch, navigate) => {
    //user: include username, password,...
    //dispatch: call action from Slice
    //navigate: navigate after login page
    dispatch(loginStart())//display loading
    try {
        const res = await axios.post('v1/auth/login', user);
        dispatch(loginSuccess(res.data));//payload in loginSuccess will be res.data
        navigate('/')//navigate to homepage
    } catch (error) {
        dispatch(loginFailed("Wrong username or password!"))
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart())
    try {
        await axios.post('v1/auth/register', user);
        dispatch(registerSuccess());
        navigate('/login')
    } catch (error) {
        dispatch(registerFailed("this user is already exist!"))
    }
}

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getUsersStart())
    try {
        const res = await axiosJWT.get('v1/user', {
            headers: { token: `Bearer ${accessToken}` },
        })
        dispatch(getUsersSuccess(res.data))
    } catch (error) {
        dispatch(getUsersFailed())
    }
}

export const deleteUser = async (accessToken, dispatch, id) => {
    dispatch(deleteUsersStart())
    try {
        const res = await axios.delete(`v1/user/${id}`, {
            headers: { token: `Bearer ${accessToken}` },
        })
        dispatch(deleteUsersSuccess(res.data))
    } catch (error) {
        dispatch(deleteUsersFailed(error.response?.data))
    }
}

export const logoutUser = async (accessToken, dispatch, id, axiosJWT) => {

    dispatch(logoutStart())
    try {
        // Log when the API call is successful
        await axiosJWT.post('v1/auth/logout', id, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(deleteUsersSuccess(null))//remove delete text in Home pages
        // console.log('====check1'); // Log when the API call is successful
        dispatch(logoutSuccess());
        // console.log('===check2'); // Log when an error occurs in the API call
    } catch (error) {
        dispatch(logoutFailed());
    }
}