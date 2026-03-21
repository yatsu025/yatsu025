import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, Sparkles, Brain, Cpu, Zap, Globe } from 'lucide-react';

const FeaturedProjectSpotlight = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative group"
        >
          {/* Background Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-cyan-500 to-secondary rounded-[2rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
          
          <div className="relative glass-card p-8 md:p-12 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content Side */}
              <div className="order-2 lg:order-1">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                  <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Featured Project</span>
                </div>
                
                <h3 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                  Jivan <span className="gradient-text">AI</span>
                </h3>
                
                <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                  A Spiritual AI Companion connecting you with faith through advanced AI. 
                  Built during a hackathon to provide personalized spiritual guidance and mental peace.
                </p>
                
                <div className="flex flex-wrap gap-3 mb-10">
                  {['React', 'Gemini API', 'Tailwind CSS', 'Framer Motion'].map((tech) => (
                    <span key={tech} className="px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-primary text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-5">
                  <motion.a
                    href="https://jivan-ai.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary flex items-center gap-2"
                  >
                    Live Demo <ExternalLink className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    href="https://github.com/yatsu025/jivan-ai.git"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-outline flex items-center gap-2"
                  >
                    Source Code <Github className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>
              
              {/* Image Side - Abstract AI Illustration */}
              <div className="order-1 lg:order-2 relative group/image">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative aspect-square md:aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 via-card to-secondary/10 border border-primary/20 flex items-center justify-center p-8 sm:p-12"
                >
                  {/* Central Glow */}
                  <div className="absolute inset-0 bg-radial-glow opacity-30 group-hover/image:opacity-50 transition-opacity" />
                  
                  {/* Abstract UI Elements */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <motion.div
                      animate={{ 
                        rotate: 360,
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="absolute w-48 h-48 sm:w-64 sm:h-64 border-2 border-dashed border-primary/20 rounded-full"
                    />
                    
                    <motion.div
                      animate={{ 
                        rotate: -360,
                      }}
                      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                      className="absolute w-32 h-32 sm:w-48 sm:h-48 border-2 border-primary/10 rounded-full"
                    />

                    {/* Central Icon */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="relative z-10 p-6 sm:p-8 rounded-3xl bg-background/50 backdrop-blur-md border border-primary/30 shadow-[0_0_30px_rgba(0,212,170,0.2)]"
                    >
                      <Brain className="w-12 h-12 sm:w-16 sm:h-16 text-primary animate-pulse-glow" />
                    </motion.div>

                    {/* Floating Tech Icons */}
                    {[
                      { Icon: Cpu, top: "10%", left: "20%", delay: 0 },
                      { Icon: Zap, top: "20%", right: "15%", delay: 1 },
                      { Icon: Globe, bottom: "15%", left: "25%", delay: 2 },
                      { Icon: Sparkles, bottom: "20%", right: "20%", delay: 1.5 },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          y: [0, -15, 0],
                          opacity: [0.4, 0.8, 0.4]
                        }}
                        transition={{ 
                          duration: 3 + i, 
                          repeat: Infinity, 
                          delay: item.delay,
                          ease: "easeInOut" 
                        }}
                        className="absolute p-3 rounded-xl bg-card border border-border/50 text-primary/60 shadow-lg"
                        style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
                      >
                        <item.Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -left-6 glass-card p-4 flex items-center gap-3 border-primary/30 hidden md:flex"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">Spiritual AI</div>
                    <div className="text-xs text-muted-foreground">Most Innovative Project</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjectSpotlight;
