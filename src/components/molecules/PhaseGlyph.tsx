/**
 * PhaseGlyph — five custom-designed marks, one per Ansatz phase.
 *
 * Drawn with `currentColor` so each glyph inherits the surrounding text
 * colour (set the parent's `color` to the phase's accent).
 *
 * viewBoxes are padded to square so every glyph occupies the same visual
 * box even though the natural artwork has different aspect ratios. The
 * artwork itself is unchanged from the supplied SVG source.
 *
 * Used by both the home AnsatzSection and the /ansatz detail page.
 */

const svgProps = {
  width:               '100%',
  height:              '100%',
  fill:                'none',
  preserveAspectRatio: 'xMidYMid meet' as const,
  style:               { display: 'block' as const },
  'aria-hidden':       true,
}

/* 01 Sichtbar machen — three nested rings opening to the right
   Source viewBox 0 0 69 134, padded horizontally to a 134×134 square. */
export function GlyphSee() {
  return (
    <svg viewBox="-32.5 0 134 134" {...svgProps}>
      <path d="M65.6115 2.73609C30.8102 3.46299 2.72247 32.0108 2.72247 67C2.72247 101.989 30.8102 130.537 65.6115 131.261V92.5558C52.1462 91.8425 41.4088 80.6532 41.4088 67C41.4088 53.3468 52.1462 42.1547 65.6115 41.4442V2.73609ZM68.334 134H66.9728C30.0452 134 0 103.944 0 67C0 30.0561 30.0452 0 66.9728 0H68.334V44.1312H66.9728C54.3786 44.1312 44.1312 54.3895 44.1312 67C44.1312 79.6105 54.3786 89.8688 66.9728 89.8688H68.334V134Z" fill="currentColor" />
      <path d="M65.6109 20.4642C40.5832 21.1884 20.4451 41.7838 20.4451 66.9994C20.4451 92.2122 40.5832 112.81 65.6109 113.535V92.5525C52.1456 91.8419 41.4081 80.6526 41.4081 66.9994C41.4081 53.3462 52.1456 42.1541 65.6109 41.4435V20.4642ZM68.3334 116.276H66.9721C39.8155 116.276 17.7227 94.1696 17.7227 66.9994C17.7227 39.8264 39.8155 17.7227 66.9721 17.7227H68.3334V44.1306H66.9721C54.378 44.1306 44.1306 54.3889 44.1306 66.9994C44.1306 79.6099 54.378 89.8681 66.9721 89.8681H68.3334V116.276Z" fill="currentColor" />
      <path d="M65.6109 35.2036C48.707 35.9196 35.1736 49.9077 35.1736 66.9993C35.1736 84.0937 48.707 98.0818 65.6109 98.7951V92.5552C52.1455 91.8446 41.4081 80.6525 41.4081 66.9993C41.4081 53.3461 52.1455 42.1568 65.6109 41.4435V35.2036ZM68.3333 101.547H66.9721C47.9366 101.547 32.4512 86.0484 32.4512 66.9993C32.4512 47.9502 47.9366 32.4512 66.9721 32.4512H68.3333V44.1306H66.9721C54.3779 44.1306 44.1306 54.3888 44.1306 66.9993C44.1306 79.6098 54.3779 89.8681 66.9721 89.8681H68.3333V101.547Z" fill="currentColor" />
    </svg>
  )
}

/* 02 Entscheidbar machen — open frame holding a solid dot
   Source viewBox 0 0 105 135, padded to 135×135. */
export function GlyphTarget() {
  return (
    <svg viewBox="-15 0 135 135" {...svgProps}>
      <path d="M65.7575 2.74104C30.8769 3.46925 2.7274 32.0551 2.7274 67.0912C2.7274 102.144 30.8769 130.746 65.7575 131.471V116.441C39.1654 115.715 17.7553 93.8579 17.7553 67.0912C17.7553 40.3273 39.1654 18.4699 65.7575 17.7444V2.74104ZM68.4849 134.215H67.1212C30.1105 134.215 0 104.105 0 67.0912C0 30.0968 30.1105 0 67.1212 0H68.4849V20.4555H67.1212C41.4046 20.4555 20.4827 41.3773 20.4827 67.0912C20.4827 92.8078 41.4046 113.73 67.1212 113.73H68.4849V134.215Z" fill="currentColor" />
      <path d="M104.924 68.9539C104.924 88.8094 87.9949 104.909 67.1139 104.909C46.2357 104.909 29.3095 88.8094 29.3095 68.9539C29.3095 49.093 46.2357 32.9959 67.1139 32.9959C87.9949 32.9959 104.924 49.093 104.924 68.9539Z" fill="currentColor" />
    </svg>
  )
}

/* 03 Gestaltbar machen — sphere ruled with latitude lines
   Source viewBox 0 0 131 131, already square. */
