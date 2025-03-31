import GitHub from "@/components/icons/GitHub"
import Werty from "@/components/icons/werty.svg"
import SignOutButton from "@/components/SignOutButton"
import Image from "next/image"

export default async function Header() {
	return (
		<header className="sticky top-0 z-[99px] flex h-12 max-h-12 min-h-12 items-center justify-between border-b-[0.25px] border-neutral-800 bg-neutral-900 px-6">
			<a href="/">
				<Image className="h-5 w-auto" src={Werty} alt="Werty Logo" />
			</a>
			<div className="flex items-center justify-center gap-4">
				<nav className="flex h-6 items-center justify-center gap-4 border-r-[0.25px] border-r-neutral-800 pr-3">
					<a
						href="/"
						className="rounded-md text-xs text-neutral-400 underline-offset-4 transition-all duration-200 ease-in-out hover:text-neutral-100 hover:underline">
						Home
					</a>
					<a
						href="/dashboard"
						className="rounded-md text-xs text-neutral-400 underline-offset-4 transition-all duration-200 ease-in-out hover:text-neutral-100 hover:underline">
						Dashboard
					</a>
				</nav>
				<div className="flex items-center gap-3">
					<a
						href="https://github.com/Alexisxde/tarea-plus"
						target="_blank"
						rel="noopener noreferrer">
						<GitHub />
					</a>
					<SignOutButton>Cerrar sesión</SignOutButton>
				</div>
			</div>
		</header>
	)
}
