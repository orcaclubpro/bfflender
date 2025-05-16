'use client';

import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import TrustIndicators from './components/TrustIndicators';
import PLChallenge from './components/PLChallenge';
import Benefits from './components/Benefits';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

const BFFLenderLandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <Navigation />
      <Hero />
      <TrustIndicators />
      <PLChallenge />
      <Benefits />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default BFFLenderLandingPage;
