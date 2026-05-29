import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, CheckCircle2, Sparkles, Zap } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let throttleTimer: ReturnType<typeof setTimeout> | null = null;

    const updateMousePosition = (e: MouseEvent) => {
      if (!cardRef.current || throttleTimer) return;

      throttleTimer = setTimeout(() => {
        throttleTimer = null as ReturnType<typeof setTimeout> | null;
      }, 16);

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);

      const maxTilt = 12;
      setRotation({ x: -y * maxTilt, y: x * maxTilt, z: x * 2 });
      setMousePosition({ x, y });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
      setIsHovering(false);
      setRotation({ x: 0, y: 0, z: 0 });
      setMousePosition({ x: 0, y: 0 });
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', updateMousePosition);
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (card) {
        card.removeEventListener('mousemove', updateMousePosition);
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const roles = [
    { text: 'Web Developer', color: 'text-primary' },
    { text: 'Landing Pages', color: 'text-foreground/70' },
    { text: 'React + UI Fixes', color: 'text-foreground/70' },
  ];

  const features = [
    'Mobile-first + responsive',
    'Clean UI + smooth animations',
    'Performance-focused',
    'WhatsApp/Email contact flow',
  ];

  const socials = [
    { icon: Github, href: 'https://github.com/yatsu025', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/yash-srivastava-514252322/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:yashsrivastava1808@gmail.com', label: 'Email' },
  ];

  const codeSnippets = [
    { text: '<div>', top: '8%', left: '4%', delay: 0 },
    { text: 'const', top: '18%', left: '78%', delay: 1.8 },
    { text: 'import', top: '68%', left: '12%', delay: 0.8 },
    { text: '() =>', top: '78%', left: '72%', delay: 2.5 },
    { text: 'return', top: '13%', left: '38%', delay: 3.5 },
    { text: 'await', top: '58%', left: '83%', delay: 2 },
    { text: 'interface', top: '38%', left: '88%', delay: 1.2 },
    { text: '.map()', top: '50%', left: '2%', delay: 4 },
  ];

  return (
    <section id="hero" className="min-h-[95vh] flex items-center relative overflow-hidden">

      {/* ── Background layer ── */}
      <div className="absolute inset-0 bg-radial-glow" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      {/* Ambient blobs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], x: [0, 40, 0], y: [0, 25, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.25, 1], x: [0, -30, 0], y: [0, -50, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-secondary/8 rounded-full blur-[120px] pointer-events-none"
      />
      {/* Extra accent blob top-right */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute -top-20 -right-20 w-[350px] h-[350px] bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none"
      />

      {/* Floating code snippets */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {codeSnippets.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.18, 0.1, 0.18, 0], y: [0, -18, 0], x: [0, 6, 0] }}
            transition={{ duration: 6 + i * 0.7, repeat: Infinity, delay: item.delay, ease: 'easeInOut' }}
            className="absolute font-mono text-xs text-primary/30 whitespace-nowrap tracking-tight"
            style={{ top: item.top, left: item.left }}
          >
            {item.text}
          </motion.div>
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="section-container relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* ── LEFT — Photo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1 flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Outer glow ring */}
              <motion.div
                animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.04, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-6 bg-gradient-to-br from-primary via-cyan-400/60 to-primary/40 rounded-[2.5rem] blur-2xl pointer-events-none"
              />

              {/* Decorative ring lines */}
              <div className="absolute -inset-3 rounded-[2rem] border border-primary/10 pointer-events-none" />
              <div className="absolute -inset-1 rounded-[1.75rem] border border-primary/6 pointer-events-none" />

              {/* 3D tilt card */}
              <motion.div
                ref={cardRef}
                className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 cursor-pointer"
                initial={{ rotateY: 180, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
              >
                <motion.div
                  className="w-full h-full"
                  animate={{ rotateX: rotation.x, rotateY: rotation.y, rotateZ: rotation.z }}
                  transition={{ type: 'spring', stiffness: 350, damping: 38, mass: 0.5 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front face */}
                  <motion.div
                    className="absolute inset-0 rounded-[1.75rem]"
                    style={{ backfaceVisibility: 'hidden', transform: 'translateZ(16px)' }}
                  >
                    {/* Gradient border */}
                    <div className="absolute inset-0 gradient-border rounded-[1.75rem]" />
                    <img
                      src="/photo.jpg"
                      alt="Yash Srivastava"
                      className="w-full h-full object-cover rounded-[1.75rem] p-[3px]"
                    />

                    {/* Hover shine */}
                    <motion.div
                      className="absolute inset-0 rounded-[1.75rem] pointer-events-none"
                      animate={{
                        background: isHovering
                          ? `radial-gradient(circle at ${((mousePosition.x + 1) / 2) * 100}% ${((mousePosition.y + 1) / 2) * 100}%, rgba(255,255,255,0.12) 0%, transparent 60%)`
                          : 'transparent',
                        opacity: isHovering ? 1 : 0,
                      }}
                      transition={{ duration: 0.15 }}
                    />

                    {/* Corner accents */}
                    <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-primary/50 rounded-tl-lg" />
                    <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-primary/50 rounded-tr-lg" />
                    <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-primary/50 rounded-bl-lg" />
                    <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-primary/50 rounded-br-lg" />
                  </motion.div>

                  {/* Back face */}
                  <motion.div
                    className="absolute inset-0 rounded-[1.75rem] bg-gradient-to-br from-primary/15 via-card/90 to-secondary/15 border border-primary/25 flex items-center justify-center backdrop-blur-sm"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg) translateZ(16px)' }}
                  >
                    <div className="text-center p-8 space-y-3">
                      <Zap className="w-8 h-8 text-primary mx-auto mb-4 opacity-80" />
                      <div className="text-2xl sm:text-3xl font-bold gradient-text">Full Stack</div>
                      <div className="text-xl sm:text-2xl font-semibold gradient-text-warm">Developer</div>
                      <div className="text-sm text-muted-foreground pt-2">Crafting Digital Experiences</div>
                      <div className="flex justify-center gap-1 pt-2">
                        {['React', 'Next.js', 'UI/UX'].map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium border border-primary/20">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, y: 10, x: 10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="absolute -bottom-5 -right-5 glass-card px-4 py-2.5 flex items-center gap-2.5 shadow-lg border border-primary/20"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                </span>
                <span className="text-sm font-semibold">Available for projects</span>
              </motion.div>

              {/* XP badge top-left */}
              <motion.div
                initial={{ opacity: 0, y: -10, x: -10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="absolute -top-4 -left-4 glass-card px-3 py-1.5 flex items-center gap-2 border border-primary/15"
              >
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium text-muted-foreground">Freelance</span>
              </motion.div>
            </div>
          </motion.div>

          {/* ── RIGHT — Content ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="order-1 lg:order-2 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-5">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/8 border border-primary/25 text-primary text-sm font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,212,170,0.8)]" />
                Freelance Web Developer — Prayagraj, UP
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div variants={itemVariants} className="mb-5">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.12]">
                <span className="block mb-1 text-foreground/90">Hi, I'm</span>
                <span className="gradient-text block pb-2">Yash Srivastava</span>
              </h1>
            </motion.div>

            {/* Roles / specialties — horizontal pill row */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-2 mb-7">
              {roles.map((role, i) => (
                <motion.span
                  key={role.text}
                  whileHover={{ scale: 1.04, y: -1 }}
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold border cursor-default
                    ${i === 0
                      ? 'bg-primary/10 border-primary/30 text-primary'
                      : 'bg-foreground/4 border-foreground/10 text-muted-foreground'
                    }`}
                >
                  {role.text}
                </motion.span>
              ))}
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground text-base sm:text-lg max-w-[480px] mx-auto lg:mx-0 mb-7 leading-relaxed"
            >
              I build{' '}
              <span className="text-foreground font-medium border-b border-primary/40">fast, modern websites</span>{' '}
              that clearly explain your offer and help you get leads.
              Based in{' '}
              <span className="text-foreground font-medium">Prayagraj, UP</span>{' '}
              — working with local businesses and remote clients.
            </motion.p>

            {/* Feature checklist */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="grid sm:grid-cols-2 gap-2.5 max-w-[440px] mx-auto lg:mx-0">
                {features.map((f, i) => (
                  <div
                    key={f}
                    className="flex items-center gap-2.5 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3.5 justify-center lg:justify-start mb-8"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(0,212,170,0.35)' }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary inline-flex items-center gap-2.5 group relative overflow-hidden"
              >
                <span className="relative z-10">Explore My Work</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform relative z-10" />
                <motion.div
                  className="absolute inset-0 bg-white/15 -translate-x-full group-hover:translate-x-full transition-transform duration-500"
                  style={{ skewX: '-18deg' }}
                />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="btn-outline border-primary/40 hover:border-primary/70 inline-flex items-center gap-2"
              >
                Get a Free Quote
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={itemVariants}
              className="flex gap-3 justify-center lg:justify-start"
            >
              {socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + i * 0.1, type: 'spring', stiffness: 260 }}
                  whileHover={{ y: -4, color: 'hsl(var(--primary))' }}
                  className="group p-3 rounded-xl glass-card-hover icon-glow text-muted-foreground flex items-center gap-0 overflow-hidden border border-white/5 hover:border-primary/25 transition-colors"
                  aria-label={s.label}
                >
                  <s.icon className="w-5 h-5 shrink-0" />
                  <span className="text-[11px] font-bold uppercase tracking-widest max-w-0 group-hover:max-w-[64px] overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100 ml-0 group-hover:ml-2">
                    {s.label}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground/60 hover:text-primary transition-colors group"
        >
          <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border border-muted-foreground/30 group-hover:border-primary/50 flex items-start justify-center pt-1.5 transition-colors"
          >
            <div className="w-1 h-1.5 rounded-full bg-primary/60" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;