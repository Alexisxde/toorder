"use client"
import { Sheet } from "@/components/ui/Sheet"
import { Button } from "@/components/ui/button"
import Error from "@/components/ui/error"
import { Input } from "@/components/ui/r-input"
import { Label } from "@/components/ui/r-label"
import { formSchemaProject } from "@/lib/schema"
import { useProjectStore } from "@/store/useProjectStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

type FormData = z.infer<typeof formSchemaProject>

export const SheetProject = () => {
	const [open, setOpen] = useState(false)
	const createProject = useProjectStore(state => state.createProject)
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<FormData>({ resolver: zodResolver(formSchemaProject) })

	const onSubmit: SubmitHandler<FormData> = async ({ name, description }) => {
		createProject({
			name: name.trim(),
			description: description
				? `${description.trim()[0].toUpperCase()}${description.trim().slice(1)}`
				: ""
		})
		reset()
		setOpen(false)
	}

	return (
		<Sheet title="Create project" open={open} setOpen={setOpen}>
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
					{errors?.name && <Error message={errors?.name.message} />}
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
		</Sheet>
	)
}

const framerSidebarBackground = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0, transition: { delay: 0.1 } },
	transition: { duration: 0.2 }
}
