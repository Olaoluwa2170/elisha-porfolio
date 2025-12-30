import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AnimatedSection } from "../AnimatedComponents";

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  highlights: string[];
}

const timeline: TimelineItem[] = [
  {
    year: "Apr 2025 - Present", // Note: User CV says 2025, likely a typo for 2024 or future, but I will keep as 'Present' or adjust if logic dictates. Paritie seems to have two roles.
    // The user listed "Paritie Dynamic Enterprise Limited" twice. I will combine or split based on distinct roles.
    // Role 1: Frontend Developer (React js (vite)) - XND Project
    title: "Frontend Developer (React/Vite)",
    company: "Paritie Dynamic Enterprise (XND Project)",
    description:
      "Developing the XND trading platform, focusing on merchant flows for USDT/Giftcards and Admin Dashboard user management.",
    highlights: [
      "Built USDT and Giftcard flows for merchant users",
      "Developed Dashboard and User Management for Admin",
      "Integrated complex backend functionalities for seamless UX",
    ],
  },
  {
    year: "Oct 2024 - Present",
    // Role 2: Frontend Developer (Next js) - Cambio Project
    title: "Frontend Developer (Next.js)",
    company: "Paritie Dynamic Enterprise (Cambio Project)",
    description:
      "Leading frontend development for the Cambio trading platform, converting UI designs into responsive, scalable code.",
    highlights: [
      "Implemented UI conversion for both Admin and Customer portals",
      "Delivered scalable solutions using Next.js and Tailwind CSS",
      "Consistently exceeded project requirements for team and client goals",
    ],
  },
  {
    year: "Feb 2024 - Feb 2025",
    title: "Frontend Developer (Contract)",
    company: "Money Prep",
    description:
      "Migrated legacy WordPress site to Next.js, significantly enhancing security, performance, and user accessibility.",
    highlights: [
      "Successfully migrated company website from WordPress to Next.js",
      "Optimized component design for improved responsiveness",
      "Collaborated with cross-functional teams to align with business objectives",
    ],
  },
  {
    year: "Jul 2020 - Aug 2024",
    title: "Frontend Developer",
    company: "Deo Volente Academy",
    description:
      "Designed and developed the school website, creating a responsive platform tailored to institutional needs.",
    highlights: [
      "Implemented dynamic student assistance request forms",
      "Integrated secure data storage for sensitive info",
      "Ensured WCAG compliance for better accessibility",
    ],
  },
  {
    year: "Expected 2026",
    title: "B.Tech in Computer Science",
    company: "Federal University of Technology",
    description:
      "4.62 CGPA. Major in Computer Science, Algorithms, AI, and Database Administration.",
    highlights: [
      "Focus: Algorithms, Data Structures, Logic, and AI",
      "Participated in AI Saturdays Lagos (2x)",
      "Gained advanced knowledge in Artificial Intelligence",
    ],
  },
];

function TimelineCard({ item, index }: { item: TimelineItem; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={
        isInView
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
      }
      transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-8 md:pl-12 pb-12 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />

      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="absolute left-0 top-1 w-3 h-3 -translate-x-1/2 rounded-full bg-primary glow-primary"
      />

      {/* Year badge */}
      <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-3">
        {item.year}
      </span>

      {/* Content card */}
      <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
        <h3 className="text-xl font-bold text-foreground mb-1">{item.title}</h3>
        <p className="text-primary font-medium mb-3">{item.company}</p>
        <p className="text-muted-foreground mb-4">{item.description}</p>

        <ul className="space-y-2">
          {item.highlights.map((highlight, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function JourneySection() {
  return (
    <section id="journey" className="section-padding">
      <div className="content-container">
        <AnimatedSection>
          <span className="inline-block px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-full mb-8">
            The Journey
          </span>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            The Path So Far
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mb-16">
            Every role has shaped my perspective. Every project has expanded my
            capabilities. Here's how I got here.
          </p>
        </AnimatedSection>

        <div className="max-w-3xl">
          {timeline.map((item, index) => (
            <TimelineCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
