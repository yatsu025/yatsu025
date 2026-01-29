import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Award, Trophy, ExternalLink, X, ChevronRight, ArrowRight } from 'lucide-react';

interface Certificate {
  id: number;
  name: string;
  issuer: string;
  type: 'hackathon' | 'certification';
  image: string;
  description?: string;
}

const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showAllModal, setShowAllModal] = useState<'hackathon' | 'certification' | null>(null);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const hackathons: Certificate[] = [
    { id: 1, name: "Ace Hack 4.0", issuer: "Ace Hack", type: 'hackathon', image: "/certificate/Ace hack 4.0.jpg.jpeg", description: "Participated in Ace Hack 4.0." },
    { id: 2, name: "Code Verse", issuer: "Code Verse", type: 'hackathon', image: "/certificate/Code verse.jpg.jpeg", description: "Participated in Code Verse." },
    { id: 3, name: "Coding Challenge of United", issuer: "United", type: 'hackathon', image: "/certificate/Coding challenge of United.png", description: "Coding challenge participation." },
    { id: 4, name: "Hack with Uttar Pradesh", issuer: "Uttar Pradesh", type: 'hackathon', image: "/certificate/Hack with Utterpredesh.png", description: "Hackathon organized by UP." },
    { id: 5, name: "Hackshatra", issuer: "Hackshatra", type: 'hackathon', image: "/certificate/Hackshatra.jpg.jpeg", description: "Hackshatra event." },
    { id: 6, name: "Kode Kalesh", issuer: "Kode Kalesh", type: 'hackathon', image: "/certificate/Kode Kalesh.png", description: "Kode Kalesh event." },
    { id: 7, name: "Namespace", issuer: "Namespace", type: 'hackathon', image: "/certificate/Namespace.jpg.jpeg", description: "Namespace event." },
    { id: 8, name: "Hackerground", issuer: "Hackerground", type: 'hackathon', image: "/certificate/hackerground.jpg", description: "Hackerground event." },
    { id: 9, name: "BNB Chain", issuer: "BNB Chain", type: 'hackathon', image: "/certificate/BNB chan.jpg.jpeg", description: "BNB Chain event." },
    { id: 10, name: "Vibe", issuer: "Vibe", type: 'hackathon', image: "/certificate/Vibe.jpg", description: "Vibe event." },
  ];

  const certifications: Certificate[] = [
    { id: 11, name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", type: 'certification', image: "/certificate/AWS.png", description: "AWS Cloud Practitioner certification." },
    { id: 12, name: "Accenture Developer Program", issuer: "Accenture", type: 'certification', image: "/certificate/Accenture.png", description: "Accenture Developer Program." },
    { id: 13, name: "TATA Digital Skills", issuer: "TATA", type: 'certification', image: "/certificate/TATA.png", description: "TATA Digital Skills certification." },
    { id: 14, name: "FreeCodeCamp", issuer: "FreeCodeCamp", type: 'certification', image: "/certificate/Free code camp.png", description: "FreeCodeCamp certification." },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Smooth infinite scroll component
  const InfiniteScroll = ({ items, direction = 'left' }: { items: Certificate[]; direction?: 'left' | 'right' }) => {
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
              onClick={() => setSelectedCert(cert)}
              className="flex-shrink-0 w-[260px] bg-muted/30 border border-border/50 rounded-xl p-4 cursor-pointer group hover:border-primary/30 transition-all duration-300"
              style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
            >
              <div className="aspect-video bg-muted rounded-lg mb-3 overflow-hidden">
                 <img src={cert.image} alt={cert.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-lg transition-colors ${
                  cert.type === 'hackathon' 
                    ? 'bg-secondary/10 text-secondary group-hover:bg-secondary/20' 
                    : 'bg-primary/10 text-primary group-hover:bg-primary/20'
                }`}>
                  {cert.type === 'hackathon' ? <Trophy className="w-4 h-4" /> : <Award className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {cert.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">{cert.issuer}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                <span>View</span>
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
    items: Certificate[]; 
    type: 'hackathon' | 'certification'; 
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
          onClick={() => setShowAllModal(type)}
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
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              Achievements & Credentials
            </span>
            <h2 className="section-heading">
              My <span className="gradient-text">Certifications</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4 text-sm">
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
            type="certification" 
            icon={Award}
            direction="right"
          />

        </motion.div>
      </div>

      {/* All Certificates Modal */}
      <AnimatePresence>
        {showAllModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAllModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-background border border-border rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-5 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${showAllModal === 'hackathon' ? 'bg-secondary/10' : 'bg-primary/10'}`}>
                    {showAllModal === 'hackathon' ? (
                      <Trophy className={`w-5 h-5 text-secondary`} />
                    ) : (
                      <Award className={`w-5 h-5 text-primary`} />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {showAllModal === 'hackathon' ? 'All Hackathons' : 'All Certifications'}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {showAllModal === 'hackathon' ? hackathons.length : certifications.length} achievements
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAllModal(null)}
                  className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-5 overflow-y-auto max-h-[calc(80vh-80px)]">
                <div className="grid sm:grid-cols-2 gap-4">
                  {(showAllModal === 'hackathon' ? hackathons : certifications).map((cert) => (
                    <motion.div
                      key={cert.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                        setShowAllModal(null);
                        setSelectedCert(cert);
                      }}
                      className="bg-muted/30 border border-border/50 rounded-xl p-4 cursor-pointer hover:border-primary/30 transition-all"
                    >
                      <div className="aspect-video bg-muted rounded-lg mb-3 overflow-hidden">
                         <img src={cert.image} alt={cert.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex items-start gap-3">
                        <div className={`p-2.5 rounded-lg ${
                          cert.type === 'hackathon' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'
                        }`}>
                          {cert.type === 'hackathon' ? <Trophy className="w-4 h-4" /> : <Award className="w-4 h-4" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{cert.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{cert.issuer}</p>
                          {cert.description && (
                            <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{cert.description}</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certificate Detail Modal */}
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
              className="bg-background border border-border rounded-2xl max-w-lg w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-start gap-4 mb-5">
                <div className={`p-3 rounded-xl ${
                  selectedCert.type === 'hackathon' ? 'bg-secondary/10 border border-secondary/20' : 'bg-primary/10 border border-primary/20'
                }`}>
                  {selectedCert.type === 'hackathon' ? (
                    <Trophy className={`w-6 h-6 text-secondary`} />
                  ) : (
                    <Award className={`w-6 h-6 text-primary`} />
                  )}
                </div>
                <div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    selectedCert.type === 'hackathon' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'
                  }`}>
                    {selectedCert.type === 'hackathon' ? 'Hackathon' : 'Certification'}
                  </span>
                  <h3 className="text-xl font-bold mt-2 text-foreground">{selectedCert.name}</h3>
                  <p className="text-muted-foreground">{selectedCert.issuer}</p>
                </div>
              </div>

              {/* Certificate Image */}
              <div className="aspect-video bg-muted/30 rounded-xl mb-5 flex items-center justify-center border border-border/50 overflow-hidden">
                <img src={selectedCert.image} alt={selectedCert.name} className="w-full h-full object-contain" />
              </div>

              {selectedCert.description && (
                <p className="text-muted-foreground text-sm mb-5">{selectedCert.description}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CertificationsSection;
