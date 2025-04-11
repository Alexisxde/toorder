"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { cva, type VariantProps } from "class-variance-authority"
import { AnimatePresence, motion } from "framer-motion"
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react"

export const sheetVariants = cva(
	"fixed top-0 bottom-0 right-0 z-50 w-full h-dvh border-l-1 border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 ",
	{
		variants: {
			size: {
				xs: "max-w-xs",
				sm: "max-w-sm",
				default: "max-w-md",
				lg: "max-w-lg",
				xl: "max-w-xl",
				"2xl": "max-w-2xl",
				"3xl": "max-w-3xl",
				"4xl": "max-w-4xl"
			}
		},
		defaultVariants: { size: "default" }
	}
)

interface SheetProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof sheetVariants> {
	title: string
	className?: string
	children: React.ReactNode
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
}

export const Sheet = ({
	title,
	size,
	className,
	children,
	open,
	setOpen
}: SheetProps) => {
	const ref = useRef<HTMLDivElement | null>(null)
	const toggleSheet = () => setOpen(prev => !prev)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setOpen(false)
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [])

	return (
		<>
			<Button
				rippleColor="#202724"
				variant="outline"
				onClick={toggleSheet}
        className="mb-0">
				<PlusIcon className="size-5" />
			</Button>
			<AnimatePresence mode="wait" initial={false}>
				{open && (
					<>
						<motion.div
							// initial={{ opacity: 0 }}
							// animate={{ opacity: 1 }}
							// exit={{ opacity: 0, transition: delay: 0.1 }}
							// transition={{ duration: 0.2 }}
							{...framerSidebarBackground}
							className="fixed top-0 right-0 bottom-0 left-0 z-40 bg-[rgba(0,0,0,0.1)] backdrop-blur-sm"
						/>
						<motion.div
							initial={{ x: "200%" }}
							animate={{ x: 0 }}
							exit={{ x: "200%" }}
							transition={{ duration: 0.15 }}
							className={cn(sheetVariants({ size }), className)}
							ref={ref}>
							<div className="flex items-center justify-between border-b-1 border-neutral-800 p-4">
								<h3 className="text-lg font-medium">{title}</h3>
								<Button
									rippleColor="#202724"
									variant="ghost"
									onClick={toggleSheet}>
									<XMarkIcon className="size-6" />
								</Button>
							</div>
							<div className="flex-1 p-4">{children}</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	)
}

const framerSidebarBackground = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0, transition: { delay: 0.1 } },
	transition: { duration: 0.2 }
}
