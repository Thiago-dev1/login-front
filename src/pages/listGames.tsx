import { config } from "process"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { api } from "../services/api"

interface Game {
    id: string,
    title: string
}

export default function ListGames() {
    const { user, isAuthenticated } = useContext(AuthContext)
    const [games, setGames] = useState<Game[]>([])

    //console.log(user?.name)

    useEffect(() => {
        api.get("games")
            .then(response => response.data)
            .then(data => setGames(data))
    }, [])

        return (
            <>
                <h1>Bem vindo {user?.name}</h1>

                <div>
                    {games.map(game => {
                        return (
                            <img key={game.id} src={game.title} />
                        )
                    })}
                </div>
            </>
        )
}