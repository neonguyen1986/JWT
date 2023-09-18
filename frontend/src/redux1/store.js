import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import userReducer from "./userSlice"
// import logoutReducer from "./logoutSlice"

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Only persist the login substate of the auth slice
const authPersistConfig = {
    key: 'auth',
    version: 1,
    storage,
    whitelist: ['login'],// Only persist the login sub-state of the auth slice
}

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    user: userReducer,
})


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export let persistor = persistStore(store)