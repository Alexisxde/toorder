"use client"
import ProjectIcon from "@/components/icons/Project.svg"
import { Button } from "@/components/ui/Button"
import { createClient } from "@/supabase/client"
import {
	ChatBubbleBottomCenterTextIcon,
	ExclamationCircleIcon,
	PlusIcon,
	RectangleStackIcon
} from "@heroicons/react/24/outline"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { createPortal } from "react-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import { useProjectStore } from "@/store/useProjectStore"

interface Props {
	delay: number
}

interface FormData {
	name: string
	description: string
}

export default function ButtonSheetProject({ delay }: Props) {
	const [openModal, setOpenModal] = useState(false)
  const createProject = useProjectStore(state => state.createProject)
	const router = useRouter()
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormData>()

	const handleModal = () => {
		setOpenModal(!openModal)
	}

	const onSubmit: SubmitHandler<FormData> = async form => {
    createProject({ name: form.name.trim(), description: form.description.trim()})
		handleModal()
		router.refresh()
	}

	const errorsMessages: Record<string, string> = {
		minLength: "Minimum of 8 characters.",
		maxLength: "Maximum characters 50.",
		required: "Is required."
	}

	const Modal = () => {
		return (
			<div
				className="absolute inset-0 flex w-full items-center justify-center bg-black/10 backdrop-blur-xs"
				onClick={handleModal}>
				<div
					className="mx-10 flex w-full max-w-lg flex-col gap-4 rounded-lg border border-neutral-800 bg-neutral-900 p-10"
					onClick={e => e.stopPropagation()}>
					<div className="flex flex-col items-center justify-center gap-2">
						<Image width={150} src={ProjectIcon} alt="Project image icon" />
						<h2 className="font-medium">Create your new project</h2>
						<p className="text-center text-xs text-neutral-400">
							Establish a clear vision so that managers in your organization can
							mobilize their teams to all work in the same direction.
						</p>
					</div>
					<form
						className="flex flex-col items-center justify-center gap-4"
						onSubmit={handleSubmit(onSubmit)}
						autoComplete="off">
						<div className="flex w-full flex-col gap-2">
							<label className="flex items-center justify-start rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2 pr-8 text-sm transition-colors duration-200 ease-in-out focus-within:border-neutral-700 hover:border-neutral-700">
								<span className="mr-2 size-4 text-neutral-300">
									<RectangleStackIcon />
								</span>
								<input
									className="placeholder:text-sm placeholder:text-neutral-400 focus:outline-none"
									placeholder="Name project"
									type="text"
									{...register("name", {
										required: true,
										minLength: 8,
										maxLength: 50
									})}
								/>
							</label>
							{errors.name && (
								<p className="ml-2 flex items-center gap-1 text-xs text-red-500">
									<ExclamationCircleIcon height={16} />
									<span>{errorsMessages[errors.name.type]}</span>
								</p>
							)}
						</div>
						<div className="flex w-full flex-col gap-2">
							<label className="flex items-start justify-start rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2 pr-8 text-sm transition-colors duration-200 ease-in-out focus-within:border-neutral-700 hover:border-neutral-700">
								<span className="mr-2 size-4 text-neutral-300">
									<ChatBubbleBottomCenterTextIcon />
								</span>
								<textarea
									className="flex-1 resize-none placeholder:text-sm placeholder:text-neutral-400 focus:outline-none"
									placeholder="Description project"
									{...register("description")}
									rows={3}
								/>
							</label>
						</div>
						<Button className="mx-auto w-52">Create project</Button>
					</form>
				</div>
			</div>
		)
	}

	return (
		<>
			{openModal && <>{createPortal(<Modal />, document.body)}</>}
			<button
				className="animate-fade-in flex cursor-pointer items-center justify-center rounded-md border border-neutral-200 bg-neutral-100 p-5 transition-colors duration-150 ease-in-out hover:border-neutral-300 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
				onClick={handleModal}
				style={{ animationDelay: `calc(0.1s * ${delay}` }}>
				<PlusIcon width={48} height={48} />
			</button>
		</>
	)
}
