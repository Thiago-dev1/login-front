import { createContext, useState } from "react";
import Router from "next/router";
import { api } from "../services/api";

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
    token: string
}

export const AuthContext = createContext({} as AuthContextData)

type AuthProviderProps = {
    children: React.ReactNode
}

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<User>()

    const isAuthenticated = !!user;
    
    async function signIn({email, password}: SignInCredentials) {
        
        try {
            const response = await api.post('sessions',{
                email,
                password
            })

            const { token, user } = response.data
            
            setUser({
                email,
                name: user.name,
                token
            })
            
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