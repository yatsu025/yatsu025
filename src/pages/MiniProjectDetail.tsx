import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Sparkles, Target, Info, CheckCircle2, Calendar, Activity } from 'lucide-react';
import { miniProjects } from '@/data/projectsData';
import { useEffect } from 'react';

const MiniProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = miniProjects.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <button onClick={() => navigate('/')} className="btn-primary">
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">

      {/* ── Banner ── */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img
          src={project.imageUrl || '/placeholder.svg'}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-7xl mx-auto">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6 font-medium"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Portfolio
          </motion.button>

          {/* Mini badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3"
          >
            <span className="px-3 py-1 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-xs font-bold uppercase tracking-widest">
              Mini Project
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            {project.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-4"
          >
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
              >
                <Github className="w-5 h-5" /> GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2"
              >
                <ExternalLink className="w-5 h-5" /> Live Demo
              </a>
            )}
          </motion.div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Main content */}
        <div className="lg:col-span-2 space-y-10">

          {/* Problem */}
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

          {/* Solution */}
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

          {/* My Work */}
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
        </div>

        {/* Sidebar */}
        <div className="space-y-8">

          {/* Tech Stack */}
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

          {/* Project Info */}
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
                <span className="font-medium">Mini Project</span>
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
        </div>
      </div>
    </div>
  );
};

export default MiniProjectDetail;
