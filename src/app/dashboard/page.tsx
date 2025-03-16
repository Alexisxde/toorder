import Header from "@/components/Header"
import ProjectIcon from "@/components/icons/Project.svg"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import { createClientForServer } from "@/supabase/server"
import {
	ChevronRightIcon,
	MagnifyingGlassIcon,
	PlusIcon
} from "@heroicons/react/24/solid"
import type { Metadata } from "next"
import Image from "next/image"
import { redirect } from "next/navigation"

export const metadata: Metadata = { title: "Dashboard - Tarea Plus" }

export default async function DashboardPage() {
	const supabase = await createClientForServer()
	const {
		data: { user }
	} = await supabase.auth.getUser()
	if (!user) redirect("/")
	const { data: projects } = await supabase
		.from("projects")
		.select()
		.eq("user_id", user.id)

	return (
		<section className="flex flex-1 flex-col">
			<Header page="Projects" />
			<main className="p-5">
				{!projects ? (
					<div className="mx-auto mt-8 flex w-full max-w-xl flex-col items-center justify-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 p-8">
						<Image
							className="mb-2"
							src={ProjectIcon}
							alt="Project image icon"
						/>
						<h2 className="font-medium">Create your first project on Werty</h2>
						<p className="text-center text-xs text-neutral-400">
							Establish a clear vision so that managers in your organization can
							mobilize their teams to all work in the same direction.
						</p>
						<Button className="mt-2 inline-flex items-center justify-center gap-1">
							<PlusIcon width="16px" height="16px" />
							<span>Create a Project</span>
						</Button>
					</div>
				) : (
					<>
						<div className="mb-2 flex justify-center gap-3 md:justify-end">
							<Button>New project</Button>
							<Input name="search" placeholder="Search for a project" size="sm">
								<MagnifyingGlassIcon />
							</Input>
						</div>
						<h2 className="mb-2">
							{user?.user_metadata.preferred_username}'s Org
						</h2>
						<div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
							{projects.map(({ id, name }, i: number) => (
								<a
									key={id}
									className="group animate-fade-in relative flex h-44 min-h-32 cursor-pointer rounded-md border border-neutral-800 bg-neutral-900 p-5 transition-colors duration-150 ease-in-out hover:border-neutral-700 hover:bg-neutral-800 md:min-h-44"
									href={`/dashboard/project?id=${id}`}
									style={{ animationDelay: `calc(0.1s * ${i + 1}` }}>
									<div className="flex h-full w-full flex-col">
										<div className="w-full justify-between">
											<p className="flex-shrink truncate pr-4 text-sm">
												{name}
											</p>
											<span className="text-xs text-neutral-400 lowercase">
												Lorem ipsum dolor sit, amet consectetur adipisicing
												elit. Provident harum, debitis id quis dicta at?
											</span>
											<div className="flex items-center gap-x-1.5"></div>
										</div>
										<div className="mt-auto w-full"></div>
									</div>
									<div className="absolute top-4 right-4 text-neutral-100 transition-all duration-200 group-hover:right-3">
										<ChevronRightIcon width={24} height={24} />
									</div>
								</a>
							))}
						</div>
					</>
				)}
			</main>
		</section>
	)
}
