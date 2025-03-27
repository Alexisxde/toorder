"use client"
import ButtonSheet from "@/components/ButtonSheet"
import Column from "@/components/Column"
import DeleteCard from "@/components/DeleteCard"
import TaskIcon from "@/components/icons/Task.svg"
import { BGLoading } from "@/components/ui/Loading"
import { useTaskStore } from "@/store/useTaskStore"
import { PlusIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { use, useEffect } from "react"

interface Props {
	params: Promise<{ id: string }>
}

const COLUMNS = [
	{ title: "Nuevas", column: "new", headingColor: "text-neutral-400" },
	{ title: "TODO", column: "todo", headingColor: "text-yellow-200" },
	{ title: "En proceso", column: "process", headingColor: "text-blue-200" },
	{
		title: "Completadas",
		column: "completed",
		headingColor: "text-emerald-200"
	}
] as const

export default function Page({ params }: Props) {
	const { id } = use(params)
	const getTasks = useTaskStore(state => state.getTasks)
	const loading = useTaskStore(state => state.loading)
	const tasks = useTaskStore(state => state.tasks)

	useEffect(() => {
		getTasks(id)
	}, [id, getTasks])

	if (loading) return <BGLoading />
	if (!tasks || tasks === null) return <div>Tasks not found...</div>

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
					<ButtonSheet className="mt-2 flex items-center justify-center gap-1">
						<PlusIcon width="16px" height="16px" />
						<span>Add a task</span>
					</ButtonSheet>
				</div>
			) : (
				<>
					<div className="flex justify-end gap-3 px-5 py-2">
						<ButtonSheet
							className="flex items-center justify-center gap-1"
							variant="outline">
							<PlusIcon width="16px" height="16px" />
							<span>Add a task</span>
						</ButtonSheet>
					</div>
					<section className="mx-auto flex gap-6 px-5">
						{COLUMNS.map(({ title, column, headingColor }) => (
							<Column
								key={column}
								title={title}
								column={column}
								headingColor={headingColor}
							/>
						))}
						<DeleteCard />
					</section>
				</>
			)}
		</>
	)
}
