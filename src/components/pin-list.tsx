"use client"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { type Project } from "@/types"
import { BookmarkIcon } from "@heroicons/react/24/outline"
import {
	AnimatePresence,
	LayoutGroup,
	motion,
	type HTMLMotionProps
} from "framer-motion"
import Link from "next/link"
import * as React from "react"

export type PinListProps = {
	items: Project[]
	className?: string
} & HTMLMotionProps<"div">

export function PinList({ items, className, ...props }: PinListProps) {
	const [listItems, setListItems] = React.useState(items)
	const [togglingGroup, setTogglingGroup] = React.useState<
		"pinned" | "unpinned" | null
	>(null)

	const pinned = listItems.filter(u => u.pinned)
	const unpinned = listItems.filter(u => !u.pinned)
	const transition = { stiffness: 320, damping: 20, mass: 0.8, type: "spring" }
	const labelMotionProps = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: { duration: 0.22, ease: "easeInOut" }
	}

	const toggleStatus = (id: Pick<Project, "id">) => {
		const item = listItems.find((u: Project) => u.id === id)
		if (!item) return

		setTogglingGroup(item.pinned ? "pinned" : "unpinned")
		setListItems(prev => {
			const idx = prev.findIndex((u: Project) => u.id === id)
			if (idx === -1) return prev
			const updated = [...prev]
			const [item] = updated.splice(idx, 1)
			if (!item) return prev
			const toggled = { ...item, pinned: !item.pinned }
			if (toggled.pinned) updated.push(toggled)
			else updated.unshift(toggled)
			return updated
		})
		setTimeout(() => setTogglingGroup(null), 500)
		// updateProject(id, !item.pinned)
	}

	return (
		<motion.div
			className={cn(
				`flex flex-col gap-4 ${pinned.length > 0 && "mt-4"}`,
				className
			)}
			{...props}>
			<LayoutGroup>
				<div>
					<AnimatePresence>
						{pinned.length > 0 && (
							<motion.p
								layout
								key="pinned-label"
								className="mb-2 px-3 text-sm font-medium text-neutral-500 dark:text-neutral-300"
								{...labelMotionProps}>
								Pinned Projects
							</motion.p>
						)}
					</AnimatePresence>
					{pinned.length > 0 && (
						<div
							className={cn(
								"relative space-y-3",
								togglingGroup === "pinned" ? "z-5" : "z-10"
							)}>
							{pinned.map(item => (
								<motion.div
									className={cn(
										buttonVariants({ variant: "ghost" }),
										"group flex items-center justify-between px-4 text-left"
									)}
									key={item.id}
									layoutId={`item-${item.id}`}
									transition={transition}>
									<Link prefetch href={`/app/${item.id}`}>
										<div className="text-sm font-semibold">{item.name}</div>
										<div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
											Created Jun 18, 2025
										</div>
									</Link>
									<button
										onClick={() => toggleStatus(item.id)}
										className="cursor-pointer">
										<BookmarkIcon className="size-5 fill-neutral-100 text-neutral-100" />
									</button>
								</motion.div>
							))}
						</div>
					)}
				</div>
				<div>
					<AnimatePresence>
						{unpinned.length > 0 && (
							<motion.p
								layout
								key="all-label"
								className="mb-2 px-3 text-sm font-medium text-neutral-500 dark:text-neutral-300"
								{...labelMotionProps}>
								Alls Projects
							</motion.p>
						)}
					</AnimatePresence>
					{unpinned.length > 0 && (
						<div
							className={cn(
								"relative space-y-3",
								togglingGroup === "unpinned" ? "z-5" : "z-10"
							)}>
							{unpinned.map(item => (
								<motion.div
									className={cn(
										buttonVariants({ variant: "ghost" }),
										"group flex items-center justify-between px-4 text-left"
									)}
									key={item.id}
									layoutId={`item-${item.id}`}
									transition={transition}>
									<Link prefetch href={`/app/${item.id}`}>
										<div className="text-sm font-semibold">{item.name}</div>
										<div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
											Created Jun 18, 2025
										</div>
									</Link>
									<button
										onClick={() => toggleStatus(item.id)}
										className="group/button cursor-pointer">
										<div className="flex size-8 items-center justify-center rounded-full opacity-0 transition-opacity duration-250 group-hover:opacity-100">
											<BookmarkIcon className="size-5 text-neutral-100 group-hover/button:fill-neutral-100" />
										</div>
									</button>
								</motion.div>
							))}
						</div>
					)}
				</div>
			</LayoutGroup>
		</motion.div>
	)
}
