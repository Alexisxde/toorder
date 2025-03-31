"use client"
import { createClient } from "@/supabase/client"
import type { User } from "@/types"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

interface Props {
	user: User | null
}

export default function SignOutButton({ user }: Props) {
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
			className="relative flex items-center justify-center"
			ref={dropdownRef}>
			<button
				className="relative inline-flex cursor-pointer"
				onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
				<img
					src={user?.avatar_url as string}
					alt={user?.user_name as string}
					className="inline-block size-7 rounded-full object-cover object-center"
				/>
				<span className="absolute right-[14%] bottom-[14%] grid min-h-[10px] min-w-[10px] translate-x-1/2 translate-y-1/2 place-items-center rounded-full border border-green-500 bg-green-500 px-1 py-0.5 leading-none"></span>
			</button>

			<motion.ul
				initial={wrapperVariants.closed}
				variants={wrapperVariants}
				style={{ originY: "top", translateX: "-75%" }}
				className="absolute top-[120%] left-[50%] flex flex-col gap-2 overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900 p-1 shadow-xl">
				<li
					className="flex w-full cursor-pointer items-center gap-2 rounded-md p-1 text-xs font-medium whitespace-nowrap text-neutral-100 transition-colors hover:text-neutral-300">
					<button
						onClick={signOut}
						className="block w-full cursor-pointer px-2 py-1 text-left text-xs text-neutral-100">
						Logout
					</button>
				</li>
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