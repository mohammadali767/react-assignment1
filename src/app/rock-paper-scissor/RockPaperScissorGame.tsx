
"use client";

import { useState } from "react"
import Button from "../Button"

type Player = {
    name: string;
};

type Symbols = "Rock" | "Paper" | "Scissor";

type GameState = {
    players: [
        Player & { pickedSymbol?: Symbols; }, 
        Player & { pickedSymbol?: Symbols; },
    ];
    currentPlayer: string;
    winner?: string;
};

type RockPaperScissorGameProps = {
    players: [Player, Player];
    startingPlayer: string;
};

/**
 * Determines the winner of the game
 */
const determineRoundWinner = (players: GameState["players"]): string | undefined => {
    const player1 = players[0];
    const player2 = players[1];

    const winningConditions: [Symbols[], Symbols[], Symbols[]] = [
        [ "Paper", "Rock" ],
        [ "Rock", "Scissor" ],
        [ "Scissor", "Paper", ],
    ];

    if(typeof player1.pickedSymbol === "undefined" || typeof player2.pickedSymbol === "undefined"){
        // at least one player has not picked their choice
        return undefined;
    }


    for(const [ winningSybmol, loosingSymbol ] of winningConditions){
        if(player1.pickedSymbol === winningSybmol && player2.pickedSymbol === loosingSymbol){
            // player1 won
            return player1.name;
        }
        else if(player2.pickedSymbol === winningSybmol && player1.pickedSymbol === loosingSymbol){
            // player2 won
            return player2.name
        }
    }
}

export default function RockPaperScissorGame({ players, startingPlayer }: RockPaperScissorGameProps) {
    const [gameState, setGameState ] = useState<GameState>(() => {
        return {
            players: [
                { ...players[0], },
                { ...players[1], },
            ],
            currentPlayer: startingPlayer,
        };
    });

    const pickedButtons = gameState.players.map(player => player.pickedSymbol);

    const buttons: Symbols[] = ["Paper", "Rock", "Scissor",];

    return (
        <section className="h-full flex flex-col justify-center gap-27 items-center">
            <h2 className="text-2xl font-semibold">
                { gameState.winner ? `${gameState.winner} has Won!` : `${gameState.currentPlayer}'s Turn!`}
            </h2>

            <div className="flex gap-17">
                {
                    buttons.map(button => 
                        <Button key={button} onClick={() => {
                            let nextPlayer = "";

                            const newPlayerDatas: GameState["players"] = gameState.players.map(playerData => {
                                if(playerData.name !== gameState.currentPlayer){
                                    nextPlayer = playerData.name;
                                    return playerData;
                                }
                                return {
                                    ...playerData,
                                    pickedSymbol: button,
                                };                            
                            }) as GameState["players"];

                            const winner = determineRoundWinner(newPlayerDatas);

                            if(winner === undefined){
                                // one player has not picked yet 
                                setGameState({
                                    ...gameState,
                                    players: newPlayerDatas,
                                    currentPlayer: nextPlayer,
                                });
                                return;
                            }
                            setGameState({
                                ...gameState,
                                players: newPlayerDatas,
                                winner,
                            });
                        }} className={`w-sm ${gameState.winner !== undefined || pickedButtons.includes(button) ? "pointer-events-none" : ""}`}>
                            { pickedButtons.includes(button) ? button : "Click to see the value!" }
                        </Button>
                    )
                }
            </div>

            <div>
                <Button onClick={() => setGameState({ players: [
                    { 
                        name: gameState.players[0].name
                    },
                    {
                        name: gameState.players[1].name
                    },
                ], currentPlayer: startingPlayer, })} className="mt-17">
                    Restart
                </Button>
            </div>
        </section>
    );
}
