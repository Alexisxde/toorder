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
			className="flex items-center justify-center rounded-lg bg-neutral-800 px-4 py-2 text-center text-xs font-semibold text-white shadow-md transition duration-200 ease-in select-none hover:bg-neutral-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-200 focus:outline-none disabled:cursor-not-allowed disabled:hover:bg-neutral-800"
			onClick={signOut}>
			{children}
		</button>
	)
}
