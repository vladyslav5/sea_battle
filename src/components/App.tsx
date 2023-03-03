import React, {useEffect} from 'react';
import AppRouter from './AppRouter';
import 'antd/dist/reset.css';
import '../index.css';
import {useActions} from "../hooks/redux";
import { useNavigate } from "react-router-dom";
import {EnumRoutes} from "../utils/routes";


export const client = new WebSocket("ws://localhost:5000/")
export const wsSend = (data: any) => {
    client.send(JSON.stringify(data))
}
const App = () => {
    const {setIsLoading, setError, setRooms, setRoomId} = useActions()
    const navigate = useNavigate()
    useEffect(() => {
        client.onopen = () => {
            console.log("open")
            setIsLoading(false)
        }
        client.onerror = (e) => {
            setError("Error type" + e.type)
        }
        client.onmessage = (messageEvent) => {
            const req = JSON.parse(messageEvent.data)
            console.log(req)
            if (req.event === "ROOMS_LIST") {
                setRooms(req.payload.rooms)
            }
            if (req.event === "ROOM_ID") {
                setRoomId(req.payload.roomId)
            }
            if(req.event === "START_GAME"){
                navigate(EnumRoutes.game)
            }
        }
    }, [])
    return (
        <div>
            <AppRouter/>
        </div>
    );
};

export default App;