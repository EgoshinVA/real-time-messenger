import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";
import {bindActionCreators} from "@reduxjs/toolkit";
import {appSlice} from "./reducers/App.slice";

const actions = {
    ...appSlice.actions,
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actions, dispatch)
}