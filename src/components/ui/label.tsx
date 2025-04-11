import { cn } from "@/lib/utils"
import * as React from "react"

interface Props extends React.ComponentPropsWithRef<"label"> {
	required?: boolean
}

export const Label = ({ className, children, required, ...props }: Props) => {
	return (
		<label className={cn("text-sm", className)} {...props}>
			{children}
			<span
				className={cn(
					"mb-4 ml-1 rounded-sm px-1.5 py-0.5 text-[10px] leading-none font-medium text-zinc-50 select-none",
					required ? "bg-red-600" : "bg-zinc-800"
				)}>
				{required ? "required" : "optional"}
			</span>
		</label>
	)
}
