import { create } from "zustand"

interface SideState {
	isOpen: boolean
	setIsOpen: () => void
}

export const useSideStore = create<SideState>((set, get) => ({
	isOpen: true,
	setIsOpen: () => set({ isOpen: !get().isOpen })
}))
