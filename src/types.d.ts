export type CardId = string
export type CardTitle = string
export type CardColumn = "new" | "todo" | "process" | "completed"

export interface Card {
	id: string
	description: string
	column: string
	project_id?: string
	create_at?: string
}

export interface User {
	avatar_url: string
	email: string
	email_verified: boolean
	full_name: string
	iss: string
	name: string
	phone_verified: boolean
	preferred_username: string
	provider_id: string
	sub: string
	user_name: string
}
