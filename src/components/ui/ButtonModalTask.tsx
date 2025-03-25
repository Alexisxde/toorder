"use client"
import { Button, type ButtonVariants } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { cn } from "@/lib/utils"
import { createClient } from "@/supabase/client"
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { createPortal } from "react-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

interface Props {
	children: React.ReactNode
	className?: string
	variant?: ButtonVariants
}

const ACCEPTED_IMAGE_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp"
]

const formSchema = z.object({
	title: z.string().min(1, "Title is required."),
	description: z.string().optional(),
	image: z
		.any()
		.optional()
		.refine(
			file => {
				if (file && file.length > 0) {
					return ACCEPTED_IMAGE_TYPES.includes(file[0]?.type)
				}
				return true
			},
			{ message: "Only .jpg, .jpeg, .png and .webp formats are supported." }
		),
	image_url: z
		.string()
		.optional()
		.refine(url => url === "" || z.string().url().safeParse(url).success, {
			message: "Invalid image URL format or empty value."
		}),
	badge: z.enum(["design", "development", "study", "planning"], {
		message: "Badge must be one of: design, development, study, planning."
	})
})

type FormData = z.infer<typeof formSchema>

export default function ButtonModalProject({
	children,
	className,
	variant
}: Props) {
	const [open, setOpen] = useState(false)
	const [image, setImage] = useState<File | null>(null)
	const router = useRouter()
	const searchParams = useSearchParams()
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormData>({ resolver: zodResolver(formSchema) })

	const handleModal = () => {
		const body = document.body
		if (body.classList.contains("overflow-hidden")) {
			body.classList.remove("overflow-hidden")
		} else {
			body.classList.add("overflow-hidden")
		}
		setOpen(!open)
	}

	const onSubmit: SubmitHandler<FormData> = async ({
		title,
		description,
		badge,
		image,
		image_url
	}) => {
		const supabase = createClient()
		const project_id = searchParams.get("id")
		await supabase
			.from("tasks")
			.insert({
				title: title.trim(),
				description: description?.trim(),
				column: "new",
				badge,
				img_url: image_url,
				project_id
			})
		handleModal()
		router.refresh()
	}

	const Modal = () => {
		return (
			<div
				className="fixed inset-0 z-50 flex justify-end bg-neutral-800/10 backdrop-blur-xs"
				onClick={handleModal}>
				<div
					className="mr-2 flex h-auto w-sm max-w-md flex-col gap-4 overflow-auto border border-neutral-800 bg-neutral-900 p-5"
					onClick={e => e.stopPropagation()}>
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-medium">Create task</h3>
						<Button variant="icon" onClick={handleModal}>
							<XMarkIcon className="size-6" />
						</Button>
					</div>
					<form
						className="grid gap-2"
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
							{errors?.title && (
								<p className="text-xs text-red-600">{errors?.title.message}</p>
							)}
						</div>
						<div className="grid items-center gap-1.5">
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
								<option
									className="bg-neutral-800 text-neutral-100"
									value="design">
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
								<option
									className="bg-neutral-800 text-neutral-100"
									value="study">
									Study
								</option>
							</select>
							{errors?.badge && (
								<p className="text-xs text-red-600">{errors?.badge.message}</p>
							)}
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
											variant="icon"
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
									<p className="text-xs text-red-600">
										{errors?.image.message as string}
									</p>
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
							{errors?.image_url && (
								<p className="text-xs text-red-600">
									{errors?.image_url.message as string}
								</p>
							)}
						</div>
						<Button className="mt-2">Create task</Button>
					</form>
				</div>
			</div>
		)
	}

	return (
		<>
			{open && <>{createPortal(<Modal />, document.body)}</>}
			<Button className={className} onClick={handleModal} variant={variant}>
				{children}
			</Button>
		</>
	)
}
