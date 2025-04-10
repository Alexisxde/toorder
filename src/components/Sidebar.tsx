"use client"
import SignOutButton from "@/components/SignOutButton"
import { cn } from "@/lib/utils"
import { useSideStore } from "@/store/useSideStore"
import type { User } from "@/types"
import {
	ChevronDoubleRightIcon,
	ClipboardDocumentIcon,
	FolderIcon
} from "@heroicons/react/24/outline"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { memo } from "react"
import Link from "next/link"
import Image from "next/image"
import Werty from "@/components/icons/werty.svg"

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
				"sticky top-0 flex h-dvh shrink-0 flex-col border-r-[0.25px] border-neutral-200 bg-neutral-100 p-2 dark:border-neutral-800 dark:bg-neutral-900",
				className
			)}
			style={{ width: isOpen ? "200px" : "fit-content" }}>
			<div className="mb-3 border-b-[0.25px] border-neutral-200 pb-3 dark:border-neutral-800">
        <Link href="/" className="grid size-10 shrink-0 place-content-center rounded-md bg-green-600">
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

const Logo = () => {
	return (
		<motion.div
			layout
			className="grid size-10 shrink-0 place-content-center rounded-md bg-green-600">
			<svg
				width="24"
				height="412"
				viewBox="0 0 516 412"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M437.391 231.531L280.172 337.688L370.203 411.594L437.391 231.531Z"
					fill="white"
				/>
				<path
					d="M0 0.40625H90.0312L75.25 11.8281H19.4844L93.0023 252.152C95.1879 259.296 105.104 259.811 108.019 252.932L215 0.40625H299.656L358.788 177.801C361.121 184.801 370.881 185.179 373.749 178.38L448.812 0.40625H516L448.812 184.5L315.781 273.188L257.238 114.286C254.692 107.374 244.949 107.285 242.277 114.149L174.048 289.427C172.82 292.581 173.71 296.166 176.27 298.38L221.719 337.688L116.906 408.906L0 0.40625Z"
					fill="white"
				/>
			</svg>
		</motion.div>
	)
}

export default memo(Sidebar)
