import React, {useState} from 'react';
import {Button, Form, Input} from "antd";
import {useActions, useTypedSelector} from "../hooks/redux";
import {wsSend} from "./App";


const EnterForm = () => {
    const [nickname, setNickname] = useState<string>("")
    const [roomId, setRoomId] = useState<string>("")
    const {auth, setRoomId: setId} = useActions()
    const {isLoading} = useTypedSelector(state => state.userReducer)
    // const {id} = useTypedSelector(state => state.userReducer)
    const submit = () => {
        wsSend({event: "JOIN_GAME", payload: {player: {username: nickname}, roomId}})
        auth(nickname)
        setId(roomId)
    }
    return (
        <Form
            name="auth"
            onFinish={submit}
        >
            <Form.Item
                label="Nickname"
                name={"nickname"}
                rules={[{required: true, message: "This filed is empty"}]}
            >
                <Input value={nickname} onChange={e => setNickname(e.target.value)}/>
            </Form.Item>
            <Form.Item
                label="Gameid"
                name={"gameid"}
                rules={[{required: true, message: "This filed is empty"}]}
            >
                <Input value={roomId} onChange={e => setRoomId(e.target.value)}/>
            </Form.Item>
            <Form.Item>
                <Button type={"primary"} htmlType={"submit"} loading={isLoading}>Continue</Button>
            </Form.Item>

        </Form>
    );
};

export default EnterForm;