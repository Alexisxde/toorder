"use client"
import { SheetProject } from "@/components/sheet-project"
import { Button } from "@/components/ui/button"
import useProjects from "@/hooks/useProjects"
import { filterItems } from "@/lib/utils"
import { ChevronRightIcon, TrashIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ProjectsWithSearch() {
  const { projects } = useProjects()
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (searchQuery) params.set("q", searchQuery)
    else params.delete("q")
    const nuevaURL = `${window.location.pathname}?${params.toString()}`
    window.history.replaceState(null, "", nuevaURL)
  }, [searchQuery])

  if (!projects) return null

  const filteredProjects = filterItems(searchQuery, projects)
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  return (
    <>
      <section className="flex flex-col p-4 md:p-6">
        <div className="mb-2 flex items-center justify-between gap-2">
          <h2 className="mb-2 text-xl">Home</h2>
          <div className="flex items-center gap-2">
            <div className="relative text-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search project.."
                autoComplete="off"
                className="py-1 px-10 placeholder-neutral-500 shadow-xs focus:outline-none w-52 border border-neutral-200 bg-neutral-100 transition-colors duration-150 ease-in-out hover:border-neutral-300 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:bg-neutral-800 rounded-md"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <SheetProject />
            <Button rippleColor="#8b0000" variant="destructive" disabled>
              <TrashIcon className="size-5" />
            </Button>
          </div>
        </div>
      </section>
      {
        filteredProjects.length === 0 ? (
          <section className="flex h-[calc(100vh-200px)] items-center justify-center">
            <p className="text-neutral-500 dark:text-neutral-400">
              No projects found.
            </p>
          </section>
        ) : (
          <section className="px-4 md:px-6 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
          {filteredProjects.map(({ id, name, description }, i: number) => (
            <Link
              key={id}
              prefetch
              className="animate-fade-in group relative flex aspect-video flex-col gap-2 rounded-lg border border-neutral-200 bg-neutral-100 p-5 transition-colors duration-150 ease-in-out hover:border-neutral-300 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
              href={`/app/${id}`}
              style={{ animationDelay: `calc(0.1s * ${i + 1}` }}>
              <div className="flex w-full flex-col">
                <h3 className="mb-1 flex-shrink pr-4 text-sm">{name}</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  {description}
                </p>
              </div>
              <div className="absolute top-4 right-4 text-neutral-900 opacity-50 transition-all duration-200 ease-in-out group-hover:right-3 group-hover:opacity-100 dark:text-neutral-100">
                <ChevronRightIcon className="size-6" />
              </div>
            </Link>
          ))}
        </section>
      )}
    </>
  )
}