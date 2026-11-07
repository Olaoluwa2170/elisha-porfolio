import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Full-bleed Hero Artwork */}
      <motion.img
        src="/hero.jpg"
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full object-cover object-[60%_center] md:object-center pointer-events-none select-none"
      />

      {/* Overlays: overall dim, heavier on the text side, fades at top/bottom */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-background/45 md:bg-background/25" />
        <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-background/85 via-background/45 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="content-container relative z-10 pt-20">
        <div className="max-w-5xl mx-auto text-center md:text-left [text-shadow:0_2px_20px_rgb(0_0_0/0.5)]">
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
