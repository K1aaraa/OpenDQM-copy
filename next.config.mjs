const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: isGithubPages && basePath ? basePath : undefined,
  assetPrefix: isGithubPages && basePath ? `${basePath}/` : undefined
};

export default nextConfig;
