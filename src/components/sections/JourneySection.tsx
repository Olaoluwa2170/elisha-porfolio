import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { AnimatedSection } from '../AnimatedComponents';

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  highlights: string[];
}

const timeline: TimelineItem[] = [
  {
    year: '2024 - Present',
    title: 'Full Stack Developer',
    company: 'Paritie',
    description: 'Building the future of trading technology with real-time systems that handle millions in transactions.',
    highlights: [
      'Architecting real-time trading dashboards with React & TypeScript',
      'Building backend infrastructure with Django & PostgreSQL',
      'Implementing AI-powered data analysis pipelines',
    ],
  },
  {
    year: '2024',
    title: 'Full Stack Developer',
    company: 'MoneyPrep',
    description: 'Revolutionized financial education through gamification and AI-driven personalization.',
    highlights: [
      'Led frontend development for financial education platform',
      'Built AI-powered personalization engine with FastAPI',
      'Designed gamified learning experiences that increased engagement 3x',
    ],
  },
  {
    year: '2023 - 2024',
    title: 'Lead Frontend Developer',
    company: 'Deo Volente Academy',
    description: 'Transformed educational delivery with modern web technologies and intuitive interfaces.',
    highlights: [
      'Spearheaded React.js migration improving performance 40%',
      'Implemented real-time collaboration features',
      'Mentored junior developers on modern practices',
    ],
  },
  {
    year: '2022',
    title: 'Machine Learning Intern',
    company: 'AI Saturdays Lagos',
    description: 'Deep-dived into AI/ML fundamentals while contributing to real-world projects.',
    highlights: [
      'Built regression models for price prediction',
      'Collaborated on open-source AI initiatives',
      'Presented research findings to 100+ attendees',
    ],
  },
];

function TimelineCard({ item, index }: { item: TimelineItem; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
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
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
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
            Every role has shaped my perspective. Every project has expanded my capabilities. 
            Here's how I got here.
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
