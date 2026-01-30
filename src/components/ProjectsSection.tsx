import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, ChevronDown, ChevronUp, Layers, Sparkles } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  techStack: string[];
  type: 'mini' | 'major';
  problem?: string;
  solution?: string;
  impact?: string;
  liveUrl?: string;
  githubUrl?: string;
  isComingSoon?: boolean;
}

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

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

  const miniProjects: Project[] = [
    {
      title: "Jivan AI",
      description: "A Spiritual AI Companion connecting with your faith through AI",
      techStack: ["React", "AI", "Tailwind CSS"],
      type: 'mini',
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "2X Fire Cup",
      description: "Free Fire Tournament Registration Portal with payment integration",
      techStack: ["React", "Tailwind CSS", "Vercel"],
      type: 'mini',
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Coming Soon",
      description: "Exciting new project in development",
      techStack: ["React", "Next.js", "TypeScript"],
      type: 'mini',
      isComingSoon: true,
    },
    {
      title: "Coming Soon",
      description: "Exciting new project in development",
      techStack: ["Python", "Django", "AI"],
      type: 'mini',
      isComingSoon: true,
    },
  ];

  const majorProjects: Project[] = [
    {
      title: "Coming Soon",
      description: "Exciting new project in development",
      techStack: ["React", "Next.js", "AI", "TypeScript"],
      type: 'major',
      isComingSoon: true,
    },
    {
      title: "Coming Soon",
      description: "Exciting new project in development",
      techStack: ["Python", "Django", "PostgreSQL", "AWS"],
      type: 'major',
      isComingSoon: true,
    },
    {
      title: "Coming Soon",
      description: "Exciting new project in development",
      techStack: ["React Native", "Firebase", "Node.js", "MongoDB"],
      type: 'major',
      isComingSoon: true,
    },
    {
      title: "Coming Soon",
      description: "Exciting new project in development",
      techStack: ["Vue.js", "Express", "MySQL", "Docker"],
      type: 'major',
      isComingSoon: true,
    },
  ];

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
          <motion.div variants={itemVariants} className="mb-16">
            <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-r from-primary to-cyan-400">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-background" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">Major Projects</h3>
            </div>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              {majorProjects.map((project) => (
                <motion.div
                  key={project.title}
                  variants={itemVariants}
                  className={`glass-card-hover overflow-hidden group ${project.isComingSoon ? 'relative' : ''}`}
                >
                  {project.isComingSoon && (
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
                        
                        {/* Loading dots animation */}
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
                          className="text-sm text-muted-foreground"
                        >
                          Something amazing is brewing...
                        </motion.div>
                      </div>
                    </div>
                  )}
                  
                  {/* Card Header */}
                  <div className={`p-6 pb-4 ${project.isComingSoon ? 'opacity-30' : ''}`}>
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {project.title}
                      </h4>
                      {!project.isComingSoon && (
                        <div className="flex gap-2">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              className="p-2 rounded-lg hover:bg-muted transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              className="p-2 rounded-lg hover:bg-muted transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech, index) => (
                        <motion.span
                          key={tech}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            project.isComingSoon 
                              ? 'bg-muted/50 text-muted-foreground' 
                              : 'bg-primary/10 text-primary'
                          }`}
                          animate={project.isComingSoon ? {
                            opacity: [0.3, 1, 0.3],
                            scale: [0.95, 1, 0.95]
                          } : {}}
                          transition={project.isComingSoon ? {
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.3,
                            ease: "easeInOut"
                          } : {}}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Expandable Content */}
                  {!project.isComingSoon && (
                    <>
                      <motion.div
                        initial={false}
                        animate={{
                          height: expandedProject === project.title ? 'auto' : 0,
                          opacity: expandedProject === project.title ? 1 : 0,
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4 space-y-3 border-t border-border pt-4">
                          {project.problem && (
                            <div>
                              <span className="text-sm font-semibold text-secondary">Problem:</span>
                              <p className="text-sm text-muted-foreground">{project.problem}</p>
                            </div>
                          )}
                          {project.solution && (
                            <div>
                              <span className="text-sm font-semibold text-primary">Solution:</span>
                              <p className="text-sm text-muted-foreground">{project.solution}</p>
                            </div>
                          )}
                          {project.impact && (
                            <div>
                              <span className="text-sm font-semibold text-green-400">Impact:</span>
                              <p className="text-sm text-muted-foreground">{project.impact}</p>
                            </div>
                          )}
                        </div>
                      </motion.div>

                      {/* Expand Button */}
                      <button
                        onClick={() => toggleExpand(project.title)}
                        className="w-full p-3 flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors border-t border-border"
                      >
                        {expandedProject === project.title ? (
                          <>Show Less <ChevronUp className="w-4 h-4" /></>
                        ) : (
                          <>View Details <ChevronDown className="w-4 h-4" /></>
                        )}
                      </button>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mini Projects */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-r from-secondary to-orange-400">
                <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-background" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">Mini Projects</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {miniProjects.map((project) => (
                <motion.div
                  key={project.title}
                  variants={itemVariants}
                  className={`glass-card-hover p-5 group relative ${project.isComingSoon ? 'overflow-hidden' : ''}`}
                >
                  {project.isComingSoon && (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 z-10 flex items-center justify-center">
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
                        <div className="text-lg font-bold gradient-text mb-2">
                          Coming Soon
                        </div>
                        
                        {/* Mini loading dots */}
                        <div className="flex justify-center gap-1 mb-2">
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
                        
                        <div className="text-xs text-muted-foreground">
                          In Development
                        </div>
                      </motion.div>
                    </div>
                  )}
                  
                  <div className={project.isComingSoon ? 'opacity-30' : ''}>
                    <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.techStack.map((tech, index) => (
                        <motion.span
                          key={tech}
                          className={`px-2 py-0.5 rounded text-xs ${
                            project.isComingSoon 
                              ? 'bg-muted/50 text-muted-foreground' 
                              : 'bg-muted text-muted-foreground'
                          }`}
                          animate={project.isComingSoon ? {
                            opacity: [0.4, 1, 0.4],
                            scale: [0.95, 1, 0.95]
                          } : {}}
                          transition={project.isComingSoon ? {
                            duration: 1.8,
                            repeat: Infinity,
                            delay: index * 0.2,
                            ease: "easeInOut"
                          } : {}}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                    {!project.isComingSoon && (
                      <div className="flex gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
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
