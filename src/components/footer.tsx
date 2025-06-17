import GitHubIcon from "@/components/icons/GitHub"
import { Button } from "@/components/ui/button"
import { SparklesIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

export default function Footer() {
	return (
		<nav className="absolute right-5 bottom-4 flex items-center space-x-2">
			<Link href="https://github.com/Alexisxde/toorder" target="_blank">
				<Button variant="outline" className="flex items-center space-x-2">
					<div className="flex items-center space-x-2">
						<GitHubIcon className="size-4 fill-neutral-900 dark:fill-neutral-500" />
						<span>GitHub</span>
					</div>
				</Button>
			</Link>
			<Link href="https://alexisxde.github.io" target="_blank">
				<Button variant="outline" className="flex items-center space-x-2">
					<div className="flex items-center space-x-2">
						<SparklesIcon className="size-4 text-neutral-800 dark:text-neutral-500" />
						<span>Built by Alexis</span>
					</div>
				</Button>
			</Link>
		</nav>
	)
}
