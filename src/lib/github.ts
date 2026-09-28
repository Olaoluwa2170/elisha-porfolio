import type { BlogPost } from "@/content/blog/types";

export interface GithubConfig {
  token: string;
  owner: string;
  repo: string;
  branch: string;
}

const CONFIG_KEY = "blog_admin_github_config";
const POSTS_PATH = "src/content/blog/posts.json";

export function loadGithubConfig(): GithubConfig | null {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    return raw ? (JSON.parse(raw) as GithubConfig) : null;
  } catch {
    return null;
  }
}

export function saveGithubConfig(config: GithubConfig): void {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
}

export function clearGithubConfig(): void {
  localStorage.removeItem(CONFIG_KEY);
}

function encodeBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

function decodeBase64(base64: string): string {
  const binary = atob(base64.replace(/\n/g, ""));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

async function githubRequest(
  path: string,
  config: GithubConfig,
  init?: RequestInit
): Promise<Response> {
  return fetch(
    `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${path}`,
    {
      ...init,
      headers: {
        Authorization: `Bearer ${config.token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        ...(init?.headers || {}),
      },
    }
  );
}

async function readGithubError(res: Response, fallback: string): Promise<string> {
  const body = await res.json().catch(() => null);
  return body?.message ? `${fallback}: ${body.message}` : `${fallback} (${res.status})`;
}

export async function verifyGithubAccess(config: GithubConfig): Promise<void> {
  const res = await githubRequest(
    `${POSTS_PATH}?ref=${config.branch}`,
    config,
    { method: "GET" }
  );
  if (!res.ok) {
    throw new Error(
      await readGithubError(res, "Could not access the repo with these settings")
    );
  }
}

async function fetchPostsFile(
  config: GithubConfig
): Promise<{ sha: string; posts: BlogPost[] }> {
  const res = await githubRequest(
    `${POSTS_PATH}?ref=${config.branch}`,
    config,
    { method: "GET" }
  );
  if (!res.ok) {
    throw new Error(await readGithubError(res, "Failed to read posts.json"));
  }
  const data = await res.json();
  const content = decodeBase64(data.content);
  return { sha: data.sha, posts: JSON.parse(content) as BlogPost[] };
}

async function writePostsFile(
  config: GithubConfig,
  posts: BlogPost[],
  sha: string,
  message: string
): Promise<void> {
  const res = await githubRequest(POSTS_PATH, config, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: encodeBase64(JSON.stringify(posts, null, 2)),
      sha,
      branch: config.branch,
    }),
  });
  if (!res.ok) {
    throw new Error(await readGithubError(res, "Failed to write posts.json"));
  }
}

export async function publishPost(
  config: GithubConfig,
  post: BlogPost
): Promise<void> {
  const { sha, posts } = await fetchPostsFile(config);
  const existingIndex = posts.findIndex((p) => p.slug === post.slug);
  const nextPosts =
    existingIndex >= 0
      ? posts.map((p, i) => (i === existingIndex ? post : p))
      : [post, ...posts];
  await writePostsFile(
    config,
    nextPosts,
    sha,
    `${existingIndex >= 0 ? "Update" : "Add"} blog post: ${post.title}`
  );
}

export async function deletePost(
  config: GithubConfig,
  slug: string
): Promise<void> {
  const { sha, posts } = await fetchPostsFile(config);
  const nextPosts = posts.filter((p) => p.slug !== slug);
  await writePostsFile(config, nextPosts, sha, `Delete blog post: ${slug}`);
}

/** dataUrl is the full result of FileReader.readAsDataURL (includes the data: prefix). */
export async function uploadCoverImage(
  config: GithubConfig,
  fileName: string,
  dataUrl: string
): Promise<string> {
  const base64Data = dataUrl.split(",")[1] ?? "";
  const publicPath = `blog/${fileName}`;
  const res = await githubRequest(`public/${publicPath}`, config, {
    method: "PUT",
    body: JSON.stringify({
      message: `Add blog cover image: ${fileName}`,
      content: base64Data,
      branch: config.branch,
    }),
  });
  if (!res.ok) {
    throw new Error(await readGithubError(res, "Failed to upload cover image"));
  }
  return `/${publicPath}`;
}
