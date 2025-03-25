"use client"
import { createClient } from "@/supabase/client"
import { FireIcon, TrashIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function DeleteCard() {
	const [active, setActive] = useState(false)
	const router = useRouter()

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setActive(true)
	}

	const handleDragLeave = () => {
		setActive(false)
	}

	const handleDragEnd = async (e: React.DragEvent<HTMLDivElement>) => {
		const cardId = e.dataTransfer.getData("cardId")
		const supabase = createClient()
		await supabase.from("tasks").delete().eq("id", cardId)
		setActive(false)
		router.refresh()
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
