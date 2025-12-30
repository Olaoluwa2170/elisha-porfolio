import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

const navLinks = [
  { label: 'Vision', href: '#vision' },
  { label: 'Journey', href: '#journey' },
  { label: 'Work', href: '#work' },
  { label: 'Connect', href: '#connect' },
];

export function Navigation() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
    >
      <div className="content-container flex items-center justify-between h-16 md:h-20">
        <a href="#" className="text-lg font-bold tracking-tight text-foreground">
          EB<span className="text-primary">.</span>
        </a>
        
        <div className="flex items-center gap-1 md:gap-2">
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-underline"
              >
                {link.label}
              </a>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
}
