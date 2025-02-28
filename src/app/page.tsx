"use client"
import Header from "@/components/Header"
import Todo from "@/components/Todo"
import { useUser } from "@/context/AuthContext"
import { redirect } from "next/navigation"

export default function Home() {
	const { user } = useUser()
	if (user === null) redirect("/sign-in")

	return (
		<>
			<Header />
			<Todo />
		</>
	)
}
