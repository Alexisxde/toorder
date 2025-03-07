import GitHub from "@/components/icons/GitHub"
import SignOutButton from "@/components/ui/SignOutButton"
import { createClientForServer } from "@/supabase/server"
import { redirect } from "next/navigation"

interface Props {
	page: string
}

export default async function Header({ page }: Props) {
	const supabase = await createClientForServer()
	const {
		data: { user }
	} = await supabase.auth.getUser()

	if (!user) redirect("/sign-in")

	return (
		<header className="flex h-12 max-h-12 min-h-12 items-center justify-between border-b-[0.25px] border-neutral-800 px-5">
			<span className="text-xs text-neutral-400">{page}</span>
			<div className="flex items-center gap-3">
				<a
					href="https://github.com/Alexisxde/tarea-plus"
					target="_blank"
					rel="noopener noreferrer">
					<GitHub />
				</a>
				<SignOutButton>Cerrar sesión</SignOutButton>
			</div>
		</header>
	)
}
