/** @type {import('next').NextConfig} */
import appConfig from "./env.config.ts"
const nextConfig = {
	images: {
		domains: [
			"https://images.unsplash.com"
		],
		formats: ["image/avif", "image/webp"],
		remotePatterns: [
			{
				hostname: "images.unsplash.com",
				pathname: "/**",
				port: "",
				protocol: "https"
			}
		]
	},
	env: {
		NEXT_PUBLIC_FIREBASE_API_KEY: appConfig().NEXT_PUBLIC_FIREBASE_API_KEY,
		NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: appConfig().NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
		NEXT_PUBLIC_FIREBASE_PROJECT_ID: appConfig().NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: appConfig().NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
		NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: appConfig().NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
		NEXT_PUBLIC_FIREBASE_APP_ID: appConfig().NEXT_PUBLIC_FIREBASE_APP_ID
	    }
};

export default nextConfig;
