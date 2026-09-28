import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { BlogPost } from "@/content/blog/types";
import { formatDate } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group block h-full bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300"
      >
        <div className="aspect-[1200/630] w-full overflow-hidden bg-secondary/40">
          <img
            src={post.coverImage}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full">
              {post.topic}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatDate(post.date)}
            </span>
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {post.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
