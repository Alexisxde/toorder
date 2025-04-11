"use client"
import { Button } from "@/components/ui/button"
import Error from "@/components/ui/error"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet } from "@/components/ui/sheet"
import { formSchemaTask } from "@/lib/schema"
import { cn } from "@/lib/utils"
import { useTaskStore } from "@/store/useTaskStore"
import { type Task } from "@/types"
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

interface Props {
	id: string
}

type FormData = z.infer<typeof formSchemaTask>

export const SheetTask = ({ id }: Props) => {
	const [open, setOpen] = useState(false)
	const createTask = useTaskStore(state => state.createTask)
	const [image, setImage] = useState<File | null>(null)
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<FormData>({ resolver: zodResolver(formSchemaTask) })

	const onSubmit: SubmitHandler<FormData> = async ({
		title,
		description,
		badge,
		image,
		image_url
	}) => {
		const task = {
			title: `${title.trim()[0].toUpperCase()}${title.trim().slice(1)}`,
			description: description
				? `${description.trim()[0].toUpperCase()}${description.trim().slice(1)}`
				: "",
			column: "new",
			badge,
			img_url: image_url,
			project_id: id
		} as Task
		reset()
		createTask(task)
		setOpen(false)
	}

	return (
		<Sheet title="Create task" open={open} setOpen={setOpen}>
			<form
				className="grid gap-2 px-6"
				autoComplete="nope"
				onSubmit={handleSubmit(onSubmit)}
				encType="multipart/form-data">
				<div className="grid w-full max-w-sm items-center gap-1.5">
					<Label required htmlFor="title">
						Title task
					</Label>
					<Input
						id="title"
						type="text"
						className={errors?.title && "border-red-500"}
						placeholder="example task"
						{...register("title")}
					/>
					{errors?.title && <Error message={errors?.title.message} />}
				</div>
				<div className="grid w-full max-w-sm items-center gap-1.5">
					<Label required htmlFor="badge">
						Badge
					</Label>
					<select
						id="badge"
						className={cn(
							"focus-active:border-neutral-700 flex rounded-md border border-neutral-800 bg-transparent px-3 py-1 text-base shadow-sm transition-colors hover:border-neutral-700 focus:border-neutral-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
							errors?.badge && "border-red-500"
						)}
						{...register("badge")}>
						<option className="bg-neutral-800 text-neutral-500" value="">
							Select to badge
						</option>
						<option className="bg-neutral-800 text-neutral-100" value="design">
							Design
						</option>
						<option
							className="bg-neutral-800 text-neutral-100"
							value="development">
							Development
						</option>
						<option
							className="bg-neutral-800 text-neutral-100"
							value="planning">
							Planning
						</option>
						<option className="bg-neutral-800 text-neutral-100" value="study">
							Study
						</option>
					</select>
					{errors?.badge && <Error message={errors?.badge.message} />}
				</div>
				<div className="grid w-full max-w-sm items-center gap-1.5">
					<Label htmlFor="description">Description task</Label>
					<textarea
						id="description"
						className="focus-active:border-neutral-700 flex w-full flex-1 resize-none rounded-md border border-neutral-800 bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-sm placeholder:text-neutral-500 hover:border-neutral-700 focus:border-neutral-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
						{...register("description")}
						rows={3}
					/>
				</div>
				<div className="grid w-full max-w-sm items-center gap-1.5">
					<Label>Image</Label>
					<div className="grid w-full max-w-sm items-center gap-1.5">
						{image ? (
							<div className="relative">
								<Button
									variant="outline"
									rippleColor="#202724"
									className="absolute top-0 right-0 rounded-full bg-white p-1 text-neutral-500"
									onClick={() => setImage(null)}>
									<XMarkIcon className="size-4" />
								</Button>
								<img src={URL.createObjectURL(image)} className="h-32" />
							</div>
						) : (
							<div className="flex h-32 cursor-not-allowed items-center justify-center border border-neutral-800 bg-neutral-900 opacity-50">
								<PhotoIcon className="size-10" />
							</div>
						)}
						<Input
							type="file"
							disabled
							className={errors?.image && "border-red-500"}
							accept=".jpg, .jpeg, .png"
							{...register("image")}
							onChange={e => setImage(e.target.files?.[0] as File)}
						/>
						{errors?.image && (
							<Error message={errors?.image.message as string} />
						)}
					</div>
					<div className="overflow-hidden text-center text-[10px] before:relative before:right-2 before:inline-block before:h-[1px] before:w-1/4 before:bg-neutral-800 before:align-middle after:relative after:left-2 after:inline-block after:h-[1px] after:w-1/4 after:bg-neutral-800 after:align-middle">
						or
					</div>
					<Input
						disabled={image ? true : false}
						className={errors?.image_url && "border-red-500"}
						type="text"
						placeholder="https://exampleimg.com"
						{...register("image_url")}
					/>
					{errors?.image_url && <Error message={errors?.image_url.message} />}
				</div>
				<Button
					variant="outline"
					rippleColor="#202724"
					className="mt-2 max-w-sm"
					size="sm">
					Create task
				</Button>
			</form>
		</Sheet>
	)
}
