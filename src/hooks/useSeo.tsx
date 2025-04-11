"use client"
import { useEffect } from "react"

interface Props {
	title?: string
	description?: string
}

const useSeo = ({ title, description }: Props) => {
	useEffect(() => {
		if (title) {
			document.title = title
		}

		if (description) {
			let metaDescription = document.querySelector("meta[name='description']")
			if (!metaDescription) {
				metaDescription = document.createElement("meta")
				metaDescription.setAttribute("name", "description")
				document.head.appendChild(metaDescription)
			}
			metaDescription.setAttribute("content", description)
		}
	}, [title, description])
}

export default useSeo
