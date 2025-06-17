"use client"
import Column from "@/components/column"
import DeleteCard from "@/components/delete-card"
import { SheetTask } from "@/components/sheet-task"
import useTasks from "@/hooks/useTasks"
import { use } from "react"
import CardTaskSkeleton from "@/components/ui/card-task-skeleton"

interface Props {
	params: Promise<{ id: string }>
}

const COLUMNS = [
	{
		title: "News",
		column: "new",
		textColor: "text-neutral-600",
		bgColor: "bg-neutral-300"
	},
	{
		title: "Todo",
		column: "todo",
		textColor: "text-yellow-600",
		bgColor: "bg-yellow-300"
	},
	{
		title: "On process",
		column: "process",
		textColor: "text-blue-600",
		bgColor: "bg-blue-300"
	},
	{
		title: "Done",
		column: "completed",
		textColor: "text-emerald-600",
		bgColor: "bg-emerald-300"
	}
] as const

export default function Page({ params }: Props) {
	const { id } = use(params)
	const { loading } = useTasks({ id })

	return (
		<section className="mx-auto flex flex-col p-5 pt-2">
			<div className="mb-2 flex items-center justify-end">
				<SheetTask id={id} />
			</div>
			<div className="flex gap-4">
				{loading && [...Array(4)].map(i => <CardTaskSkeleton key={i} />)}
				{!loading &&
					COLUMNS.map(({ title, column, textColor, bgColor }) => (
						<Column
							key={column}
							title={title}
							column={column}
							textColor={textColor}
							bgColor={bgColor}
						/>
					))}
				<DeleteCard />
			</div>
		</section>
	)
}
