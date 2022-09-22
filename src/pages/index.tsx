import { FormEvent, useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useContext(AuthContext)


  async function handleSuubmit(event: FormEvent) {
    event.preventDefault()

    const data = {
      email, 
      password
    }

    await signIn(data)
  }

  return (
    <div className="form-content">
      <form onSubmit={handleSuubmit} className="form">
        <div>
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" name="email" onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input type="password" id="password" name="password" onChange={e => setPassword(e.target.value)} />
        </div>

        <div className="buttons">
          <button className="buttonSigin" type="submit">Entrar</button>
          <a href="#">Cadastrar</a>
        </div>
      </form>
    </div>
  )
}
