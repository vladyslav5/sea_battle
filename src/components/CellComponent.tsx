import React, {FC} from 'react';
import {Card} from "antd";
interface CellComponentProps{
    id:string
}
const CellComponent:FC<CellComponentProps> = ({id}) => {
    return (
        <Card size={"default"} bodyStyle={{border:"1px solid black"}}>

        </Card>
    );
};

export default CellComponent;