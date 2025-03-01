import SignOutButton from "@/components/ui/SignOutButton"
import { createClientForServer } from "@/supabase/server"
import Image from "next/image"
import { redirect } from "next/navigation"

export default async function Header() {
	const supabase = createClientForServer()
	const {
		data: { user }
	} = await (await supabase).auth.getUser()

	if (!user) redirect("/sign-in")

	const {
		user_metadata: { avatar_url, full_name }
	} = user

	return (
		<header className="flex items-center justify-between px-10 py-5">
			<div className="w-24"></div>
			<div className="flex items-center justify-center gap-4">
				<SignOutButton>
					<Image
						className="mr-2 inline-block size-5 rounded-full object-cover object-center"
						src={avatar_url}
						width={20}
						height={20}
						alt={full_name}
						loading="lazy"
					/>
					Cerrar sesión
				</SignOutButton>
			</div>
		</header>
	)
}
