"use client"
import Link from 'next/link'
import React from 'react'
import { useEffect, useState } from "react"
import { AnimatedNumber } from "@/components/ui/animated-number"

const MAX_VALUE = 5

interface Props {
  projects: number
}

export default function CardDashboard({ projects }: Props) {
  const [value, setValue] = useState(0)

	useEffect(() => {
		setValue(projects)
	}, [])

  return (
    <Link 
      href="/dashboard/project"
      className="flex flex-col items-center justify-center gap-2 aspect-video rounded-xl border transition-colors duration-150 ease-in-out border-neutral-200 hover:border-neutral-300 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:bg-neutral-800">
      <div className="font-semibold text-4xl text-neutral-900 dark:text-neutral-100">
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
