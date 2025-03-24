import { cn } from "@/lib/utils"
import * as React from "react"

export type ButtonVariants = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "icon"

interface ButtonProps {
	variant?: ButtonVariants
	size?: "default" | "sm" | "md" | "lg" | "icon"
}

export const Button = ({
	className,
	variant = "default",
	size = "default",
	children,
	...props
}: React.ComponentPropsWithRef<"button"> & ButtonProps) => {
	const variants: Record<string, string> = {
		default:
			"bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 shadow-sky-500/50 hover:bg-gradient-to-br focus:ring-4 focus:ring-sky-300 dark:shadow-lg dark:shadow-sky-800/80 dark:focus:ring-sky-800",
		destructive: "bg-red-500 text-neutral-100 shadow-sm hover:bg-red-800/90",
		icon: "text-neutral-100 hover:opacity-50",
		outline:
			"border border-neutral-800 bg-neutral-900 shadow-sm hover:border-neutral-700",
		ghost: "hover:bg-neutral-500 hover:text-neutral-100",
		link: "text-neutral-100 underline-offset-4 hover:underline"
	}

	const sizes: Record<string, string> = {
		default: "px-4 py-2 text-xs",
		sm: "px-3 py-1 text-xs",
		lg: "px-8 text-sm",
		icon: "size-9"
	}

	return (
		<button
			className={cn(
				"focus-visible:ring-ring flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-colors duration-200 ease-in-out focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
				variants[variant],
				sizes[size],
				className
			)}
			{...props}>
			{children}
		</button>
	)
}
Button.displayName = "Button"
