import { createClient } from "@/supabase/client"
import type { Task } from "@/types"
import { create } from "zustand"

export interface TaskState {
	tasks: Task[] | null
	loading: boolean
	getTasks: (id: string) => Promise<void>
	updateTasks: ({ id, column }: { id: string; column: string }) => Promise<void>
}

const supabase = createClient()
let debounceTimeout

export const useTaskStore = create<TaskState>((set, get) => ({
	tasks: [],
	loading: false,
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
        console.error("Error updating task:", error)
        set({ tasks: currentState })
      }
    }, 3000)
	}
}))
