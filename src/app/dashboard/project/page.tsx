import ProjectsGrid from "@/components/projects-grid"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Projects | Werty Task" }

export default async function ProjectPage() {
	return (
		<section className="flex flex-col p-6">
			<h2 className="mb-2 text-xl">Projects</h2>
			<ProjectsGrid />
		</section>
	)
}
