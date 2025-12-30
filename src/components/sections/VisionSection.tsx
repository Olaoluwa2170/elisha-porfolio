import { AnimatedSection, AnimatedText } from "../AnimatedComponents";
import { CodeBrackets } from "../DecorativeShapes";

export function VisionSection() {
  return (
    <section id="vision" className="section-padding bg-background relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-3xl -z-10" />

      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column: Content */}
          <div className="space-y-12">
            <AnimatedSection>
              <span className="inline-block px-4 py-1.5 text-xs font-mono font-medium tracking-widest uppercase bg-primary/10 text-primary rounded border border-primary/20 mb-8">
                The Vision
              </span>

              <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
                I don't just{" "}
                <span className="text-muted-foreground line-through decoration-primary/50 decoration-4">
                  write code
                </span>
                .
                <br />
                <span className="text-gradient block mt-2">
                  I architect experiences.
                </span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-xl">
                My mission is to bridge the gap between complex systems and
                human intuition. I believe that{" "}
                <span className="text-foreground font-medium border-b border-primary/50">
                  great software should feel invisible
                </span>
                .
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border/50">
                <div>
                  <div className="text-4xl font-bold text-foreground mb-1">
                    4+
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">
                    Years Experience
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-foreground mb-1">
                    Full-Stack
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">
                    Expertise
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column: Imagery */}
          <AnimatedSection delay={0.3} className="relative hidden lg:block">
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Abstract Card */}
              <div className="absolute inset-0 bg-gradient-to-br from-card to-background border border-border/50 rounded-2xl shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-grid-pattern opacity-50" />

                {/* Floating Elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-64 h-64">
                    <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full animate-pulse" />
                    <CodeBrackets className="w-full h-full drop-shadow-[0_0_15px_rgba(0,237,100,0.3)] relative z-10" />
                  </div>
                </div>

                {/* Code snippet decoration */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/40 backdrop-blur-md rounded border border-white/10 font-mono text-xs text-muted-foreground">
                  <div className="flex gap-1.5 mb-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <div className="space-y-1 opacity-70">
                    <p>
                      <span className="text-primary">const</span>{" "}
                      <span className="text-blue-300">future</span> ={" "}
                      <span className="text-primary">await</span> build(
                      <span className="text-orange-300">'better_softwares'</span>);
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
