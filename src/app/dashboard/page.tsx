import { createClientForServer } from "@/supabase/server"
import { PlaceholderPattern } from "@/components/ui/placeholder-pattern"
import CardDashboard from "@/components/card-dashboard"
import type { Metadata } from "next"
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

	return (
		<section className="flex flex-col p-6">
			<h2 className="mb-2 text-xl">Dashboard</h2>
			<div className="flex flex-col gap-4 rounded-xl p-4">
				<div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
					<CardDashboard projects={projects?.length ?? 0} />
					<div className="relative aspect-video overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
						<PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
					</div>
					<div className="relative aspect-video overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
						<PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
					</div>
					<div className="relative aspect-video overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
						<PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
					</div>
				</div>
			</div>
		</section>
	)
}
