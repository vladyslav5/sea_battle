import React from 'react';
import {Row} from "antd";
import GridComponent from "./GridComponent";


export interface cell {
    value: boolean,
    id: string
}

const GameBoard = () => {
    const grid: cell[][] = [] as cell[][]
    for (let i = 0; i < 10; i++) {
        const arr: cell[] = []
        for (let j = 0; j < 10; j++) {
            arr.push({value: false, id: `${i}+${j}`})
        }
        grid.push(arr)
    }

    return (
        <Row justify={"center"}>
            <div>
                <GridComponent grid={grid}/>
            </div>
            <div >
                <GridComponent grid={grid}/>
            </div>
        </Row>
    );
};

export default GameBoard;