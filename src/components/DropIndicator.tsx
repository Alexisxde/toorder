import type { CardColumn, CardId } from "@/types"

interface Props {
	beforeId: CardId
	column: CardColumn
}

export default function DropIndicator({ beforeId, column }: Props) {
	return (
		<div
			data-before={beforeId || "-1"}
			data-column={column}
			className="my-0.5 h-0.5 w-full bg-blue-400 opacity-0"
		/>
	)
}
