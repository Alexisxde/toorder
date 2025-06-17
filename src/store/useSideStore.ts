import { create } from "zustand"

interface SideState {
	isOpen: boolean
	setIsOpen: () => void
}

export const useSideStore = create<SideState>((set, get) => ({
	isOpen: false,
	setIsOpen: () => set({ isOpen: !get().isOpen })
}))
