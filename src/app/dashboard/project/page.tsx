import Header from "@/components/Header"
import Todo from "@/components/Todo"
import { createClientForServer } from "@/supabase/server"
import { Card } from "@/types"
import { redirect } from "next/navigation"

interface Props {
	searchParams: { id: string }
}

export default async function ProjectPage({ searchParams }: Props) {
	const id = searchParams?.id
	if (!id) redirect("/")

	const supabase = await createClientForServer()
	const { data } = await supabase
		.from("projects")
		.select(`id, name, tasks (id, description, column )`)
		.eq("tasks.project_id", id)

	return (
		<>
			<Header page={data?.[0].name} />
			<Todo tasks={data?.[0].tasks as Card[]} />
		</>
	)
}
