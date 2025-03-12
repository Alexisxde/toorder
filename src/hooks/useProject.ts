import { createClientForServer } from "@/supabase/server"

export const useProject = async () => {
	const supabase = await createClientForServer()

	const getProjects = async (user_id: string) => {
		const { data } = await supabase
			.from("projects")
			.select()
			.eq("user_id", user_id)
		return { data }
	}

	return { getProjects }
}
