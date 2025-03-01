import Header from "@/components/Header"
import Todo from "@/components/Todo"
import { createClientForServer } from "@/supabase/server"
import { redirect } from "next/navigation"

export default async function Home() {
	const supabase = createClientForServer()
	const {
		data: { user }
	} = await (await supabase).auth.getUser()

	if (!user) redirect("/sign-in")

	return (
		<>
			<Header />
			<Todo />
		</>
	)
}
