/**
 * Design Tokens — Single Source of Truth
 * Consultancy Website · Design System v1
 * References: Pentagram, Zum Kuckuck, smalltribe, Gumroad, New Now
 */

export const tokens = {
  color: {
    // Base
    background: '#F2EDE6',   // Warmes Off-White — nicht steril
    surface:    '#EBE5DC',   // Cards, leicht abgesetzt
    border:     '#D6CFC6',   // Subtile Trennlinie

    // Text
    ink:        '#1A1714',   // Weiches Tiefschwarz
    inkMuted:   '#6B6560',   // Sekundärtext
    inkSubtle:  '#A39E99',   // Platzhalter, Labels

    // Akzente
    terra:      '#D4522A',   // Terrakotta — warm, mutig
    sage:       '#B8CC8A',   // Dustiges Salbeigrün — verspielt
    teraDark:   '#A33D1A',   // Terra hover
    sageDark:   '#8FA66A',   // Sage hover

    // Neutral
    white:      '#FFFFFF',
    black:      '#0D0B0A',
  },

  typography: {
    // Schriften — werden via @font-face / Google Fonts geladen
    fontDisplay:  '"Canela", "Georgia", serif',          // Display Headlines
    fontHeading:  '"GT Sectra", "Georgia", serif',       // Section Headings
    fontBody:     '"Neue Haas Grotesk", "Inter", sans-serif', // Body
    fontMono:     '"iA Writer Mono", "Courier New", monospace', // Labels, Akzente

    // Scale (rem, base = 16px)
    sizeXxl:   '7.5rem',    // 120px — Hero Display
    sizeXl:    '5rem',      // 80px  — Display
    sizeLg:    '3.5rem',    // 56px  — H1
    sizeMd:    '2.25rem',   // 36px  — H2
    sizeSm:    '1.5rem',    // 24px  — H3
    sizeBase:  '1.125rem',  // 18px  — Body
    sizeSub:   '1rem',      // 16px  — Small Body
    sizeXs:    '0.8125rem', // 13px  — Labels
    sizeXxs:   '0.6875rem', // 11px  — Micro

    // Zeilenabstand
    leadingTight:  '0.95',
    leadingSnug:   '1.1',
    leadingBase:   '1.5',
    leadingLoose:  '1.75',

    // Buchstabenabstand
    trackingTight: '-0.03em',
    trackingBase:  '0',
    trackingWide:  '0.08em',
    trackingXwide: '0.15em',
  },

  spacing: {
    // 4px Base Unit
    '1':  '0.25rem',   //  4px
    '2':  '0.5rem',    //  8px
    '3':  '0.75rem',   // 12px
    '4':  '1rem',      // 16px
    '6':  '1.5rem',    // 24px
    '8':  '2rem',      // 32px
    '12': '3rem',      // 48px
    '16': '4rem',      // 64px
    '24': '6rem',      // 96px
    '32': '8rem',      // 128px
    '48': '12rem',     // 192px
    '64': '16rem',     // 256px
  },

  motion: {
    // Dauer
    durationFast:   '150ms',
    durationBase:   '300ms',
    durationSlow:   '600ms',
    durationEnter:  '900ms',

    // Easing
    easingStandard:    'cubic-bezier(0.4, 0, 0.2, 1)',
    easingExpressive:  'cubic-bezier(0.34, 1.56, 0.64, 1)', // leichter Overshoot
    easingExit:        'cubic-bezier(0.4, 0, 1, 1)',
    easingEntry:       'cubic-bezier(0.0, 0, 0.2, 1)',
  },

  radius: {
    none:   '0',
    xs:     '2px',
    sm:     '4px',
    md:     '8px',
    lg:     '16px',
    xl:     '24px',
    full:   '9999px',
  },

  grid: {
    columns: 12,
    gutter:  '1.5rem',   // 24px
    margin:  '5rem',     // 80px desktop
    marginMd:'2rem',     // 32px tablet
    marginSm:'1.25rem',  // 20px mobile
  },
} as const;

export type Tokens = typeof tokens;
