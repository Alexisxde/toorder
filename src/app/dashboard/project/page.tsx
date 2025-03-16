import Header from "@/components/Header"
import Todo from "@/components/Todo"
import { createClientForServer } from "@/supabase/server"
import type { Task } from "@/types"
import Head from "next/head"
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
			`name, tasks(id, title, description, column, badge, created_at, project_id)`
		)
		.eq("id", id)

	const project = data?.[0]
	const { name, tasks } = project || {}

	return (
		<>
    <Head>
        <title>{name ? `${name} - Mi aplicación` : "Proyecto"}</title>
        <meta name="description" content={`Detalles del proyecto ${name}`} />
        <meta name="keywords" content={`proyecto, ${name}, tareas`} />
        <meta property="og:title" content={name || "Proyecto"} />
        <meta property="og:description" content={`Detalles del proyecto ${name}`} />
        <meta property="og:image" content="url-de-imagen.jpg" />
        <meta property="og:url" content={`https://www.mipagina.com/proyectos/${id}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={name || "Proyecto"} />
        <meta name="twitter:description" content={`Detalles del proyecto ${name}`} />
      </Head>
			<Header page={name} />
			<Todo tasks={tasks as Task[]} />
		</>
	)
}
