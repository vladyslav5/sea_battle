import React, {useState} from 'react';
import {Button, Form, Input, InputNumber, Layout, Row} from "antd";
import {wsSend} from "../components/App";
import GamesList from "../components/GamesList";
import {useTypedSelector} from "../hooks/redux";


const Main = () => {
    const [message, setMessage] = useState<string>("")
    const {rooms, roomId} = useTypedSelector(state => state.userReducer)
    const [page, setPage] = useState<number>(0)
    const submit = () => {
    }
    return (
        <Layout>
            <Row justify={"center"} align={"middle"} style={{height: '100vh'}}>
                <Form
                    onFinish={submit}
                >
                    <Form.Item>
                        {roomId}
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={() => wsSend({event: "GET_OUT"})}> Выйдти</Button>
                    </Form.Item>
                    <Form.Item>
                        <GamesList games={rooms}/>
                    </Form.Item>
                    <Form.Item>
                        <Input value={message} onChange={e => setMessage(e.target.value)}/>
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={() => wsSend({event: "CREATE_GAME", payload: {player: {username: "123"}}})}>
                            create
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <InputNumber min={1} max={10} defaultValue={page} onChange={(value) => setPage(value || 0)}/>;
                        <Button onClick={() => wsSend({event: "ROOMS_LIST", payload: {page: page, offset: 6}})}>
                            list
                        </Button>
                    </Form.Item>
                </Form>
            </Row>
        </Layout>
    );
};

export default Main;