export function GlyphFrame() {
  return (
    <svg viewBox="0 0 131 131" {...svgProps}>
      <path d="M65.274 3.10563C30.9941 3.10563 3.10563 30.9941 3.10563 65.274C3.10563 99.5539 30.9941 127.442 65.274 127.442C99.5539 127.442 127.442 99.5539 127.442 65.274C127.442 30.9941 99.5539 3.10563 65.274 3.10563ZM65.274 130.548C29.2829 130.548 0 101.265 0 65.274C0 29.2829 29.2829 0 65.274 0C101.265 0 130.548 29.2829 130.548 65.274C130.548 101.265 101.265 130.548 65.274 130.548Z" fill="currentColor" />
      <path d="M53.6141 1.09375H76.9062V4.19938H53.6141V1.09375Z" fill="currentColor" />
      <path d="M24.2308 15.0068H106.312V18.1125H24.2308V15.0068Z" fill="currentColor" />
      <path d="M11.9353 28.9199H118.645V32.0255H11.9353V28.9199Z" fill="currentColor" />
      <path d="M5.06963 42.8633H125.475V45.9689H5.06963V42.8633Z" fill="currentColor" />
      <path d="M1.96579 56.7783H128.582V59.8839H1.96579V56.7783Z" fill="currentColor" />
      <path d="M1.96579 70.6895H128.582V73.7951H1.96579V70.6895Z" fill="currentColor" />
      <path d="M5.1007 84.6045H125.475V87.7101H5.1007V84.6045Z" fill="currentColor" />
      <path d="M11.9042 98.5176H118.645V101.623H11.9042V98.5176Z" fill="currentColor" />
      <path d="M24.2637 112.431H106.283V115.536H24.2637V112.431Z" fill="currentColor" />
      <path d="M53.6141 126.344H76.9062V129.449H53.6141V126.344Z" fill="currentColor" />
    </svg>
  )
}

/* 04 Erprobbar machen — vessel / column structure under test
   Source viewBox 0 0 92 136, padded to 136×136. */
export function GlyphLoop() {
  return (
    <svg viewBox="-22 0 136 136" {...svgProps}>
      <path d="M45.8981 2.86616C19.2456 2.86616 2.87984 8.20296 2.87984 12.0264C2.87984 15.8528 19.2456 21.1896 45.8981 21.1896C72.5506 21.1896 88.9164 15.8528 88.9164 12.0264C88.9164 8.20296 72.5506 2.86616 45.8981 2.86616ZM45.8981 24.0557C23.0949 24.0557 0.0136719 19.9227 0.0136719 12.0264C0.0136719 4.13014 23.0949 0 45.8981 0C68.7013 0 91.7825 4.13014 91.7825 12.0264C91.7825 19.9227 68.7013 24.0557 45.8981 24.0557Z" fill="currentColor" />
      <path d="M45.8873 135.682C23.0841 135.682 0 131.549 0 123.645H2.86616C2.86616 127.474 19.2348 132.816 45.8873 132.816C72.5426 132.816 88.9084 127.474 88.9084 123.645H91.7746C91.7746 131.549 68.6905 135.682 45.8873 135.682Z" fill="currentColor" />
      <path d="M88.9151 12.0264H91.7812V123.655H88.9151V12.0264Z" fill="currentColor" />
      <path d="M71.4131 20.4521H74.2793V131.791H71.4131V20.4521Z" fill="currentColor" />
      <path d="M53.9053 22.9756H56.7715V133.481H53.9053V22.9756Z" fill="currentColor" />
      <path d="M36.4034 22.9756H39.2695V133.481H36.4034V22.9756Z" fill="currentColor" />
      <path d="M18.8975 20.7393H21.7637V131.508H18.8975V20.7393Z" fill="currentColor" />
      <path d="M0.0107889 12.0264H2.87695V123.655H0.0107889V12.0264Z" fill="currentColor" />
    </svg>
  )
}

/* 05 Unabhängig machen — radiating four-pointed star + smaller sparkle
   Source viewBox 0 0 158 161, padded to 161×161. */
export function GlyphHandover() {
  return (
    <svg viewBox="-1.5 0 161 161" {...svgProps}>
      <path d="M66.0417 0C57.5695 35.0206 38.2214 59.5911 -0.000538032 66.0423C33.3709 77.9475 56.3946 99.058 66.0417 132.085C77.2625 101.16 99.3701 79.2195 132.084 66.0423C103.019 58.4216 81.4663 35.4625 66.0417 0Z" fill="currentColor" />
      <path d="M124.532 93.8545C120.236 111.602 110.433 124.052 91.0631 127.323C107.975 133.354 119.643 144.052 124.532 160.786C130.217 145.114 141.422 134 158 127.323C143.271 123.459 132.346 111.823 124.532 93.8545Z" fill="currentColor" />
    </svg>
  )
}

export type PhaseGlyph =
  | typeof GlyphSee
  | typeof GlyphTarget
  | typeof GlyphFrame
  | typeof GlyphLoop
  | typeof GlyphHandover
