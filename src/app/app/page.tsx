import ProjectsGrid from "@/components/projects-grid"
import { SheetProject } from "@/components/sheet-project"
import { Button } from "@/components/ui/button"
import { TrashIcon } from "@heroicons/react/24/outline"

export default function AppPage() {
	return (
		<section className="flex flex-col p-4 md:p-6">
			<div className="mb-2 flex items-center justify-between gap-2">
				<h2 className="mb-2 text-xl">Home</h2>
				<div className="flex items-center gap-2">
					<SheetProject />
					<Button rippleColor="#8b0000" variant="destructive" disabled>
						<TrashIcon className="size-5" />
					</Button>
				</div>
			</div>
			<div className="flex flex-col gap-4 rounded-xl p-4">
				<ProjectsGrid />
			</div>
		</section>
	)
}
