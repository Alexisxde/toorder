"use client"

import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"
import React, { MouseEvent, useEffect, useState } from "react"

const buttonVariants = cva(
	"relative flex cursor-pointer items-center justify-center overflow-hidden rounded-md text-center",
	{
		variants: {
			variant: {
				default:
					"bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100",
				outline:
					"border border-neutral-200 bg-neutral-100 transition-colors duration-150 ease-in-out hover:border-neutral-300 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:bg-neutral-800",
				ghost: "bg-transparent text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-800",
				link: "bg-transparent text-neutral-900 dark:text-neutral-100 underline-offset-4 hover:underline",
				destructive:
					"bg-red-500 text-neutral-100 dark:bg-red-900 dark:text-neutral-100",
				disabled: "cursor-not-allowed opacity-50"
			},
			size: {
				default: "px-2 py-1 text-xs",
				sm: "px-4 py-2 text-xs",
				md: "px-5 py-2.5 text-xs",
				lg: "px-6 py-3 text-base"
			},
		},
		defaultVariants: { variant: "default", size: "default" }
	}
)

interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
      rippleColor?: string
      duration?: string
    }

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			children,
			rippleColor = "#ffffff",
			duration = "150ms",
			onClick,
			variant,
			size,
			...props
		},
		ref
	) => {
		const [buttonRipples, setButtonRipples] = useState<
			Array<{ x: number; y: number; size: number; key: number }>
		>([])

		const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
			createRipple(event)
			onClick?.(event)
		}

		const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
			const button = event.currentTarget
			const rect = button.getBoundingClientRect()
			const size = Math.max(rect.width, rect.height)
			const x = event.clientX - rect.left - size / 2
			const y = event.clientY - rect.top - size / 2

			const newRipple = { x, y, size, key: Date.now() }
			setButtonRipples(prevRipples => [...prevRipples, newRipple])
		}

		useEffect(() => {
			if (buttonRipples.length > 0) {
				const lastRipple = buttonRipples[buttonRipples.length - 1]
				const timeout = setTimeout(() => {
					setButtonRipples(prevRipples =>
						prevRipples.filter(ripple => ripple.key !== lastRipple.key)
					)
				}, parseInt(duration))
				return () => clearTimeout(timeout)
			}
		}, [buttonRipples, duration])

		return (
			<button
				className={cn(buttonVariants({ variant, size }), className)}
				onClick={handleClick}
				ref={ref}
				{...props}>
				<div className="relative z-10">{children}</div>
				<span className="pointer-events-none absolute inset-0">
					{buttonRipples.map(ripple => (
						<span
							className="animate-rippling absolute rounded-full bg-neutral-900 opacity-30"
							key={ripple.key}
							style={{
								width: `${ripple.size}px`,
								height: `${ripple.size}px`,
								top: `${ripple.y}px`,
								left: `${ripple.x}px`,
								backgroundColor: rippleColor,
								transform: `scale(0)`
							}}
						/>
					))}
				</span>
			</button>
		)
	}
)

Button.displayName = "Button"
