"use client"
import { Button } from "@/components/ui/Button"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { AnimatePresence, motion } from "framer-motion"

interface Props {
	children: React.ReactNode
	handleSheet: () => void
	title: string
}

export default function Sheet({ children, handleSheet, title }: Props) {
	return (
    <motion.div
      initial={{ opacity: 0 }}
	    animate={{ opacity: 1 }}
	    exit={{ opacity: 0, transition: { delay: 0.2 } }}
	    transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex justify-end bg-neutral-800/10 backdrop-blur-xs"
      onClick={handleSheet}>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3 }}
        className="mr-2 flex h-auto w-sm max-w-md flex-col gap-4 overflow-auto border border-neutral-800 bg-neutral-900 p-5"
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">{title}</h3>
          <Button variant="icon" onClick={handleSheet}>
            <XMarkIcon className="size-6" />
          </Button>
        </div>
        {children}
      </motion.div>
    </motion.div>
	)
}
