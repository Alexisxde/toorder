import { createClient } from "@/supabase/client"
import type { Task } from "@/types"
import { create } from "zustand"

export interface TaskState {
	tasks: Task[] | null
	getTasks: (id: string) => Promise<void>
	loading: boolean
}

export const useTaskStore = create<TaskState>(set => ({
	tasks: [],
	loading: false,
	getTasks: async id => {
		set({ loading: true })
		const supabase = createClient()
		const { data } = await supabase
			.from("tasks")
			.select()
			.eq("project_id", id)
		set({ tasks: data || null, loading: false })
	}
}))
