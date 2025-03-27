import Header from "@/components/Header"
import { createClientForServer } from "@/supabase/server"
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
		<>
			<Header />
			<main>{children}</main>
		</>
	)
}
