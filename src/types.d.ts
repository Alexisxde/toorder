import type { Database } from "@/supabase/database"

export type TaskColumn = "new" | "todo" | "process" | "completed"
export type Task = Database["public"]["Tables"]["tasks"]["Row"] & { id: string }
export type User = Database["public"]["Tables"]["users"]["Row"] & {
	email: string
	preferred_username: string
}

export interface Project {
	id: Database["public"]["Tables"]["projects"]["Row"]["id"]
	name: Database["public"]["Tables"]["projects"]["Row"]["name"]
	created: Database["public"]["Tables"]["projects"]["Row"]["created_at"]
	pinned: Database["public"]["Tables"]["projects"]["Row"]["pinned"]
}
