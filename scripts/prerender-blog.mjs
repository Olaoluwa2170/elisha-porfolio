// Generates a static HTML file per blog post (and one for the blog index)
// inside dist/, each with correct <title>/meta/OG tags for that post.
// Link-unfurling bots (Twitter, Facebook, Slack, LinkedIn, ...) don't run
// JS, so the plain client-rendered SPA can't give them per-post previews.
// These static files are served instead (see vercel.json's cleanUrls),
// and once the bundle loads in a real browser, React Router takes over
// the same URL and renders the interactive page as usual.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const SITE_URL = "https://elishababalola.dev";

const template = readFileSync(path.join(distDir, "index.html"), "utf-8");
const posts = JSON.parse(
  readFileSync(path.join(root, "src/content/blog/posts.json"), "utf-8")
);

function absoluteUrl(pathOrUrl) {
  return pathOrUrl.startsWith("http") ? pathOrUrl : `${SITE_URL}${pathOrUrl}`;
}

function setTagContent(html, matchAttr, matchValue, newContent) {
  const pattern = new RegExp(
    `(<meta[^>]*${matchAttr}=["']${matchValue}["'][^>]*content=["'])[^"']*(["'][^>]*>)`,
    "i"
  );
  return html.replace(pattern, `$1${newContent}$2`);
}

function renderPage({ title, description, image, url, type }) {
  let html = template;
  html = html.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`);
  html = setTagContent(html, "name", "description", description);
  html = setTagContent(html, "property", "og:title", title);
  html = setTagContent(html, "property", "og:description", description);
  html = setTagContent(html, "property", "og:type", type);
  html = setTagContent(html, "property", "og:image", absoluteUrl(image));
  html = setTagContent(html, "name", "twitter:title", title);
  html = setTagContent(html, "name", "twitter:description", description);
  html = setTagContent(html, "name", "twitter:image", absoluteUrl(image));

  if (html.includes('property="og:url"')) {
    html = setTagContent(html, "property", "og:url", url);
  } else {
    html = html.replace(
      /<meta property="og:image"[^>]*>/i,
      (m) => `${m}\n    <meta property="og:url" content="${url}" />`
    );
  }

  html = html.replace(
    /<link rel="canonical"[^>]*>/i,
    `<link rel="canonical" href="${url}" />`
  );

  return html;
}

mkdirSync(path.join(distDir, "blog"), { recursive: true });

// /blog index
writeFileSync(
  path.join(distDir, "blog.html"),
  renderPage({
    title: "Blog | Elisha Babalola",
    description:
      "Notes on building fintech products, frontend engineering, and AI-assisted development from Elisha Babalola.",
    image: "/og-image.png",
    url: `${SITE_URL}/blog`,
    type: "website",
  })
);

// /blog/:slug
for (const post of posts) {
  writeFileSync(
    path.join(distDir, "blog", `${post.slug}.html`),
    renderPage({
      title: `${post.title} | Elisha Babalola`,
      description: post.description,
      image: post.coverImage,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
    })
  );
}

console.log(`Prerendered ${posts.length} blog post page(s) + blog index.`);
