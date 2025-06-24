import { createClient } from "@/supabase/client"
import type { Project } from "@/types"
import { create } from "zustand"

interface ProjectState {
	projects: Project[] | null
	loading: boolean
	createProject: ({
		name,
		description
	}: {
		name: string
		description: string
	}) => Promise<void>
	getProjects: () => Promise<void>
	updatePinnedProject: ({
		id,
		pinned
	}: {
		id: string
		pinned: boolean
	}) => Promise<void>
}

const supabase = createClient()
let debounceTimeout: NodeJS.Timeout

export const useProjectStore = create<ProjectState>((set, get) => ({
	projects: null,
	loading: false,
	createProject: async ({ name, description }) => {
		const projects = get().projects
		try {
			const {
				data: { user }
			} = await supabase.auth.getUser()
			const { data } = await supabase
				.from("projects")
				.insert({ name, description, user_id: user?.id })
				.select()
			set({ projects: [...(projects || []), data?.[0]] })
		} catch (error) {
			console.error("Error updating project:", error) // eslint-disable-line no-console
			set({ projects })
		}
	},
	getProjects: async () => {
		set({ loading: true })
		const {
			data: { user }
		} = await supabase.auth.getUser()
		const { data } = await supabase
			.from("projects")
			.select()
			.eq("user_id", user?.id)
		set({ projects: data || null, loading: false })
	},
	updatePinnedProject: async ({ id, pinned }) => {
		const currentState = get().projects
		const updatedProject = currentState?.map(project =>
			project.id == id ? { ...project, pinned } : project
		)
		set({ projects: updatedProject })

		if (debounceTimeout) {
			clearTimeout(debounceTimeout)
		}

		debounceTimeout = setTimeout(async () => {
			try {
				await supabase.from("tasks").update({ pinned }).eq("id", id)
			} catch (error) {
				console.error("Error updating task:", error) // eslint-disable-line no-console
				set({ projects: currentState })
			}
		}, 3000)
	}
}))
