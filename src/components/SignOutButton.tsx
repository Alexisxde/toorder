"use client"
import { Button } from "@/components/ui/Button"
import { createClient } from "@/supabase/client"
import { useRouter } from "next/navigation"
import { type ComponentProps } from "react"

interface Props extends ComponentProps<"button"> {}

export default function SignOutButton({ children }: Props) {
	const supabase = createClient()
	const router = useRouter()

	const signOut = async () => {
		try {
			const { error } = await supabase.auth.signOut()
			if (error) throw new Error("Failed to sign out.")
			router.push("/")
		} catch (error) {
			console.error(error) // eslint-disable-line no-console
		}
	}

	return (
		<Button variant="outline" onClick={signOut}>
			{children}
		</Button>
	)
}
