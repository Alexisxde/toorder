"use client"
import type { Card } from "@/types"
import { FireIcon, TrashIcon } from "@heroicons/react/24/solid"
import { useState } from "react"

interface Props {
	setCards: React.Dispatch<React.SetStateAction<Card[]>>
}

export default function DeleteCard({ setCards }: Props) {
	const [active, setActive] = useState(false)

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setActive(true)
	}

	const handleDragLeave = () => {
		setActive(false)
	}

	const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
		const cardId = e.dataTransfer.getData("cardId")
		setCards(pv => pv.filter(c => c.id !== cardId))
		setActive(false)
	}

	return (
		<div
			onDrop={handleDragEnd}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			className={`grid size-56 shrink-0 place-content-center rounded border text-3xl ${
				active
					? "border-red-800 bg-red-800/20 text-red-500"
					: "border-neutral-800 bg-neutral-900/20 text-neutral-500"
			}`}>
			{active ? (
				<FireIcon className="size-11 animate-bounce" />
			) : (
				<TrashIcon className="size-11" />
			)}
		</div>
	)
}
