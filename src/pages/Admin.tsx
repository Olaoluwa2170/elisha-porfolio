import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  clearAdminSession,
  isAdminConfigured,
  isAdminSessionActive,
  setAdminSessionActive,
  verifyAdminPassword,
} from "@/lib/adminAuth";
import {
  clearGithubConfig,
  deletePost,
  loadGithubConfig,
  publishPost,
  saveGithubConfig,
  uploadCoverImage,
  verifyGithubAccess,
  type GithubConfig,
} from "@/lib/github";
import { getAllPosts, slugify } from "@/lib/blog";
import type { BlogPost } from "@/content/blog/types";

const defaultConfig: GithubConfig = {
  token: "",
  owner: "Olaoluwa2170",
  repo: "elisha-porfolio",
  branch: "main",
};

const emptyForm = {
  slug: "",
  title: "",
  description: "",
  topic: "",
  coverImage: "",
  date: new Date().toISOString().slice(0, 10),
  content: "",
};

type PostFormState = typeof emptyForm;

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

function LoginGate({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);
  const configured = isAdminConfigured();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setChecking(true);
    setError("");
    const ok = await verifyAdminPassword(password);
    setChecking(false);
    if (ok) {
      setAdminSessionActive();
      onSuccess();
    } else {
      setError("Incorrect password");
    }
  };

  if (!configured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
        <div className="max-w-md bg-card border border-border rounded-2xl p-8">
          <h1 className="text-xl font-bold mb-3">Admin isn't set up yet</h1>
          <p className="text-sm text-muted-foreground mb-4">
            Set a <code className="text-primary">VITE_ADMIN_PASSWORD_HASH</code>{" "}
            environment variable (a SHA-256 hash of your chosen passphrase) to
            unlock this page. Run{" "}
            <code className="text-primary">node scripts/hash-password.mjs "your-passphrase"</code>{" "}
            to generate it, then add it to your <code>.env</code> file locally
            and to your Vercel project's environment variables.
          </p>
          <Link to="/" className="text-sm text-primary hover:underline">
            ← Back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-card border border-border rounded-2xl p-8"
      >
        <h1 className="text-xl font-bold mb-6">Admin Login</h1>
        <Label htmlFor="password">Passphrase</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 mb-2"
          autoFocus
        />
        {error && <p className="text-sm text-destructive mb-3">{error}</p>}
        <Button type="submit" disabled={checking} className="w-full mt-2">
          {checking ? <Loader2 className="w-4 h-4 animate-spin" /> : "Unlock"}
        </Button>
      </form>
    </div>
  );
}

