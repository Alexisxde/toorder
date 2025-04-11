import "@/globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import { Poppins } from "next/font/google"

const poppins = Poppins({
	weight: ["400", "500", "600", "700", "800", "900"],
	style: ["normal", "italic"],
	subsets: ["latin"]
})

export const metadata: Metadata = { title: "Werty - Todo App" }

export default function RootLayout({
	children
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="es" className="dark">
			<body className={`${poppins.className}`}>
				<ThemeProvider attribute="class">{children}</ThemeProvider>
			</body>
		</html>
	)
}
