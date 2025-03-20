"use client"
import ProjectIcon from "@/components/icons/Project.svg"
import Button from "@/components/ui/Button"
import {
	ChatBubbleBottomCenterTextIcon,
	RectangleStackIcon
} from "@heroicons/react/24/outline"
import Image from "next/image"
import { useState, type ComponentProps } from "react"
import { createPortal } from "react-dom"

interface Props extends ComponentProps<"button"> {}

export default function ButtonModalProject({ children, className }: Props) {
	const [height, setHeight] = useState("auto")
	const [openModal, setOpenModal] = useState(false)

	const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
		const textarea = e.target as HTMLTextAreaElement
		setHeight(`${textarea.scrollHeight}px`)
	}

	const handleModal = () => {
		setOpenModal(!openModal)
	}

	const Modal = () => {
		return (
			<div
				className="flex bg-black/10 justify-center w-full absolute backdrop-blur-xs inset-0 items-center"
				onClick={handleModal}>
				<div
					className="flex flex-col bg-neutral-900 border border-neutral-800 p-10 rounded-lg w-full gap-4 max-w-lg mx-10"
					onClick={e => e.stopPropagation()}>
					<div className="flex flex-col justify-center gap-2 items-center">
						<Image width={150} src={ProjectIcon} alt="Project image icon" />
						<h2 className="font-medium">Create your new project</h2>
						<p className="text-center text-neutral-400 text-xs">
							Establish a clear vision so that managers in your organization can
							mobilize their teams to all work in the same direction.
						</p>
					</div>
					<label className="flex bg-neutral-900 border border-neutral-800 justify-start rounded-lg text-sm w-full duration-200 ease-in-out focus-within:border-neutral-700 hover:border-neutral-700 items-center pr-8 px-4 py-2 transition-colors">
						<span className="text-neutral-300 mr-2 size-4">
							<RectangleStackIcon />
						</span>
						<input
							className="focus:outline-none placeholder:text-neutral-400 placeholder:text-sm"
							placeholder="Name project"
							type="text"
							name="name"
						/>
					</label>
					<label className="flex bg-neutral-900 border border-neutral-800 justify-start rounded-lg text-sm w-full duration-200 ease-in-out focus-within:border-neutral-700 hover:border-neutral-700 items-start pr-8 px-4 py-2 transition-colors">
						<span className="text-neutral-300 mr-2 size-4">
							<ChatBubbleBottomCenterTextIcon />
						</span>
						<textarea
							className="flex-1 focus:outline-none placeholder:text-neutral-400 placeholder:text-sm resize-none"
							placeholder="Description project"
							name="description"
							rows={3}
							onInput={handleInput}
							style={{ height }}></textarea>
					</label>
					<Button className="w-52 mx-auto">Create new project</Button>
				</div>
			</div>
		)
	}

	return (
		<>
			{openModal && <>{createPortal(<Modal />, document.body)}</>}
			<Button className={className} onClick={() => handleModal()}>
				{children}
			</Button>
		</>
	)
}
