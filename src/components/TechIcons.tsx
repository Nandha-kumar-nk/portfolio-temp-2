import React from 'react';

export function TechIcon({ id, className = 'w-6 h-6' }: { id: string; className?: string }) {
  switch (id) {
    case 'python':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <path
            d="M63.4 12C36.8 12 38.5 23.5 38.5 23.5l.03 11.9h25.4v3.6H28.4S12 37.1 12 64.2c0 27 14.3 26.2 14.3 26.2h8.5v-12s-.5-14.3 14-14.3h24.2s13.3.2 13.3-13v-23S88 12 63.4 12zm-13.8 7.3a4.1 4.1 0 1 1 0 8.2 4.1 4.1 0 0 1 0-8.2z"
            fill="#387eb8"
          />
          <path
            d="M64.6 116c26.6 0 24.9-11.5 24.9-11.5l-.03-11.9H64.1v-3.6h35.5s16.4 1.9 16.4-25.2c0-27-14.3-26.2-14.3-26.2h-8.5v12s.5 14.3-14 14.3H49.5s-13.3-.2-13.3 13v23s-1.7 16.1 28.4 16.1zm13.8-7.3a4.1 4.1 0 1 1 0-8.2 4.1 4.1 0 0 1 0 8.2z"
            fill="#ffe052"
          />
        </svg>
      );

    case 'react':
      return (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} fill="none">
          <circle cx="0" cy="0" r="2.05" fill="#00d8ff" />
          <g stroke="#00d8ff" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );

    case 'javascript':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="16" fill="#F7DF1E" />
          <path
            d="M67.3 100c3.5 5.9 8.1 10.3 16.5 10.3 7 0 11.5-3.5 11.5-8.3 0-5.8-4.6-7.8-12.4-11.2l-4.3-1.8c-12.2-5.2-20.3-11.8-20.3-25.8 0-12.8 9.8-22.5 25.1-22.5 10.9 0 18.8 4.2 24.3 14.1l-11.1 7.1c-2.4-4.4-5.6-6.2-13.2-6.2-5.4 0-9.2 3.5-9.2 7.6 0 5.2 3.6 7.3 11.9 10.9l4.3 1.8c14.3 6.2 21.1 12.5 21.1 26.6 0 15.2-11.8 23.5-27.4 23.5-15.5 0-25.4-7.6-29.7-18.7l12.9-7.3zm-42.6.4c2.5 4.4 5.8 8.1 11.9 8.1 6.1 0 10.1-2.6 10.1-12.3V41.7H61v54.8c0 17.7-10.4 25.5-24.8 25.5-11.1 0-19.1-5.7-22.6-14l11.1-7.6z"
            fill="#000000"
          />
        </svg>
      );

    case 'typescript':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="16" fill="#3178C6" />
          <path
            d="M33 55.4h37.4v13.6H59.5v52.6H44.1V69H33V55.4zm44.3 40.5c3.5 4.3 8.3 7.3 14.7 7.3 5.4 0 8.7-2.7 8.7-6.5 0-4.6-3.8-6.1-9.9-8.7l-3.4-1.4c-9.6-4.1-16.1-9.3-16.1-20.3 0-10.1 7.8-17.7 20-17.7 8.7 0 15 3.3 19.3 11l-9.1 5.6c-2-3.5-4.5-4.9-10.2-4.9-4.3 0-7.3 2.7-7.3 6 0 4.1 2.9 5.7 9.4 8.5l3.4 1.4c11.3 4.9 16.7 9.8 16.7 20.9 0 12-9.4 18.5-21.8 18.5-12.3 0-20.1-6-23.6-14.7l9.2-5.7z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'nodejs':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <path
            d="M64 12l48 27.7v55.4L64 122.8 16 95.1V39.7L64 12z"
            fill="#339933"
          />
          <path
            d="M64 19.3l41.6 24v48L64 115.3 22.4 91.3v-48L64 19.3z"
            fill="#020617"
          />
          <path
            d="M64 35l25 14.4v28.8L64 92.6 39 78.2V49.4L64 35z"
            fill="#339933"
          />
          <path
            d="M64 47.5L74.8 53.7V66.2L64 72.5 53.2 66.2V53.7L64 47.5z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'tailwind':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <path
            d="M64 25.6c-17.07 0-27.73 8.53-32 25.6 6.4-8.53 13.87-11.73 22.4-9.6 4.88 1.22 8.37 4.75 12.23 8.65C72.9 56.6 80.22 64 96 64c17.07 0 27.73-8.53 32-25.6-6.4 8.53-13.87 11.73-22.4 9.6-4.88-1.22-8.37-4.75-12.23-8.65C87.1 33 79.78 25.6 64 25.6zm-32 38.4c-17.07 0-27.73 8.53-32 25.6 6.4-8.53 13.87-11.73 22.4-9.6 4.88 1.22 8.37 4.75 12.23 8.65C40.9 95 48.22 102.4 64 102.4c17.07 0 27.73-8.53 32-25.6-6.4 8.53-13.87 11.73-22.4 9.6-4.88-1.22-8.37-4.75-12.23-8.65C55.1 71.4 47.78 64 32 64z"
            fill="#06B6D4"
          />
        </svg>
      );

    case 'threejs':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <path
            d="M64 16L112 99H16L64 16z"
            stroke="#A855F7"
            strokeWidth="8"
            strokeLinejoin="round"
          />
          <path
            d="M64 16L64 99M112 99L38 56M16 99L90 56"
            stroke="#D946EF"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          <circle cx="64" cy="56" r="6" fill="#F43F5E" />
        </svg>
      );

    case 'mongodb':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <path
            d="M64 12c-2.3 5.4-8.2 20.3-11.5 29.5-6.6 18.5-9.5 35.8-5.3 49 4.3 13.4 12.4 22 16.8 25.5 4.4-3.5 12.5-12.1 16.8-25.5 4.2-13.2 1.3-30.5-5.3-49C72.2 32.3 66.3 17.4 64 12z"
            fill="#10AA50"
          />
          <path
            d="M64 12v104c4.4-3.5 12.5-12.1 16.8-25.5 4.2-13.2 1.3-30.5-5.3-49C72.2 32.3 66.3 17.4 64 12z"
            fill="#139243"
          />
          <path
            d="M64 102c-.5 0-1-.3-1.2-.8-1.5-3.3-2.1-7.2-2.1-11.4 0-14.7 9.4-27.4 9.4-27.4s.4-.5 1-.4c.5.1.9.5.9 1 0 0-4.6 15.6-4.6 26.8 0 3.7.5 7.1 1.7 10 .3.7-.1 1.6-.8 1.9-.3.2-.5.3-.6.3z"
            fill="#A6A6A6"
          />
        </svg>
      );

    case 'git':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <path
            d="M123.8 55.4L72.6 4.2c-5.6-5.6-14.6-5.6-20.2 0L4.2 52.4c-5.6 5.6-5.6 14.6 0 20.2l51.2 51.2c5.6 5.6 14.6 5.6 20.2 0l48.2-48.2c5.6-5.6 5.6-14.6 0-20.2z"
            fill="#F05032"
          />
          <path
            d="M87.8 62.4c-3.2-1.8-7.2-1.3-9.8 1.3l-13.5-13.5c.8-2.2.5-4.8-1.1-6.8-2.5-3.1-7-3.7-10.2-1.3-3.2 2.4-3.8 6.9-1.4 10.1 1.5 2 3.9 2.9 6.2 2.5l13.1 13.1c-.2.7-.3 1.5-.3 2.3 0 4.1 3.3 7.4 7.4 7.4s7.4-3.3 7.4-7.4c0-3.3-2.2-6.1-5.2-7l12.1-12.1c2.2.7 4.8.3 6.6-1.5 2.5-2.5 2.5-6.6 0-9.1-2.5-2.5-6.6-2.5-9.1 0-1.8 1.9-2.2 4.5-1.5 6.7z"
            fill="#FFFFFF"
          />
          <path
            d="M51.8 68.3v17.5c-2.3 1.3-3.9 3.8-3.9 6.7 0 4.2 3.4 7.6 7.6 7.6s7.6-3.4 7.6-7.6c0-2.9-1.6-5.4-3.9-6.7V64.6c2.5-1.4 4.1-4 4.1-7.1 0-1.3-.3-2.5-.9-3.6l-13.1 13.1c1.3.3 2.5 1.3 2.5 1.3z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'aiml':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <path
            d="M109.2 55.4a29.8 29.8 0 0 0-2.3-22.1 30.6 30.6 0 0 0-25.2-15.1 30.5 30.5 0 0 0-20.7 7.9A30.2 30.2 0 0 0 42 22.8a30.6 30.6 0 0 0-23.7 17.5 30.3 30.3 0 0 0 4.5 29.8 29.8 29.8 0 0 0 2.3 22.1 30.6 30.6 0 0 0 25.2 15.1 30.5 30.5 0 0 0 20.7-7.9 30.2 30.2 0 0 0 19.1 3.3 30.6 30.6 0 0 0 23.7-17.5 30.3 30.3 0 0 0-4.6-29.8zm-39.7 58.5a22.7 22.7 0 0 1-14.7-5.3l1.8-1 22.3-12.9a3.8 3.8 0 0 0 1.9-3.3V61.1l9.3 5.4a.2.2 0 0 1 .1.2v25.9a22.9 22.9 0 0 1-20.7 21.3zm-48.4-23.4a22.6 22.6 0 0 1-2.8-15.4l1.8 1.1 22.3 12.9a3.8 3.8 0 0 0 3.8 0l26.2-15.1v10.8a.2.2 0 0 1-.1.2L50.8 91.9a22.8 22.8 0 0 1-29.7-1.4zm-7.6-43.1a22.7 22.7 0 0 1 11.9-10.1l-.02 2.1v25.8a3.8 3.8 0 0 0 1.9 3.3l26.2 15.1-9.3 5.4a.2.2 0 0 1-.2 0L30.2 59.3a22.8 22.8 0 0 1-16.7-21.9zm77.3 14.8L64.6 47.1l26.2-15.1a3.8 3.8 0 0 0 1.9-3.3V2.9l1.8 1.1a22.8 22.8 0 0 1 11.9 10.1 22.8 22.8 0 0 1-1.3 25.6l-14.3 7.5zm16.5 13.9a22.6 22.6 0 0 1 2.8 15.4l-1.8-1.1-22.3-12.9a3.8 3.8 0 0 0-3.8 0L59.8 74.2V63.4a.2.2 0 0 1 .1-.2l22.4-12.9a22.8 22.8 0 0 1 24.8 3.8 22.9 22.9 0 0 1 4.9 22.1zm-48.5 7.7l-12.6-7.3 12.6-7.3 12.6 7.3-12.6 7.3z"
            fill="#FFFFFF"
          />
        </svg>
      );

    // Tools & Platforms
    case 'github':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="#FFFFFF">
          <path fillRule="evenodd" clipRule="evenodd" d="M64 5.3c-32.4 0-58.7 26.3-58.7 58.7 0 25.9 16.8 47.9 40.1 55.7 2.9.5 4-.1 4-2.8v-10.7c-16.3 3.5-19.8-7.9-19.8-7.9-2.7-6.8-6.5-8.6-6.5-8.6-5.3-3.6.4-3.6.4-3.6 5.9.4 9 6.1 9 6.1 5.2 9 13.7 6.4 17 4.9.5-3.8 2-6.4 3.7-7.9-13-1.5-26.7-6.5-26.7-29 0-6.4 2.3-11.7 6-15.8-.6-1.5-2.6-7.5.6-15.6 0 0 4.9-1.6 16.2 6 4.7-1.3 9.7-2 14.7-2 5 0 10 .7 14.7 2 11.3-7.6 16.2-6 16.2-6 3.2 8.1 1.2 14.1.6 15.6 3.7 4.1 6 9.4 6 15.8 0 22.6-13.7 27.5-26.8 29 2.1 1.8 4 5.4 4 10.9v16.2c0 2.7 1 3.4 4 2.8 23.3-7.8 40.1-29.8 40.1-55.7 0-32.4-26.3-58.7-58.7-58.7z" />
        </svg>
      );

    case 'vscode':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <path d="M96.4 121.2l24.4-11.8c4.6-2.2 7.2-6.9 7.2-12.1V29.7c0-5.2-2.6-9.9-7.2-12.1L96.4 5.8c-3.6-1.8-8-.9-10.6 2.2L38.4 51.5 17.5 35.6c-2.8-2.1-6.7-1.9-9.3.5L1.8 42.4c-2.4 2.2-2.4 6 0 8.2l21.2 19.3L1.8 89.2c-2.4 2.2-2.4 6 0 8.2l6.4 6.3c2.6 2.4 6.5 2.6 9.3.5l20.9-15.9 47.4 43.5c2.6 3.1 7 4 10.6 2.2z" fill="#007ACC" />
          <path d="M96.4 121.2c-3.6 1.8-8 .9-10.6-2.2L38.4 75.5l9.2-8.5 38.2 35.1 10.6 19.1z" fill="#1F9CF0" />
          <path d="M96.4 5.8c-3.6-1.8-8-.9-10.6 2.2L38.4 51.5l9.2 8.5 38.2-35.1L96.4 5.8z" fill="#0066B8" />
        </svg>
      );

    case 'figma':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <path d="M44 128c11 0 20-9 20-20V88H44c-11 0-20 9-20 20s9 20 20 20z" fill="#0ACF83" />
          <path d="M24 68c0-11 9-20 20-20h20v40H44c-11 0-20-9-20-20z" fill="#A259FF" />
          <path d="M24 28c0-11 9-20 20-20h20v40H44c-11 0-20-9-20-20z" fill="#F24E1E" />
          <path d="M64 8h20c11 0 20 9 20 20s-9 20-20 20H64V8z" fill="#FF7262" />
          <circle cx="84" cy="68" r="20" fill="#1ABCFE" />
        </svg>
      );

    case 'postman':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <circle cx="64" cy="64" r="56" fill="#FF6C37" />
          <path d="M92 48c-1.5-1.5-4-1.5-5.5 0L64 70.5 51.5 58c-1.5-1.5-4-1.5-5.5 0s-1.5 4 0 5.5l15.3 15.3c1.5 1.5 4 1.5 5.5 0L92 53.5c1.5-1.5 1.5-4 0-5.5z" fill="#FFFFFF" />
        </svg>
      );

    case 'vercel':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="#FFFFFF">
          <path d="M64 16l56 96H8L64 16z" />
        </svg>
      );

    case 'firebase':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <path d="M24.8 95.8L38.4 12.3c.4-2.5 3.5-3.3 5-1.4l18.4 23.6-37 61.3z" fill="#FFA000" />
          <path d="M24.8 95.8l68.7-68.7c1.8-1.8 4.8-.9 5.3 1.6l10.9 67.1-84.9 0z" fill="#F57C00" />
          <path d="M66.4 118.8c-1.5 1.1-3.3 1.1-4.8 0L19.5 91.4 64 17.5l44.5 73.9-42.1 27.4z" fill="#FFCA28" />
        </svg>
      );

    case 'database':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      );

    case 'docker':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <path d="M124.5 54.3c-2.6-1.8-8.2-2.6-12.7-.8-1.5-7.5-7.7-12-7.7-12-2.6 7.5-1.5 13.9-.7 16.9-6 3.8-14.7 3.8-19.5 3.4l-1.5-.4c-2.3-.6-4.9-1.1-7.5-1.1H13.6c-4.9 0-9 4.1-9 9 0 17.7 10.9 39.5 41.3 39.5 36.5 0 54.1-18 60.1-36 7.5-.8 14.3-5.3 18.5-18.5z" fill="#2496ED" />
          <path d="M30 36h12v12H30zm16 0h12v12H46zm16 0h12v12H62zM30 50h12v12H30zm16 0h12v12H46zm16 0h12v12H62zm16 0h12v12H78z" fill="#2496ED" />
        </svg>
      );

    // Soft Skills
    case 'problem_solving':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#00f5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
          <path d="M9 21h6" />
        </svg>
      );

    case 'communication':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );

    case 'teamwork':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );

    case 'leadership':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="#a855f7" />
        </svg>
      );

    case 'creativity':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z" />
        </svg>
      );

    case 'adaptability':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 3 21 3 21 8" />
          <line x1="4" y1="20" x2="21" y2="3" />
          <polyline points="21 16 21 21 16 21" />
          <line x1="15" y1="15" x2="21" y2="21" />
          <line x1="4" y1="4" x2="9" y2="9" />
        </svg>
      );

    case 'time_mgmt':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );

    case 'learning':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      );

    case 'fullstack_cert':
    case 'python_cert':
    case 'cloud_cert':
    case 'genai_cert':
    case 'dsa_cert':
    case 'security_cert':
    case 'webgl_cert':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="6" fill="rgba(56, 189, 248, 0.2)" />
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      );

    default:
      if (id.endsWith('_cert')) {
        return (
          <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="6" fill="rgba(56, 189, 248, 0.2)" />
            <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
          </svg>
        );
      }
      return (
        <div className="w-4 h-4 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f5ff]" />
      );
  }
}
