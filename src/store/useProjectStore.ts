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
}

const supabase = createClient()

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
			console.error("Error updating project:", error)
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
	}
}))
