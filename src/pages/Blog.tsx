import { useMemo, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { BlogCard } from "@/components/BlogCard";
import { SEO } from "@/components/SEO";
import { AnimatedSection } from "@/components/AnimatedComponents";
import { getAllPosts, getTopics } from "@/lib/blog";

const Blog = () => {
  const posts = useMemo(() => getAllPosts(), []);
  const topics = useMemo(() => getTopics(), []);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const filteredPosts = activeTopic
    ? posts.filter((post) => post.topic === activeTopic)
    : posts;

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <SEO
        title="Blog | Elisha Babalola"
        description="Notes on building fintech products, frontend engineering, and AI-assisted development from Elisha Babalola."
        url="/blog"
      />
      <Navigation />

      <section className="section-padding pt-32">
        <div className="content-container">
          <AnimatedSection>
            <span className="inline-block px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-full mb-8">
              The Blog
            </span>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              Writing &amp; Notes
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-10">
              Thoughts on shipping fintech products, frontend engineering, and
              everything in between.
            </p>
          </AnimatedSection>

          {topics.length > 1 && (
            <AnimatedSection delay={0.15}>
              <div className="flex flex-wrap gap-2 mb-12">
                <button
                  onClick={() => setActiveTopic(null)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    activeTopic === null
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  All
                </button>
                {topics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => setActiveTopic(topic)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                      activeTopic === topic
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </AnimatedSection>
          )}

          {filteredPosts.length === 0 ? (
            <p className="text-muted-foreground">No posts yet — check back soon.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <BlogCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Blog;
