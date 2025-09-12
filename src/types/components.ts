// Component-specific prop types

import { BaseComponent } from './index';

export interface HeroProps extends BaseComponent {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export interface ButtonProps extends BaseComponent {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps extends BaseComponent {
  title?: string;
  description?: string;
  variant?: 'elevated' | 'feature' | 'glass';
}

export interface ModalProps extends BaseComponent {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

// User Profile related interfaces
export interface UserProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  employmentStatus: 'employed' | 'self-employed' | 'contract' | 'retired' | 'unemployed' | 'student' | '';
  employer: string;
  annualIncome: string;
}

export interface UserProfileFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  employmentStatus?: string;
  employer?: string;
  annualIncome?: string;
}

export interface UserProfileFormState {
  data: UserProfileFormData;
  errors: UserProfileFormErrors;
  isLoading: boolean;
  isSubmitting: boolean;
}

// Application/Challenge related interfaces
export interface ApplicationData {
  id: string;
  name: string;
  email: string;
  status: 'submitted' | 'pending_verification' | 'verified' | 'in_progress' | 'completed' | 'rejected';
  submittedAt?: string | null;
  verifiedAt?: string | null;
  completedAt?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
  answers?: {
    question1?: string | null;
    question2?: string | null;
    question3?: string | null;
    additionalInfo?: string | null;
  };
  documentIds?: {
    documentId: string;
    id?: string | null;
  }[] | null;
  user?: string | null;
  notes?: string | null;
  documents?: DocumentData[];
  documentCount?: number;
}

export interface DocumentData {
  id: string;
  filename?: string | null;
  url?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  description?: string | null;
  tags?: {
    tag: string;
    id?: string | null;
  }[] | null;
  relatedUser?: string | null;
  relatedChallenge?: string | null;
  isPublic?: boolean | null;
  uploadedBy?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface TimelineItem {
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
}

// Document upload related interfaces
export interface DocumentUploadFormData {
  description: string;
  tags: string;
  isPublic: boolean;
}

export interface DocumentUploadFormErrors {
  file?: string;
  description?: string;
  tags?: string;
  general?: string;
}