"use client"
import SheetTask from "@/components/SheetTask"
import { Button, type ButtonVariants } from "@/components/ui/Button"
import { useState } from "react"
import { createPortal } from "react-dom"

interface Props {
	children: React.ReactNode
	className?: string
	variant?: ButtonVariants
}

export default function ButtonSheet({ children, className, variant }: Props) {
	const [open, setOpen] = useState(false)

	const handleSheet = () => {
		const body = document.body
		if (body.classList.contains("overflow-hidden")) {
			body.classList.remove("overflow-hidden")
		} else {
			body.classList.add("overflow-hidden")
		}
		setOpen(!open)
	}

	return (
		<>
			{open &&
				createPortal(<SheetTask handleSheet={handleSheet} />, document.body)}
			<Button className={className} onClick={handleSheet} variant={variant}>
				{children}
			</Button>
		</>
	)
}
