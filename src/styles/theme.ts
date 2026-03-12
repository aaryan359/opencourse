// ============================================================================
// OPENCOURSE UNIFIED THEME SYSTEM
// Consistent colors, spacing, and design tokens for the entire application
// ============================================================================

export const theme = {
  // Core Color Palette
  colors: {
    // Base backgrounds
    bg: {
      primary: '#050506',
      secondary: '#0a0a0c',
      tertiary: '#0f0f12',
      elevated: '#141418',
    },
    
    // Accent colors
    accent: {
      primary: '#5E6AD2',       // Main brand color (indigo)
      primaryHover: '#6872D9',
      primaryMuted: 'rgba(94, 106, 210, 0.15)',
      secondary: '#8B5CF6',     // Purple accent
      tertiary: '#06B6D4',      // Cyan accent
    },
    
    // Text colors
    text: {
      primary: '#EDEDEF',
      secondary: '#A1A1AA',
      muted: '#8A8F98',
      disabled: '#52525B',
    },
    
    // Border colors
    border: {
      default: 'rgba(255, 255, 255, 0.06)',
      hover: 'rgba(255, 255, 255, 0.12)',
      active: 'rgba(255, 255, 255, 0.2)',
      accent: 'rgba(94, 106, 210, 0.3)',
    },
    
    // Status colors
    status: {
      success: '#10B981',
      successMuted: 'rgba(16, 185, 129, 0.15)',
      warning: '#F59E0B',
      warningMuted: 'rgba(245, 158, 11, 0.15)',
      error: '#EF4444',
      errorMuted: 'rgba(239, 68, 68, 0.15)',
      info: '#3B82F6',
      infoMuted: 'rgba(59, 130, 246, 0.15)',
    },
    
    // Level colors for courses
    level: {
      beginner: { bg: 'rgba(16, 185, 129, 0.1)', text: '#10B981', border: 'rgba(16, 185, 129, 0.2)' },
      intermediate: { bg: 'rgba(59, 130, 246, 0.1)', text: '#3B82F6', border: 'rgba(59, 130, 246, 0.2)' },
      advanced: { bg: 'rgba(139, 92, 246, 0.1)', text: '#8B5CF6', border: 'rgba(139, 92, 246, 0.2)' },
    },
  },
  
  // Shadows
  shadows: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.3)',
    md: '0 4px 16px rgba(0, 0, 0, 0.35)',
    lg: '0 8px 32px rgba(0, 0, 0, 0.4)',
    xl: '0 16px 48px rgba(0, 0, 0, 0.5)',
    glow: {
      accent: '0 0 40px rgba(94, 106, 210, 0.25)',
      success: '0 0 40px rgba(16, 185, 129, 0.25)',
    },
    card: '0 0 0 1px rgba(255,255,255,0.06), 0 2px 20px rgba(0,0,0,0.4)',
    cardHover: '0 0 0 1px rgba(255,255,255,0.1), 0 8px 40px rgba(0,0,0,0.5), 0 0 60px rgba(94,106,210,0.15)',
  },
  
  // Gradients
  gradients: {
    bgMain: 'radial-gradient(ellipse_at_top,#0a0a0f_0%,#050506_50%,#020203_100%)',
    textPrimary: 'linear-gradient(to bottom, white, rgba(255,255,255,0.7))',
    accent: 'linear-gradient(135deg, #5E6AD2, #8B5CF6)',
    shine: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
    cardBg: 'linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
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
    "from-[#5E6AD2]/30 via-purple-500/20 to-transparent",
    "from-emerald-500/30 via-teal-500/20 to-transparent",
    "from-pink-500/30 via-rose-500/20 to-transparent",
    "from-cyan-500/30 via-blue-500/20 to-transparent",
    "from-amber-500/30 via-orange-500/20 to-transparent",
    "from-violet-500/30 via-purple-500/20 to-transparent",
  ],
};

// Level badge styling
export const levelStyles = {
  beginner: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  intermediate: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  advanced: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export default theme;
