import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

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

      // Calculate velocity
      const deltaX = e.clientX - lastMousePosition.current.x;
      const deltaY = e.clientY - lastMousePosition.current.y;
      velocityRef.current = { x: deltaX, y: deltaY };
      
      lastMousePosition.current = { x: e.clientX, y: e.clientY };

      setMousePosition({ x, y });

      // Check for fast horizontal movement (360° rotation trigger)
      const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      if (speed > 20 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
        // Fast horizontal movement - trigger 360° rotation
        setRotation(prev => ({
          x: prev.x,
          y: prev.y + (deltaX > 0 ? 360 : -360),
          z: prev.z
        }));
      } else if (isHovering) {
        // Normal cursor following with smooth constraints
        const maxTilt = 20;
        const rotateX = Math.max(-maxTilt, Math.min(maxTilt, -y * 15)); // Tilt up/down
        const rotateY = Math.max(-maxTilt, Math.min(maxTilt, x * 15));  // Tilt left/right
        const rotateZ = Math.max(-10, Math.min(10, x * 5));   // Slight roll effect
        
        setRotation({ x: rotateX, y: rotateY, z: rotateZ });
      }
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
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
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
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

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
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Welcome to my portfolio
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6"
            >
              Hi, I'm{' '}
              <span className="gradient-text">Yash Srivastava</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-medium mb-6"
            >
              <span className="text-foreground">Frontend Developer</span> •{' '}
              <span className="text-foreground">BCA Student</span> •{' '}
              <span className="gradient-text-warm">Hackathon-Driven Problem Solver</span>
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Passionate about crafting intuitive user experiences with modern web technologies. 
              With <span className="text-primary font-semibold">10+ hackathons</span> under my belt and 
              expertise in <span className="text-primary font-semibold">React, Python & Django</span>, 
              I transform ideas into impactful digital solutions.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
            >
              <a href="#projects" className="btn-primary inline-flex items-center gap-2">
                View My Work
                <ArrowDown className="w-4 h-4" />
              </a>
              <a href="#contact" className="btn-outline">
                Get In Touch
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex gap-4 justify-center lg:justify-start"
            >
              <a
                href="https://github.com/yatsu025"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl glass-card-hover icon-glow text-muted-foreground hover:text-primary"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/yash-srivastava-514252322/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl glass-card-hover icon-glow text-muted-foreground hover:text-primary"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:yashsrivastava1808@gmail.com"
                className="p-3 rounded-xl glass-card-hover icon-glow text-muted-foreground hover:text-primary"
              >
                <Mail className="w-5 h-5" />
              </a>
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
