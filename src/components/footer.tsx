export default function Footer() {
	return (
		<footer className="border-b-1 border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-800 dark:bg-neutral-900 text-center text-xs border-t-1 border-neutral-200 dark:border-neutral-800">
			<p>
				Construido por {" "}
				<a
					className="underline"
					target="_blank"
					href="https://github.com/Alexisxde">
					Alexis
				</a>
				, el uso de NextJS, Motion, TailwindCSS y Tailwindcss. El el código fuente está
				disponible en {" "}
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
