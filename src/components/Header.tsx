import Werty from "@/components/icons/werty.svg"
import SignOutButton from "@/components/SignOutButton"
import Image from "next/image"
import type { User } from "@/types"
import { createClientForServer } from "@/supabase/server"

export default async function Header() {
  const supabase = await createClientForServer()
	const {
		data: { user }
	} = await supabase.auth.getUser()

	return (
		<header className="sticky top-0 z-50 flex h-12 max-h-12 min-h-12 items-center justify-between border-b-[0.25px] border-neutral-800 bg-neutral-900 px-6">
			<a href="/">
				<Image className="h-5 w-auto" src={Werty} alt="Werty Logo" />
			</a>
				<SignOutButton user={user?.user_metadata as User} />
		</header>
	)
}
