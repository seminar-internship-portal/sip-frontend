// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    API_BASE_URL: "https://sip-backend-api.onrender.com/api/v1", // Update with correct API base URL
  },
  images: {
    domains: ["res.cloudinary.com", "example.com"],
  },
};

module.exports = nextConfig;
