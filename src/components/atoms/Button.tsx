'use client'

import { forwardRef } from 'react'

type ButtonVariant = 'primary' | 'ghost' | 'text'
type ButtonSize    = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
}

const base = `
  inline-flex items-center gap-2
  font-body font-medium text-label tracking-[0.15em] uppercase
  transition-all duration-base ease-expressive
  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra
  disabled:opacity-40 disabled:pointer-events-none
`

const variants: Record<ButtonVariant, string> = {
  primary: `
    bg-ink text-background
    px-8 py-4
    hover:bg-terra
  `,
  ghost: `
    border border-ink text-ink
    px-8 py-4
    hover:bg-ink hover:text-background
  `,
  text: `
    text-ink underline-offset-4
    hover:text-terra
    p-0
  `,
}

const sizes: Record<ButtonSize, string> = {
  sm: 'text-micro py-2 px-5',
  md: 'text-label py-3 px-7',
  lg: 'text-label py-5 px-10',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
