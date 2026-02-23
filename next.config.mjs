/** @type {import('next').NextConfig} */
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserPagesRepo = repo.toLowerCase() === "mohammeddjaveed.github.io";
const pagesBasePath =
  process.env.NODE_ENV === "production" && repo && !isUserPagesRepo
    ? `/${repo}`
    : "";

const nextConfig = {
  output: "export",
  basePath: pagesBasePath,
  assetPrefix: pagesBasePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
