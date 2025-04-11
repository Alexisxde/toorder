import { createClient } from "@/supabase/client"
import type { Task } from "@/types"
import { create } from "zustand"

interface TaskState {
	tasks: Task[] | null
	loading: boolean
	getTasks: (id: string) => Promise<void>
	updateTasks: ({ id, column }: { id: string; column: string }) => Promise<void>
	createTask: (task: Task) => Promise<void>
	deleteTask: (id: string) => Promise<void>
}

const supabase = createClient()
let debounceTimeout: NodeJS.Timeout

export const useTaskStore = create<TaskState>((set, get) => ({
	tasks: [],
	loading: false,
	createTask: async task => {
		const tasks = get().tasks
		try {
			const { data } = await supabase.from("tasks").insert(task).select()
			set({ tasks: [...(tasks || []), data?.[0]] })
		} catch (error) {
			console.error("Error updating task:", error) // eslint-disable-line no-console
			set({ tasks })
		}
	},
	getTasks: async id => {
		set({ loading: true })
		const { data } = await supabase.from("tasks").select().eq("project_id", id)
		set({ tasks: data || null, loading: false })
	},
	updateTasks: async ({ id, column }) => {
		const currentState = get().tasks
		const updatedTasks = currentState?.map(task =>
			task.id == id ? { ...task, column } : task
		)
		set({ tasks: updatedTasks })

		if (debounceTimeout) {
			clearTimeout(debounceTimeout)
		}

		debounceTimeout = setTimeout(async () => {
			try {
				await supabase.from("tasks").update({ column }).eq("id", id)
			} catch (error) {
				console.error("Error updating task:", error) // eslint-disable-line no-console
				set({ tasks: currentState })
			}
		}, 3000)
	},
	deleteTask: async id => {
		const currentState = get().tasks
		const updatedTasks = currentState?.filter(task => task.id != id)
		set({ tasks: updatedTasks })

		try {
			await supabase.from("tasks").delete().eq("id", id)
		} catch (error) {
			console.error("Error deleting task:", error) // eslint-disable-line no-console
			set({ tasks: currentState })
		}
	}
}))
