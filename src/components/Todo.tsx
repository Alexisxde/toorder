"use client"
import Column from "@/components/Column"
import DeleteCard from "@/components/DeleteCard"
import { type Card } from "@/types"
import { useEffect, useState } from "react"

export default function Todos() {
	const [cards, setCards] = useState<Card[]>([])
	const [hasChecked, setHasChecked] = useState(false)

	useEffect(() => {
		hasChecked && localStorage.setItem("cards", JSON.stringify(cards)) // eslint-disable-line @typescript-eslint/no-unused-expressions
	}, [hasChecked, cards])

	useEffect(() => {
		const cardsData = localStorage.getItem("cards")
		setCards(cardsData ? JSON.parse(cardsData) : [])
		setHasChecked(true)
	}, [])

	return (
		<main className="mx-auto flex size-full h-dvh w-full gap-6 px-10">
			<Column
				title="Nuevas"
				column="new"
				headingColor="text-neutral-400"
				cards={cards}
				setCards={setCards}
			/>
			<Column
				title="TODO"
				column="todo"
				headingColor="text-yellow-200"
				cards={cards}
				setCards={setCards}
			/>
			<Column
				title="En proceso"
				column="process"
				headingColor="text-blue-200"
				cards={cards}
				setCards={setCards}
			/>
			<Column
				title="Completadas"
				column="completed"
				headingColor="text-emerald-200"
				cards={cards}
				setCards={setCards}
			/>
			<DeleteCard setCards={setCards} />
		</main>
	)
}
