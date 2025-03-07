import Header from "@/components/Header"
import Button from "@/components/ui/Button"
import { createClientForServer } from "@/supabase/server"
import {
	ChevronRightIcon,
	MagnifyingGlassIcon
} from "@heroicons/react/24/solid"
import { redirect } from "next/navigation"

export default async function HomePage() {
	const supabase = await createClientForServer()
	const {
		data: { user }
	} = await supabase.auth.getUser()

	if (!user) redirect("/sign-in")

	const { data: projects } = await supabase
		.from("projects")
		.select()
		.eq("user_id", user?.id)

	return (
		<section className="flex flex-1 flex-col">
			<Header page="Projects" />
			<main className="p-5">
				<div className="flex justify-end gap-3">
					<Button>New project</Button>
					<div className="flex items-center justify-between rounded-lg border border-neutral-700 bg-neutral-800 px-2.5 py-1 pr-8 text-xs">
						<span className="mr-2">
							<MagnifyingGlassIcon
								className="text-neutral-300"
								width={16}
								height={16}
							/>
						</span>
						<input
							className="placeholder:text-neutral-400 focus:outline-none"
							placeholder="Search for a project"
							type="text"
						/>
					</div>
				</div>
				<h2 className="mb-3">{user?.user_metadata.preferred_username}'s Org</h2>
				{!projects ? (
					<div className="flex w-full flex-col items-center justify-center gap-2 p-10">
						<p>Cree su primer proyecto de tareas.</p>
					</div>
				) : (
					<div className="flex items-center gap-4">
						{projects?.map(({ id, name }) => (
							<a
								key={id}
								className="relative flex h-44 min-h-32 w-72 cursor-pointer rounded-md border border-neutral-700 bg-neutral-800 p-5 md:min-h-44"
								href={`/project?id=${id}`}>
								<div className="flex h-full w-full flex-col">
									<div className="w-full justify-between">
										<p className="flex-shrink truncate pr-4 text-sm">{name}</p>
										<span className="text-sm text-neutral-400 lowercase">
											Lorem ipsum dolor sit, amet consectetur adipisicing elit.
											Provident harum, debitis id quis dicta at?
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
				)}
			</main>
		</section>
	)
}
