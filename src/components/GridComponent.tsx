import React, {FC} from 'react';
import {Card, Row} from "antd";
import CellComponent from "./CellComponent";
import {cell} from "./GameBoard";


interface GridComponentProps{
    grid:cell[][]
}
const GridComponent:FC<GridComponentProps> = ({grid}) => {
    return (
        <Card style={{margin:"0 50px"}}>
            {grid.map((row,index)=>
                <Row key={index}>{row.map(col=><CellComponent key={col.id} id={col.id}/>)}</Row>
            )}
        </Card>
    );
};

export default GridComponent;