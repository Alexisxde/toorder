import { createClient } from "@/supabase/client"
import { redirect } from "next/navigation"
import { create } from "zustand"

interface Auth {
	isAuth: boolean
	signInWithGithub: () => Promise<unknown>
	signOut: () => Promise<void>
}

const supabase = createClient()

export const useAuthStore = create<Auth>()(set => ({
	isAuth: false,
	signInWithGithub: async () => {
		try {
			const { data, error } = await supabase.auth.signInWithOAuth({
				provider: "github",
				options: {
					redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`
				}
			})
			if (error) throw new Error("Failed to sign in.")
			set({ isAuth: true })
			if (data.url) redirect(data.url)
			return data
		} catch (error) {}
	},
	signOut: async () => {
		try {
			const { error } = await supabase.auth.signOut()
			set({ isAuth: false })
			if (error) throw new Error("Failed to sign out.")
		} catch (error) {}
	}
}))
