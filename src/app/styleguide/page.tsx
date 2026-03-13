export const metadata = { title: '1789 — Styleguide' }

// ─── Data ────────────────────────────────────────────────────────────────────

const colors = [
  {
    group: 'Akzent',
    tokens: [
      { name: 'Terra',      variable: '--color-terra',      hex: '#F44D0B' },
      { name: 'Terra Dark', variable: '--color-terra-dark', hex: '#C13A06' },
      { name: 'Sage',       variable: '--color-sage',       hex: '#B8CC8A' },
      { name: 'Sage Dark',  variable: '--color-sage-dark',  hex: '#8FA66A' },
    ],
  },
  {
    group: 'Hintergrund',
    tokens: [
      { name: 'Background', variable: '--color-background', hex: '#F2F2F2' },
      { name: 'Surface',    variable: '--color-surface',    hex: '#E8E8E8' },
      { name: 'Sand',       variable: '--color-sand',       hex: '#E3DDD5' },
    ],
  },
  {
    group: 'Text',
    tokens: [
      { name: 'Ink',        variable: '--color-ink',        hex: '#1A1714' },
      { name: 'Ink Muted',  variable: '--color-ink-muted',  hex: '#6B6560' },
      { name: 'Ink Subtle', variable: '--color-ink-subtle', hex: '#A39E99' },
    ],
  },
  {
    group: 'Grenze & Basis',
    tokens: [
      { name: 'Border',     variable: '--color-border',     hex: '#2E2B28' },
      { name: 'White',      variable: '--color-white',      hex: '#FFFFFF' },
      { name: 'Black',      variable: '--color-black',      hex: '#0D0B0A' },
    ],
  },
]

const typeScale = [
  { token: '--text-xxl', rem: '7.5rem',    px: '120px', role: 'Display / Hero' },
  { token: '--text-xl',  rem: '5rem',      px: '80px',  role: 'Section Title' },
  { token: '--text-lg',  rem: '3.5rem',    px: '56px',  role: 'Large Heading' },
  { token: '--text-md',  rem: '3rem',      px: '48px',  role: 'Heading' },
  { token: '--text-sm',  rem: '2rem',      px: '32px',  role: 'Subheading' },
  { token: '--text-base',rem: '1.25rem',   px: '20px',  role: 'Body' },
  { token: '--text-sub', rem: '1.0625rem', px: '17px',  role: 'Body Small' },
  { token: '--text-xs',  rem: '0.8125rem', px: '13px',  role: 'Caption' },
  { token: '--text-xxs', rem: '0.6875rem', px: '11px',  role: 'Label / Mono' },
]

const typefaces = [
  {
    name: 'Cormorant',
    variable: '--font-display / --font-heading',
    style: { fontFamily: 'var(--font-display)', fontWeight: 300 },
    specimen: 'Wandel braucht System.',
    role: 'Display, Überschriften, Zitate',
  },
  {
    name: 'Inter',
    variable: '--font-body',
    style: { fontFamily: 'var(--font-body)', fontWeight: 400 },
    specimen: 'Wir machen Organisationen zukunftsfähig.',
    role: 'Fließtext, Interface',
  },
  {
    name: 'Courier New',
    variable: '--font-mono',
    style: { fontFamily: 'var(--font-mono)', fontWeight: 400 },
    specimen: 'STRUCTURE · STRATEGY · GAP',
    role: 'Labels, Tags, Mono',
  },
]

const spacing = [
  { token: '--space-1',  rem: '0.25rem',  px: '4px'   },
  { token: '--space-2',  rem: '0.5rem',   px: '8px'   },
  { token: '--space-3',  rem: '0.75rem',  px: '12px'  },
  { token: '--space-4',  rem: '1rem',     px: '16px'  },
  { token: '--space-6',  rem: '1.5rem',   px: '24px'  },
  { token: '--space-8',  rem: '2rem',     px: '32px'  },
  { token: '--space-12', rem: '3rem',     px: '48px'  },
  { token: '--space-16', rem: '4rem',     px: '64px'  },
  { token: '--space-24', rem: '6rem',     px: '96px'  },
  { token: '--space-32', rem: '8rem',     px: '128px' },
  { token: '--space-48', rem: '12rem',    px: '192px' },
  { token: '--space-64', rem: '16rem',    px: '256px' },
]

