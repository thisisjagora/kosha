/** @type {import('next').NextConfig} */
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
	}
};

export default nextConfig;
