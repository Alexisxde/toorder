import DropIndicator from "@/components/DropIndicator"
import EditDropDown from "@/components/EditDropdown"
import { month } from "@/lib/utils"
import type { Task } from "@/types"
import { CalendarDaysIcon } from "@heroicons/react/24/solid"
import { motion } from "framer-motion"

interface Props {
	task: Task
	handleDragStart: (e: any, task: Task) => void
}

export default function Card({ task, handleDragStart }: Props) {
	const indicators: Record<string, Record<string, string>> = {
		design: { background: "bg-violet-500", text: "text-violet-500" },
		development: { background: "bg-green-500", text: "text-green-500" },
		planning: { background: "bg-yellow-500", text: "text-yellow-500" },
		study: { background: "bg-blue-500", text: "text-blue-500" }
	}
	const { id, column, description, title, badge, img_url, created_at } = task
	const data_format = new Date(created_at)

	return (
		<>
			<DropIndicator beforeId={id} column={column} />
			<motion.article
				layout
				layoutId={id}
				draggable
				onDragStart={e => handleDragStart(e, task)}
				className="cursor-grab space-y-1 rounded border border-neutral-800 bg-neutral-900 p-4 active:cursor-grabbing">
				<div className="flex items-start justify-between">
					<span className="text-sm font-medium text-neutral-100">{title}</span>
					<EditDropDown />
				</div>
				{description && (
					<p className="mb-2 text-xs text-pretty text-neutral-400">
						{description}
					</p>
				)}
				{img_url && (
					<img
						src={img_url}
						alt={title}
						className="h-36 w-full rounded-md object-cover"
					/>
				)}
				<div className="my-2 border-b-[0.25px] border-neutral-800"></div>
				<div className="flex w-full items-center justify-between">
					<span
						className={`me-3 flex items-center text-xs font-medium capitalize ${indicators[badge].text}`}>
						<span
							className={`me-1.5 flex size-2 shrink-0 rounded-full ${indicators[badge].background}`}></span>
						{badge}
					</span>
					<div className="inline-flex items-center gap-2 rounded border border-neutral-800 bg-neutral-900 p-1 text-xs">
						<CalendarDaysIcon width="16px" height="16px" />
						<span>
							{month(data_format.getMonth())}{" "}
							{data_format.getDate() < 10
								? `0${data_format.getDate()}`
								: data_format.getDate()}
						</span>
					</div>
				</div>
			</motion.article>
		</>
	)
}
