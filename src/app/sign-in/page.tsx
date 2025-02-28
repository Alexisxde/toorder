import SignInButton from "@/components/SignInButton"
import Nextjs from "@/components/icons/Nextjs"
import React from "@/components/icons/React"
import Supabase from "@/components/icons/Supabase"
import TailWind from "@/components/icons/Tailwind"

export default function SignIn() {
	return (
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
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="pl-0.5 text-white">
										<path d="M5 12h14"></path>
										<path d="m12 5 7 7-7 7"></path>
									</svg>
								</span>
							</div>
						</span>
					</a>
				</div>
				<h2 className="text-center text-3xl font-medium text-gray-50 sm:text-6xl">
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
	)
}
