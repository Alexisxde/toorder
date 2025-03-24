import Column from "@/components/Column"
import DeleteCard from "@/components/DeleteCard"
import TaskIcon from "@/components/icons/Task.svg"
import ButtonModalTask from "@/components/ui/ButtonModalTask"
import type { Task } from "@/types"
import { PlusIcon } from "@heroicons/react/24/solid"
import Image from "next/image"

interface Props {
	tasks: Task[]
}

export default async function Todo({ tasks }: Props) {
	const columns = [
		{ title: "Nuevas", column: "new", headingColor: "text-neutral-400" },
		{ title: "TODO", column: "todo", headingColor: "text-yellow-200" },
		{ title: "En proceso", column: "process", headingColor: "text-blue-200" },
		{
			title: "Completadas",
			column: "completed",
			headingColor: "text-emerald-200"
		}
	]

	return (
		<>
			{tasks.length === 0 ? (
				<div className="mx-auto mt-8 flex w-full max-w-xl flex-col items-center justify-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 p-8">
					<Image className="mb-2" src={TaskIcon} alt="Task image icon" />
					<h2 className="font-medium">Add your first task</h2>
					<p className="text-center text-xs text-neutral-400">
						Create a goal for one of your teams that will appear in the team
						hub-that's how everyone will know what to work on.
					</p>
					<ButtonModalTask className="mt-2 flex items-center justify-center gap-1">
						<PlusIcon width="16px" height="16px" />
						<span>Add a task</span>
					</ButtonModalTask>
				</div>
			) : (
				<>
					<div className="flex justify-end gap-3 px-5 py-2">
						<ButtonModalTask className="flex items-center justify-center gap-1" variant="outline">
							<PlusIcon width="16px" height="16px" />
							<span>Add a task</span>
						</ButtonModalTask>
					</div>
					<main className="mx-auto flex h-[80dvh] gap-6 px-5 overflow-hidden">
						{columns.map(({ title, column, headingColor }) => (
							<Column
								key={column}
								title={title}
								column={column}
								headingColor={headingColor}
								cards={tasks}
							/>
						))}
						<DeleteCard />
					</main>
				</>
			)}
		</>
	)
}
