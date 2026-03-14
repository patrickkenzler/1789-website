/**
 * Logo1789
 *
 * SVG trace of the 1789 Consulting wordmark.
 * Heavy condensed numerals with a bottom-right 3-D extrusion in mid-grey,
 * "Consulting" set below in a tight bold sans-serif.
 *
 * Props
 *   height   — rendered height in px (width scales automatically)
 *   showSub  — show the "Consulting" sub-line (default true)
 *   color    — main fill (default "currentColor" so it inherits)
 *   shadow   — extrusion fill (default "#999")
 */

interface Logo1789Props {
  height?:  number
  showSub?: boolean
  color?:   string
  shadow?:  string
}

export function Logo1789({
  height  = 40,
  showSub = true,
  color   = '#0a0a0a',
  shadow  = '#999999',
}: Logo1789Props) {
  // ViewBox: 240 wide × 120 tall (full logo with sub-line)
  //         240 wide × 88  tall (numerals only)
  const viewH  = showSub ? 120 : 88
  const viewBox = `0 0 240 ${viewH}`

  // Derived width to maintain aspect ratio
  const width = Math.round(height * (240 / viewH))

  return (
    <svg
      viewBox={viewBox}
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="1789 Consulting"
      role="img"
      style={{ display: 'block', overflow: 'visible' }}
    >
      {/*
        3-D extrusion layer — drawn first so it sits behind.
        Offset: +5 right, +7 down  (mimics the bottom-right shadow in the brand mark)
      */}
      <text
        x="5"
        y="84"
        fontFamily="Impact, Arial Black, sans-serif"
        fontSize="88"
        fontWeight="900"
        fill={shadow}
        style={{ userSelect: 'none' }}
      >
        1789
      </text>

      {/* Main numeral block */}
      <text
        x="0"
        y="77"
        fontFamily="Impact, Arial Black, sans-serif"
        fontSize="88"
        fontWeight="900"
        fill={color}
        style={{ userSelect: 'none' }}
      >
        1789
      </text>

      {/* Sub-line */}
      {showSub && (
        <text
          x="120"
          y="113"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="19"
          fontWeight="700"
          letterSpacing="1.5"
          textAnchor="middle"
          fill={color}
          style={{ userSelect: 'none' }}
        >
          Consulting
        </text>
      )}
    </svg>
  )
}
