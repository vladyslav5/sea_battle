import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store";
import {bindActionCreators} from "@reduxjs/toolkit";
import UserSlice, {userSlice} from "../store/reducers/UserSlice";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch
export const useActions = () => {
    const dispatch = useAppDispatch()
    return bindActionCreators({...userSlice.actions}, dispatch)
}