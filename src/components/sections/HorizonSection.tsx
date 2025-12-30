import { AnimatedSection, AnimatedText } from '../AnimatedComponents';

export function HorizonSection() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="content-container">
        <AnimatedSection>
          <span className="inline-block px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-full mb-8">
            The Horizon
          </span>
        </AnimatedSection>

        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-8 leading-[1.15]">
            <AnimatedText 
              text="What's next?" 
              delay={0.1}
            />
            <br />
            <span className="text-gradient">
              <AnimatedText 
                text="Everything." 
                delay={0.3}
              />
            </span>
          </h2>

          <AnimatedSection delay={0.4}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              Graduating in 2026 with a B.Tech in Computer Science, but the learning never stops. 
              I'm currently deepening my expertise in AI/ML applications for financial technology, 
              exploring the intersection of real-time systems and predictive analytics.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.5}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              My north star? Building technology that democratizes access to financial intelligence. 
              I believe everyone deserves tools that were once reserved for Wall Street.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.6}>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
                <h3 className="text-2xl font-bold text-primary mb-2">2026</h3>
                <p className="text-sm text-muted-foreground">B.Tech Graduation</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
                <h3 className="text-2xl font-bold text-primary mb-2">AI + Finance</h3>
                <p className="text-sm text-muted-foreground">Current Focus Area</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
                <h3 className="text-2xl font-bold text-primary mb-2">Open Source</h3>
                <p className="text-sm text-muted-foreground">Giving Back</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
