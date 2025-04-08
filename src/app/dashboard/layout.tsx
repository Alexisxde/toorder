import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import { createClientForServer } from "@/supabase/server"
import { User } from "@/types"
import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = { title: "Dashboard - Werty Task" }

interface Props {
	children: React.ReactNode
}

export default async function HeaderLayout({ children }: Props) {
	const supabase = await createClientForServer()
	const {
		data: { user }
	} = await supabase.auth.getUser()
	if (!user) redirect("/")

	return (
		<section className="flex overflow-hidden">
			<Sidebar user={user?.user_metadata as User} />
			<div className="w-full">
				<Header user={user?.user_metadata as User} />
				<main>{children}</main>
			</div>
		</section>
	)
}
