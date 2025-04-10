"use client"
import { AnimatedNumber } from "@/components/ui/animated-number"
import useProjects from "@/hooks/useProjects"
import Link from "next/link"
import { useEffect, useState } from "react"

const MAX_VALUE = 5

export default function CardDashboard() {
	const { projects } = useProjects()
	const [value, setValue] = useState(0)

	useEffect(() => {
		setValue(projects?.length ?? 0)
	}, [projects])

	return (
		<Link
			href="/dashboard/project"
			className="flex aspect-video flex-col items-center justify-center gap-2 rounded-xl border border-neutral-200 transition-colors duration-150 ease-in-out hover:border-neutral-300 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:bg-neutral-800">
			<div className="text-4xl font-semibold text-neutral-900 dark:text-neutral-100">
				<AnimatedNumber
					springOptions={{ bounce: 0, duration: 2000 }}
					value={value}
				/>
				<span>/{MAX_VALUE}</span>
			</div>
			<span className="font-medium">Projects</span>
		</Link>
	)
}
