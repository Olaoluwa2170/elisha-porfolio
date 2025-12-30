import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { label: "Vision", href: "#vision" },
  { label: "Journey", href: "#journey" },
  { label: "Work", href: "#work" },
  { label: "Connect", href: "#connect" },
];

export function Navigation() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none"
    >
      <div className="pointer-events-auto bg-background/80 backdrop-blur-md border border-border/50 rounded-full px-6 py-3 shadow-lg flex items-center gap-6 md:gap-8">
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-foreground hover:text-primary transition-colors"
        >
          EB<span className="text-primary">.</span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center" />
            </a>
          ))}
        </div>

        <div className="pl-2 border-l border-border/50">
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
}
