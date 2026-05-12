/**
 * PhaseGlyph — five abstract geometric primitives, one per Ansatz phase.
 *
 * Drawn with `currentColor` so each glyph inherits the surrounding text
 * colour (set the parent's `color` to the phase's accent). Same geometric
 * vocabulary as the AI-section diamond (circles, squares, arcs) so they
 * read as part of the editorial visual system, not UI icons.
 *
 * Used by both the home AnsatzSection and the /ansatz detail page.
 */

export function GlyphSee() {        /* 01 Sichtbar machen — lens / focus dot */
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden="true">
      <circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.6" />
      <circle cx="20" cy="20" r="3.25" fill="currentColor" />
    </svg>
  )
}

export function GlyphTarget() {     /* 02 Entscheidbar machen — concentric target */
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden="true">
      <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="1.1" strokeOpacity="0.3" />
      <circle cx="20" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.6" />
      <circle cx="20" cy="20" r="3" fill="currentColor" />
    </svg>
  )
}

export function GlyphFrame() {      /* 03 Gestaltbar machen — prototype within frame */
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden="true">
      <rect x="5" y="5" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.55" />
      <rect x="14" y="14" width="12" height="12" fill="currentColor" />
    </svg>
  )
}

export function GlyphLoop() {       /* 04 Erprobbar machen — iteration arc */
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden="true">
      <path d="M 20 6 A 14 14 0 1 1 6 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M 14 4 L 20 6 L 18 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function GlyphHandover() {   /* 05 Unabhängig machen — arrow leaving bracket */
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden="true">
      <path d="M 14 8 L 6 8 L 6 32 L 14 32" fill="none" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.55" />
      <line x1="11" y1="20" x2="34" y2="20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M 28 14 L 34 20 L 28 26" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export type PhaseGlyph =
  | typeof GlyphSee
  | typeof GlyphTarget
  | typeof GlyphFrame
  | typeof GlyphLoop
  | typeof GlyphHandover
