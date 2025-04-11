import { cn } from "@/lib/utils"
import * as React from "react"

export const Input = ({
	className,
	type,
	ref,
	...props
}: React.ComponentPropsWithRef<"input">) => {
	return (
		<input
			type={type}
			ref={ref}
			autoFocus
			className={cn(
				"focus-active:border-neutral-700 flex h-9 w-full rounded-md border border-neutral-800 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-500 placeholder:text-sm placeholder:text-neutral-500 hover:border-neutral-700 focus:border-neutral-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
				className
			)}
			{...props}
		/>
	)
}
