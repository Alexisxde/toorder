import Footer from "@/components/footer"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import { createClientForServer } from "@/supabase/server"
import { User } from "@/types"
import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = { title: "Home | ToOrder Tasks" }

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
		<section className="flex">
			<Sidebar user={user?.user_metadata as User} />
			<div className="flex w-full flex-col">
				<Header user={user?.user_metadata as User} />
				<main className="max-w-8xl mx-auto w-full flex-1">{children}</main>
				<Footer />
			</div>
		</section>
	)
}
