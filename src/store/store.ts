import {combineReducers, configureStore} from "@reduxjs/toolkit";
import appReducer from '../store/slice/appSlice'

const rootReducer = combineReducers({
    app: appReducer
})

export type RootState = ReturnType<typeof rootReducer>

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}