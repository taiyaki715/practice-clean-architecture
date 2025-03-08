import { defineConfig } from "vitest/config"
import tsconfigpaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tsconfigpaths()],
    test: {
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: ['node_modules/', '.git/'],
        },
    },
})
