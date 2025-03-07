interface Props {
	children: React.ReactNode
}

export default function Button({ children }: Props) {
	return (
		<button
			className={`rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-4 py-2 text-center text-xs font-medium text-neutral-100 shadow-md shadow-green-500/50 hover:bg-gradient-to-br focus:ring-4 focus:ring-green-300 focus:outline-none dark:shadow-lg dark:shadow-green-800/80 dark:focus:ring-green-800`}>
			{children}
		</button>
	)
}
