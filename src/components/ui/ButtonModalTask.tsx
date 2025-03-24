"use client"
import { Button, type ButtonVariants } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { createPortal } from "react-dom"
import { SubmitHandler, useForm } from "react-hook-form"

interface Props {
	children: React.ReactNode
	className?: string
	variant?: ButtonVariants
}

interface FormData {
	title: string
	badge: string
	description: string
	image: string
	image_url: string
}

export default function ButtonModalProject({
	children,
	className,
	variant
}: Props) {
	const [open, setOpen] = useState(false)
	const [image, setImage] = useState<File | null>(null)
	const [imageURL, setImageURL] = useState<string | null>(null)
	const router = useRouter()
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormData>()

	const handleModal = () => {
		setOpen(!open)
	}

	const onSubmit: SubmitHandler<FormData> = async form => {
		// console.log(form)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		const file = e.target.files ? e.target.files[0] : null
		setImage(file)
		if (file) {
			const url = URL.createObjectURL(file)
			setImageURL(url)
		}
	}

	const Modal = () => {
		return (
			<div
				className="absolute inset-0 flex justify-end bg-neutral-800/10 backdrop-blur-xs"
				onClick={handleModal}>
				<div
					className="h-screens flex w-sm max-w-md flex-col gap-4 border border-neutral-800 bg-neutral-900 p-6"
					onClick={e => e.stopPropagation()}>
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-medium">Create task</h3>
						<Button variant="icon" onClick={handleModal}>
							<XMarkIcon className="size-6" />
						</Button>
					</div>
					<form
						className="grid gap-2"
						onSubmit={handleSubmit(onSubmit)}
						encType="multipart/form-data">
						<div className="grid w-full max-w-sm items-center gap-1.5">
							<Label required htmlFor="title">
								Title task
							</Label>
							<Input
								id="title"
								type="text"
								placeholder="example task"
								{...register("title")}
							/>
						</div>
						<div className="grid items-center gap-1.5">
							<Label required htmlFor="badge">
								Badge
							</Label>
							<select
								id="badge"
								className="focus-active:border-neutral-700 flex rounded-md border border-neutral-800 bg-transparent px-3 py-1 text-base shadow-sm transition-colors hover:border-neutral-700 focus:border-neutral-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
								{...register("badge")}>
								<option className="bg-neutral-800 text-neutral-500">
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
						</div>
						<div className="grid w-full max-w-sm items-center gap-1.5">
							<Label>Description task</Label>
							<textarea
								className="focus-active:border-neutral-700 flex w-full flex-1 resize-none rounded-md border border-neutral-800 bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-sm placeholder:text-neutral-500 hover:border-neutral-700 focus:border-neutral-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
								{...register("description")}
								rows={3}
							/>
						</div>
						<div className="grid w-full max-w-sm items-center gap-1.5">
							<Label htmlFor="image">Image</Label>
							<div className="grid w-full max-w-sm items-center gap-1.5">
								{imageURL ? (
									<img src={imageURL} alt="Image submit" className="h-36" />
								) : (
									<div className="flex h-36 items-center justify-center border border-neutral-800 bg-neutral-900">
										<PhotoIcon className="size-10" />
									</div>
								)}
								<Input
									id="image"
									type="file"
									{...register("image")}
									onChange={handleChange}
								/>
							</div>
							<div className="overflow-hidden text-center text-[10px] before:relative before:right-2 before:inline-block before:h-[1px] before:w-1/4 before:bg-neutral-800 before:align-middle after:relative after:left-2 after:inline-block after:h-[1px] after:w-1/4 after:bg-neutral-800 after:align-middle">
								or
							</div>
							<Input
								id="image_url"
								type="text"
								placeholder="https://exampleimg.com"
								{...register("image_url")}
							/>
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
