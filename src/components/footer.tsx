export default function Footer() {
	return (
		<footer className="border-t-1 border-neutral-200 bg-neutral-100 p-4 text-center text-xs text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
			<p>
				Construido por{"  "}
				<a
					className="underline"
					target="_blank"
					href="https://github.com/Alexisxde">
					Alexis
				</a>
				, el uso de NextJS, Motion, Tailwindcss y Supabase. El el código fuente
				está disponible en{"  "}
				<a
					className="underline"
					target="_blank"
					href="https://github.com/Alexisxde/tarea-plus">
					GitHub.
				</a>
			</p>
		</footer>
	)
}
