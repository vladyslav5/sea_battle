import {v4} from "uuid"
import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {IGame} from "../../model/Game";


export interface UserState {
    id: string,
    error: string,
    nickname: string
    isAuth: boolean
    isLoading: boolean,
    roomId: string,
    rooms: any,
    isStarted: boolean
}

const initialState: UserState = {
    id: v4(),
    error: "",
    nickname: "sdf",
    isAuth: false,
    isLoading: true,
    isStarted: false,
    rooms: [],
    roomId: ""
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        auth: (state, action: PayloadAction<string>) => {
            state.nickname = action.payload
            state.isAuth = true
        },
        setRoomId: (state, action: PayloadAction<string>) => {
            state.roomId = action.payload
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
        setRooms: (state, action: PayloadAction<IGame[]>) => {
            state.rooms = action.payload
        }
    }

})

export default userSlice.reducer
