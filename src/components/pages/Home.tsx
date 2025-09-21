import { GameList } from "../common/game-details/GameDetailsList"
import {GameFormPreview} from "../common/game-form/game-form"

export function HomePage() {
    return (
        <>
            <GameList /> 
            <GameFormPreview />
        </>
    )
}