import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let throttleTimer: NodeJS.Timeout;
    
    const updateMousePosition = (e: MouseEvent) => {
      if (!cardRef.current) return;

      // Throttle mouse updates for better performance
      if (throttleTimer) return;
      
      throttleTimer = setTimeout(() => {
        throttleTimer = null as any;
      }, 16); // ~60fps

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);

      // Calculate Tilt based on mouse position relative to center
      const maxTilt = 15;
      const rotateX = -y * maxTilt; // Tilt up/down
      const rotateY = x * maxTilt;  // Tilt left/right
      const rotateZ = x * 3;        // Very slight roll

      setRotation({ x: rotateX, y: rotateY, z: rotateZ });
      setMousePosition({ x, y });
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setRotation({ x: 0, y: 0, z: 0 });
      setMousePosition({ x: 0, y: 0 });
    };

    if (cardRef.current) {
      cardRef.current.addEventListener('mousemove', updateMousePosition);
      cardRef.current.addEventListener('mouseenter', handleMouseEnter);
      cardRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (cardRef.current) {
        cardRef.current.removeEventListener('mousemove', updateMousePosition);
        cardRef.current.removeEventListener('mouseenter', handleMouseEnter);
        cardRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (throttleTimer) {
        clearTimeout(throttleTimer);
      }
    };
  }, [isHovering]);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-radial-glow" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      
      {/* Floating orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, -60, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" 
      />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Photo */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="order-2 lg:order-1 flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary via-cyan-400 to-primary rounded-3xl opacity-20 blur-2xl animate-pulse-glow" />
              
              {/* 3D Photo container with cursor following */}
              <motion.div 
                ref={cardRef}
                className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 cursor-pointer"
                initial={{ rotateY: 0, scale: 0.8, opacity: 0 }}
                animate={{ 
                  rotateY: [0, 360, 360],
                  scale: [0.8, 1, 1],
                  opacity: [0, 1, 1]
                }}
                transition={{ 
                  duration: 4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.5,
                  times: [0, 0.7, 1]
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
              >
                {/* Interactive 3D card */}
                <motion.div
                  className="w-full h-full"
                  animate={{
                    rotateX: rotation.x,
                    rotateY: rotation.y,
                    rotateZ: rotation.z,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 40,
                    mass: 0.6,
                    restDelta: 0.01
                  }}
                  style={{ 
                    transformStyle: "preserve-3d"
                  }}
                >
                  {/* Front face */}
                  <motion.div 
                    className="absolute inset-0 rounded-3xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    style={{ 
                      backfaceVisibility: "hidden",
                      transform: "rotateY(0deg) translateZ(20px)"
                    }}
                  >
                    <div className="absolute inset-0 gradient-border rounded-3xl" />
                    <img
                      src="/photo.jpg"
                      alt="Yash Srivastava"
                      className="w-full h-full object-cover rounded-3xl p-1 transition-transform duration-300"
                    />
                    
                    {/* Shine effect based on cursor position */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl opacity-0 pointer-events-none"
                      animate={{
                        background: isHovering 
                          ? `linear-gradient(${Math.atan2(mousePosition.y, mousePosition.x) * 180 / Math.PI + 90}deg, 
                             transparent 30%, 
                             rgba(255,255,255,0.1) 50%, 
                             transparent 70%)`
                          : 'transparent',
                        opacity: isHovering ? 0.6 : 0
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>

                  {/* Back face */}
                  <motion.div 
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-card to-secondary/20 border border-primary/30 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    style={{ 
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg) translateZ(20px)"
                    }}
                  >
                    <div className="text-center p-4 sm:p-6 md:p-8">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ 
                          scale: [0.8, 1.1, 1],
                          opacity: [0, 1, 1]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut",
                          delay: 2
                        }}
                        className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text mb-2 sm:mb-4"
                      >
                        Full Stack
                      </motion.div>
                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ 
                          y: [10, -5, 0],
                          opacity: [0, 1, 1]
                        }}
                        transition={{ 
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut",
                          delay: 2.5
                        }}
                        className="text-lg sm:text-xl md:text-2xl font-semibold gradient-text-warm"
                      >
                        Developer
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3, duration: 1 }}
                        className="mt-2 sm:mt-4 text-xs sm:text-sm text-muted-foreground"
                      >
                        Crafting Digital Experiences
                      </motion.div>
                    </div>
                    
                    {/* Back face shine effect */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl opacity-0 pointer-events-none"
                      animate={{
                        background: isHovering 
                          ? `linear-gradient(${Math.atan2(mousePosition.y, mousePosition.x) * 180 / Math.PI + 90}deg, 
                             transparent 30%, 
                             rgba(0,212,170,0.1) 50%, 
                             transparent 70%)`
                          : 'transparent',
                        opacity: isHovering ? 0.4 : 0
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-4 -right-4 glass-card px-4 py-2 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-medium">Open to Opportunities</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="order-1 lg:order-2 text-center lg:text-left"
          >
            <motion.div variants={itemVariants} className="mb-4">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium relative group"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(0,212,170,0.8)]" />
                Available for Projects
                <motion.span 
                  className="absolute inset-0 rounded-full border border-primary/50 opacity-0 group-hover:opacity-100"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.span>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-tight"
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Hi, I'm{' '}
                </motion.span>
                <motion.span 
                  className="gradient-text inline-block pb-2"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ 
                    backgroundPosition: { duration: 5, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                  style={{ backgroundSize: "200% auto" }}
                >
                  Yash Srivastava
                </motion.span>
              </motion.h1>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-2 mb-8"
            >
              {[
                { text: "Frontend Developer", color: "text-primary" },
                { text: "BCA Student", color: "text-foreground" },
                { text: "Problem Solver", color: "gradient-text-warm" }
              ].map((role, index) => (
                <motion.div
                  key={role.text}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (index * 0.1) }}
                >
                  <motion.span 
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`text-xl sm:text-2xl md:text-3xl font-bold ${role.color} cursor-default`}
                  >
                    {role.text}
                  </motion.span>
                  {index < 2 && <span className="text-muted-foreground/30 text-2xl hidden sm:inline">•</span>}
                </motion.div>
              ))}
            </motion.div>

            <motion.p
              variants={itemVariants}
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-muted-foreground text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              Passionate about crafting <span className="text-foreground font-medium border-b border-primary/30">intuitive user experiences</span> with modern web technologies. 
              With <span className="text-primary font-bold">10+ hackathons</span> under my belt, 
              I transform complex ideas into <span className="text-primary font-bold">impactful digital solutions</span>.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-5 justify-center lg:justify-start mb-10"
            >
              <motion.a 
                href="#projects" 
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 212, 170, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary inline-flex items-center gap-3 group relative overflow-hidden"
              >
                <span className="relative z-10">Explore My Work</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform relative z-10" />
                <motion.div 
                  className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{ skewX: "-20deg" }}
                />
              </motion.a>
              <motion.a 
                href="#contact" 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline border-primary/50"
              >
                Let's Talk
              </motion.a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex gap-4 justify-center lg:justify-start"
            >
              {[
                { icon: Github, href: "https://github.com/yatsu025", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/yash-srivastava-514252322/", label: "LinkedIn" },
                { icon: Mail, href: "mailto:yashsrivastava1808@gmail.com", label: "Email" }
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + (index * 0.1), type: "spring" }}
                  whileHover={{ y: -5, color: "hsl(var(--primary))" }}
                  className="p-3 rounded-xl glass-card-hover icon-glow text-muted-foreground flex items-center gap-2 group"
                >
                  <social.icon className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest overflow-hidden w-0 group-hover:w-20 transition-all duration-300 opacity-0 group-hover:opacity-100">
                    {social.label}
                  </span>
                </motion.a>
              ))}
             </motion.div>
           </motion.div>
         </div>
       </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#about" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <span className="text-sm">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
