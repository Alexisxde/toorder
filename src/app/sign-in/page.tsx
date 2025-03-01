import Nextjs from "@/components/icons/Nextjs"
import React from "@/components/icons/React"
import Supabase from "@/components/icons/Supabase"
import TailWind from "@/components/icons/Tailwind"
import SignInButton from "@/components/ui/SignInButton"
import { createClientForServer } from "@/supabase/server"
import { ArrowRightIcon } from "@heroicons/react/16/solid"
import { redirect } from "next/navigation"

export default async function SignIn() {
	const supabase = await createClientForServer()
	const {
		data: { user }
	} = await supabase.auth.getUser()

	if (user) redirect("/")

	return (
		<>
			<div className="absolute inset-0 size-full bg-neutral-950">
				<div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_400px_at_50%_-100%,#ff00ff30,transparent)]"></div>
				<div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_400px_at_50%_200%,#00ffff30,transparent)]"></div>
				<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
			</div>
			<div className="p-12 pt-14">
				<div className="relative mx-auto flex max-w-2xl flex-col items-center">
					<div className="mb-8 flex">
						<a
							href="https://github.com/Alexisxde/tarea-plus"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex">
							<span className="relative inline-block overflow-hidden rounded-full p-[1px]">
								<span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#a9a9a9_0%,#0c0c0c_50%,#a9a9a9_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#171717_0%,#737373_50%,#171717_100%)]"></span>
								<div className="inline-flex h-full w-full cursor-pointer justify-center rounded-full bg-white px-3 py-1 text-xs leading-5 font-medium text-slate-600 backdrop-blur-xl dark:bg-black dark:text-slate-200">
									<span className="inline-flex items-center pl-2 text-white">
										Go to GitHub
										<ArrowRightIcon className="size-4 pl-0.5" />
									</span>
								</div>
							</span>
						</a>
					</div>
					<h2 className="text-center text-4xl font-medium text-gray-50 sm:text-6xl">
						Manage your tasks
						<span className="inline-flex bg-gradient-to-r from-neutral-100 via-slate-400 to-neutral-400 bg-[200%_auto] bg-clip-text leading-tight text-transparent">
							simply and efficiently
						</span>
					</h2>
					<p className="mt-6 text-center text-sm leading-6 text-gray-200 md:text-base">
						Organize your tasks intuitively with our task management.{" "}
						<span className="cursor-grabbing opacity-70">Drag and drop</span> to
						move tasks between lists, set priorities, and keep everything under
						control.
					</p>
					<div className="mt-6 flex w-full items-center justify-center gap-4">
						<React width="2em" height="2em" />
						<TailWind width="2em" height="2em" />
						<Nextjs width="2em" height="2em" />
						<Supabase width="2em" height="2em" />
					</div>
					<div className="mt-6 flex gap-4">
						<SignInButton />
					</div>
				</div>
			</div>
		</>
	)
}
