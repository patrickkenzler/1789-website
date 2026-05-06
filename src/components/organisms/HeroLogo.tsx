'use client'

/**
 * HeroLogo — v7: centered editorial layout
 *
 * The GapGraphic SVG animation becomes a full-bleed background.
 * A subtle radial vignette keeps the centered text crisp and readable.
 * Both headline blocks + body copy + CTAs sit on the vertical center-line.
 */

import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { clientLogos } from '@/components/molecules/ClientLogoCarousel'

/** Shorthand for CSS animation shorthand with fill-mode:both */
const a = (
  name:     string,
  duration: string,
  delay:    string,
  easing  = 'var(--ease-entry)',
) => `${name} ${duration} ${easing} ${delay} both`

// ─── Gap Graphic — mountain contour fills ────────────────────────────────────
/**
 * Topographic contour aesthetic: 9 closed filled shapes per side.
 * Shapes stack largest→smallest so overlapping areas accumulate opacity,
 * creating a natural gradient — darkest at the outer edge, lightest near gap.
 */

const TERRA_STAGES: ReadonlyArray<readonly number[]> = [
  [ 80, 180, 240, 180,  80, 160],
  [220,  80,  60, 100, 220,  80],
  [ 60, 100, 160, 220, 240, 180],
  [240, 200, 150,  80,  60, 180],
]
const SAGE_STAGES: ReadonlyArray<readonly number[]> = [
  [490, 380, 360, 400, 500, 420],
  [380, 490, 520, 480, 370, 500],
  [510, 460, 400, 350, 380, 460],
  [370, 350, 400, 460, 510, 390],
]

function terraContour(xs: readonly number[], δ: number): string {
  const [tx, a1, a2, a3, a4, bx] = xs.map(x => Math.max(0, Math.round(x - δ)))
  const m1 = Math.round((a1 + a2) / 2)
  const m2 = Math.round((a2 + a3) / 2)
  const m3 = Math.round((a3 + a4) / 2)
  return `M 0,0 L ${tx},0 Q ${a1},94 ${m1},141 Q ${a2},188 ${m2},235 Q ${a3},282 ${m3},329 Q ${a4},376 ${bx},470 L 0,470 Z`
}

function sageContour(xs: readonly number[], δ: number): string {
  const [tx, a1, a2, a3, a4, bx] = xs.map(x => Math.min(560, Math.round(x + δ)))
  const m1 = Math.round((a1 + a2) / 2)
  const m2 = Math.round((a2 + a3) / 2)
  const m3 = Math.round((a3 + a4) / 2)
  return `M 560,0 L ${tx},0 Q ${a1},94 ${m1},141 Q ${a2},188 ${m2},235 Q ${a3},282 ${m3},329 Q ${a4},376 ${bx},470 L 560,470 Z`
}

const CONTOUR_OFFSETS = [0, 20, 40, 60, 80, 100, 120, 140, 160]
const KEY_TIMES   = '0; 0.25; 0.5; 0.75; 1'
const KEY_SPLINES = '0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1'

