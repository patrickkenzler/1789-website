import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        surface:    'var(--color-surface)',
        border:     'var(--color-border)',
        ink:        'var(--color-ink)',
        'ink-muted':'var(--color-ink-muted)',
        'ink-subtle':'var(--color-ink-subtle)',
        terra:      'var(--color-terra)',
        'terra-dark':'var(--color-terra-dark)',
        sage:       'var(--color-sage)',
        'sage-dark':'var(--color-sage-dark)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        heading: 'var(--font-heading)',
        body:    'var(--font-body)',
        mono:    'var(--font-mono)',
      },
      fontSize: {
        'display': ['var(--text-xxl)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'h1':      ['var(--text-lg)',  { lineHeight: '1.1',  letterSpacing: '-0.03em' }],
        'h2':      ['var(--text-md)',  { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'h3':      ['var(--text-sm)',  { lineHeight: '1.3'  }],
        'body':    ['var(--text-base)',{ lineHeight: '1.75' }],
        'body-sm': ['var(--text-sub)', { lineHeight: '1.5'  }],
        'label':   ['var(--text-xs)', { lineHeight: '1',    letterSpacing: '0.15em'  }],
        'micro':   ['var(--text-xxs)',{ lineHeight: '1',    letterSpacing: '0.08em'  }],
      },
      transitionTimingFunction: {
        'standard':   'cubic-bezier(0.4, 0, 0.2, 1)',
        'expressive': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'exit':       'cubic-bezier(0.4, 0, 1, 1)',
        'entry':      'cubic-bezier(0.0, 0, 0.2, 1)',
      },
      transitionDuration: {
        'fast':  '150ms',
        'base':  '300ms',
        'slow':  '600ms',
        'enter': '900ms',
      },
      borderRadius: {
        'xs':   '2px',
        'sm':   '4px',
        'md':   '8px',
        'lg':   '16px',
        'xl':   '24px',
      },
      maxWidth: {
        'site': '1440px',
      },
      spacing: {
        '18':  '4.5rem',
        '22':  '5.5rem',
        '30':  '7.5rem',
        '80px': '5rem',
      },
    },
  },
  plugins: [],
}

export default config
