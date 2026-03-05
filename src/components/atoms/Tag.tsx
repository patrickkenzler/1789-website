import React from 'react'

interface TagProps {
  children: React.ReactNode
  variant?: 'default' | 'accent'
  className?: string
  style?: React.CSSProperties
}

export function Tag({ children, variant = 'default', className = '', style }: TagProps) {
  const styles = {
    default: 'border border-border text-ink-muted',
    accent:  'bg-terra text-white border-transparent',
  }

  return (
    <span
      className={`
        inline-flex items-center
        font-mono text-[0.6875rem] tracking-[0.08em] uppercase
        px-3 py-1 rounded-full
        ${styles[variant]}
        ${className}
      `}
      style={style}
    >
      {children}
    </span>
  )
}
