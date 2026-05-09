import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, GraduationCap, Target, Sparkles } from 'lucide-react';
import TiltCard from '../ui/TiltCard';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const infoCards = [
    {
      icon: MapPin,
      label: "Location",
      value: "Prayagraj, Uttar Pradesh, India",
      gradient: "from-primary to-cyan-400",
    },
    {
      icon: GraduationCap,
      label: "Education",
      value: "BCA (2024–2027)",
      subValue: "United Institute of Management (FUGS)",
      gradient: "from-secondary to-orange-400",
    },
    {
      icon: Target,
      label: "Current Focus",
      value: "Frontend + Full-Stack Growth",
      gradient: "from-purple-400 to-pink-400",
    },
    {
      icon: Sparkles,
      label: "Experience",
      value: "10+ Hackathons",
      subValue: "Real-world problem solving",
      gradient: "from-green-400 to-emerald-400",
    },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      <div className="section-container relative z-10" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              About
            </span>
            <h2 className="section-heading">
              Developer who ships <span className="gradient-text">client-ready</span> work
            </h2>
            <p className="section-subheading mx-auto mt-4">
              Clear communication, clean UI, and reliable delivery.
            </p>
          </motion.div>

          {/* Bio Card */}
          <motion.div
            variants={itemVariants}
            className="glass-card p-8 md:p-12 mb-12 max-w-4xl mx-auto"
          >
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-center">
              I'm <span className="text-foreground font-semibold">Yash Srivastava</span>. I help individuals and small businesses
              build modern web experiences—landing pages, portfolios, and product-style UIs.
              I work with <span className="text-primary font-medium">React, TypeScript, Tailwind CSS</span>, and I’ve built under pressure in{' '}
              <span className="text-secondary font-medium">10+ hackathons</span>, which trained me to move fast without breaking quality.
            </p>
          </motion.div>

          {/* Info Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {infoCards.map((card, index) => (
              <motion.div
                key={card.label}
                variants={itemVariants}
                custom={index}
              >
                <TiltCard className="h-full">
                  <div className="glass-card-hover p-6 text-center group h-full">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${card.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <card.icon className="w-6 h-6 text-background" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{card.label}</p>
                    <p className="font-semibold text-foreground">{card.value}</p>
                    {card.subValue && (
                      <p className="text-sm text-muted-foreground mt-1">{card.subValue}</p>
                    )}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
