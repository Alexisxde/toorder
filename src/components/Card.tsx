import DropIndicator from "@/components/DropIndicator"
import type { Card } from "@/types"
import { CalendarDaysIcon } from "@heroicons/react/24/solid"
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
	const indicators: Record<string, Record<string, string>> = {
		design: { background: "bg-violet-500", text: "text-violet-500" },
		develoment: { background: "bg-green-500", text: "text-green-500" },
		planning: { background: "bg-yellow-500", text: "text-yellow-500" }
	}

	return (
		<>
			<DropIndicator beforeId={id} column={column} />
			<motion.article
				layout
				layoutId={id}
				draggable
				onDragStart={e => handleDragStart(e, { id, description, column })}
				className="cursor-grab space-y-1 rounded border border-neutral-800 bg-neutral-900 p-4 active:cursor-grabbing">
				<span className="text-sm text-neutral-100">{description}</span>
				{description && (
					<p className="text-xs text-neutral-400">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
						corrupti.
					</p>
				)}
				<div className="my-2 border-b-[0.25px] border-neutral-800"></div>
				<div className="flex w-full items-center justify-between">
					{
						<span
							className={`me-3 flex items-center text-xs font-medium ${indicators["develoment"].text}`}>
							<span
								className={`me-1.5 flex size-2 shrink-0 rounded-full ${indicators["develoment"].background}`}></span>
							Develoment
						</span>
					}
					<div className="inline-flex items-center gap-2 rounded border border-neutral-800 bg-neutral-900 p-1 text-xs">
						<CalendarDaysIcon width="16px" height="16px" />
						<span>Feb 28</span>
					</div>
				</div>
			</motion.article>
		</>
	)
}
