import { FlatCompat } from "@eslint/eslintrc"
import { dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({ baseDirectory: __dirname })

const eslintConfig = [
	...compat.config({
		extends: ["next/core-web-vitals", "next/typescript"],
		rules: {
			"react/jsx-no-target-blank": "off",
			"react/prop-types": "off",
			"@typescript-eslint/no-unused-vars": "warn",
			"@typescript-eslint/no-explicit-any": "warn",
			"no-console": "error",
			"no-label-var": "error",
			"no-multi-str": "error",
			"no-negated-condition": "error",
			"no-nested-ternary": "error",
			"no-unneeded-ternary": "error",
			"no-var": "error"
		}
	})
]

export default eslintConfig
