import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Layout, Rocket, Wrench, ShoppingCart, BadgeCheck, ArrowRight } from 'lucide-react';
import TiltCard from '../ui/TiltCard';

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const services = [
    {
      icon: Layout,
      title: 'Landing Pages',
      desc: 'Modern, fast, mobile-first pages that explain your offer clearly and convert visitors to leads.',
      gradient: 'from-primary to-cyan-400',
    },
    {
      icon: Rocket,
      title: 'Portfolio / Personal Sites',
      desc: 'Clean, professional portfolios with the right sections so clients understand your work quickly.',
      gradient: 'from-secondary to-orange-400',
    },
    {
      icon: ShoppingCart,
      title: 'Small Business Websites',
      desc: 'Home • services • pricing • contact, plus basic SEO + performance setup.',
      gradient: 'from-purple-400 to-pink-400',
    },
    {
      icon: Wrench,
      title: 'UI Fixes & Improvements',
      desc: 'Bug fixes, responsive issues, speed improvements, and UI polish on existing React sites.',
      gradient: 'from-green-400 to-emerald-400',
    },
  ];

  const process = [
    { title: 'Quick call', text: '10–15 mins to understand your goal, audience, and deadline.' },
    { title: 'Design + build', text: 'I share progress regularly and ship in small milestones.' },
    { title: 'Launch + support', text: 'Deploy, basic SEO, and handover so you can update confidently.' },
  ];

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

      <div className="section-container relative z-10" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              Services
            </span>
            <h2 className="section-heading">
              What I can <span className="gradient-text">build for you</span>
            </h2>
            <p className="section-subheading mx-auto mt-4">
              Clear deliverables, clean UI, and fast turnaround.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <motion.div key={s.title} variants={itemVariants}>
                <TiltCard className="h-full">
                  <div className="glass-card-hover p-6 h-full">
                    <div
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${s.gradient} mb-4`}
                    >
                      <s.icon className="w-6 h-6 text-background" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="mt-12 grid lg:grid-cols-3 gap-6 items-start">
            <div className="glass-card p-6 border border-border/50 lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-secondary/10 border border-secondary/20">
                  <BadgeCheck className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Simple process</h3>
                  <p className="text-sm text-muted-foreground">No confusion, just clear steps.</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                {process.map((p) => (
                  <div key={p.title} className="bg-muted/30 border border-border/30 rounded-xl p-4">
                    <p className="font-semibold text-foreground mb-1">{p.title}</p>
                    <p className="text-sm text-muted-foreground">{p.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6 border border-border/50">
              <h3 className="text-lg font-bold text-foreground mb-2">Have a project?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Share your idea and I’ll reply with a quick plan + estimate.
              </p>
              <a href="#contact" className="btn-primary w-full inline-flex items-center justify-center gap-2">
                Get a quote <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;

