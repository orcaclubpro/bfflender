// Common TypeScript types for the application

export interface BaseComponent {
  className?: string;
  children?: React.ReactNode;
}

export interface PageProps {
  params: Record<string, string>;
  searchParams: Record<string, string | string[] | undefined>;
}

export interface MetricData {
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'stable';
}

export interface TestimonialData {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
}

export interface BenefitData {
  title: string;
  description: string;
  icon?: string;
}