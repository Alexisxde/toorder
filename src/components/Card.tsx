import DropIndicator from "@/components/DropIndicator"
import type { Card } from "@/types"
import { motion } from "framer-motion"

interface Props extends Card {
	handleDragStart: (
		e: MouseEvent | TouchEvent | PointerEvent,
		card: Card
	) => void
}

export default function Card({
	id,
	description,
	column,
	handleDragStart
}: Props) {
	return (
		<>
			<DropIndicator beforeId={id} column={column} />
			<motion.article
				layout
				layoutId={id}
				draggable
				onDragStart={e => handleDragStart(e, { id, description, column })}
				className="cursor-grab rounded border border-neutral-800 bg-neutral-900 p-3 active:cursor-grabbing">
				<p className="text-sm text-neutral-100">{description}</p>
			</motion.article>
		</>
	)
}
