import "@/globals.css"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"

const poppins = Poppins({
	weight: ["400", "500", "600", "700", "800", "900"],
	style: ["normal", "italic"],
	subsets: ["latin"]
})

export const metadata: Metadata = { title: "Tarea Plus - Todo App" }

export default function RootLayout({
	children
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="es">
			<body className={`max-w-8xl mx-auto ${poppins.className}`}>
				{children}
			</body>
		</html>
	)
}
