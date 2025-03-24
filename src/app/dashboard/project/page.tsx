import Header from "@/components/Header"
import Todo from "@/components/Todo"
import { createClientForServer } from "@/supabase/server"
import type { Task } from "@/types"
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
			`name, tasks(id, title, description, column, badge, img_url, created_at, project_id)`
		)
		.eq("id", id)

	const project = data?.[0]
	const { name, tasks } = project || {}

	return (
		<>
			<Header page={name} />
			<Todo tasks={tasks as Task[]} />
		</>
	)
}
