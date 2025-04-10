"use client"
import { useProjectStore } from "@/store/useProjectStore"
import { useEffect } from "react"

const useProjects = () => {
	const projects = useProjectStore(state => state.projects)
	const getProjects = useProjectStore(state => state.getProjects)
	const loading = useProjectStore(state => state.loading)

	useEffect(() => {
		getProjects()
	}, [getProjects])

	const searchProject = (id: string) => {
		if (!projects) return []
		return projects.filter(project => project.id === id)
	}

	return { loading, projects, getProjects, searchProject }
}

export default useProjects
