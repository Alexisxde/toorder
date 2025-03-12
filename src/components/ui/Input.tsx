import { cn } from "@/lib/utils"
import { type ComponentProps } from "react"

interface Props extends ComponentProps<"label"> {
	name: string
	placeholder: string
	size?: "sm" | "md" | "lg"
	sizeIcon?: "sm" | "md" | "lg"
}

export default function Input({
	children,
	placeholder,
	name,
	size = "sm",
	sizeIcon = "sm"
}: Props) {
	const sizes = {
		sm: "px-2.5 py-1 pr-8 text-xs",
		md: "px-4.5 py-2 pr-10 text-sm",
		lg: "px-5.5 py-2.5 pr-12 text-md"
	}

	const icon = { sm: "size-4", md: "size-5", lg: "size-6" }

	return (
		<label
			className={cn(
				`flex cursor-not-allowed items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900 transition-colors duration-200 ease-in-out focus-within:border-neutral-700 hover:border-neutral-700`,
				sizes[size] || sizes.sm
			)}>
			<span
				className={cn(
					"mr-2 size-4 text-neutral-300",
					icon[sizeIcon] || icon.sm
				)}>
				{children}
			</span>
			<input
				className="cursor-not-allowed placeholder:text-neutral-400 focus:outline-none"
				placeholder={placeholder}
				type="text"
				name={name}
				disabled
			/>
		</label>
	)
}
