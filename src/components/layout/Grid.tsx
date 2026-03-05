import React from 'react'

interface GridProps {
  children: React.ReactNode
  cols?: number
  gap?: string
  className?: string
  style?: React.CSSProperties
}

interface ColProps {
  children: React.ReactNode
  span?: number
  start?: number
  className?: string
  style?: React.CSSProperties
}

export function Container({
  children,
  className = '',
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div className={`container-grid ${className}`} style={style}>
      {children}
    </div>
  )
}

export function Grid({ children, cols = 12, className = '', style }: GridProps) {
  return (
    <div
      className={`grid gap-6 ${className}`}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, ...style }}
    >
      {children}
    </div>
  )
}

export function Col({ children, span = 12, start, className = '', style }: ColProps) {
  return (
    <div
      className={className}
      style={{
        gridColumn: start ? `${start} / span ${span}` : `span ${span}`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
