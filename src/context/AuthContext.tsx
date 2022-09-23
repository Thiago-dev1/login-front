import { createContext, useEffect, useState } from "react";
import Router from "next/router";
import { api } from "../services/api";
import { parseCookies, setCookie } from "nookies";

type SignInCredentials = {
    email: string,
    password: string
}

type AuthContextData = {
    signIn(credentials: SignInCredentials): Promise<void>
    isAuthenticated: boolean,
    user: User,

}

type User = {
    email: string,
    name: string,
}

export const AuthContext = createContext({} as AuthContextData)

type AuthProviderProps = {
    children: React.ReactNode
}

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<User>()

    const isAuthenticated = !!user;

    useEffect(() => {
        console.log("aaa")
        const { 'login.token': token } = parseCookies()

        console.log(token)

        if (token) {
            api.get('/me').then(response => {
                const { email, name } = response.data
                setUser({ email, name }) 
                
                //console.log(name)
            })
        }
    }, [])

    
    async function signIn({email, password}: SignInCredentials) {
        
        try {
            const response = await api.post('sessions',{
                email,
                password
            })

            const { token } = response.data
            const { name } = response.data.user


            setCookie(undefined, 'login.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/'
            })
     
            setUser({
                email,
                name
            })
            
            api.defaults.headers['Authorization'] = `Beare ${token}`

            Router.push("/listGames")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <AuthContext.Provider value={{signIn, isAuthenticated, user}} >
            {children}
        </AuthContext.Provider>
    )
}