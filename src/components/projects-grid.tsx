"use client"
import useProjects from "@/hooks/useProjects"
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

export default function ProjectsGrid() {
	const { projects } = useProjects()

	if (!projects) return

	return (
		<div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
			{projects?.map(({ id, name, description }, i: number) => (
				<Link
					key={id}
					className="animate-fade-in group relative flex aspect-video flex-col gap-2 rounded-lg border border-neutral-200 bg-neutral-100 p-5 transition-colors duration-150 ease-in-out hover:border-neutral-300 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
					href={`/app/${id}`}
					style={{ animationDelay: `calc(0.1s * ${i + 1}` }}>
					<div className="flex w-full flex-col">
						<h3 className="mb-1 flex-shrink pr-4 text-sm">{name}</h3>
						<p className="text-xs text-neutral-600 dark:text-neutral-400">
							{description}
						</p>
					</div>
					<div className="absolute top-4 right-4 text-neutral-900 opacity-50 transition-all duration-200 ease-in-out group-hover:right-3 group-hover:opacity-100 dark:text-neutral-100">
						<ChevronRightIcon className="size-6" />
					</div>
				</Link>
			))}
		</div>
	)
}
