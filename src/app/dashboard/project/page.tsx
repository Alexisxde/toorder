import ButtonSheetProject from "@/components/ButtonSheetProject"
import { createClientForServer } from "@/supabase/server"
import { ChevronRightIcon } from "@heroicons/react/24/solid"
import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = { title: "Projects | Werty Task" }

export default async function ProjectPage() {
	const supabase = await createClientForServer()
	const {
		data: { user }
	} = await supabase.auth.getUser()
	if (!user) redirect("/")
	const { data: projects } = await supabase
		.from("projects")
		.select()
		.eq("user_id", user.id)

	if (!projects) return

	return (
		<section className="flex flex-col p-6">
			<h2 className="mb-2 text-xl">Projects</h2>
			<div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
				{projects?.map(({ id, name, description }, i: number) => (
					<a
						key={id}
						className="animate-fade-in group relative flex cursor-pointer rounded-md border border-neutral-200 bg-neutral-100 p-5 transition-colors duration-150 ease-in-out hover:border-neutral-300 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
						href={`/dashboard/project/${id}`}
						style={{ animationDelay: `calc(0.1s * ${i + 1}` }}>
						<div className="flex w-full flex-col">
							<h3 className="mb-1 flex-shrink pr-4 text-sm">{name}</h3>
							<p className="text-xs text-neutral-400">{description}</p>
						</div>
						<div className="absolute top-4 right-4 text-neutral-900 transition-all duration-200 group-hover:right-3 dark:text-neutral-100">
							<ChevronRightIcon width={24} height={24} />
						</div>
					</a>
				))}
				<ButtonSheetProject delay={projects.length + 1} />
			</div>
		</section>
	)
}
