
"use client";

import Button from "../Button"
import { useState } from "react"
import TicTacToeTile from "./TicTacToeTile";

type XPlayer = {
    name: string;
    symbol: "X";
};

type OPlayer = {
    name: string;
    symbol: "O";
};

type TicTacToeProps = {
    players: [XPlayer, OPlayer];
    startingPlayer?: "X" | "O";
};

export type GameState = {
    players: [ XPlayer, OPlayer ];
    currentSymbol: "X" | "O";
    winner?: "X" | "O" | "neither";
    selectedTiles: {
        [tile: number]: "X" | "O";
    },
    winningTiles?: [number, number, number];
};

/**
 * Checks if a player is the winner
 */
const isWinner = (
    palyerSymbol: "X" | "O", 
    tiles: GameState["selectedTiles"]
): [boolean, GameState["winningTiles"]?] => {
    const winningConditions: [number, number, number][] = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const winningCondition = winningConditions.find(condition => {
        return condition.every(tile => {
            return tiles[tile] && tiles[tile] === palyerSymbol;
        });
    });

    if(winningCondition){
        return [ true, winningCondition ];
    }

    return [ false ];
}

/**
 * Checks if the game resulted in a draw
 */
const isADraw = (tiles: GameState["selectedTiles"]) => {
    return Object.keys(tiles).length === 9;
}


export default function TicTacToeGame({ players, startingPlayer="X" }: TicTacToeProps){
    const [ gameState, setGameState ] = useState<GameState>(() => {
        return {
            players: [
                {
                    ...players[0],
                },
                {
                    ...players[1],
                },
            ],
            currentSymbol: startingPlayer ,
            selectedTiles: {},
        };
    });

    const currentPlayer = gameState.currentSymbol === "X" ? gameState.players[0] : gameState.players[1];
    const roundIsADraw = gameState.winner === "neither";
    const currentPlayerIsWinner = (!roundIsADraw && gameState.winner) ?? false;

    const handleTileClick = (tile: number): void => {
        const newSelectedTiles = {
            ...gameState.selectedTiles,
            [tile]: currentPlayer.symbol,
        };

        const [ playerIsWinner, winningTiles ] = isWinner(gameState.currentSymbol, newSelectedTiles);

        if(playerIsWinner){
            setGameState({
                ...gameState,
                winner: gameState.currentSymbol,
                selectedTiles: newSelectedTiles,
                winningTiles: winningTiles,
            });

            return;
        }

        if(isADraw(newSelectedTiles)){
            setGameState({
                ...gameState,
                selectedTiles: newSelectedTiles,
                winner: "neither",
            });

            return;
        }

        setGameState({
            ...gameState,
            currentSymbol: currentPlayer.symbol === "X" ? "O" : "X",
            selectedTiles: {
                ...gameState.selectedTiles,
                [tile]: currentPlayer.symbol,
            },
        })
    }
    
    const header = roundIsADraw ? "It Is A Draw!" : currentPlayerIsWinner ? 
    `${currentPlayer.name} has Won!`: `${currentPlayer.name}'s Turn`;

    return (
        <section className="h-full flex flex-col justify-center gap-27 items-center">
            <h2 className="text-2xl font-semibold">
                { header }
            </h2>

            <ul className="grid grid-cols-3 gap-7">
                {
                    [0, 1, 2, 3, 4, 5, 6, 7, 8].map(tile => 
                        <TicTacToeTile key={tile} tileNumber={tile}
                        onClick={() => handleTileClick(tile) } gameState={gameState}/>
                    )
                }
            </ul>

            <div>
                <Button onClick={() => setGameState({
                    players: gameState.players,
                    selectedTiles: {},
                    currentSymbol: startingPlayer,
                })}>
                    Restart Game
                </Button>
            </div>
        </section>
    );
}
