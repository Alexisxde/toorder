"use client"
import { cn } from "@/lib/utils"
import { SpringOptions, useSpring, useTransform } from "framer-motion"
import { useEffect, useState } from "react"

export type AnimatedNumberProps = {
	value: number
	className?: string
	springOptions?: SpringOptions
}

export function AnimatedNumber({
	value,
	className,
	springOptions
}: AnimatedNumberProps) {
	const [displayValue, setDisplayValue] = useState("")
	const spring = useSpring(value, springOptions)
	const display = useTransform(spring, current =>
		Math.round(current).toLocaleString()
	)

	useEffect(() => {
		const unsubscribe = display.onChange(latest => setDisplayValue(latest))
		spring.set(value)
		return () => {
			unsubscribe()
		}
	}, [display, spring, value])

	return <span className={cn(className)}>{displayValue}</span>
}
