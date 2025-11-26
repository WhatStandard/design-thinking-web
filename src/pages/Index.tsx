import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PersonalDashboard from '@/components/PersonalDashboard';
import CommonHomeSections from '@/components/CommonHomeSections';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PersonalDashboard />
        <CommonHomeSections />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
