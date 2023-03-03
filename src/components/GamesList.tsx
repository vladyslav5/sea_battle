import React, {FC} from 'react';
import {IGame} from "../model/Game";
import {Button, Row} from "antd";
import {wsSend} from "./App";

interface GameListProps {
    games: any
}

const GamesList: FC<GameListProps> = ({games}) => {
    const enter = (id: string) => {
        wsSend({event: "connect", payload: {gameid: id}})
    }
    return (
        <Row>
            {games?.map((item: any) => <div style={{border:"solid red 1px"}} key={item.roomId}>
                {item.roomId}
                {item.players.map((player: any) => <div style={{border:"solid blue 1px"}} key={player.username}>{player.username}</div>)}
            </div>)}
        </Row>
    );
};

export default GamesList;