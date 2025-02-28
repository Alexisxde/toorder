import DropIndicator from "@/components/DropIndicator"
import { motion } from "framer-motion"
import type { Card } from "@/types"

interface Props extends Card {
	handleDragStart: (
		e: MouseEvent | TouchEvent | PointerEvent,
		card: Card
	) => void
}

export default function Card({ id, title, column, handleDragStart }: Props) {
	return (
		<>
			<DropIndicator beforeId={id} column={column} />
			<motion.article
				layout
				layoutId={id}
				draggable
				onDragStart={e => handleDragStart(e, { id, title, column })}
				className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing">
				<p className="text-sm text-neutral-100">{title}</p>
			</motion.article>
		</>
	)
}
