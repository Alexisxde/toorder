import { motion } from "framer-motion"

interface Props {
	message: string | undefined
}

export default function Error({ message }: Props) {
	return (
		<motion.p
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			className="text-xs text-red-600">
			{message}
		</motion.p>
	)
}
