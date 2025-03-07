"use client"
import { createClient } from "@/supabase/client"
import { useRouter } from "next/navigation"

export default function SignOutButton({
	children
}: {
	children: React.ReactNode
}) {
	const supabase = createClient()
	const router = useRouter()

	const signOut = async () => {
		try {
			const { error } = await supabase.auth.signOut()
			if (error) throw new Error("Failed to sign out.")
			router.refresh()
		} catch (error) {
			console.error(error) // eslint-disable-line no-console
		}
	}

	return (
		<button
			type="button"
			className="rounded-lg border border-neutral-700/80 bg-neutral-800 px-2.5 py-1 text-xs text-neutral-100 transition duration-200 ease-in select-none hover:border-neutral-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-200 focus:outline-none"
			onClick={signOut}>
			{children}
		</button>
	)
}
