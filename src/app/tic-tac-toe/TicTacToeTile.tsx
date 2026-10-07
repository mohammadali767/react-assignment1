
import { LiHTMLAttributes } from "react";
import type { GameState } from "./TicTacToeGame"

type TicTacToeTileProps = {
    tileNumber: number;
    gameState: GameState;
} & LiHTMLAttributes<HTMLLIElement>;

export default function TicTacToeTile({ tileNumber, gameState, children: _, className, ...rest }: TicTacToeTileProps){

    const gameIsOver = gameState.winner !== undefined;
    const tileIsSelected = gameState.selectedTiles[tileNumber];
    const tileIsAWinningTile = gameState.winningTiles?.includes(tileNumber);

    return (
        <li className={`min-h-100 min-w-100 bg-linear-to-br ${tileIsAWinningTile ? "from-lime-400 to-lime-500" : 
        "from-olive-900 to-olive-950"} flex items-center justify-center text-5xl rounded-sm 
        active:scale-90 ${tileIsSelected || gameIsOver ? "pointer-events-none" : ""}`} {...rest}>
            { gameState.selectedTiles[tileNumber] ?? "" }
        </li>
    );
}
