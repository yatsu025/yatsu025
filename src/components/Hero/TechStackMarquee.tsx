import { motion } from 'framer-motion';

const techStack = [
  { name: 'React', color: 'text-cyan-400' },
  { name: 'JavaScript', color: 'text-yellow-400' },
  { name: 'TypeScript', color: 'text-blue-500' },
  { name: 'Python', color: 'text-blue-400' },
  { name: 'Django', color: 'text-emerald-500' },
  { name: 'Tailwind CSS', color: 'text-cyan-500' },
  { name: 'Node.js', color: 'text-green-500' },
  { name: 'HTML5', color: 'text-orange-500' },
  { name: 'CSS3', color: 'text-blue-600' },
  { name: 'Git', color: 'text-orange-600' },
  { name: 'MongoDB', color: 'text-green-600' },
  { name: 'MySQL', color: 'text-blue-700' },
  { name: 'PostgreSQL', color: 'text-indigo-400' },
  { name: 'Framer Motion', color: 'text-pink-500' },
  { name: 'Vite', color: 'text-purple-400' },
];

const TechStackMarquee = () => {
  // Duplicate the list to create a seamless loop
  const duplicatedTechStack = [...techStack, ...techStack];

  return (
    <div className="relative py-12 overflow-hidden group">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      
      <div className="flex overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap gap-12 items-center"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {duplicatedTechStack.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-card/40 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(0,212,170,0.15)] group/item"
            >
              <span className={`text-xl md:text-2xl font-bold ${tech.color} opacity-80 group-hover/item:opacity-100 transition-opacity`}>
                #
              </span>
              <span className="text-lg md:text-xl font-semibold tracking-tight text-foreground/80 group-hover/item:text-foreground transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Gradient masks for smooth fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
    </div>
  );
};

export default TechStackMarquee;
