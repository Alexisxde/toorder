import Header from "@/components/Header"
import Todo from "@/components/Todo"
import { createClientForServer } from "@/supabase/server"
import { Task } from "@/types"
import { redirect } from "next/navigation"

interface Props {
	searchParams: Promise<{ id?: string }>
}

export default async function ProjectPage({ searchParams }: Props) {
	const params = await searchParams
	const { id } = params
	if (!id) redirect("/")

	const supabase = await createClientForServer()
	const { data } = await supabase
		.from("projects")
		.select(
			`id, name, tasks (id, title, description, column, badge, created_at, project_id)`
		)
		.eq("tasks.project_id", id)

	return (
		<>
			<Header page={data?.[0]?.name} />
			<Todo tasks={data?.[0].tasks as Task[]} />
		</>
	)
}
