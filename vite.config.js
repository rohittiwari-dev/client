import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			// Proxy requests to '/api' to your API server
			"/api": {
				target: "https://schedular-backend.onrender.com/api/v1", // Replace with the URL of your API server
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
		watch: {
			usePolling: true,
		},
	},
});
