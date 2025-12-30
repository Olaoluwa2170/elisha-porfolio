import { AnimatedSection, AnimatedText } from '../AnimatedComponents';

export function VisionSection() {
  return (
    <section id="vision" className="section-padding bg-secondary/30">
      <div className="content-container">
        <AnimatedSection>
          <span className="inline-block px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-full mb-8">
            The Vision
          </span>
        </AnimatedSection>

        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-8 leading-[1.15]">
            <AnimatedText 
              text="I don't just write code." 
              delay={0.1}
            />
            <br />
            <span className="text-gradient">
              <AnimatedText 
                text="I architect experiences." 
                delay={0.3}
              />
            </span>
          </h2>

          <AnimatedSection delay={0.4}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              My mission is to bridge the gap between complex systems and human intuition. 
              I believe that great software should feel invisible — powerful enough to handle 
              millions of operations, yet simple enough that anyone can use it without thinking.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.5}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              Currently pursuing my B.Tech in Computer Science while actively shaping the 
              future of trading technology at Paritie. I'm driven by the intersection of 
              AI, finance, and human-centered design — building tools that don't just work, 
              but inspire.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.6}>
            <div className="flex flex-wrap gap-6 text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-foreground">4+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-foreground">Full-Stack Expertise</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-foreground">AI & Fintech Focus</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
