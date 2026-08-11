import React from 'react';
import { LogoSettings } from '../types';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSlogan?: boolean;
  className?: string;
  settings?: LogoSettings;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  size = 'md', 
  showSlogan, 
  className = '',
  settings 
}) => {
  // Default fallback settings
  const primaryText = settings?.primaryText ?? 'यथार्थ';
  const secondaryText = settings?.secondaryText ?? 'खबर';
  const sloganText = settings?.sloganText ?? '';
  const primaryColor = settings?.primaryColor || '#003399';
  const secondaryColor = settings?.secondaryColor || '#C8102E';
  const logoType = settings?.logoType || 'VECTOR';
  const logoImageUrl = settings?.logoImageUrl || '';
  const shouldShowSlogan = showSlogan !== undefined ? showSlogan : (settings?.showSlogan ?? false);
  const borderStyle = settings?.borderStyle || 'NONE';

  // Size mapping presets
  const sizeClasses = {
    sm: { icon: 'w-9 h-9', title: 'text-2xl', slogan: 'text-[9px]', imgHeight: 38 },
    md: { icon: 'w-12 h-12 sm:w-14 sm:h-14', title: 'text-3xl sm:text-4xl', slogan: 'text-xs', imgHeight: 52 },
    lg: { icon: 'w-14 h-14 sm:w-16 sm:h-16', title: 'text-4xl sm:text-4.5xl', slogan: 'text-xs', imgHeight: 64 },
    xl: { icon: 'w-18 h-18 sm:w-22 sm:h-22', title: 'text-5xl sm:text-6xl', slogan: 'text-sm', imgHeight: 84 }
  }[size];

  // Border styling for custom image logo
  const borderClasses = {
    NONE: '',
    ROUNDED: 'rounded-xl border border-slate-200 shadow-xs p-1 bg-white',
    CIRCLE: 'rounded-full border-2 border-red-500 shadow-md p-1 bg-white object-cover',
    SHADOW: 'rounded-lg shadow-lg border border-slate-300 p-1 bg-white'
  }[borderStyle];

  // Calculated custom height style if specified in settings
  const customImgHeight = settings?.logoHeightPx ? `${settings.logoHeightPx}px` : `${sizeClasses.imgHeight}px`;

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3.5 select-none ${className}`}>
      
      {/* 1. CUSTOM IMAGE LOGO MODE */}
      {logoType === 'IMAGE' && logoImageUrl ? (
        <div className="relative flex items-center shrink-0">
          <img 
            src={logoImageUrl} 
            alt={`${primaryText} ${secondaryText} Logo`}
            className={`object-contain max-w-full transition-all duration-200 ${borderClasses}`}
            style={{ height: customImgHeight }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      ) : (
        /* 2. HIGH-PRECISION VECTOR EMBLEM LOGO MODE */
        <div className={`relative flex items-center justify-center shrink-0 ${sizeClasses.icon}`}>
          <svg viewBox="0 0 140 140" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logoPrimaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={primaryColor} />
                <stop offset="100%" stopColor="#081C44" />
              </linearGradient>
              <linearGradient id="logoSecondaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="100%" stopColor={secondaryColor} />
              </linearGradient>
              <filter id="glow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={secondaryColor} floodOpacity="0.3"/>
              </filter>
            </defs>

            {/* Outer Accent Ring */}
            <circle cx="70" cy="70" r="64" fill="url(#logoPrimaryGrad)" stroke={secondaryColor} strokeWidth="4" />

            {/* Inner Gold/Light Rim */}
            <circle cx="70" cy="70" r="56" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="6 3" opacity="0.6" />

            {/* Stylized Globe Lines */}
            <ellipse cx="70" cy="70" rx="50" ry="22" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.25" />
            <line x1="20" y1="70" x2="120" y2="70" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.3" />
            <line x1="70" y1="20" x2="70" y2="120" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.3" />

            {/* Folded Newspaper / Press Shield Motif */}
            <path 
              d="M38 48 C38 40, 102 40, 102 48 L102 92 C102 100, 38 100, 38 92 Z" 
              fill="#FFFFFF" 
              opacity="0.95"
            />
            
            {/* Red Accent Press Header */}
            <path 
              d="M42 44 L98 44 C100 44, 100 56, 98 56 L42 56 C40 56, 40 44, 42 44 Z" 
              fill="url(#logoSecondaryGrad)" 
            />

            {/* Newspaper Text Lines Simulation */}
            <rect x="46" y="62" width="28" height="4" rx="2" fill={primaryColor} opacity="0.8" />
            <rect x="46" y="70" width="22" height="3" rx="1.5" fill="#64748B" />
            <rect x="46" y="76" width="26" height="3" rx="1.5" fill="#64748B" />
            <rect x="46" y="82" width="18" height="3" rx="1.5" fill="#64748B" />

            {/* Fountain Pen Nib / Truth Feather Emblem */}
            <g filter="url(#glow)">
              <path d="M80 60 L102 36 L108 42 L86 66 Z" fill="url(#logoSecondaryGrad)" />
              <path d="M76 64 L100 90 L88 94 L68 72 Z" fill={primaryColor} />
              <circle cx="82" cy="65" r="4" fill="#FFFFFF" />
            </g>
          </svg>
        </div>
      )}

      {/* Typography: Primary & Secondary Brand Name */}
      {(primaryText || secondaryText) && (
        <div className="flex flex-col justify-center leading-none">
          <div 
            className={`font-black tracking-tight ${sizeClasses.title} flex items-center gap-1.5`}
            style={{ fontFamily: "'Mukta', 'Noto Sans Devanagari', 'Kalimati', sans-serif" }}
          >
            <span className="font-black tracking-tight" style={{ color: primaryColor }}>
              {primaryText}
            </span>
            <span className="font-black tracking-tight px-1.5 py-0.5 rounded-lg bg-red-600 text-white shadow-xs" style={{ backgroundColor: secondaryColor }}>
              {secondaryText}
            </span>
          </div>
          
          {/* Optional Tagline / Slogan (Rendered ONLY if explicitly toggled ON) */}
          {shouldShowSlogan && sloganText && (
            <span 
              className={`font-bold tracking-wide ${sizeClasses.slogan} opacity-90 mt-1`}
              style={{ 
                fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif",
                color: secondaryColor
              }}
            >
              {sloganText}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
