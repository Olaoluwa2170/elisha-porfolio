import { motion } from "framer-motion";
import { AnimatedSection } from "../AnimatedComponents";
import { Mail, Linkedin, Github, ArrowUpRight } from "lucide-react";

const socialLinks = [
  {
    name: "Email",
    href: "mailto:elitebabson@gmail.com",
    icon: Mail,
    label: "elitebabson@gmail.com",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/elisha-babalola/",
    icon: Linkedin,
    label: "/in/elisha-babalola",
  },
  {
    name: "Twitter/X",
    // Using Github icon as placeholder or arrow since 'X' icon not imported, relying on text label
    href: "https://x.com/elisha_babalola",
    icon: ArrowUpRight,
    label: "@elisha_babalola",
  },
  {
    name: "GitHub",
    href: "https://github.com/Olaoluwa2170",
    icon: Github,
    label: "@Olaoluwa2170",
  },
];

export function ConnectSection() {
  return (
    <section id="connect" className="section-padding">
      <div className="content-container">
        <AnimatedSection>
          <span className="inline-block px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-full mb-8">
            Let's Connect
          </span>
        </AnimatedSection>

        <div className="max-w-4xl">
          <AnimatedSection delay={0.1}>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-8 leading-[1.15]">
              Ready to build
              <br />
              <span className="text-gradient">something great?</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 max-w-2xl">
              Whether you're looking for a collaborator, have a project in mind,
              or just want to chat about tech and finance — my inbox is always
              open.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="grid md:grid-cols-2 gap-4 mb-16">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target={link.name !== "Email" ? "_blank" : undefined}
                  rel={
                    link.name !== "Email" ? "noopener noreferrer" : undefined
                  }
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-4 p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <link.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-muted-foreground">
                      {link.name}
                    </p>
                    <p className="text-foreground font-medium truncate">
                      {link.label}
                    </p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </div>
          </AnimatedSection>

          {/* Footer */}
          <AnimatedSection delay={0.4}>
            <div className="pt-12 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Babalola Elisha. Crafted with
                passion.
              </p>
              <p className="text-sm text-muted-foreground">
                Built with React, TypeScript & Framer Motion
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
