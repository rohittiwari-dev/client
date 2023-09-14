import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: 'https://schedular-backend.onrender.com/api/v1',
		watch:{
			usePolling:true,
		}
	},
});
