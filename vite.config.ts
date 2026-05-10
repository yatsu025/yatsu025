import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { componentTagger } from "lovable-tagger";
import { allProjects } from "./src/data/projectsData";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateSitemapAndRobots(siteUrl: string) {
  const base = siteUrl.replace(/\/$/, "");
  return {
    name: "generate-sitemap-robots",
    closeBundle() {
      if (!base) return;

      const distDir = path.resolve(__dirname, "dist");
      const routes = new Set<string>(["/", "/certifications"]);

      for (const p of allProjects) {
        if (!p.isComingSoon) routes.add(`/project/${p.id}`);
      }

      const lastmod = new Date().toISOString().split("T")[0];
      const urlEntries = [...routes]
        .sort()
        .map((route) => {
          const loc = `${base}${route === "/" ? "/" : route}`;
          const priority = route === "/" ? "1.0" : "0.8";
          return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
        })
        .join("\n");

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;
      fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap, "utf8");

      const robots = [
        "User-agent: Googlebot",
        "Allow: /",
        "",
        "User-agent: Bingbot",
        "Allow: /",
        "",
        "User-agent: Twitterbot",
        "Allow: /",
        "",
        "User-agent: facebookexternalhit",
        "Allow: /",
        "",
        "User-agent: *",
        "Allow: /",
        "",
        `Sitemap: ${base}/sitemap.xml`,
        "",
      ].join("\n");
      fs.writeFileSync(path.join(distDir, "robots.txt"), robots, "utf8");
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteUrl = (env.VITE_SITE_URL || "").trim();

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
      siteUrl ? generateSitemapAndRobots(siteUrl) : null,
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
