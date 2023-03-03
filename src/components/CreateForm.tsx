import React, {useState} from 'react';
import {Button, Checkbox, Form, Input} from "antd";
import {useActions, useTypedSelector} from "../hooks/redux";
import {wsSend} from "./App";


const CreateForm = () => {
    const [nickname, setNickname] = useState<string>("")
    const [isPublic, setIsPublic] = useState<boolean>(false)
    const {auth} = useActions()
    const {isLoading} = useTypedSelector(state => state.userReducer)
    const submit = () => {
        wsSend({event: "CREATE_GAME", payload: {player:{username:nickname}}})
        auth(nickname)
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
            <Form.Item>
                <Checkbox checked={isPublic} onChange={e => setIsPublic(e.target.checked)}>Public game</Checkbox>
            </Form.Item>
            <Form.Item>
                <Button type={"primary"} htmlType={"submit"} loading={isLoading}>Continue</Button>
            </Form.Item>
        </Form>
    );
};

export default CreateForm;