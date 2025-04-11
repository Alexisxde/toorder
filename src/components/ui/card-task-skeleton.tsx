export default function CardTaskSkeleton() {
	return (
		<section className="w-full flex-1">
			<div className="sticky top-13 z-20 mb-2 flex animate-pulse items-center justify-between rounded-md border border-neutral-800 bg-neutral-900 px-2 py-1">
				<div className="text-md inline-flex items-center gap-2 py-1">
					<div className="h-6 w-16 rounded bg-neutral-700"></div>
				</div>
				<div className="inline-flex h-4 w-8 animate-pulse items-center gap-1 rounded-lg bg-neutral-600 px-1.5 py-0.5 text-xs" />
			</div>
			<div className="flex w-full flex-col gap-2 bg-slate-800/0 transition-colors">
				<article className="animate-pulse space-y-1 rounded-md border border-neutral-800 bg-neutral-900 p-4">
					<div className="flex flex-col gap-2">
						<div className="h-3 w-24 rounded bg-neutral-700"></div>
						<div className="h-5 w-48 rounded bg-neutral-600"></div>
					</div>
					<div className="my-2 border-b-1 border-neutral-800"></div>
					<div className="flex w-full items-center justify-between">
						<div className="h-3 w-20 rounded bg-neutral-600"></div>
					</div>
				</article>
				<article className="animate-pulse space-y-1 rounded-md border border-neutral-800 bg-neutral-900 p-4">
					<div className="flex flex-col gap-2">
						<div className="h-3 w-24 rounded bg-neutral-700"></div>
						<div className="h-5 w-48 rounded bg-neutral-600"></div>
					</div>
					<div className="my-2 border-b-1 border-neutral-800"></div>
					<div className="flex w-full items-center justify-between">
						<div className="h-3 w-20 rounded bg-neutral-600"></div>
					</div>
				</article>
			</div>
		</section>
	)
}
