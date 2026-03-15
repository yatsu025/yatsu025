import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Award, Trophy, ExternalLink, X, Info, Search } from 'lucide-react';
import { hackathons, skillCertifications, Certification } from '@/data/certificationsData';

const CertificationsPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'hackathon' | 'skill'>('all');
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCerts = [...hackathons, ...skillCertifications].filter(cert => {
    const matchesFilter = filter === 'all' || cert.type === filter;
    const matchesSearch = cert.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cert.issuer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 pt-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4 font-medium"
            >
              <ArrowLeft className="w-5 h-5" /> Back to Portfolio
            </button>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              All <span className="gradient-text">Certifications</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              A comprehensive list of my hackathon participation and technical skill certifications.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search certifications..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-xl focus:outline-none focus:border-primary/50 w-full sm:w-64"
              />
            </div>
            
            {/* Filter Chips */}
            <div className="flex bg-muted/30 p-1 rounded-xl border border-border/50">
              {(['all', 'hackathon', 'skill'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    filter === f 
                      ? 'bg-primary text-primary-foreground shadow-lg' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {f === 'all' ? 'All' : f === 'hackathon' ? 'Hackathons' : 'Skills'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert) => (
              <motion.div
                layout
                key={cert.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedCert(cert)}
                className="glass-card p-4 cursor-pointer group hover:border-primary/30 transition-all duration-300 flex flex-col h-full"
              >
                <div className="aspect-video bg-muted rounded-xl mb-4 overflow-hidden relative">
                  <img 
                    src={cert.image} 
                    alt={cert.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
                      <Search className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {cert.type === 'hackathon' ? (
                      <Trophy className="w-4 h-4 text-secondary" />
                    ) : (
                      <Award className="w-4 h-4 text-primary" />
                    )}
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${
                      cert.type === 'hackathon' ? 'text-secondary' : 'text-primary'
                    }`}>
                      {cert.type}
                    </span>
                    <span className="text-[10px] text-muted-foreground ml-auto">{cert.date}</span>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {cert.issuer}
                  </p>
                </div>
                
                <div className="mt-auto pt-4 border-t border-border/50 flex justify-between items-center">
                  <span className="text-xs font-medium text-muted-foreground">Click to view</span>
                  {cert.type === 'skill' && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/certification/${cert.id}`);
                      }}
                      className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
                    >
                      Details <Info className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-card border border-border rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="md:w-1/2 bg-muted flex items-center justify-center overflow-hidden">
                <img 
                  src={selectedCert.image} 
                  alt={selectedCert.name} 
                  className="w-full h-full object-contain" 
                />
              </div>
              <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                        selectedCert.type === 'hackathon' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'
                      }`}>
                        {selectedCert.type}
                      </span>
                      <span className="text-xs text-muted-foreground">{selectedCert.date}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold">{selectedCert.name}</h2>
                    <p className="text-lg text-primary font-medium mt-1">{selectedCert.issuer}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedCert(null)}
                    className="p-2 rounded-xl hover:bg-muted transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {selectedCert.description}
                </p>
                
                <div className="space-y-4">
                  {selectedCert.type === 'skill' && (
                    <button 
                      onClick={() => navigate(`/certification/${selectedCert.id}`)}
                      className="w-full btn-primary flex items-center justify-center gap-2"
                    >
                      View Detailed Journey <ArrowLeft className="w-4 h-4 rotate-180" />
                    </button>
                  )}
                  <button 
                    onClick={() => setSelectedCert(null)}
                    className="w-full btn-outline"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CertificationsPage;
