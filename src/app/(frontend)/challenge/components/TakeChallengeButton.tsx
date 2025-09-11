"use client"

import React from 'react';
import { useChatbot } from '@/app/(frontend)/components/ChatbotProvider';
import { cn } from '@/lib/utils';
import { DollarSign, ArrowRight } from 'lucide-react';

interface TakeChallengeButtonProps {
  variant?: 'primary' | 'inline' | 'final';
  text?: string;
  className?: string;
  showIcon?: boolean;
}

export default function TakeChallengeButton({ 
  variant = 'primary', 
  text, 
  className,
  showIcon = true 
}: TakeChallengeButtonProps) {
  const { openChatbot } = useChatbot();

  const getButtonText = () => {
    if (text) return text;
    
    switch (variant) {
      case 'primary':
        return 'Take the P&L Challenge';
      case 'inline':
        return 'See How Your P&L Compares';
      case 'final':
        return 'Take the P&L Challenge Now';
      default:
        return 'Take the P&L Challenge';
    }
  };

  const getButtonStyles = () => {
    const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 focus-ring";
    
    switch (variant) {
      case 'primary':
        return cn(
          baseStyles,
          "px-8 py-4 text-lg bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:from-emerald-700 hover:to-emerald-800 hover:scale-105 shadow-lg hover:shadow-xl",
          className
        );
      case 'inline':
        return cn(
          baseStyles,
          "px-6 py-3 text-base bg-amber-500 text-navy-900 rounded-lg hover:bg-amber-400 hover:scale-105 shadow-md hover:shadow-lg",
          className
        );
      case 'final':
        return cn(
          baseStyles,
          "px-10 py-5 text-xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-blue-600 text-white rounded-xl hover:from-emerald-700 hover:via-emerald-800 hover:to-blue-700 hover:scale-105 shadow-xl hover:shadow-2xl animate-pulse-subtle",
          className
        );
      default:
        return cn(baseStyles, className);
    }
  };

  return (
    <button
      onClick={openChatbot}
      className={getButtonStyles()}
    >
      {showIcon && variant === 'primary' && <DollarSign className="w-5 h-5" />}
      {getButtonText()}
      {showIcon && (variant === 'inline' || variant === 'final') && <ArrowRight className="w-4 h-4" />}
    </button>
  );
}