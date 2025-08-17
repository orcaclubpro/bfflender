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