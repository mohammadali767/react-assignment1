
import TicTacToeGame from "./TicTacToeGame";

export default function TicTacToePage() {
    return (
        <TicTacToeGame players={[
            { symbol: "X", name: "Player 1", },
            { symbol: "O", name: "Player 2",  },
        ]}/>
    );
}