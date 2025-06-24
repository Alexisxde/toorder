"use client"
import GitHub from "@/components/icons/GitHub"
import { useSideStore } from "@/store/useSideStore"
import { createClient } from "@/supabase/client"
import type { User } from "@/types"
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

interface Props {
	user: User | null
}

export default function SignOutButton({ user }: Props) {
	const isOpen = useSideStore(state => state.isOpen)
	const { theme, setTheme } = useTheme()
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement | null>(null)
	const supabase = createClient()
	const router = useRouter()

	const signOut = async () => {
		try {
			const { error } = await supabase.auth.signOut()
			if (error) throw new Error("Failed to sign out.")
			router.push("/")
		} catch (error) {
			console.error(error) // eslint-disable-line no-console
		}
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsDropdownOpen(false)
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [])

	return (
		<motion.div
			animate={isDropdownOpen ? "open" : "closed"}
			className="relative flex items-center"
			ref={dropdownRef}>
			<button
				className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800"
				onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
				<div className="relative inline-flex">
					<Image
						src={user?.avatar_url as string}
						alt={user?.user_name as string}
						width="28"
						height="28"
						className="inline-block size-7 rounded-full object-cover object-center"
					/>
				</div>
				{isOpen && (
					<motion.div
						layout
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.125 }}
						className="flex flex-col">
						<span className="text-xs font-medium">{user?.name}</span>
						<div className="inline-flex items-center gap-1 text-xs text-neutral-600 dark:text-neutral-400">
							<GitHub className="size-3" />
							<span>{user?.user_name}</span>
						</div>
					</motion.div>
				)}
			</button>

			<motion.div
				initial={wrapperVariants.closed}
				variants={wrapperVariants}
				style={{ originY: "bottom" }}
				className="absolute top-[-205px] left-0 z-30 flex w-full flex-col gap-2 rounded-md border border-neutral-200 bg-neutral-100 p-2 text-[11px] dark:border-neutral-800 dark:bg-neutral-900">
				<div className="flex flex-col border-b-1 border-neutral-200 p-1 dark:border-neutral-800">
					<span className="text-xs">{user?.user_name}</span>
					<span className="mb-1 text-[11px] text-neutral-600 dark:text-neutral-400">
						{user?.email}
					</span>
				</div>
				<div className="flex flex-col border-b-1 border-neutral-200 dark:border-neutral-800">
					<span className="mb-1 text-neutral-600 dark:text-neutral-400">
						Theme
					</span>
					<div className="flex flex-col">
						<div
							className={`flex w-full cursor-pointer items-center gap-2 rounded-md p-1 font-medium whitespace-nowrap text-neutral-900 transition-colors hover:bg-neutral-200 hover:text-neutral-300 dark:text-neutral-100 dark:hover:bg-neutral-800 ${theme === "dark" && "bg-neutral-800"}`}>
							<button
								onClick={() => setTheme("dark")}
								className="flex w-full cursor-pointer items-center gap-2 px-1 py-0.5 text-center text-neutral-900 dark:text-neutral-100">
								{theme === "dark" && (
									<div className="size-2 rounded-full bg-neutral-600" />
								)}
								Dark
							</button>
						</div>
						<div
							className={`mb-2 flex w-full cursor-pointer items-center gap-2 rounded-md p-1 font-medium whitespace-nowrap text-neutral-900 transition-colors hover:bg-neutral-200 hover:text-neutral-300 dark:text-neutral-100 dark:hover:bg-neutral-800 ${theme === "light" && "bg-neutral-200"}`}>
							<button
								onClick={() => setTheme("light")}
								className="flex w-full cursor-pointer items-center gap-2 px-1 py-0.5 text-center text-neutral-900 dark:text-neutral-100">
								{theme === "light" && (
									<div className="size-2 rounded-full bg-neutral-600" />
								)}
								Light
							</button>
						</div>
					</div>
				</div>
				<div className="flex w-full cursor-pointer items-center gap-2 rounded-md p-1 font-medium whitespace-nowrap text-neutral-100 transition-colors hover:bg-neutral-200 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-300">
					<button
						onClick={signOut}
						className="flex w-full cursor-pointer items-center gap-2 px-2 py-1 text-center text-neutral-900 dark:text-neutral-100">
						<ArrowLeftEndOnRectangleIcon className="size-4 text-neutral-900 dark:text-neutral-100" />
						Logout
					</button>
				</div>
			</motion.div>
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
