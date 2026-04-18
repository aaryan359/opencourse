// ============================================================================
// OPENCOURSE UNIFIED THEME SYSTEM
// Consistent colors, spacing, and design tokens for the entire application
// ============================================================================

export const theme = {
  // Core Color Palette
  colors: {
    // Base backgrounds
    bg: {
      primary: '#050507',
      secondary: '#0b0f17',
      tertiary: '#111829',
      elevated: '#18233a',
    },
    
    // Accent colors
    accent: {
      primary: '#6D7DFF',       // Main brand color (bright indigo)
      primaryHover: '#8493FF',
      primaryMuted: 'rgba(109, 125, 255, 0.18)',
      secondary: '#FF5EA8',     // Bright pink accent
      tertiary: '#32D7FF',      // Neon cyan accent
    },
    
    // Text colors
    text: {
      primary: '#F3F7FF',
      secondary: '#CBD5E8',
      muted: '#9AA7C0',
      disabled: '#68758E',
    },
    
    // Border colors
    border: {
      default: 'rgba(224, 233, 255, 0.16)',
      hover: 'rgba(232, 239, 255, 0.28)',
      active: 'rgba(239, 244, 255, 0.4)',
      accent: 'rgba(109, 125, 255, 0.45)',
    },
    
    // Status colors
    status: {
      success: '#28D68B',
      successMuted: 'rgba(40, 214, 139, 0.18)',
      warning: '#FFBE55',
      warningMuted: 'rgba(255, 190, 85, 0.18)',
      error: '#FF6A7A',
      errorMuted: 'rgba(255, 106, 122, 0.18)',
      info: '#4FA8FF',
      infoMuted: 'rgba(79, 168, 255, 0.18)',
    },
    
    // Level colors for courses
    level: {
      beginner: { bg: 'rgba(40, 214, 139, 0.16)', text: '#5BE7A9', border: 'rgba(91, 231, 169, 0.34)' },
      intermediate: { bg: 'rgba(79, 168, 255, 0.16)', text: '#8BC5FF', border: 'rgba(139, 197, 255, 0.34)' },
      advanced: { bg: 'rgba(182, 102, 255, 0.16)', text: '#CCA3FF', border: 'rgba(204, 163, 255, 0.34)' },
    },
  },
  
  // Shadows
  shadows: {
    sm: '0 2px 10px rgba(2, 8, 28, 0.34)',
    md: '0 6px 20px rgba(2, 8, 28, 0.4)',
    lg: '0 12px 36px rgba(2, 8, 28, 0.48)',
    xl: '0 18px 58px rgba(2, 8, 28, 0.56)',
    glow: {
      accent: '0 0 42px rgba(109, 125, 255, 0.28)',
      success: '0 0 42px rgba(40, 214, 139, 0.24)',
    },
    card: '0 0 0 1px rgba(223,233,255,0.14), 0 6px 24px rgba(2,8,28,0.44)',
    cardHover: '0 0 0 1px rgba(235,241,255,0.24), 0 12px 46px rgba(2,8,28,0.54), 0 0 58px rgba(109,125,255,0.18)',
  },
  
  // Gradients
  gradients: {
    bgMain: 'radial-gradient(ellipse_at_top,#1a2354_0%,#101737_42%,#050507_100%)',
    textPrimary: 'linear-gradient(to bottom, #ffffff, rgba(243,247,255,0.78))',
    accent: 'linear-gradient(135deg, #6D7DFF, #32D7FF 52%, #FF5EA8)',
    shine: 'linear-gradient(90deg, transparent, rgba(245,249,255,0.16), transparent)',
    cardBg: 'linear-gradient(to bottom, rgba(228,236,255,0.14), rgba(228,236,255,0.05))',
  },
  
  // Border radius
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    full: '9999px',
  },
  
  // Transitions
  transition: {
    fast: '150ms ease',
    default: '200ms ease',
    smooth: '300ms cubic-bezier(0.16, 1, 0.3, 1)',
    bounce: '500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  
  // Animation easings
  easing: {
    smooth: [0.16, 1, 0.3, 1],
    bounce: [0.34, 1.56, 0.64, 1],
    spring: { type: 'spring', stiffness: 400, damping: 30 },
  },
  
  // Spacing scale
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
  },
};

// Common gradient classes for inline use
export const gradientClasses = {
  fields: [
    "from-[#6D7DFF]/34 via-[#32D7FF]/20 to-transparent",
    "from-emerald-400/32 via-teal-300/18 to-transparent",
    "from-rose-400/30 via-pink-400/18 to-transparent",
    "from-sky-400/32 via-blue-400/18 to-transparent",
    "from-amber-400/30 via-orange-400/18 to-transparent",
    "from-violet-400/32 via-fuchsia-400/18 to-transparent",
  ],
};

// Level badge styling
export const levelStyles = {
  beginner: "bg-emerald-400/16 text-emerald-300 border-emerald-300/34",
  intermediate: "bg-sky-400/16 text-sky-300 border-sky-300/34",
  advanced: "bg-violet-400/16 text-violet-300 border-violet-300/34",
};

export default theme;
