import React from 'react';

export const AccordionPlayIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Stylized Accordion Bellows */}
    <rect x="10" y="10" width="10" height="60" rx="2" fill="#003366" />
    <rect x="25" y="10" width="10" height="60" rx="2" fill="#003366" />
    <rect x="40" y="10" width="10" height="60" rx="2" fill="#003366" />
    {/* Buttons Side */}
    <rect x="55" y="5" width="25" height="70" rx="4" fill="#003366" />
    <circle cx="67.5" cy="25" r="3" fill="white" />
    <circle cx="67.5" cy="40" r="3" fill="white" />
    <circle cx="67.5" cy="55" r="3" fill="white" />
    {/* Play Triangle Overlay */}
    <path d="M0 25 L35 40 L0 55 Z" fill="#C8102E" stroke="white" strokeWidth="2" />
  </svg>
);

export const AccordionIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Stylized Accordion Bellows */}
    <rect x="10" y="10" width="10" height="60" rx="2" fill="currentColor" />
    <rect x="25" y="10" width="10" height="60" rx="2" fill="currentColor" />
    <rect x="40" y="10" width="10" height="60" rx="2" fill="currentColor" />
    {/* Buttons Side */}
    <rect x="55" y="5" width="25" height="70" rx="4" fill="currentColor" />
    <circle cx="67.5" cy="25" r="3" fill="white" />
    <circle cx="67.5" cy="40" r="3" fill="white" />
    <circle cx="67.5" cy="55" r="3" fill="white" />
  </svg>
);

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 160 50" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Visual Accordion Icon incorporated into the logo - Left Side */}
    <g transform="translate(5, 5) scale(0.8)">
        {/* Bellows */}
        <path d="M10 10 L20 40 L10 70" stroke="#C8102E" strokeWidth="3" fill="none" transform="scale(0.6) translate(0,-10)"/>
        <path d="M20 10 L30 40 L20 70" stroke="#EAAA00" strokeWidth="3" fill="none" transform="scale(0.6) translate(0,-10)"/>
        <path d="M30 10 L40 40 L30 70" stroke="#C8102E" strokeWidth="3" fill="none" transform="scale(0.6) translate(0,-10)"/>
        {/* Body */}
        <rect x="28" y="0" width="12" height="36" rx="2" fill="#003366" />
        <circle cx="34" cy="8" r="2" fill="white"/>
        <circle cx="34" cy="18" r="2" fill="white"/>
        <circle cx="34" cy="28" r="2" fill="white"/>
    </g>

    {/* Text - Stacked in 2 lines */}
    <text x="50" y="22" fontFamily="Playfair Display" fontSize="18" fill="#003366" fontWeight="bold">
      Estampas
    </text>
    <text x="50" y="42" fontFamily="Montserrat, sans-serif" fontSize="18" fill="#C8102E" fontWeight="300">
      Vallenatas
    </text>
  </svg>
);