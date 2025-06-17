"use client"
import GitHubIcon from "@/components/icons/GitHub"
import { Button } from "@/components/ui/button"
import { createClient } from "@/supabase/client"
import { redirect } from "next/navigation"

export default function SignInButton() {
	const supabase = createClient()

	const signInWithGithub = async () => {
		try {
			const { data, error } = await supabase.auth.signInWithOAuth({
				provider: "github",
				options: {
					redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`
				}
			})
			if (error) throw new Error("Failed to sign in.")
			if (data.url) redirect(data.url)
		} catch (error) {
			console.error(error) // eslint-disable-line no-console
		}
	}

	return (
		<Button
			variant="outline"
			rippleColor="#202724"
			size="md"
			onClick={signInWithGithub}>
			<GitHubIcon width={16} height={16} />
			Sign in with GitHub
		</Button>
	)
}
