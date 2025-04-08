"use client"
import Column from "@/components/Column"
import DeleteCard from "@/components/DeleteCard"
import { BGLoading } from "@/components/ui/Loading"
import { useTaskStore } from "@/store/useTaskStore"
import { use, useEffect } from "react"

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
	const getTasks = useTaskStore(state => state.getTasks)
	const loading = useTaskStore(state => state.loading)
	const tasks = useTaskStore(state => state.tasks)

	useEffect(() => {
		getTasks(id)
	}, [id, getTasks])

	if (loading) return <BGLoading />
	if (!tasks || tasks === null) return <div>Tasks not found...</div>

	return (
		<section className="mx-auto flex gap-6 px-5 pt-4">
			{COLUMNS.map(({ title, column, textColor, bgColor }) => (
				<Column
					key={column}
					title={title}
					column={column}
					textColor={textColor}
					bgColor={bgColor}
				/>
			))}
			<DeleteCard />
		</section>
	)
}
