'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  threshold?: number;
}

// Custom hook for lazy loading with Intersection Observer
const useLazyImage = (src: string, threshold: number = 0.1) => {
  const [imageSrc, setImageSrc] = useState<string>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const setImageRef = useCallback((node: HTMLImageElement | null) => {
    imageRef.current = node;
  }, []);

  useEffect(() => {
    let observer: IntersectionObserver;
    
    if (imageRef.current && !isInView) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              setImageSrc(src);
              observer.unobserve(entry.target);
            }
          });
        },
        { 
          threshold,
          rootMargin: '50px' // Start loading 50px before the image enters viewport
        }
      );
      
      observer.observe(imageRef.current);
    }
    
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [src, threshold, isInView]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    console.warn(`Failed to load image: ${src}`);
  }, [src]);

  return {
    setImageRef,
    imageSrc,
    isLoaded,
    isInView,
    handleLoad,
    handleError
  };
};

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjY2NjIi8+PC9zdmc+',
  threshold = 0.1 
}) => {
  const {
    setImageRef,
    imageSrc,
    isLoaded,
    isInView,
    handleLoad,
    handleError
  } = useLazyImage(src, threshold);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={setImageRef}
        src={imageSrc || placeholder}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-70'
        } ${className}`}
        loading="lazy"
      />
      
      {/* Loading overlay */}
      {isInView && !isLoaded && (
        <div className="absolute inset-0 bg-slate-800/20 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default LazyImage; 