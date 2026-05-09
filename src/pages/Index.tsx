import Navbar from '@/components/Navbar/Navbar';
import HeroSection from '@/components/Hero/HeroSection';
import StatsSection from '@/components/Hero/StatsSection';
import AboutSection from '@/components/About/AboutSection';
import ServicesSection from '@/components/Services/ServicesSection';
import SkillsSection from '@/components/Skills/SkillsSection';
import CertificationsSection from '@/components/Certifications/CertificationsSection';
import ProjectsSection from '@/components/Projects/ProjectsSection';
import ResumeSection from '@/components/Resume/ResumeSection';
import ContactSection from '@/components/Contact/ContactSection';
import Footer from '@/components/Footer/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ServicesSection />
      <SkillsSection />
      <CertificationsSection />
      <ProjectsSection />
      <ResumeSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
