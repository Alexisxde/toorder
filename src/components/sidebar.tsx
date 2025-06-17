"use client"
import SignOutButton from "@/components/button-sign-out"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useSideStore } from "@/store/useSideStore"
import type { User } from "@/types"
import { motion } from "framer-motion"
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
			className="relative flex h-dvh border-r-1 border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
			<div
				className={cn("sticky top-0 flex h-dvh shrink-0 flex-col", className)}
				style={{ width: isOpen ? "250px" : "8px" }}>
				{isOpen && (
					<>
            <div className="h-12 max-h-12 min-h-12 border-b-1 border-neutral-200 dark:border-neutral-800">
              a
            </div>
						<div className="flex-1 space-y-1">
              
						</div>
						<div className="p-2">
							<SignOutButton user={user} />
						</div>
					</>
				)}
			</div>
			<button
				onClick={() => setIsOpen()}
				className={cn(
					buttonVariants({ variant: "ghost" }),
					"absolute top-0 bottom-0 right-0 w-[8px] cursor-pointer rounded-none focus:outline-none"
				)}></button>
		</motion.aside>
	)
}

const Option = ({
	Icon,
	title,
	isOpen,
	href
}: {
	Icon: any // eslint-disable-line @typescript-eslint/no-explicit-any
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
