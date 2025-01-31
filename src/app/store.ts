import {configureStore} from "@reduxjs/toolkit";
import appReducer from './App.slice'
import chatSlice from "../feauteres/chat/model/chatSlice";
import userSLice from "../feauteres/users/model/userSLice";


export const store = configureStore({
    reducer: {
        app: appReducer,
        chat: chatSlice,
        user: userSLice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch