"use client"
import { useProjectStore } from "@/store/useProjectStore"
import { useEffect } from "react"

const useProjects = () => {
	const projects = useProjectStore(state => state.projects)
	const getProjects = useProjectStore(state => state.getProjects)
	const loading = useProjectStore(state => state.loading)
	const updatePinnedProject = useProjectStore(
		state => state.updatePinnedProject
	)

	useEffect(() => {
		getProjects()
	}, [getProjects])

	const searchProject = (id: string) => {
		if (!projects) return []
		return projects.filter(project => project.id === id)
	}

	const updateProject = async (id: string, pinned: boolean) => {
		if (!projects) return
		const project = projects.find(project => project.id === id)
		if (!project) return
		updatePinnedProject({ id, pinned })
	}

	return { loading, projects, getProjects, searchProject, updateProject }
}

export default useProjects
