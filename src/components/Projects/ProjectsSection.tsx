import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Info, ChevronDown, ChevronUp, Layers, Sparkles, ArrowRight } from 'lucide-react';
import { miniProjects, majorProjects, Project } from '@/data/projectsData';

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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

  const toggleExpand = (title: string) => {
    setExpandedProject(expandedProject === title ? null : title);
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

      <div className="section-container relative z-10" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-3 sm:px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4">
              My Work
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto mt-4">
              A showcase of my hackathon builds and personal projects
            </p>
          </motion.div>

          {/* Major Projects */}
          <motion.div variants={itemVariants} className="mb-20">
            <div className="flex items-center gap-2 sm:gap-3 mb-8 sm:mb-10">
              <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-r from-primary to-cyan-400 shadow-lg shadow-primary/20">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-background" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">Major Projects</h3>
            </div>

            <div className="grid gap-8 sm:gap-10 md:grid-cols-2">
              {majorProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className={`glass-card-hover overflow-hidden group ${project.isComingSoon ? 'relative h-[300px]' : ''}`}
                >
                  {project.isComingSoon ? (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 z-10 flex items-center justify-center">
                      <div className="text-center">
                        <motion.div
                          animate={{ 
                            scale: [1, 1.1, 1],
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="text-3xl md:text-4xl font-bold gradient-text mb-4"
                        >
                          Coming Soon
                        </motion.div>
                        
                        <div className="flex justify-center gap-1 mb-4">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 bg-primary rounded-full"
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5]
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: "easeInOut"
                              }}
                            />
                          ))}
                        </div>
                        
                        <motion.div
                          animate={{ 
                            y: [0, -5, 0]
                          }}
                          transition={{ 
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="text-sm text-muted-foreground font-medium"
                        >
                          Something amazing is brewing...
                        </motion.div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Similar layout for major projects if they exist, but for now they are coming soon */}
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mini Projects */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 sm:gap-3 mb-8 sm:mb-10">
              <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-r from-secondary to-orange-400 shadow-lg shadow-secondary/20">
                <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-background" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">Mini Projects</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {miniProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  onMouseEnter={() => !project.isComingSoon && setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className={`glass-card-hover group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 ${project.isComingSoon ? 'p-6 h-[320px]' : 'h-[320px] md:h-[350px]'}`}
                >
                  {project.isComingSoon ? (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 z-10 flex items-center justify-center p-6">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.05, 1],
                          opacity: [0.8, 1, 0.8]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="text-center"
                      >
                        <div className="text-xl font-bold gradient-text mb-3">
                          Coming Soon
                        </div>
                        
                        <div className="flex justify-center gap-1.5 mb-3">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-1.5 h-1.5 bg-primary rounded-full"
                              animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.5, 1, 0.5]
                              }}
                              transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                delay: i * 0.15,
                                ease: "easeInOut"
                              }}
                            />
                          ))}
                        </div>
                        
                        <div className="text-sm text-muted-foreground font-medium">
                          In Development
                        </div>
                      </motion.div>
                    </div>
                  ) : (
                    <>
                      {/* Project Image - Fixed Scaling */}
                      <div className="absolute inset-0 w-full h-full overflow-hidden">
                        <img 
                          src={project.imageUrl} 
                          alt={project.title}
                          className={`w-full h-full object-cover object-top transition-all duration-1000 ${hoveredProject === project.id ? 'blur-sm scale-110 brightness-50' : 'blur-0 scale-100 brightness-90'}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>

                      {/* Default View (Always visible when not hovered or slightly dimmed) */}
                      <div className={`absolute inset-0 flex flex-col justify-center items-center p-6 z-10 text-center transition-all duration-500 ${hoveredProject === project.id ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
                        <motion.h4 
                          className="font-bold text-2xl mb-2 text-white drop-shadow-lg"
                        >
                          {project.title}
                        </motion.h4>
                        <div className="flex flex-wrap justify-center gap-1.5 mt-2">
                          {project.techStack.slice(0, 3).map((tech) => (
                            <span key={tech} className="px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-[10px] text-white/90 border border-white/20 uppercase tracking-wider font-semibold">
                              {tech}
                            </span>
                          ))}
                          {project.techStack.length > 3 && (
                            <span className="text-[10px] text-white/80 font-bold">+{project.techStack.length - 3}</span>
                          )}
                        </div>
                      </div>

                      {/* Hover View (Actions and Tech) */}
                      <AnimatePresence>
                        {hoveredProject === project.id && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-20 flex flex-col items-center justify-between p-8 bg-black/40 backdrop-blur-[2px]"
                          >
                            {/* Top Actions */}
                            <div className="flex gap-4">
                              <motion.a
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-full bg-white/10 hover:bg-primary/20 border border-white/20 hover:border-primary/50 text-white transition-all group/icon shadow-lg"
                                title="GitHub Repository"
                              >
                                <Github className="w-5 h-5 group-hover/icon:scale-110 transition-transform" />
                              </motion.a>
                              <motion.a
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-full bg-white/10 hover:bg-primary/20 border border-white/20 hover:border-primary/50 text-white transition-all group/icon shadow-lg"
                                title="Live Demo"
                              >
                                <ExternalLink className="w-5 h-5 group-hover/icon:scale-110 transition-transform" />
                              </motion.a>
                            </div>

                            {/* Center Button - "About" */}
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                            >
                              <Link
                                to={`/project/${project.id}`}
                                className="btn-primary flex items-center gap-2 py-2 px-6 rounded-full font-bold shadow-xl shadow-primary/30"
                              >
                                About Project <ArrowRight className="w-4 h-4" />
                              </Link>
                            </motion.div>

                            {/* Bottom Technologies */}
                            <motion.div 
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.3 }}
                              className="w-full"
                            >
                              <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold mb-3 text-center">Built with</p>
                              <div className="flex flex-wrap justify-center gap-2">
                                {project.techStack.map((tech) => (
                                  <span key={tech} className="px-2.5 py-1 rounded-md bg-white/5 text-[10px] text-white/80 border border-white/10 font-medium">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
