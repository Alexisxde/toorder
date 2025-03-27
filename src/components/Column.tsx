"use client"
import Card from "@/components/Card"
import DropIndicator from "@/components/DropIndicator"
import { useTaskStore } from "@/store/useTaskStore"
import { Task } from "@/types"
import { useState } from "react"

interface Props {
	title: string
	column: string
	headingColor: string
}

export default function Column({ title, column, headingColor }: Props) {
	const tasks = useTaskStore(state => state.tasks)
	const updateTasks = useTaskStore(state => state.updateTasks)
	const cardFilter = tasks?.filter(c => c.column === column)
	const [active, setActive] = useState(false)

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleDragStart = (e: any, card: Task) => {
		e.dataTransfer.setData("cardId", card.id)
	}

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		highlightIndicator(e)
		setActive(true)
	}

	const highlightIndicator = (e: React.DragEvent<HTMLDivElement>) => {
		const indicators = getIndicator()
		clearHighlight(indicators)
		const el = getNearestIndicator(e, indicators)
		el.element.style.opacity = "1"
	}

	const clearHighlight = (els?: HTMLElement[]) => {
		const indicators = els || getIndicator()
		indicators.forEach(i => {
			i.style.opacity = "0"
		})
	}

	const getNearestIndicator = (
		e: React.DragEvent<HTMLDivElement>,
		indicators: HTMLElement[]
	): { offset: number; element: HTMLElement } => {
		const DISTANCE_OFFSET = 50
		const el = indicators.reduce(
			(closest, child) => {
				const box = child.getBoundingClientRect()
				const offset = e.clientY - (box.top + DISTANCE_OFFSET)
				if (offset < 0 && offset > closest.offset) {
					return { offset, element: child }
				}
				return closest
			},
			{
				offset: Number.NEGATIVE_INFINITY,
				element: indicators[indicators.length - 1]
			}
		)
		return el
	}

	const getIndicator = (): HTMLElement[] => {
		return Array.from(document.querySelectorAll(`[data-column="${column}"]`))
	}

	const handleDragLeave = () => {
		setActive(false)
		clearHighlight()
	}

	const handleDragEnd = async (e: React.DragEvent<HTMLDivElement>) => {
		setActive(false)
		clearHighlight()

		const cardId = e.dataTransfer.getData("cardId")
		const indicators = getIndicator()
		const { element } = getNearestIndicator(e, indicators)
		const before = element.dataset.before || "-1"

		if (before !== cardId) {
			updateTasks({ id: cardId, column })
		}
	}

	return (
		<section className="w-full min-w-56">
			<div className="mb-2 flex items-center justify-between">
				<h3 className={`font-medium ${headingColor}`}>{title}</h3>
				<span className="rounded text-sm text-neutral-400">
					{cardFilter?.length}
				</span>
			</div>
			<div
				onDrop={handleDragEnd}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				className={`h-full w-full transition-colors ${active ? "bg-neutral-800/50" : "bg-slate-800/0"}`}>
				{cardFilter?.map(c => (
					<Card key={c.id} task={c} handleDragStart={handleDragStart} />
				))}
				<DropIndicator beforeId="-1" column={column} />
				{/* <AddCard column={column} /> */}
			</div>
		</section>
	)
}
