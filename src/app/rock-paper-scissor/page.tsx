
import RockPaperScissorGame from "./RockPaperScissorGame"

export default function RockPaperScissorPage(){
    return (
        <RockPaperScissorGame players={[
            { name: "Player1" },
            { name: "Player2" },
        ]}/>
    );
}