const Admin = () => {
  const [authed, setAuthed] = useState(isAdminSessionActive());
  const [config, setConfig] = useState<GithubConfig>(
    loadGithubConfig() ?? defaultConfig
  );
  const [testingConnection, setTestingConnection] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>(getAllPosts());
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [form, setForm] = useState<PostFormState>(emptyForm);
  const [slugTouched, setSlugTouched] = useState(false);
  const [coverMode, setCoverMode] = useState<"url" | "upload">("url");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    if (!slugTouched) {
      setForm((f) => ({ ...f, slug: slugify(f.title) }));
    }
  }, [form.title, slugTouched]);

  const handleSaveConfig = () => {
    saveGithubConfig(config);
    toast.success("GitHub settings saved to this browser");
  };

  const handleTestConnection = async () => {
    setTestingConnection(true);
    try {
      await verifyGithubAccess(config);
      toast.success("Connection looks good");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Connection failed");
    } finally {
      setTestingConnection(false);
    }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingSlug(null);
    setSlugTouched(false);
    setCoverFile(null);
    setCoverPreview("");
    setCoverMode("url");
  };

  const handleEditPost = (post: BlogPost) => {
    setForm({
      slug: post.slug,
      title: post.title,
      description: post.description,
      topic: post.topic,
      coverImage: post.coverImage,
      date: post.date,
      content: post.content,
    });
    setEditingSlug(post.slug);
    setSlugTouched(true);
    setCoverMode("url");
    setCoverFile(null);
    setCoverPreview("");
  };

  const handleDelete = async (slug: string) => {
    if (!confirm(`Delete post "${slug}"? This commits directly to your repo.`)) {
      return;
    }
    try {
      await deletePost(config, slug);
      toast.success("Post deleted. It will disappear after the next deploy.");
      setPosts((prev) => prev.filter((p) => p.slug !== slug));
      if (editingSlug === slug) resetForm();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete post");
    }
  };

  const handleCoverFile = async (file: File | null) => {
    setCoverFile(file);
    if (file) {
      const dataUrl = await readFileAsDataUrl(file);
      setCoverPreview(dataUrl);
    } else {
      setCoverPreview("");
    }
  };

  const handlePublish = async (e: FormEvent) => {
    e.preventDefault();
    if (!config.token) {
      toast.error("Add a GitHub token in the settings panel first");
      return;
    }
    if (!form.slug || !form.title || !form.content) {
      toast.error("Title, slug, and content are required");
      return;
    }

    setIsPublishing(true);
    try {
      let coverImage = form.coverImage;
      if (coverMode === "upload" && coverFile) {
        const dataUrl = await readFileAsDataUrl(coverFile);
        const ext = coverFile.name.split(".").pop() || "jpg";
        coverImage = await uploadCoverImage(config, `${form.slug}-cover.${ext}`, dataUrl);
      }

      const post: BlogPost = {
        slug: form.slug,
        title: form.title,
        description: form.description,
        topic: form.topic || "General",
        coverImage: coverImage || "/og-image.png",
        date: form.date,
        content: form.content,
      };

      await publishPost(config, post);
      toast.success(
        `Published "${post.title}". Redeploy usually takes a minute or two.`
      );
      resetForm();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to publish");
    } finally {
      setIsPublishing(false);
    }
  };

  if (!authed) {
    return <LoginGate onSuccess={() => setAuthed(true)} />;
  }

  return (
    <main className="min-h-screen bg-background text-foreground pb-24">
      <div className="content-container pt-12">
        <div className="flex items-center justify-between mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to site
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              clearAdminSession();
              setAuthed(false);
            }}
          >
            Log out
          </Button>
        </div>

        <h1 className="text-3xl font-bold mb-8">Blog Admin</h1>

        {/* GitHub settings */}
        <section className="bg-card border border-border rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-semibold mb-1">GitHub connection</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Publishing commits directly to your repo via the GitHub API. Use a
            fine-grained personal access token scoped to just this repo's
            "Contents: Read and write" permission. It's stored only in this
            browser's local storage.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="owner">Repo owner</Label>
              <Input
                id="owner"
                value={config.owner}
                onChange={(e) => setConfig({ ...config, owner: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="repo">Repo name</Label>
              <Input
                id="repo"
                value={config.repo}
                onChange={(e) => setConfig({ ...config, repo: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="branch">Branch</Label>
              <Input
                id="branch"
                value={config.branch}
                onChange={(e) => setConfig({ ...config, branch: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="token">Personal access token</Label>
              <Input
                id="token"
                type="password"
                value={config.token}
                onChange={(e) => setConfig({ ...config, token: e.target.value })}
                className="mt-2"
                placeholder="github_pat_..."
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            <Button type="button" onClick={handleSaveConfig}>
              Save settings
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleTestConnection}
              disabled={testingConnection || !config.token}
            >
              {testingConnection ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Test connection"
              )}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                clearGithubConfig();
                setConfig(defaultConfig);
                toast.success("Cleared saved GitHub settings");
              }}
            >
              Forget token
            </Button>
          </div>
        </section>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Editor */}
          <section className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">
                {editingSlug ? `Editing "${editingSlug}"` : "New post"}
              </h2>
              {editingSlug && (
                <Button type="button" variant="ghost" size="sm" onClick={resetForm}>
                  Start new post
                </Button>
              )}
            </div>

            <form onSubmit={handlePublish} className="space-y-5">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="mt-2"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={form.slug}
                    onChange={(e) => {
                      setSlugTouched(true);
                      setForm({ ...form, slug: slugify(e.target.value) });
                    }}
                    className="mt-2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="topic">Topic</Label>
                  <Input
                    id="topic"
                    value={form.topic}
                    onChange={(e) => setForm({ ...form, topic: e.target.value })}
                    className="mt-2"
                    placeholder="Engineering, Career, AI..."
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">
                  Short description (used for the card and social preview)
                </Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="mt-2"
                  rows={2}
                  required
                />
              </div>

              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="mt-2 max-w-xs"
                />
              </div>

              <div>
                <Label>Cover image (used for the card and social preview graphic)</Label>
                <div className="flex gap-2 mt-2 mb-3">
                  <Button
                    type="button"
                    size="sm"
                    variant={coverMode === "url" ? "default" : "outline"}
                    onClick={() => setCoverMode("url")}
                  >
                    Image URL
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant={coverMode === "upload" ? "default" : "outline"}
                    onClick={() => setCoverMode("upload")}
                  >
                    Upload file
                  </Button>
                </div>
                {coverMode === "url" ? (
                  <Input
                    value={form.coverImage}
                    onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                    placeholder="https://... or /og-image.png"
                  />
                ) : (
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleCoverFile(e.target.files?.[0] ?? null)}
                  />
                )}
                {(coverPreview || form.coverImage) && (
                  <img
                    src={coverPreview || form.coverImage}
                    alt="Cover preview"
                    className="mt-3 rounded-lg border border-border aspect-[1200/630] w-full max-w-sm object-cover"
                  />
                )}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="content">Content (Markdown)</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPreview((p) => !p)}
                  >
                    {showPreview ? "Edit" : "Preview"}
                  </Button>
                </div>
                {showPreview ? (
                  <div className="mt-2 prose prose-invert max-w-none border border-border rounded-md p-4 min-h-[300px]">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {form.content || "*Nothing to preview yet*"}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <Textarea
                    id="content"
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    className="mt-2 font-mono text-sm"
                    rows={16}
                    required
                  />
                )}
              </div>

              <Button type="submit" disabled={isPublishing} className="w-full">
                {isPublishing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : editingSlug ? (
                  "Save changes"
                ) : (
                  "Publish post"
                )}
              </Button>
            </form>
          </section>

          {/* Existing posts */}
          <section className="bg-card border border-border rounded-2xl p-6 h-fit">
            <h2 className="text-lg font-semibold mb-4">
              Published posts ({posts.length})
            </h2>
            <p className="text-xs text-muted-foreground mb-4">
              This list reflects the last deployed build — a new publish
              appears here after your host finishes redeploying.
            </p>
            <ul className="space-y-3">
              {posts.map((post) => (
                <li
                  key={post.slug}
                  className="flex items-start justify-between gap-2 border-b border-border pb-3 last:border-0"
                >
                  <button
                    type="button"
                    onClick={() => handleEditPost(post)}
                    className="text-left text-sm font-medium hover:text-primary transition-colors"
                  >
                    {post.title}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(post.slug)}
                    aria-label={`Delete ${post.title}`}
                    className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Admin;
