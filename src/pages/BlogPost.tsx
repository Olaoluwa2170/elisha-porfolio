import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import { ShareButtons } from "@/components/ShareButtons";
import { AnimatedSection } from "@/components/AnimatedComponents";
import {
  estimateReadingTime,
  formatDate,
  getPostBySlug,
  SITE_URL,
} from "@/lib/blog";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = useMemo(() => (slug ? getPostBySlug(slug) : undefined), [slug]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const url = `${SITE_URL}/blog/${post.slug}`;

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <SEO
        title={`${post.title} | Elisha Babalola`}
        description={post.description}
        image={post.coverImage}
        url={`/blog/${post.slug}`}
        type="article"
      />
      <Navigation />

      <article className="section-padding pt-32">
        <div className="content-container max-w-3xl">
          <AnimatedSection>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to blog
            </Link>
          </AnimatedSection>

          <AnimatedSection delay={0.05}>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full">
                {post.topic}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatDate(post.date)} · {estimateReadingTime(post.content)} min read
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {post.description}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="mb-10">
              <ShareButtons url={url} title={post.title} />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="aspect-[1200/630] w-full overflow-hidden rounded-2xl border border-border mb-12 bg-secondary/40">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="mt-16 pt-8 border-t border-border">
              <ShareButtons url={url} title={post.title} />
            </div>
          </AnimatedSection>
        </div>
      </article>
    </main>
  );
};

export default BlogPost;
