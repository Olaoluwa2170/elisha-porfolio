import { motion } from "framer-motion";

export const CodeBrackets = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <motion.path
      d="M60 40 C40 40 40 60 40 80 C40 100 20 100 20 100 C20 100 40 100 40 120 C40 140 40 160 60 160"
      stroke="hsl(var(--primary))"
      strokeWidth="12"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    />
    <motion.path
      d="M140 40 C160 40 160 60 160 80 C160 100 180 100 180 100 C180 100 160 100 160 120 C160 140 160 160 140 160"
      stroke="white"
      strokeOpacity="0.8"
      strokeWidth="12"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
    />

    {/* Abstract Floating Elements */}
    <motion.circle
      cx="100"
      cy="100"
      r="10"
      fill="hsl(var(--primary))"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1.2, type: "spring" }}
    />
    <motion.rect
      x="80"
      y="70"
      width="40"
      height="4"
      fill="white"
      fillOpacity="0.5"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 1.4, duration: 0.5 }}
    />
    <motion.rect
      x="80"
      y="85"
      width="25"
      height="4"
      fill="white"
      fillOpacity="0.3"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
    />
  </svg>
);

export const FloatingCubes = ({ className = "" }: { className?: string }) => (
  <div className={`relative ${className}`}>
    {/* Large Glass Cube */}
    <motion.div
      className="absolute top-0 right-0 w-32 h-32 border border-primary/30 bg-primary/5 backdrop-blur-sm rounded-xl transform rotate-12"
      animate={{
        y: [0, -20, 0],
        rotate: [12, 15, 12],
        borderColor: [
          "rgba(var(--primary), 0.3)",
          "rgba(var(--primary), 0.6)",
          "rgba(var(--primary), 0.3)",
        ],
      }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Small Solid Cube */}
    <motion.div
      className="absolute bottom-10 -left-10 w-16 h-16 bg-gradient-to-br from-primary to-primary/50 rounded-lg shadow-lg shadow-primary/20"
      animate={{
        y: [0, 15, 0],
        rotate: [-10, -5, -10],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1,
      }}
    />

    {/* Grid Backdrop */}
    <div className="absolute inset-0 bg-grid-pattern opacity-30 mask-radial" />
  </div>
);

export const TechGridBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full mix-blend-screen" />
    <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full mix-blend-screen" />
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.03]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="grid-pattern"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  </div>
);
