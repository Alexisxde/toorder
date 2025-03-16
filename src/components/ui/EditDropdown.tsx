"use client"
import {
  EllipsisVerticalIcon,
  PencilSquareIcon
} from "@heroicons/react/24/solid"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export default function EditDropDown() {
	const [open, setOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setOpen(false)
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [])

	return (
		<motion.div
			animate={open ? "open" : "closed"}
			className="relative"
			ref={dropdownRef}>
			<button
				onClick={() => setOpen(prev => !prev)}
				className="flex cursor-pointer items-center outline-none">
				<EllipsisVerticalIcon width="16px" height="16px" />
			</button>

			<motion.ul
				initial={wrapperVariants.closed}
				variants={wrapperVariants}
				style={{ originY: "top", translateX: "-75%" }}
				className="absolute top-[120%] left-[50%] flex flex-col gap-2 overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900 p-1 shadow-xl">
				<motion.li
					variants={itemVariants}
					onClick={() => setOpen(false)}
					className="flex w-full cursor-pointer items-center gap-2 rounded-md p-1 text-xs font-medium whitespace-nowrap text-neutral-100 transition-colors hover:text-neutral-300">
					<motion.span variants={actionIconVariants}>
						<PencilSquareIcon width="12px" height="12px" />
					</motion.span>
					<span>Edit</span>
				</motion.li>
			</motion.ul>
		</motion.div>
	)
}

const wrapperVariants = {
	open: {
		scaleY: 1,
		transition: { when: "beforeChildren", staggerChildren: 0.1 }
	},
	closed: {
		scaleY: 0,
		transition: { when: "afterChildren", staggerChildren: 0.1 }
	}
}

const itemVariants = {
	open: { opacity: 1, y: 0, transition: { when: "beforeChildren" } },
	closed: { opacity: 0, y: -15, transition: { when: "afterChildren" } }
}

const actionIconVariants = {
	open: { scale: 1, y: 0 },
	closed: { scale: 0, y: -7 }
}
