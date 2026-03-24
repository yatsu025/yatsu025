import { motion } from 'framer-motion';
import { Trophy, Code, Laptop, GraduationCap } from 'lucide-react';
import TiltCard from '../ui/TiltCard';

const stats = [
  {
    label: "Hackathons",
    value: "10+",
    icon: Trophy,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
  },
  {
    label: "Projects",
    value: "5+",
    icon: Code,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "Hackathon Hours",
    value: "200+",
    icon: Laptop,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    label: "Learning Year",
    value: "2nd",
    icon: GraduationCap,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
  },
];

const StatsSection = () => {
  return (
    <section className="py-6 relative">
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <TiltCard className="h-full">
                <div className="glass-card p-6 flex flex-col items-center text-center group hover:border-primary/30 transition-all duration-300 h-full">
                  <div className={`p-3 rounded-xl ${stat.bgColor} ${stat.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-1 gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
