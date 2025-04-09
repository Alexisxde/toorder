import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function month(number: number) {
  const month = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
  return month[number]
} 

export const applyTheme = (theme: "light" | "dark") => {
  const root = window.document.documentElement
  const isDark = theme === "dark"
  root.classList.remove(isDark ? "light" : "dark")
  root.classList.add(theme)
}