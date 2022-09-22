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

    useEffect(() => {
        api.get("games", {headers: {
            'Authorization' : `token ${user?.token}`
        }} )
            .then(response => response.data)
            .then(data => setGames(data))
    }, [])

    console.log(games)

    if (isAuthenticated) {
        return (
            <>
                <h1>Bem vindo {user.name}</h1>

                <div>
                    {games.map(game => {
                        return (
                            <img key={game.id} src={game.title} />
                        )
                    })}
                </div>
            </>
        )
    } else {
        return (
            <h1>Você não está logado</h1>
        )
    }
}