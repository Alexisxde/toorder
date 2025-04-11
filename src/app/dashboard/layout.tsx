import Header from "@/components/header"
import Footer from "@/components/footer"
import Sidebar from "@/components/sidebar"
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
    <section className="flex">
      <Sidebar user={user?.user_metadata as User} />
      <div className="flex flex-col w-full">
        <Header user={user?.user_metadata as User} />
        <main className="flex-1 overflow-y-auto max-w-8xl w-full">{children}</main>
        <Footer />
      </div>
    </section>
	)
}
