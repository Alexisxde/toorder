import { z } from "zod"

const ACCEPTED_IMAGE_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp"
]

export const formSchemaTask = z.object({
	title: z.string().min(1, "Title is required."),
	description: z.string().optional(),
	image: z
		.any()
		.optional()
		.refine(
			file => {
				if (file && file.length > 0) {
					return ACCEPTED_IMAGE_TYPES.includes(file[0]?.type)
				}
				return true
			},
			{ message: "Only .jpg, .jpeg, .png and .webp formats are supported." }
		),
	image_url: z
		.string()
		.optional()
		.refine(url => url === "" || z.string().url().safeParse(url).success, {
			message: "Invalid image URL format or empty value."
		}),
	badge: z.enum(["design", "development", "study", "planning"], {
		message: "Badge must be one of: design, development, study, planning."
	})
})
