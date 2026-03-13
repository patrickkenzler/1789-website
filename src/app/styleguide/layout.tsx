// Isolates the styleguide from the root layout (no site nav / footer)
export default function StyleguideLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
