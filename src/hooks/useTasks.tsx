"use client"
import { useTaskStore } from "@/store/useTaskStore"
import { useEffect } from "react"

interface Props {
  id: string
}

const useTasks = ({ id }: Props) => {
  const getTasks = useTaskStore(state => state.getTasks)
	const loading = useTaskStore(state => state.loading)
	const tasks = useTaskStore(state => state.tasks)
  
	useEffect(() => {
		getTasks(id)
	}, [id, getTasks])

  return { loading, tasks }
}

export default useTasks