import type { BlogPost } from "@/content/blog/types";

export interface GithubConfig {
  token: string;
  owner: string;
  repo: string;
  branch: string;
}

const CONFIG_KEY = "blog_admin_github_config";
const POSTS_PATH = "src/content/blog/posts.json";
// Lives outside src/ so Vite never bundles it and the prerender script never
// sees it: private posts stay out of the built site entirely.
const PRIVATE_POSTS_PATH = "content-private/posts.json";

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
  config: GithubConfig,
  path: string,
  allowMissing = false
): Promise<{ sha: string | null; posts: BlogPost[] }> {
  const res = await githubRequest(`${path}?ref=${config.branch}`, config, {
    method: "GET",
  });
  if (res.status === 404 && allowMissing) {
    return { sha: null, posts: [] };
  }
  if (!res.ok) {
    throw new Error(await readGithubError(res, `Failed to read ${path}`));
  }
  const data = await res.json();
  const content = decodeBase64(data.content);
  return { sha: data.sha, posts: JSON.parse(content) as BlogPost[] };
}

async function writePostsFile(
  config: GithubConfig,
  path: string,
  posts: BlogPost[],
  sha: string | null,
  message: string
): Promise<void> {
  const res = await githubRequest(path, config, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: encodeBase64(JSON.stringify(posts, null, 2)),
      ...(sha ? { sha } : {}),
      branch: config.branch,
    }),
  });
  if (!res.ok) {
    throw new Error(await readGithubError(res, `Failed to write ${path}`));
  }
}

export async function listPrivatePosts(
  config: GithubConfig
): Promise<BlogPost[]> {
  const { posts } = await fetchPostsFile(config, PRIVATE_POSTS_PATH, true);
  return posts;
}

/** Saves to the public or private file, and removes the post from the other one (e.g. when toggling visibility). */
export async function publishPost(
  config: GithubConfig,
  post: BlogPost,
  isPrivate: boolean
): Promise<void> {
  const targetPath = isPrivate ? PRIVATE_POSTS_PATH : POSTS_PATH;
  const otherPath = isPrivate ? POSTS_PATH : PRIVATE_POSTS_PATH;

  const target = await fetchPostsFile(config, targetPath, isPrivate);
  const existingIndex = target.posts.findIndex((p) => p.slug === post.slug);
  const nextPosts =
    existingIndex >= 0
      ? target.posts.map((p, i) => (i === existingIndex ? post : p))
      : [post, ...target.posts];
  const verb = isPrivate
    ? "Save private"
    : existingIndex >= 0
      ? "Update"
      : "Add";
  await writePostsFile(
    config,
    targetPath,
    nextPosts,
    target.sha,
    `${verb} blog post: ${post.title}`
  );

  const other = await fetchPostsFile(config, otherPath, !isPrivate);
  if (other.posts.some((p) => p.slug === post.slug)) {
    await writePostsFile(
      config,
      otherPath,
      other.posts.filter((p) => p.slug !== post.slug),
      other.sha,
      `Move blog post to ${isPrivate ? "private" : "public"}: ${post.slug}`
    );
  }
}

export async function deletePost(
  config: GithubConfig,
  slug: string,
  isPrivate: boolean
): Promise<void> {
  const path = isPrivate ? PRIVATE_POSTS_PATH : POSTS_PATH;
  const { sha, posts } = await fetchPostsFile(config, path);
  await writePostsFile(
    config,
    path,
    posts.filter((p) => p.slug !== slug),
    sha,
    `Delete blog post: ${slug}`
  );
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
