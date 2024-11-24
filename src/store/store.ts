import {combineReducers, configureStore} from "@reduxjs/toolkit";
import appReducer from './reducers/App.slice'

const rootReducer = combineReducers({
    app: appReducer // connect app reducer
})

export type RootState = ReturnType<typeof rootReducer>

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}