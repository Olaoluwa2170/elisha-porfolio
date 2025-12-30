import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AnimatedSection } from "../AnimatedComponents";

interface SkillCategory {
  name: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    skills: [
      "JavaScript",
      "TypeScript",
      "ReactJS",
      "Next.js",
      "React Native",
      "Tailwind CSS",
      "Redux Toolkit",
      "Zustand",
      "Jest",
    ],
  },
  {
    name: "Backend",
    skills: [
      "Node (Express)",
      "Nest.js",
      "Python",
      "Django",
      "MongoDB",
      "MySQL",
      "PostgreSQL",
    ],
  },
  {
    name: "Core & DevOps",
    skills: [
      "Git",
      "Docker",
      "Microservices",
      "Server Administration",
      "Agile/Scrum",
    ],
  },
  {
    name: "Utilities",
    skills: [
      "Google Analytics",
      "JIRA",
      "Confluence",
      "SonarQube",
      "Sentry",
      "GitHub",
      "Business Intelligence",
    ],
  },
];

function SkillCard({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
    >
      <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary" />
        {category.name}
      </h3>

      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.4, delay: index * 0.1 + i * 0.05 }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "hsl(var(--primary) / 0.2)",
            }}
            className="px-3 py-1.5 text-sm font-medium bg-secondary text-secondary-foreground rounded-lg cursor-default transition-colors"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  return (
    <section className="section-padding">
      <div className="content-container">
        <AnimatedSection>
          <span className="inline-block px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-full mb-8">
            The Arsenal
          </span>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Tools of the Trade
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mb-16">
            A curated set of technologies I've mastered over years of building
            production-ready applications.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.name} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
