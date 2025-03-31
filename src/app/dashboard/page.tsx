import ButtonSheetProject from "@/components/ButtonSheetProject"
import ProjectIcon from "@/components/icons/Project.svg"
import { createClientForServer } from "@/supabase/server"
import {
	ChevronRightIcon,
	MagnifyingGlassIcon
} from "@heroicons/react/24/solid"
import type { Metadata } from "next"
import Image from "next/image"
import { redirect } from "next/navigation"

export const metadata: Metadata = { title: "Dashboard | Werty Task" }

export default async function DashboardPage() {
	const supabase = await createClientForServer()
	const {
		data: { user }
	} = await supabase.auth.getUser()
	if (!user) redirect("/")
	const { data: projects } = await supabase
		.from("projects")
		.select()
		.eq("user_id", user.id)

	if (!projects) return

	return (
		<section className="flex flex-col p-6">
      <h2 className="mb-2">
        {user?.user_metadata.preferred_username}'s Org
      </h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
        {projects?.map(({ id, name, description }, i: number) => (
          <a
            key={id}
            className="animate-fade-in group relative flex cursor-pointer rounded-md border border-neutral-800 bg-neutral-900 p-5 transition-colors duration-150 ease-in-out hover:border-neutral-700 hover:bg-neutral-800"
            href={`/dashboard/project/${id}`}
            style={{ animationDelay: `calc(0.1s * ${i + 1}` }}>
            <div className="flex w-full flex-col">
              <h3 className="flex-shrink pr-4 text-sm mb-1">{name}</h3>
              <p className="text-xs text-neutral-400">
                {description}
              </p>
            </div>
            <div className="absolute top-4 right-4 text-neutral-100 transition-all duration-200 group-hover:right-3">
              <ChevronRightIcon width={24} height={24} />
            </div>
          </a>
        ))}
        <ButtonSheetProject delay={projects.length + 1} />
      </div>
		</section>
	)
}