const radii = [
  { token: '--radius-xs',   px: '2px',    label: 'XS' },
  { token: '--radius-sm',   px: '4px',    label: 'SM' },
  { token: '--radius-md',   px: '8px',    label: 'MD' },
  { token: '--radius-lg',   px: '16px',   label: 'LG' },
  { token: '--radius-xl',   px: '24px',   label: 'XL' },
  { token: '--radius-full', px: '9999px', label: 'Full' },
]

const motion = [
  { category: 'Dauer',     tokens: [
    { token: '--duration-fast',  value: '150ms' },
    { token: '--duration-base',  value: '300ms' },
    { token: '--duration-slow',  value: '600ms' },
    { token: '--duration-enter', value: '900ms' },
  ]},
  { category: 'Easing',    tokens: [
    { token: '--ease-standard',   value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    { token: '--ease-expressive', value: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
    { token: '--ease-exit',       value: 'cubic-bezier(0.4, 0, 1, 1)' },
    { token: '--ease-entry',      value: 'cubic-bezier(0.0, 0, 0.2, 1)' },
  ]},
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isDark(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 < 128
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ paddingBlock: '4rem', borderTop: '1px solid #2E2B28' }}>
      <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6B6560', marginBottom: '2rem' }}>
        {title}
      </p>
      {children}
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StyleguidePage() {
  return (
    <div style={{ backgroundColor: '#F2F2F2', minHeight: '100vh', color: '#1A1714' }}>

      {/* ── Sticky nav ── */}
      <nav style={{
        position:        'sticky',
        top:             0,
        zIndex:          50,
        backgroundColor: 'rgba(242,242,242,0.92)',
        backdropFilter:  'blur(12px)',
        borderBottom:    '1px solid #E8E8E8',
        display:         'flex',
        alignItems:      'center',
        gap:             '2rem',
        paddingInline:   '3rem',
        paddingBlock:    '1rem',
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 300, marginRight: '1rem' }}>
          1789 Styleguide
        </span>
        {['Farben', 'Typografie', 'Abstände', 'Radius', 'Motion'].map(label => (
          <a key={label} href={`#${label.toLowerCase()}`}
            style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B6560', textDecoration: 'none' }}>
            {label}
          </a>
        ))}
      </nav>

      <div style={{ maxWidth: '1200px', marginInline: 'auto', paddingInline: '3rem', paddingBottom: '6rem' }}>

        {/* ── Hero ── */}
        <div style={{ paddingBlock: '5rem 3rem' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '5rem', fontWeight: 300, lineHeight: 0.9, letterSpacing: '-0.03em' }}>
            Design<br /><em style={{ color: '#F44D0B' }}>Tokens</em>
          </h1>
          <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B6560', marginTop: '1.5rem' }}>
            1789 Management Consulting — Stand {new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* ════════════════════════════════════════════════════════════
            1. FARBEN
        ════════════════════════════════════════════════════════════ */}
        <Section title="01 — Farben" id="farben">
          {colors.map(group => (
            <div key={group.group} style={{ marginBottom: '2.5rem' }}>
              <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.625rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A39E99', marginBottom: '0.75rem' }}>
                {group.group}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1px', backgroundColor: '#2E2B28', borderRadius: '8px', overflow: 'hidden' }}>
                {group.tokens.map(t => {
                  const dark = isDark(t.hex)
                  return (
                    <div key={t.hex} style={{ backgroundColor: t.hex, padding: '1.5rem 1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '140px' }}>
                      <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6875rem', letterSpacing: '0.08em', color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.35)', textTransform: 'uppercase' }}>
                        {t.variable}
                      </span>
                      <div>
                        <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 300, color: dark ? '#FFFFFF' : '#1A1714', marginBottom: '0.2rem' }}>
                          {t.name}
                        </p>
                        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.8125rem', letterSpacing: '0.04em', color: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)' }}>
                          {t.hex}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

          {/* Opacity variants */}
          <div style={{ marginTop: '1rem' }}>
            <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.625rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A39E99', marginBottom: '0.75rem' }}>
              Transparenz-Varianten (rgba)
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {[
                { base: '#FFFFFF', label: 'White', opacities: [0.06, 0.08, 0.25, 0.35, 0.5, 0.65, 0.8] },
                { base: '#1A1714', label: 'Ink',   opacities: [0.06, 0.12, 0.25, 0.4, 0.55, 0.7, 0.85] },
              ].map(({ base, label, opacities }) => (
                <div key={label}>
                  <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.625rem', color: '#A39E99', marginBottom: '0.5rem' }}>{label} alpha</p>
                  <div style={{ display: 'flex', borderRadius: '4px', overflow: 'hidden', border: '1px solid #E8E8E8' }}>
                    {opacities.map(a => (
                      <div key={a} title={`${label} ${Math.round(a * 100)}%`}
                        style={{ flex: 1, height: '48px', backgroundColor: base, opacity: a }} />
                    ))}
                  </div>
                  <div style={{ display: 'flex' }}>
                    {opacities.map(a => (
                      <div key={a} style={{ flex: 1, textAlign: 'center', fontFamily: 'Courier New, monospace', fontSize: '0.5rem', color: '#A39E99', paddingTop: '0.3rem' }}>
                        {Math.round(a * 100)}%
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ════════════════════════════════════════════════════════════
            2. TYPOGRAFIE
        ════════════════════════════════════════════════════════════ */}
        <Section title="02 — Typografie" id="typografie">

          {/* Typefaces */}
          <div style={{ marginBottom: '3rem' }}>
            <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.625rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A39E99', marginBottom: '1rem' }}>
              Schriften
            </p>
            <div style={{ display: 'grid', gap: '1px', backgroundColor: '#E8E8E8' }}>
              {typefaces.map(tf => (
                <div key={tf.name} style={{ backgroundColor: '#F2F2F2', padding: '2rem', display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', gap: '2rem' }}>
                  <div>
                    <p style={{ ...tf.style, fontSize: '2.5rem', lineHeight: 1, marginBottom: '0.75rem' }}>
                      {tf.specimen}
                    </p>
                    <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6875rem', color: '#A39E99' }}>
                      {tf.name}  ·  {tf.role}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.625rem', color: '#A39E99', letterSpacing: '0.08em' }}>
                      {tf.variable}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Type scale */}
          <div>
            <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.625rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A39E99', marginBottom: '1rem' }}>
              Schriftgrössen
            </p>
            <div style={{ display: 'grid', gap: '1px', backgroundColor: '#E8E8E8' }}>
              {typeScale.map(t => (
                <div key={t.token} style={{ backgroundColor: '#F2F2F2', padding: '1.25rem 1.5rem', display: 'grid', gridTemplateColumns: '140px 60px 60px 1fr', alignItems: 'center', gap: '1.5rem' }}>
                  <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6875rem', color: '#A39E99' }}>{t.token}</span>
                  <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6875rem', color: '#6B6560' }}>{t.rem}</span>
                  <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6875rem', color: '#6B6560' }}>{t.px}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: t.rem, fontWeight: 300, lineHeight: 1, overflow: 'hidden', whiteSpace: 'nowrap', color: '#1A1714' }}>
                    {t.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Line height & tracking */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
            <div>
              <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.625rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A39E99', marginBottom: '1rem' }}>
                Zeilenhöhe
              </p>
              {[
                { token: '--leading-tight', value: '0.82',  label: 'Tight' },
                { token: '--leading-snug',  value: '1.05',  label: 'Snug' },
                { token: '--leading-base',  value: '1.6',   label: 'Base' },
                { token: '--leading-loose', value: '1.8',   label: 'Loose' },
              ].map(l => (
                <div key={l.token} style={{ display: 'flex', justifyContent: 'space-between', paddingBlock: '0.6rem', borderBottom: '1px solid #E8E8E8' }}>
                  <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6875rem', color: '#A39E99' }}>{l.token}</span>
                  <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6875rem', color: '#1A1714' }}>{l.value}</span>
                </div>
              ))}
            </div>
            <div>
              <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.625rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A39E99', marginBottom: '1rem' }}>
                Letter Spacing
              </p>
              {[
                { token: '--tracking-tight',  value: '-0.03em', label: 'Tight' },
                { token: '--tracking-base',   value: '0em',     label: 'Base' },
                { token: '--tracking-wide',   value: '0.08em',  label: 'Wide' },
                { token: '--tracking-xwide',  value: '0.15em',  label: 'X-Wide' },
              ].map(t => (
                <div key={t.token} style={{ display: 'flex', justifyContent: 'space-between', paddingBlock: '0.6rem', borderBottom: '1px solid #E8E8E8' }}>
                  <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6875rem', color: '#A39E99' }}>{t.token}</span>
                  <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6875rem', color: '#1A1714' }}>{t.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ════════════════════════════════════════════════════════════
            3. ABSTÄNDE
        ════════════════════════════════════════════════════════════ */}
        <Section title="03 — Abstände" id="abstände">
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {spacing.map(s => (
              <div key={s.token} style={{ display: 'grid', gridTemplateColumns: '140px 60px 60px 1fr', alignItems: 'center', gap: '1.5rem', paddingBlock: '0.4rem' }}>
                <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6875rem', color: '#A39E99' }}>{s.token}</span>
                <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6875rem', color: '#6B6560' }}>{s.rem}</span>
                <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6875rem', color: '#6B6560' }}>{s.px}</span>
                <div style={{ height: '8px', backgroundColor: '#F44D0B', width: s.px, maxWidth: '100%', borderRadius: '2px' }} />
              </div>
            ))}
          </div>

          {/* Grid */}
          <div style={{ marginTop: '2.5rem' }}>
            <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.625rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A39E99', marginBottom: '1rem' }}>
              Grid-System
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              {[
                { label: 'Spalten',  value: '12' },
                { label: 'Gutter',  value: '24px (1.5rem)' },
                { label: 'Margin',  value: '80px Desktop · 32px Tablet · 20px Mobile' },
              ].map(g => (
                <div key={g.label} style={{ padding: '1.25rem', backgroundColor: '#E8E8E8', borderRadius: '8px' }}>
                  <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.625rem', color: '#A39E99', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{g.label}</p>
                  <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.8125rem', color: '#1A1714' }}>{g.value}</p>
                </div>
              ))}
            </div>
            {/* Grid preview */}
            <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '8px' }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} style={{ height: '32px', backgroundColor: 'rgba(244,77,11,0.12)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.5rem', color: '#F44D0B' }}>{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ════════════════════════════════════════════════════════════
            4. RADIUS
        ════════════════════════════════════════════════════════════ */}
        <Section title="04 — Border Radius" id="radius">
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            {radii.map(r => {
              const size = Math.min(parseInt(r.px) || 80, 80)
              const boxSize = Math.max(60 + size, 60)
              return (
                <div key={r.token} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: `${boxSize}px`,
                    height: `${boxSize}px`,
                    borderRadius: r.px,
                    backgroundColor: '#E8E8E8',
                    border: '2px solid #2E2B28',
                    marginBottom: '0.75rem',
                  }} />
                  <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6875rem', color: '#1A1714', marginBottom: '0.2rem' }}>{r.label}</p>
                  <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#A39E99' }}>{r.px}</p>
                  <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.55rem', color: '#A39E99', marginTop: '0.1rem' }}>{r.token}</p>
                </div>
              )
            })}
          </div>
        </Section>

        {/* ════════════════════════════════════════════════════════════
            5. MOTION
        ════════════════════════════════════════════════════════════ */}
        <Section title="05 — Motion" id="motion">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {motion.map(cat => (
              <div key={cat.category}>
                <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.625rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A39E99', marginBottom: '0.75rem' }}>
                  {cat.category}
                </p>
                <div style={{ display: 'grid', gap: '1px', backgroundColor: '#E8E8E8' }}>
                  {cat.tokens.map(t => (
                    <div key={t.token} style={{ backgroundColor: '#F2F2F2', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                      <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6875rem', color: '#A39E99' }}>{t.token}</span>
                      <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6875rem', color: '#1A1714', textAlign: 'right' }}>{t.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ════════════════════════════════════════════════════════════
            Footer
        ════════════════════════════════════════════════════════════ */}
        <div style={{ paddingTop: '3rem', borderTop: '1px solid #E8E8E8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 300 }}>1789 Management Consulting</span>
          <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6875rem', color: '#A39E99' }}>Design Tokens v1.0</span>
        </div>

      </div>
    </div>
  )
}
