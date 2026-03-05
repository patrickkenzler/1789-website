/**
 * CollagePanel
 *
 * CSS-only abstract geometric composition inspired by foreverday.one's
 * collage approach — overlapping shapes, brand colours, structural tension.
 * Used as the sticky left panel in the Approach section.
 *
 * Composition references: organisational systems, nodes, overlapping circles
 * → interconnection, structure, movement.
 */

interface CollagePanelProps {
  /** Visual variant — each evokes a different phase of the Systemshift Cycle */
  variant?: 'analyse' | 'change' | 'responsibility' | 'iterate'
}

export function CollagePanel({ variant = 'analyse' }: CollagePanelProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '100svh',
        backgroundColor: 'var(--color-ink)',
        overflow: 'hidden',
      }}
    >

      {/* ── Shape 1: large terra circle — bottom-right anchor ── */}
      <div
        style={{
          position: 'absolute',
          width: '72%',
          aspectRatio: '1',
          borderRadius: '50%',
          backgroundColor: variant === 'change'       ? 'var(--color-sage)'
                         : variant === 'responsibility' ? 'var(--color-sand)'
                         : variant === 'iterate'        ? 'var(--color-terra)'
                         : 'var(--color-terra)',
          opacity: variant === 'responsibility' ? 0.25 : 0.9,
          bottom: '-18%',
          right: '-18%',
        }}
      />

      {/* ── Shape 2: medium sage/terra rectangle — top-left ── */}
      <div
        style={{
          position: 'absolute',
          width: '48%',
          height: '38%',
          backgroundColor: variant === 'change'       ? 'var(--color-terra)'
                         : variant === 'responsibility' ? 'var(--color-sage)'
                         : variant === 'iterate'        ? 'var(--color-sand)'
                         : 'var(--color-sage)',
          opacity: 0.75,
          top: '-4%',
          left: '-4%',
        }}
      />

      {/* ── Shape 3: large circle outline — centre tension ── */}
      <div
        style={{
          position: 'absolute',
          width: '65%',
          aspectRatio: '1',
          borderRadius: '50%',
          border: '1px solid var(--color-sand)',
          opacity: 0.3,
          top: '22%',
          left: '18%',
        }}
      />

      {/* ── Shape 4: small filled circle — mid-left node ── */}
      <div
        style={{
          position: 'absolute',
          width: '22%',
          aspectRatio: '1',
          borderRadius: '50%',
          backgroundColor: 'var(--color-background)',
          opacity: variant === 'iterate' ? 0.55 : 0.18,
          top: '42%',
          left: '8%',
        }}
      />

      {/* ── Shape 5: thin horizontal line — structural rule ── */}
      <div
        style={{
          position: 'absolute',
          width: '55%',
          height: '1px',
          backgroundColor: 'var(--color-sand)',
          opacity: 0.25,
          top: '62%',
          left: '0',
        }}
      />

      {/* ── Shape 6: small terra accent square ── */}
      <div
        style={{
          position: 'absolute',
          width: '14%',
          aspectRatio: '1',
          backgroundColor: variant === 'analyse'       ? 'var(--color-background)'
                         : variant === 'change'        ? 'var(--color-terra)'
                         : 'var(--color-sage)',
          opacity: 0.6,
          top: '30%',
          right: '12%',
        }}
      />

      {/* ── Label — bottom-left ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(227, 221, 213, 0.35)',
          }}
        >
          Systemshift · 1789
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(227, 221, 213, 0.2)',
          }}
        >
          {variant === 'analyse'        ? '01 / Analyse'
         : variant === 'change'         ? '02 / Change'
         : variant === 'responsibility' ? '03 / Responsibility'
         : '04 / Iterate'}
        </span>
      </div>

    </div>
  )
}
