import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { AnimatedSection } from '../AnimatedComponents';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  impact: string;
  tech: string[];
  links?: {
    live?: string;
    github?: string;
  };
}

const projects: Project[] = [
  {
    title: 'Campus Tix',
    description: 'A comprehensive campus ticketing and event management platform that streamlines event discovery, ticket purchasing, and attendance tracking for university communities.',
    impact: 'Reduced event management overhead by 60% for campus organizations',
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe'],
  },
  {
    title: 'Trading Dashboard',
    description: 'Real-time trading analytics dashboard for Paritie, featuring live market data visualization, portfolio tracking, and AI-powered trading signals.',
    impact: 'Processing 10,000+ transactions daily with sub-second latency',
    tech: ['React', 'Python', 'Django', 'WebSocket', 'Chart.js'],
  },
  {
    title: 'House Price Prediction',
    description: 'Machine learning model that predicts house prices based on various features, built during AI Saturdays Lagos. Implements multiple regression techniques.',
    impact: 'Achieved 92% accuracy on test dataset',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'],
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className="group relative bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300"
    >
      {/* Number badge */}
      <span className="absolute -top-4 -left-4 w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground font-bold rounded-xl text-sm">
        0{index + 1}
      </span>

      <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-gradient transition-all">
        {project.title}
      </h3>
      
      <p className="text-muted-foreground mb-4 leading-relaxed">
        {project.description}
      </p>

      {/* Impact highlight */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Impact</span>
        <p className="text-foreground font-medium mt-1">{project.impact}</p>
      </div>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      {project.links && (
        <div className="flex gap-4">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
              Source
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}

export function WorkSection() {
  return (
    <section id="work" className="section-padding bg-secondary/30">
      <div className="content-container">
        <AnimatedSection>
          <span className="inline-block px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-full mb-8">
            The Work
          </span>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mb-16">
            A selection of projects that showcase my ability to solve real problems 
            with elegant, scalable solutions.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
