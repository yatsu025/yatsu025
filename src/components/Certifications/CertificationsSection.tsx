import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Trophy, ExternalLink, X, ChevronRight, ArrowRight, Search, Info } from 'lucide-react';
import { hackathons, skillCertifications as certifications, Certification } from '@/data/certificationsData';

const CertificationsSection = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Smooth infinite scroll component
  const InfiniteScroll = ({ items, direction = 'left' }: { items: Certification[]; direction?: 'left' | 'right' }) => {
    const [isPaused, setIsPaused] = useState(false);
    const duplicatedItems = [...items, ...items, ...items, ...items];
    const cardWidth = 260;
    const gap = 16;
    const totalWidth = items.length * (cardWidth + gap);

    return (
      <div 
        className="overflow-hidden relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <motion.div
          className="flex gap-4"
          animate={{
            x: direction === 'left' 
              ? [0, -totalWidth] 
              : [-totalWidth, 0]
          }}
          transition={{
            x: {
              duration: items.length * 8,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop"
            }
          }}
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
        >
          {duplicatedItems.map((cert, index) => (
            <motion.div
              key={`${cert.id}-${index}`}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (cert.type === 'skill') {
                  navigate(`/certification/${cert.id}`);
                } else {
                  setSelectedCert(cert);
                }
              }}
              className="flex-shrink-0 w-[240px] sm:w-[260px] bg-muted/30 border border-border/50 rounded-xl p-3 sm:p-4 cursor-pointer group hover:border-primary/30 transition-all duration-300"
              style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
            >
              <div className="aspect-video bg-muted rounded-lg mb-2 sm:mb-3 overflow-hidden">
                 <img src={cert.image} alt={cert.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <div className={`p-2 sm:p-2.5 rounded-lg transition-colors ${
                  cert.type === 'hackathon' 
                    ? 'bg-secondary/10 text-secondary group-hover:bg-secondary/20' 
                    : 'bg-primary/10 text-primary group-hover:bg-primary/20'
                }`}>
                  {cert.type === 'hackathon' ? <Trophy className="w-3 h-3 sm:w-4 sm:h-4" /> : <Award className="w-3 h-3 sm:w-4 sm:h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground text-xs sm:text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {cert.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">{cert.issuer}</p>
                </div>
              </div>
              <div className="mt-2 sm:mt-3 flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                <span>{cert.type === 'skill' ? 'View Details' : 'View Certificate'}</span>
                <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  };

  const CategorySection = ({ 
    title, 
    subtitle, 
    items, 
    type, 
    icon: Icon, 
    direction 
  }: { 
    title: string; 
    subtitle: string; 
    items: Certification[]; 
    type: 'hackathon' | 'skill'; 
    icon: typeof Trophy; 
    direction: 'left' | 'right';
  }) => (
    <motion.div variants={itemVariants} className="mb-10">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${type === 'hackathon' ? 'bg-secondary/10 border border-secondary/20' : 'bg-primary/10 border border-primary/20'}`}>
            <Icon className={`w-5 h-5 ${type === 'hackathon' ? 'text-secondary' : 'text-primary'}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/certifications')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 ${
            type === 'hackathon' 
              ? 'bg-secondary/10 text-secondary hover:bg-secondary/20 border border-secondary/20' 
              : 'bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20'
          }`}
        >
          <span>More Details</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <InfiniteScroll items={items} direction={direction} />
    </motion.div>
  );

  return (
    <section id="certifications" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow opacity-20" />

      <div className="section-container relative z-10" ref={ref}>
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-12">
            <span className="inline-block px-3 sm:px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4">
              Achievements & Credentials
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              My <span className="gradient-text">Certifications</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4 text-sm sm:text-base">
              Click on any certificate to view details or use "More Details" to see all
            </p>
          </motion.div>

          {/* Hackathons */}
          <CategorySection 
            title="Hackathons" 
            subtitle="Competition achievements" 
            items={hackathons} 
            type="hackathon" 
            icon={Trophy}
            direction="left"
          />

          {/* Certifications */}
          <CategorySection 
            title="Licenses & Certifications" 
            subtitle="Professional credentials" 
            items={certifications} 
            type="skill" 
            icon={Award}
            direction="right"
          />

        </motion.div>
      </div>

      {/* Certificate Detail Modal (For quick view on main page) */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-card border border-border rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="md:w-1/2 bg-muted flex items-center justify-center overflow-hidden">
                <img src={selectedCert.image} alt={selectedCert.name} className="w-full h-full object-contain" />
              </div>
              <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                        selectedCert.type === 'hackathon' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'
                      }`}>
                        {selectedCert.type}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold">{selectedCert.name}</h3>
                    <p className="text-lg text-primary font-medium">{selectedCert.issuer}</p>
                  </div>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {selectedCert.description}
                </p>
                <div className="flex flex-col gap-3">
                  {selectedCert.type === 'skill' && (
                    <button
                      onClick={() => {
                        setSelectedCert(null);
                        navigate(`/certification/${selectedCert.id}`);
                      }}
                      className="w-full btn-primary flex items-center justify-center gap-2"
                    >
                      <Info className="w-4 h-4" />
                      View Learning Journey
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="w-full btn-outline"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CertificationsSection;
