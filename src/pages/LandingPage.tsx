
import React, { useState } from 'react';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import ProblemStatement from '@/components/landing/ProblemStatement';
import SolutionPreview from '@/components/landing/SolutionPreview';
import Benefits from '@/components/landing/Benefits';
import HowItWorks from '@/components/landing/HowItWorks';
import UlipIntegration from '@/components/landing/UlipIntegration';
import Security from '@/components/landing/Security';
import FAQ from '@/components/landing/FAQ';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';
import WaitlistDialog from '@/components/landing/WaitlistDialog';

const LandingPage = () => {
  const [showWaitlistDialog, setShowWaitlistDialog] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header onOpenWaitlist={() => setShowWaitlistDialog(true)} />
      <Hero onOpenWaitlist={() => setShowWaitlistDialog(true)} />
      <ProblemStatement />
      <SolutionPreview />
      <Benefits />
      <HowItWorks />
      <UlipIntegration />
      <Security />
      <FAQ />
      <CTASection onOpenWaitlist={() => setShowWaitlistDialog(true)} />
      <Footer />
      <WaitlistDialog 
        open={showWaitlistDialog} 
        onOpenChange={setShowWaitlistDialog} 
      />
    </div>
  );
};

export default LandingPage;
