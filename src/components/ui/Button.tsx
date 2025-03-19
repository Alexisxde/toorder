"use client"
import { cn } from "@/lib/utils"
import { type ComponentProps } from "react"

interface Props extends ComponentProps<"button"> {
	variant?: "green" | "blue" | "gray" | "neutral"
	size?: "sm" | "md"
}

export default function Button({
	children,
	variant = "green",
	size = "md",
	className,
	...rest
}: Props) {
	const variants: Record<string, string> = {
		green:
			"bg-gradient-to-r from-green-400 via-green-500 to-green-600 shadow-green-500/50 hover:bg-gradient-to-br focus:ring-4 focus:ring-green-300 dark:shadow-lg dark:shadow-green-800/80 dark:focus:ring-green-800",
		blue: "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 shadow-blue-500/50 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:shadow-lg dark:shadow-blue-800/80 dark:focus:ring-blue-800",
		gray: "bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 shadow-gray-500/50 hover:bg-gradient-to-br focus:ring-4 focus:ring-gray-300 dark:shadow-lg dark:shadow-gray-800/80 dark:focus:ring-gray-800",
		neutral:
			"border border-neutral-800 bg-neutral-900 hover:border-neutral-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-200 focus:outline-none"
	}

	const sizes: Record<string, string> = { sm: "px-2.5 py-1", md: "px-4 py-2" }

	return (
		<button
			className={cn(
				`cursor-pointer rounded-lg px-4 py-2 text-center text-xs font-medium text-neutral-100 shadow-md transition-colors duration-200 ease-in-out focus:outline-none`,
				variants[variant] || variants.green,
				sizes[size] || sizes.md,
				className
			)}
			{...rest}>
			{children}
		</button>
	)
}
