'use client'

/**
 * ClientLogoCarousel
 *
 * A slow, subtle infinite marquee of client logos — black, transparent bg.
 * Sits between "Dafür stehen wir" and "Shift Cases" as a trust signal.
 *
 * Animation: 80 s linear infinite (–50 % translate = first-copy width).
 * Logos are greyscale/black with reduced opacity for an editorial feel.
 */

// ─── SVG logos ────────────────────────────────────────────────────────────────

export const clientLogos: { name: string; svg: string }[] = [
  {
    // Circle icon + stacked wordmark — viewBox wide enough for both
    name: 'Procter & Gamble',
    svg: `<svg viewBox="0 0 96 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="26" cy="26" r="23" stroke="black" stroke-width="2"/>
      <text x="26" y="33" font-family="Georgia,serif" font-size="18" font-weight="400" text-anchor="middle" fill="black">P&amp;G</text>
      <text x="58" y="21" font-family="Arial,sans-serif" font-size="7.5" font-weight="600" letter-spacing="0.5" fill="black">PROCTER</text>
      <text x="58" y="32" font-family="Arial,sans-serif" font-size="7.5" font-weight="600" letter-spacing="0.5" fill="black">&amp;</text>
      <text x="58" y="43" font-family="Arial,sans-serif" font-size="7.5" font-weight="600" letter-spacing="0.5" fill="black">GAMBLE</text>
    </svg>`,
  },
  {
    // Serif wordmark — generous viewBox width; 2px left inset prevents edge bleed
    name: 'Schwäbisch Hall',
    svg: `<svg viewBox="0 0 260 48" xmlns="http://www.w3.org/2000/svg">
      <text x="2" y="35" font-family="Georgia,serif" font-size="26" font-weight="400" fill="black">Schwäbisch Hall</text>
    </svg>`,
  },
  {
    name: 'Deutsche Bank',
    svg: `<svg fill="black" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3.375 3.375v17.25h17.25V3.375H3.375zM0 0h24v24H0V0zm5.25 18.225 9.15-12.45h4.35L9.6 18.225H5.25z"/></svg>`,
  },
  {
    name: 'Commerzbank',
    svg: `<svg fill="black" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.277 1.538a.018.018 0 0 0-.012.007l-4.74 8.21-1.398 2.418c.446.774.794 1.353 1.22 2.09.671 1.164 1.548 1.597 3.13 1.889a12.9 12.9 0 0 1 .697-1.392l2.783-4.824 2.786-4.826c.404-.702 1.296-2.143 2.57-2.965-.04.025-.07.059-.109.085.07-.047.137-.094.209-.136.46-.278.98-.467 1.413-.515.339-.038 1.465-.041 2.74-.041zm11.59.505c-1.048-.008-1.462.007-2.545.008-1.39 0-2.381.887-3.083 1.773.372.493.68.971.863 1.288a13357.605 13357.605 0 0 0 5.571 9.648c.404.7 1.209 2.196 1.284 3.71.029.574-.079 1.165-.265 1.592-.131.3-.652 1.207-1.256 2.253L24 12.678v-.008a.013.013 0 0 0-.002-.005zM.001 8.163l.095 4.946L0 8.163zm.093 4.946 1.132 1.964 4.264 7.384a.015.015 0 0 0 .012.005h12.265c.446-.779.664-1.147 1.311-2.282.709-1.242.278-2.681-.037-3.472-.618.076-1.18.093-1.547.093H6.35c-.809 0-2.505-.05-3.853-.741-.513-.263-.972-.65-1.248-1.027-.176-.238-.625-1.003-1.156-1.924z"/></svg>`,
  },
  {
    // Two-line stacked: small-caps label + serif name; extra right margin for ascenders
    name: 'Stadt Freiburg',
    svg: `<svg viewBox="0 0 170 48" xmlns="http://www.w3.org/2000/svg">
      <text x="2" y="17" font-family="Arial,sans-serif" font-size="9" font-weight="600" letter-spacing="1.5" fill="black">STADT</text>
      <text x="2" y="44" font-family="Georgia,serif" font-size="28" font-weight="400" fill="black">Freiburg</text>
    </svg>`,
  },
  {
    // Bold mono — centered with breathing room top/bottom
    name: 'WTS',
    svg: `<svg viewBox="0 0 80 52" xmlns="http://www.w3.org/2000/svg">
      <text x="40" y="40" font-family="Arial,sans-serif" font-size="36" font-weight="700" letter-spacing="-1" text-anchor="middle" fill="black">WTS</text>
    </svg>`,
  },
  {
    // Bold + light split wordmark — widened viewBox covers both words
    name: 'Metro Digital',
    svg: `<svg viewBox="0 0 240 48" xmlns="http://www.w3.org/2000/svg">
      <text x="2" y="36" font-family="Arial,sans-serif" font-size="30" font-weight="800" letter-spacing="-0.5" fill="black">METRO</text>
      <text x="114" y="36" font-family="Arial,sans-serif" font-size="30" font-weight="300" fill="black">digital</text>
    </svg>`,
  },
  {
    // Long word — viewBox extended to 260 prevents right-side crop
    name: 'Gelsenwasser',
    svg: `<svg viewBox="0 0 260 48" xmlns="http://www.w3.org/2000/svg">
      <text x="2" y="36" font-family="Arial,sans-serif" font-size="26" font-weight="400" fill="black">Gelsenwasser</text>
    </svg>`,
  },
  {
    // Large mark + dot — extra width/height so nothing clips
    name: 'PwC',
    svg: `<svg viewBox="0 0 76 52" xmlns="http://www.w3.org/2000/svg">
      <text x="2" y="42" font-family="Arial,sans-serif" font-size="38" font-weight="700" fill="black">PwC</text>
      <rect x="70" y="5" width="5" height="5" fill="black"/>
    </svg>`,
  },
  {
    // Circle mark + stacked text — extra height for stroke, wide enough for full label
    name: 'Mercedes-Benz Group',
    svg: `<svg viewBox="0 0 186 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="26" cy="26" r="23" stroke="black" stroke-width="2"/>
      <path d="M26 5 L29.5 22 L44 31 L26 25 L8 31 L22.5 22 Z" fill="black"/>
      <text x="56" y="21" font-family="Arial,sans-serif" font-size="9" font-weight="600" letter-spacing="1" fill="black">MERCEDES-BENZ</text>
      <text x="56" y="36" font-family="Arial,sans-serif" font-size="9" font-weight="400" letter-spacing="1" fill="black">GROUP</text>
    </svg>`,
  },
  {
    // Pill outline — 2px inset so stroke doesn't get clipped by viewBox edge
    name: 'WD-40',
    svg: `<svg viewBox="0 0 92 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="88" height="48" rx="24" stroke="black" stroke-width="2"/>
      <text x="46" y="33" font-family="Arial,sans-serif" font-size="22" font-weight="800" text-anchor="middle" letter-spacing="-0.5" fill="black">WD-40</text>
    </svg>`,
  },
  {
    // Italic serif — extra height for descenders, wide enough for glyph
    name: 'greyt',
    svg: `<svg viewBox="0 0 88 52" xmlns="http://www.w3.org/2000/svg">
      <text x="44" y="39" font-family="Georgia,serif" font-size="32" font-weight="400" font-style="italic" text-anchor="middle" fill="black">greyt</text>
    </svg>`,
  },
  {
    // Light tracked word — wider viewBox covers tracking overhang
    name: 'teccle group',
    svg: `<svg viewBox="0 0 210 48" xmlns="http://www.w3.org/2000/svg">
      <text x="2" y="34" font-family="Arial,sans-serif" font-size="24" font-weight="300" letter-spacing="0.5" fill="black">teccle group</text>
    </svg>`,
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

export function ClientLogoCarousel() {
  // Duplicate for seamless loop
  const items = [...clientLogos, ...clientLogos]

  return (
    <div
      style={{
        /*
         * overflow-x: clip  — hides the scrolling strip beyond left/right edges
         *                      without creating a scroll container (unlike hidden).
         * overflow-y: visible — lets SVG descenders / stroke halves breathe
         *                       vertically without being cut off.
         * Note: setting one overflow axis to clip/hidden forces the other to auto
         * in old spec, but clip is exempt — modern browsers respect both independently.
         */
        overflowX:       'clip',
        overflowY:       'visible',
        borderTop:       '1px solid var(--color-border)',
        borderBottom:    '1px solid var(--color-border)',
        paddingBlock:    '2rem',
        backgroundColor: 'var(--color-background)',
        /* Soft left/right fade so logos dissolve rather than hard-clip */
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        maskImage:       'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
      }}
    >
      {/* Label */}
      <div
        style={{
          paddingInline: 'var(--grid-margin)',
          marginBottom:  '1.75rem',
          display:       'flex',
          alignItems:    'center',
          gap:           '1rem',
        }}
      >
        <span
          style={{
            fontFamily:    'var(--font-body)',
            fontSize:      'var(--text-xxs)',
            fontWeight:    500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color:         'var(--color-ink-subtle)',
            whiteSpace:    'nowrap',
          }}
        >
          Kunden &amp; Partner
        </span>
        <span style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)', opacity: 0.35 }} />
      </div>

      {/* Scrolling strip */}
      <div
        style={{
          display:   'flex',
          gap:       '5rem',
          whiteSpace:'nowrap',
          animation: 'marqueeSlide 80s linear infinite',
          alignItems:'center',
        }}
      >
        {items.map((logo, i) => (
          <span
            key={i}
            aria-label={logo.name}
            title={logo.name}
            style={{
              display:       'inline-flex',
              alignItems:    'center',
              height:        '52px',
              opacity:       0.45,
              flexShrink:    0,
              transition:    'opacity 300ms',
              paddingInline: '0.5rem',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.45')}
            dangerouslySetInnerHTML={{ __html: logo.svg.replace(/<svg /, '<svg height="52" overflow="visible" style="height:52px;width:auto;display:block;overflow:visible;" ') }}
          />
        ))}
      </div>
    </div>
  )
}
