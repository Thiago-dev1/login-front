import { FormEvent, useState } from "react"
import Router from "next/router";
import { api } from "../services/api"

export default function Registration() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    async function handleSubmit(event: FormEvent) {
        event.preventDefault()



        try {
            const response = await api.post("users", {
                name,
                email,
                password
            })

            if(response.status === 201) {
                alert("Usúario criado com sucesso")
                Router.push("/")
            }

            
        } catch (err) {
            if(err.response.data.message == 'User already exists') {
                alert("Usuario já cadastrado!")
            }
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nome</label>
                    <input type="text" name="name" id="name" onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Senha</label>
                    <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit">Cadastrar-se</button>
            </form>
        </div>
    )
}