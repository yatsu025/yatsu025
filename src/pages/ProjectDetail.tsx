import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Sparkles, Target, Info, CheckCircle2, Zap, Calendar, Activity } from 'lucide-react';
import { allProjects } from '@/data/projectsData';
import { useEffect } from 'react';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = allProjects.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <button 
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const isMajor = project.type === 'major';

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header / Banner */}
      <div className={`relative overflow-hidden ${isMajor ? 'h-auto pt-16 pb-0' : 'h-[40vh] md:h-[50vh]'}`}>
        {/* Major project: gradient hero instead of image */}
        {isMajor ? (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/5">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
          </div>
        ) : (
          <>
            <img
              src={project.imageUrl || '/placeholder.svg'}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          </>
        )}

        <div className={`relative z-10 px-6 md:px-12 max-w-7xl mx-auto ${isMajor ? 'pt-8 pb-12' : 'absolute bottom-0 left-0 right-0 p-6 md:p-12'}`}>
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6 font-medium"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Portfolio
          </motion.button>

          {isMajor && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center gap-3 mb-4"
            >
              <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
                Major Project
              </span>
              {project.status && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  {project.status}
                </span>
              )}
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`font-bold mb-4 ${isMajor ? 'text-4xl md:text-6xl lg:text-7xl gradient-text' : 'text-4xl md:text-6xl'}`}
          >
            {project.title}
          </motion.h1>

          {isMajor && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-lg text-muted-foreground max-w-2xl mb-6 leading-relaxed"
            >
              {project.description}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-4"
          >
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center gap-2">
                <Github className="w-5 h-5" /> GitHub
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2">
                <ExternalLink className="w-5 h-5" /> Live Demo
              </a>
            )}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Problem Section */}
          {project.problem && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-red-500/10 text-red-500">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold">The Problem</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">{project.problem}</p>
            </motion.section>
          )}

          {/* Solution Section */}
          {project.solution && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-green-500/10 text-green-500">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold">The Solution</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">{project.solution}</p>
            </motion.section>
          )}

          {/* My Work Section */}
          {project.myWork && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                  <Info className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold">My Contributions</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">{project.myWork}</p>
            </motion.section>
          )}

          {/* Features Section — major projects only */}
          {isMajor && project.features && project.features.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-secondary/10 text-secondary">
                  <Zap className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold">Features</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feat) => (
                  <div
                    key={feat}
                    className="flex items-center gap-3 p-3 rounded-xl bg-card/60 border border-border hover:border-primary/30 transition-colors duration-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm font-medium text-foreground/90">{feat}</span>
                  </div>
                ))}
              </div>
            </motion.section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Tech Stack Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" /> Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Project Info Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-bold mb-6">Project Info</h3>
            <div className="space-y-1">
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Category
                </span>
                <span className="font-medium capitalize">{project.type} Project</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Year
                </span>
                <span className="font-medium">{project.year ?? '2024'}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Status
                </span>
                <span className="flex items-center gap-2 font-medium">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  {project.status ?? 'Completed'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Links Card — major projects */}
          {isMajor && (project.githubUrl || project.liveUrl) && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 space-y-3"
            >
              <h3 className="text-xl font-bold mb-4">Links</h3>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-card/80 border border-border hover:border-primary/40 hover:text-primary transition-all duration-300 text-sm font-medium"
                >
                  <Github className="w-4 h-4" /> View on GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-all duration-300 text-sm font-medium"
                >
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
