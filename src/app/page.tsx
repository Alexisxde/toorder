import SignInButton from "@/components/button-sign-in"
import Nextjs from "@/components/icons/Nextjs"
import React from "@/components/icons/React"
import Supabase from "@/components/icons/Supabase"
import TailWind from "@/components/icons/Tailwind"
import Werty from "@/components/icons/werty.svg"
import { Button } from "@/components/ui/button"
import { createClientForServer } from "@/supabase/server"
import { ArrowRightIcon } from "@heroicons/react/16/solid"
import Image from "next/image"
import Link from "next/link"

export default async function HomePage() {
	const supabase = await createClientForServer()
	const {
		data: { user }
	} = await supabase.auth.getUser()

	return (
		<>
			<div className="absolute inset-0 -z-1 size-full bg-neutral-900">
				<div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_400px_at_50%_-100%,#ff00ff30,transparent)]"></div>
				<div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_400px_at_50%_200%,#00ffff30,transparent)]"></div>
				<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
			</div>
			<header className="flex w-full items-center justify-between px-10 py-5">
				<Link href="/">
					<Image className="h-7 w-auto" src={Werty} alt="Werty Logo" />
				</Link>
				{user ? (
					<div className="flex items-center justify-center gap-3">
						<Link href="/dashboard">
							<Button variant="outline" rippleColor="#202724">
								Dashboard
							</Button>
						</Link>
					</div>
				) : (
					<SignInButton />
				)}
			</header>
			<div className="relative mx-auto flex w-full max-w-4xl flex-col items-center p-10">
				<Link
					href="https://github.com/Alexisxde/tarea-plus"
					target="_blank"
					rel="noopener noreferrer"
					className="mb-6 inline-flex">
					<span className="relative inline-block overflow-hidden rounded-full p-[1px]">
						<span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#a9a9a9_0%,#0c0c0c_50%,#a9a9a9_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#171717_0%,#737373_50%,#171717_100%)]"></span>
						<div className="inline-flex h-full w-full cursor-pointer justify-center rounded-full bg-neutral-900 px-3 py-1 text-xs leading-5 font-medium text-neutral-100 backdrop-blur-xl">
							<span className="inline-flex items-center pl-2 text-white">
								Go to GitHub
								<ArrowRightIcon className="size-4 pl-0.5" />
							</span>
						</div>
					</span>
				</Link>
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
					<Nextjs width="2em" height="2em" />
					<TailWind width="2em" height="2em" />
					<Supabase width="2em" height="2em" />
				</div>
			</div>
		</>
	)
}
