import ProjectsGrid from "@/components/projects-grid"
import { SheetProject } from "@/components/sheet-projects"
import { Button } from "@/components/ui/button"
import { TrashIcon } from "@heroicons/react/24/outline"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Projects | Werty Task" }

export default async function ProjectPage() {
	return (
		<section className="flex flex-col p-6">
			<div className="flex items-center justify-between">
				<h2 className="mb-2 text-xl">Projects</h2>
				<SheetProject title="Create project" />
				<Button rippleColor="#202724" variant="destructive" className="mb-2">
					<TrashIcon className="size-5" />
				</Button>
			</div>
			<ProjectsGrid />
		</section>
	)
}
