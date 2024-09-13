// vitest.config.js
import { defineConfig } from 'vitest/config';
import path from "path";

export default defineConfig({
    test: {
        include: ['test/**/*.test.js','test/**/*.test.ts',"tests/**/*.test.ts","tests/**/*.test.js"],
        coverage: {
            reporter: ['text', 'json', 'html'],
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
});