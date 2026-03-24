import { motion } from 'framer-motion';
import { 
  Code2, 
  Terminal, 
  Cpu, 
  Database, 
  Globe, 
  Layout, 
  Zap, 
  GitBranch, 
  Github, 
  Server, 
  Search, 
  Smartphone,
  Sparkles,
  Cloud,
  Box,
  Brain,
  Coffee,
  Activity,
  Maximize
} from 'lucide-react';

const row1 = [
  { name: 'Java', icon: Coffee },
  { name: 'JavaScript', icon: Code2 },
  { name: 'TypeScript', icon: Terminal },
  { name: 'Python', icon: Cpu },
  { name: 'MongoDB', icon: Database },
  { name: 'MySQL', icon: Database },
  { name: 'Oracle SQL', icon: Database },
  { name: 'C++', icon: Code2 },
];

const row2 = [
  { name: 'Node.js', icon: Server },
  { name: 'Framer Motion', icon: Sparkles },
  { name: 'Next.js', icon: Globe },
  { name: 'React', icon: Layout },
  { name: 'Tailwind CSS', icon: Zap },
  { name: 'Bootstrap', icon: Box },
  { name: 'Express.js', icon: Server },
];

const row3 = [
  { name: 'Vercel', icon: Cloud },
  { name: 'Firebase', icon: Zap },
  { name: 'Git', icon: GitBranch },
  { name: 'GitHub', icon: Github },
  { name: 'Netlify', icon: Cloud },
  { name: 'Postman', icon: Terminal },
  { name: 'Replit', icon: Code2 },
];

const row4 = [
  { name: 'LSTM', icon: Brain },
  { name: 'Machine Learning', icon: Brain },
  { name: 'Performance Optimization', icon: Activity },
  { name: 'Responsive Design', icon: Smartphone },
  { name: 'SEO Optimization', icon: Search },
];

const MarqueeRow = ({ items, direction = 'left', speed = 30 }: { items: any[], direction?: 'left' | 'right', speed?: number }) => {
  // Triple the items to ensure seamless loop without gaps
  const duplicatedItems = [...items, ...items, ...items];
  
  return (
    <div className="flex overflow-hidden py-3 select-none">
      <motion.div
        className="flex whitespace-nowrap gap-20 items-center"
        animate={{
          x: direction === 'left' ? [0, -800] : [-800, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="flex items-center gap-4 px-4 transition-all duration-300 group"
          >
            <item.icon className="w-6 h-6 text-foreground/40 group-hover:text-primary transition-colors" />
            <span className="text-base md:text-lg font-medium text-foreground/50 group-hover:text-foreground transition-colors">
              {item.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const TechStackMarquee = () => {
  return (
    <div className="relative py-12 overflow-hidden">
      <div className="relative z-10 flex flex-col gap-4">
        <MarqueeRow items={row1} direction="left" speed={35} />
        <MarqueeRow items={row2} direction="right" speed={40} />
        <MarqueeRow items={row3} direction="left" speed={38} />
        <MarqueeRow items={row4} direction="right" speed={32} />
      </div>
      
      {/* Gradient masks for smooth fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />
    </div>
  );
};

export default TechStackMarquee;
