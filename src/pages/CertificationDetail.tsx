import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, CheckCircle2, Award, Target, BookOpen, Sparkles, Trophy } from 'lucide-react';
import { allCertifications } from '@/data/certificationsData';
import { useEffect } from 'react';

const CertificationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const cert = allCertifications.find(c => c.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!cert) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Certification Not Found</h1>
          <button 
            onClick={() => navigate('/certifications')}
            className="btn-primary"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 pt-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <button 
          onClick={() => navigate('/certifications')}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-12 font-medium"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Certifications
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - Certificate Image & Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/10 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative glass-card p-4 overflow-hidden rounded-[2rem]">
                <img 
                  src={cert.image} 
                  alt={cert.name} 
                  className="w-full h-full object-contain rounded-2xl" 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-6 flex flex-col items-center text-center">
                <div className="p-3 rounded-xl bg-primary/10 text-primary mb-3">
                  <Clock className="w-6 h-6" />
                </div>
                <span className="text-2xl font-bold">{cert.hoursSpent || 'N/A'}</span>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Hours Dedicated</span>
              </div>
              <div className="glass-card p-6 flex flex-col items-center text-center">
                <div className="p-3 rounded-xl bg-secondary/10 text-secondary mb-3">
                  <Target className="w-6 h-6" />
                </div>
                <span className="text-2xl font-bold">{cert.skillsGained?.length || 0}</span>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Key Skills</span>
              </div>
            </div>
          </motion.div>

          {/* Right - Content & Details */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                  cert.type === 'skill' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'
                }`}>
                  {cert.type} Certification
                </span>
                <span className="text-sm text-muted-foreground">{cert.date}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                {cert.name}
              </h1>
              <p className="text-xl text-primary font-semibold">{cert.issuer}</p>
            </motion.div>

            {/* Learning Outcomes */}
            <motion.section variants={itemVariants}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold">What I Learned</h2>
              </div>
              <div className="grid gap-4">
                {cert.learningOutcomes?.map((outcome, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ x: 10 }}
                    className="flex items-start gap-4 glass-card p-4 hover:border-primary/30 transition-all duration-300"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <p className="text-muted-foreground">{outcome}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Skills Gained */}
            <motion.section variants={itemVariants}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-secondary/10 text-secondary">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold">Key Skills Mastered</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {cert.skillsGained?.map((skill, idx) => (
                  <span 
                    key={idx}
                    className="px-4 py-2 rounded-xl bg-muted/50 border border-border text-foreground font-medium hover:border-primary/50 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.section>

            {/* Reflection / Summary */}
            <motion.section variants={itemVariants} className="glass-card p-8 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <Award className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold">Project Impact</h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {cert.description}
              </p>
            </motion.section>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CertificationDetail;
