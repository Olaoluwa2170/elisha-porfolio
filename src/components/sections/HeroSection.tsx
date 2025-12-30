import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Technical Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.2]" />

      {/* Gradient Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

      {/* Decorative Orb Effect - Replaced blobs with subtle glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] opacity-20 animate-pulse" />

      <div className="content-container relative z-10 pt-20">
        <div className="max-w-5xl mx-auto text-center md:text-left">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8 inline-block"
          >
            <span className="px-3 py-1 text-xs font-mono font-medium tracking-wider uppercase text-primary border border-primary/30 rounded bg-primary/5">
              System Architecture &bull; Full Stack Engineering
            </span>
          </motion.div>

          {/* Name & Headline */}
          <div className="space-y-2 mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-6xl md:text-8xl font-bold tracking-tighter text-foreground"
            >
              Babalola <span className="text-primary">Elisha</span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-2xl md:text-4xl font-light text-muted-foreground tracking-tight"
            >
              Architecting Digital Excellence.
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-12 md:mx-0 mx-auto"
          >
            I build scalable, high-performance systems that solve real-world
            problems. Merging technical precision with intuitive design to
            create software that feels
            <span className="text-foreground font-medium"> inevitable</span>.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <a
              href="#vision"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-all shadow-[0_0_20px_-5px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_25px_-5px_hsl(var(--primary)/0.6)]"
            >
              Explore Solutions
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </a>
            <a
              href="#connect"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-border text-foreground font-medium rounded-md hover:bg-muted/50 transition-colors"
            >
              View Documentation
            </a>
          </motion.div>
        </div>
      </div>

      {/* Technical Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-primary/50" />
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground opacity-60">
          System Online
        </span>
      </motion.div>
    </section>
  );
}