function GapGraphic() {
  return (
    <svg
      viewBox="0 0 560 470"
      width="100%"
      height="100%"
      aria-hidden="true"
      style={{ display: 'block' }}
      preserveAspectRatio="xMidYMid slice"
    >
      {CONTOUR_OFFSETS.map((δ, i) => {
        const vals = [...TERRA_STAGES, TERRA_STAGES[0]].map(s => terraContour(s, δ)).join(';')
        return (
          <path key={`t${i}`} fill="var(--color-terra)" fillOpacity="0.28"
            d={terraContour(TERRA_STAGES[0], δ)}>
            <animate attributeName="d" dur="20s" begin="0s" repeatCount="indefinite"
              values={vals} calcMode="spline" keyTimes={KEY_TIMES} keySplines={KEY_SPLINES} />
          </path>
        )
      })}

      {CONTOUR_OFFSETS.map((δ, i) => {
        const vals = [...SAGE_STAGES, SAGE_STAGES[0]].map(s => sageContour(s, δ)).join(';')
        return (
          <path key={`s${i}`} fill="var(--color-sage)" fillOpacity="0.28"
            d={sageContour(SAGE_STAGES[0], δ)}>
            <animate attributeName="d" dur="13s" begin="5s" repeatCount="indefinite"
              values={vals} calcMode="spline" keyTimes={KEY_TIMES} keySplines={KEY_SPLINES} />
          </path>
        )
      })}
    </svg>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function HeroLogo() {
  return (
    <div style={{ flex: '1', position: 'relative', overflow: 'hidden' }}>

      {/* ── Full-bleed animated background ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset:    0,
          zIndex:   0,
        }}
      >
        <GapGraphic />
      </div>

      {/* ── Radial vignette — soft cream clearing at center for readability ── */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          inset:      0,
          zIndex:     1,
          background: 'radial-gradient(ellipse 68% 72% at 50% 52%, rgba(242,242,242,0.78) 0%, rgba(242,242,242,0.18) 65%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Content — two-zone column: centered claim + bottom-pinned logos ── */}
      <div
        style={{
          position:      'relative',
          zIndex:        2,
          height:        '100%',
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'center',
          textAlign:     'center',
          paddingInline: 'var(--grid-margin)',
          animation:     a('fadeUp', '900ms', '80ms', 'var(--ease-expressive)'),
        }}
      >

        {/* ── Zone 1: vertically centered claim block ── */}
        <div
          style={{
            flex:           1,
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            justifyContent: 'center',
            paddingTop:     'clamp(0.5rem, 2svh, 1.5rem)',
            paddingBottom:  'clamp(1rem, 2svh, 2rem)',
          }}
        >

          {/* Eyebrow label */}
          <p
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      'var(--text-xxs)',
              fontWeight:    400,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color:         'var(--color-ink-subtle)',
              marginBottom:  'clamp(1.25rem, 3svh, 2.5rem)',
            }}
          >
            Organizational Strategy • Governance Design • Target Operating Model
          </p>

          {/* Headline — three-line mixed claim */}
          <div
            style={{
              fontFamily:    'var(--font-display)',
              fontWeight:    300,
              fontSize:      'clamp(2.5rem, 7vw, 9rem)',
              lineHeight:    1.02,
              letterSpacing: '-0.03em',
              color:         'var(--color-ink)',
              marginBottom:  'clamp(2rem, 4svh, 4rem)',
            }}
          >
            <p style={{ margin: 0 }}>
              Strategie{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--color-terra)' }}>scheitert an</em>
              {' '}Struktur.
            </p>
            <p style={{ margin: 0 }}>
              Struktur{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--color-terra)' }}>überholt</em>
              {' '}Strategie.
            </p>
            <p style={{ margin: 0 }}>
              Dazwischen{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--color-terra)' }}>entscheidet</em>
              {' '}Organisation.
            </p>
          </div>

          {/* CTAs */}
          <div
            style={{
              display:        'flex',
              gap:            '1rem',
              flexWrap:       'wrap',
              justifyContent: 'center',
              animation:      a('fadeUp', '700ms', '350ms'),
            }}
          >
            <Link href="/ansatz">
              <Button variant="ghost">Unser Ansatz →</Button>
            </Link>
            <Link href="/kontakt">
              <Button variant="terra">Erstgespräch vereinbaren</Button>
            </Link>
          </div>

        </div>{/* end Zone 1 */}

        {/* ── Zone 2: logo strip pinned to bottom edge ── */}
        {/*
          clip-path:inset(0) — geometric clip, does NOT create a compositing
          surface in Chrome (unlike overflow:hidden which clips SVG overflow).
          Height 60px gives 10px clearance above the 26px SVG logos.
        */}
        <div
          style={{
            position:      'relative',
            width:         '100%',
            height:        '60px',
            clipPath:      'inset(0)',
            flexShrink:    0,
            paddingBottom: 'clamp(1.5rem, 3svh, 2.5rem)',
            boxSizing:     'content-box',
          }}
        >
          <div
            style={{
              display:    'flex',
              gap:        '4rem',
              whiteSpace: 'nowrap',
              alignItems: 'center',
              height:     '60px',
              animation:  'marqueeSlide 70s linear infinite',
            }}
          >
            {[...clientLogos, ...clientLogos].map((logo, i) => (
              <span
                key={i}
                aria-label={logo.name}
                title={logo.name}
                style={{
                  display:    'inline-flex',
                  alignItems: 'center',
                  height:     '30px',
                  opacity:    0.32,
                  flexShrink: 0,
                }}
                dangerouslySetInnerHTML={{
                  __html: logo.svg.replace(
                    /<svg /,
                    '<svg height="26" overflow="visible" style="height:26px;width:auto;display:block;overflow:visible;" '
                  ),
                }}
              />
            ))}
          </div>
        </div>{/* end Zone 2 */}

      </div>
    </div>
  )
}
