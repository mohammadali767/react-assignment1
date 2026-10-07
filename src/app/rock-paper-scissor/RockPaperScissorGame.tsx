
"use client";

import { useState } from "react";

type Player = {
    name: string;
};

type Round = 0 | 1 | 2;

type Symbols = "Rock" | "Paper" | "Scissor";

type GameState = {
    players: [
        Player & { pickedSymbol?: Symbols; numRoundWon: Round; }, 
        Player & { pickedSymbol?: Symbols; numRoundWon: Round; },
    ];
    curruntRound: Round;
};

type RockPaperScissorGameProps = {
    players: [Player, Player];
};

export default function RockPaperScissorGame({ players }: RockPaperScissorGameProps) {

    const [gameState, setGameState ] = useState<GameState>(() => {
        return {
            players: [
                {
                    ...players[0],
                    numRoundWon: 0,
                },
                {
                    ...players[1],
                    numRoundWon: 0,
                },
            ],
            curruntRound: 0,
        };
    });

    return (
        <section>

        </section>
    );
}
