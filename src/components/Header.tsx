"use client"
import { useUser } from "@/context/AuthContext"
import { useAuthStore } from "@/store/AuthStore"
import Image from "next/image"

export default function Header() {
	const { signOut } = useAuthStore()
	const { user } = useUser()

	return (
		<header className="flex items-center justify-between px-10 py-5">
			<div className="w-24"></div>
			<div className="flex items-center justify-center gap-4">
				{user && (
					<button
						type="button"
						className="flex items-center justify-center rounded-lg bg-neutral-800 px-4 py-2 text-center text-xs font-semibold text-white shadow-md transition duration-200 ease-in select-none hover:bg-neutral-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-200 focus:outline-none disabled:cursor-not-allowed disabled:hover:bg-neutral-800"
						onClick={signOut}>
						<Image
							className="mr-2 inline-block size-5 rounded-full object-cover object-center"
							src={user?.avatar_url}
							alt={user?.preferred_username}
						/>
						Cerrar sesión
					</button>
				)}
			</div>
		</header>
	)
}
