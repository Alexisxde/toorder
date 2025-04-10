"use client"
import Werty from "@/components/icons/werty.svg"
import SignOutButton from "@/components/sign-out-button"
import { cn } from "@/lib/utils"
import { useSideStore } from "@/store/useSideStore"
import type { User } from "@/types"
import {
	ChevronDoubleRightIcon,
	ClipboardDocumentIcon,
	FolderIcon
} from "@heroicons/react/24/outline"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { memo } from "react"

interface Props {
	className?: string
	user: User | null
}

function Sidebar({ className, user }: Props) {
	const isOpen = useSideStore(state => state.isOpen)
	const setIsOpen = useSideStore(state => state.setIsOpen)

	return (
		<motion.aside
			layout
			className={cn(
				"sticky top-0 z-50 flex h-dvh shrink-0 flex-col border-r-[0.25px] border-neutral-200 bg-neutral-100 p-2 dark:border-neutral-800 dark:bg-neutral-900",
				className
			)}
			style={{ width: isOpen ? "180px" : "fit-content" }}>
			<div className="mb-3 border-b-[0.25px] border-neutral-200 pb-3 dark:border-neutral-800">
				<Link
					href="/"
					className="grid size-10 shrink-0 place-content-center rounded-md bg-green-600">
					<Image className="size-5 w-auto" src={Werty} alt="Werty Logo" />
				</Link>
			</div>
			<div className="flex-1 space-y-1">
				<Option
					Icon={ClipboardDocumentIcon}
					title="Dashboard"
					href="/dashboard"
					isOpen={isOpen}
				/>
				<Option
					Icon={FolderIcon}
					title="Projects"
					href="/dashboard/project"
					isOpen={isOpen}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<SignOutButton user={user} />
				<motion.button
					layout
					onClick={() => setIsOpen()}
					className="rounded-md border-neutral-200 transition-colors hover:bg-neutral-200 dark:border-neutral-800 dark:hover:bg-neutral-800">
					<div className="flex items-center justify-center">
						<motion.div
							layout
							className="grid size-10 place-content-center text-lg">
							<ChevronDoubleRightIcon
								className={`size-4 text-neutral-900 transition-transform dark:text-neutral-100 ${isOpen && "rotate-180"}`}
							/>
						</motion.div>
					</div>
				</motion.button>
			</div>
		</motion.aside>
	)
}

const Option = ({
	Icon,
	title,
	isOpen,
	href
}: {
	Icon: any
	title: string
	isOpen: boolean
	href: string
}) => {
	const pathname = usePathname()

	return (
		<motion.a
			layout
			href={href}
			className={`relative flex h-10 w-full items-center rounded-md text-neutral-900 transition-colors dark:text-neutral-100 ${href === pathname ? "bg-neutral-200 dark:bg-neutral-800" : "hover:bg-neutral-200 dark:hover:bg-neutral-800"}`}>
			<motion.div
				layout
				className="grid h-full w-10 place-content-center text-lg">
				<Icon className="size-5 text-neutral-900 dark:text-neutral-100" />
			</motion.div>
			{isOpen && (
				<motion.span layout className="text-xs font-medium">
					{title}
				</motion.span>
			)}
		</motion.a>
	)
}

export default memo(Sidebar)
