import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ThemeState {
	theme: "dark" | "light"
	setTheme: (theme: "dark" | "light") => void
}

export const useThemeStore = create<ThemeState>()(
	persist(
		set => ({
			theme: "dark",
			setTheme: theme => {
				if (typeof document !== "undefined") {
					document.documentElement.classList.toggle("dark", theme === "dark")
					set({ theme })
				}
			}
		}),
		{ name: "theme" }
	)
)
