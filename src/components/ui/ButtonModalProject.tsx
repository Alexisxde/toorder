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
import { motion } from "framer-motion"

interface Props extends ComponentProps<"button"> {}

export default function ButtonModalProject({ children, className }: Props) {
	const [height, setHeight] = useState("auto")
	const [openModal, setOpenModal] = useState(false)

	const handleInput = (e: any) => {
		const textarea = e.target
		setHeight(`${textarea.scrollHeight}px`)
	}

	const handleModal = () => {
		setOpenModal(!openModal)
	}

	const Modal = () => {
		return (
			<div
        className="absolute inset-0 flex w-full items-center justify-center bg-black/10 backdrop-blur-xs"
        onClick={handleModal}>
				<div className="mx-10 flex w-full max-w-lg flex-col gap-4 rounded-lg border border-neutral-800 bg-neutral-900 p-10" onClick={(e) => e.stopPropagation()}>
					<div className="flex flex-col items-center justify-center gap-2">
						<Image width={150} src={ProjectIcon} alt="Project image icon" />
						<h2 className="font-medium">Create your new project</h2>
						<p className="text-center text-xs text-neutral-400">
							Establish a clear vision so that managers in your organization can
							mobilize their teams to all work in the same direction.
						</p>
					</div>
					<label className="flex w-full items-center justify-start rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2 pr-8 text-sm transition-colors duration-200 ease-in-out focus-within:border-neutral-700 hover:border-neutral-700">
						<span className="mr-2 size-4 text-neutral-300">
							<RectangleStackIcon />
						</span>
						<input
							className="placeholder:text-sm placeholder:text-neutral-400 focus:outline-none"
							placeholder="Name project"
							type="text"
							name="name"
						/>
					</label>
					<label className="flex w-full items-start justify-start rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2 pr-8 text-sm transition-colors duration-200 ease-in-out focus-within:border-neutral-700 hover:border-neutral-700">
						<span className="mr-2 size-4 text-neutral-300">
							<ChatBubbleBottomCenterTextIcon />
						</span>
						<textarea
							className="flex-1 resize-none placeholder:text-sm placeholder:text-neutral-400 focus:outline-none"
							placeholder="Description project"
							name="description"
							rows={3}
							onInput={handleInput}
							style={{ height }}></textarea>
					</label>
					<Button className="mx-auto w-52">Create new project</Button>
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
