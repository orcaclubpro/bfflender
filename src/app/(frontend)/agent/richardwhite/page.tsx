import type { Metadata } from 'next';
import { AgentHero } from './components/AgentHero';
import { QuickContact } from './components/QuickContact';
import { ExperienceSection } from './components/ExperienceSection';
import { AboutSection } from './components/AboutSection';
import { CTACards } from './components/CTACards';

export const metadata: Metadata = {
  title: 'Richard White - Loan Officer | BFFLender',
  description: 'Richard White, NMLS #176002, has 20+ years of mortgage experience and 7 years US Army Special Forces service. Specializing in VA home loans for veterans in Virginia.',
  openGraph: {
    title: 'Richard White - Loan Officer | BFFLender',
    description: 'Veteran loan officer with 20+ years experience specializing in VA home loans.',
    type: 'profile',
  },
};

export default function RichardWhitePage() {
  return (
    <main className="min-h-screen bg-white">
      <AgentHero />
      <QuickContact />
      <ExperienceSection />
      <AboutSection />
      <CTACards />
    </main>
  );
}
