import { createClientForServer } from "@/supabase/server"

export const useUser = async () => {
	const supabase = await createClientForServer()

	const getUser = async () => {
		const {
      data: { user }
    } = await supabase.auth.getUser()
		return { user }
	}

	return { getUser }
}
