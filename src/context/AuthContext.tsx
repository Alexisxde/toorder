"use client"
import { createClient } from "@/supabase/client"
import type { User } from "@/types"
import {
	createContext,
	useContext,
	useEffect,
	useState,
	type SetStateAction
} from "react"

interface Props {
	children: React.ReactNode
}

const AuthContext = createContext<User | null>(null)
const supabase = createClient()

export const AuthProvider = ({ children }: Props) => {
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		const { data: authListener } = supabase.auth.onAuthStateChange(
			async (_, session) => {
				if (session == null) return setUser(null)
				setUser(session?.user?.user_metadata as SetStateAction<User | null>)
			}
		)
		return () => authListener.subscription
	}, [])

	return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export const useUser = () => ({ user: useContext(AuthContext) })
