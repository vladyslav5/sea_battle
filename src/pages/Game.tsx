import React from 'react';
import { useParams } from 'react-router-dom';
import GameBoard from '../components/GameBoard';

const Game = () => {
    const params = useParams()
    console.log(params)
    return (
        <div>
           params - {params.gameid}
           <GameBoard />
        </div>
    );
};

export default Game;