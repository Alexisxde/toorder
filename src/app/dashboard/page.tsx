import type { Metadata } from "next"

export const metadata: Metadata = { title: "Dashboard | Werty Task" }

export default async function DashboardPage() {
	return (
		<section className="flex flex-col border-neutral-200 bg-neutral-100 p-6 dark:border-neutral-800 dark:bg-neutral-900">
			<h2 className="mb-2 text-xl">Dashboard</h2>
		</section>
	)
}
