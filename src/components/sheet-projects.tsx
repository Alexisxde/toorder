"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formSchemaProject } from "@/lib/schema"
import { cn } from "@/lib/utils"
import { useProjectStore } from "@/store/useProjectStore"
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { zodResolver } from "@hookform/resolvers/zod"
import { cva, type VariantProps } from "class-variance-authority"
import { AnimatePresence, motion } from "framer-motion"
import React, { useEffect, useRef, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

const sheetVariants = cva(
	"fixed top-0 bottom-0 right-0 z-50 w-full h-dvh border-l-1 border-neutral-800 bg-neutral-900",
	{
		variants: {
			size: {
				default: "max-w-xs",
				sm: "max-w-sm",
				md: "max-w-md",
				lg: "max-w-lg",
				xl: "max-w-xl",
				"2xl": "max-w-2xl",
				"3xl": "max-w-3xl",
				"4xl": "max-w-4xl"
			}
		},
		defaultVariants: { size: "md" }
	}
)

interface SheetProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof sheetVariants> {
	title: string
	className?: string
}

type FormData = z.infer<typeof formSchemaProject>

export const SheetProject = ({ title, size, className }: SheetProps) => {
	const [open, setOpen] = useState(false)
	const ref = useRef<HTMLDivElement | null>(null)
	const toggleSheet = () => setOpen(prev => !prev)
	const createProject = useProjectStore(state => state.createProject)
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<FormData>({ resolver: zodResolver(formSchemaProject) })

	const onSubmit: SubmitHandler<FormData> = async form => {
		createProject({
			name: form.name.trim(),
			description: form.description.trim()
		})
		reset()
		toggleSheet()
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setOpen(false)
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [])

	return (
		<>
			<Button
				rippleColor="#202724"
				variant="outline"
				onClick={toggleSheet}
				className="mb-2">
				<PlusIcon className="size-5" />
			</Button>
			<AnimatePresence mode="wait" initial={false}>
				{open && (
					<>
						<motion.div
							// initial={{ opacity: 0 }}
							// animate={{ opacity: 1 }}
							// exit={{ opacity: 0, transition: delay: 0.1 }}
							// transition={{ duration: 0.2 }}
							{...framerSidebarBackground}
							className="fixed top-0 right-0 bottom-0 left-0 z-40 bg-[rgba(0,0,0,0.1)] backdrop-blur-sm"
						/>
						<motion.div
							initial={{ x: "200%" }}
							animate={{ x: 0 }}
							exit={{ x: "200%" }}
							transition={{ duration: 0.15 }}
							className={cn(sheetVariants({ size }), className)}
							ref={ref}>
							<div className="flex items-center justify-between border-b-1 border-neutral-800 p-4">
								<h3 className="text-lg font-medium">{title}</h3>
								<Button
									rippleColor="#202724"
									variant="ghost"
									onClick={toggleSheet}>
									<XMarkIcon className="size-6" />
								</Button>
							</div>
							<div className="flex-1 p-4">
								<form
									className="flex flex-col items-center justify-center gap-4"
									onSubmit={handleSubmit(onSubmit)}
									autoComplete="off">
									<div className="grid w-full max-w-sm items-center gap-1.5">
										<Label required htmlFor="name">
											Name project
										</Label>
										<Input
											id="name"
											type="text"
											className={errors?.name && "border-red-500"}
											placeholder="example project"
											{...register("name")}
										/>
										{errors?.name && (
											<motion.p
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												className="text-xs text-red-600">
												{errors?.name.message}
											</motion.p>
										)}
									</div>
									<div className="grid w-full max-w-sm items-center gap-1.5">
										<Label htmlFor="description">Description project</Label>
										<textarea
											id="description"
											className="focus-active:border-neutral-700 flex w-full flex-1 resize-none rounded-md border border-neutral-800 bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-sm placeholder:text-neutral-500 hover:border-neutral-700 focus:border-neutral-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
											placeholder="example description"
											{...register("description")}
											rows={3}
										/>
									</div>
									<Button
										variant="outline"
										size="md"
										rippleColor="#202724"
										className="mx-auto w-52">
										Create project
									</Button>
								</form>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	)
}

const framerSidebarBackground = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0, transition: { delay: 0.1 } },
	transition: { duration: 0.2 }
}
