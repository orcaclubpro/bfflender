import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./public/**/*.{html,js}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
} satisfies Config

export default config
