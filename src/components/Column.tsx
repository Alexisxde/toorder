"use client"
import AddCard from "@/components/AddCard"
import Card from "@/components/Card"
import DropIndicator from "@/components/DropIndicator"
import type { Card as CardType } from "@/types"
import type { Dispatch, DragEvent, SetStateAction } from "react"
import { useState } from "react"

interface Props extends Omit<CardType, "id"> {
	headingColor: string
	cards: CardType[]
	setCards: Dispatch<SetStateAction<CardType[]>>
}

export default function Column({
	title,
	column,
	headingColor,
	cards,
	setCards
}: Props) {
	const [active, setActive] = useState(false)
	const cardFilter = cards.filter(c => c.column === column)

	const handleDragStart = (e: DragEvent<unknown>, card: CardType) => {
		e.dataTransfer.setData("cardId", card.id)
	}

	const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		highlightIndicator(e)
		setActive(true)
	}

	const highlightIndicator = (e: DragEvent<HTMLDivElement>) => {
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
		e: DragEvent<HTMLDivElement>,
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

	const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
		setActive(false)
		clearHighlight()

		const cardId = e.dataTransfer.getData("cardId")
		const indicators = getIndicator()
		const { element } = getNearestIndicator(e, indicators)
		const before = element.dataset.before || "-1"

		if (before !== cardId) {
			let copy = [...cards]
			let cardToTransfer = copy.find(c => c.id === cardId)

			if (!cardToTransfer) return

			cardToTransfer = { ...cardToTransfer, column }
			copy = copy.filter(c => c.id !== cardId)

			if (before === "-1") {
				copy.push(cardToTransfer)
			} else {
				const insertedAtIndex = copy.findIndex(el => el.id === before)
				if (insertedAtIndex === undefined) return
				copy.splice(insertedAtIndex, 0, cardToTransfer)
			}
			setCards(copy)
		}
	}

	return (
		<section className="w-full min-w-56">
			<div className="mb-3 flex items-center justify-between">
				<h3 className={`font-medium ${headingColor}`}>{title}</h3>
				<span className="rounded text-sm text-neutral-400">
					{cardFilter.length}
				</span>
			</div>
			<div
				onDrop={handleDragEnd}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				className={`h-full w-full transition-colors ${active ? "bg-neutral-800/50" : "bg-slate-800/0"}`}>
				{cardFilter.map(c => (
					<Card key={c.id} {...c} handleDragStart={handleDragStart} />
				))}
				<DropIndicator beforeId="-1" column={column} />
				<AddCard column={column} setCards={setCards} />
			</div>
		</section>
	)
}
