import { Container, Grid, Col } from '@/components/layout/Grid'
import { Button } from '@/components/atoms/Button'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center">
      <Container>
        <Grid>
          <Col span={6} start={4} className="text-center">
            <p
              className="font-display font-light"
              style={{ fontSize: 'clamp(6rem, 20vw, 16rem)', lineHeight: 1, color: 'var(--color-border)', letterSpacing: '-0.05em' }}
            >
              404
            </p>
            <h1
              className="mt-4 font-heading font-normal text-ink"
              style={{ fontSize: 'var(--text-md)', lineHeight: '1.1' }}
            >
              Diese Seite hat den Shift noch nicht gemacht.
            </h1>
            <p className="mt-4 font-body text-ink-muted" style={{ fontSize: 'var(--text-base)' }}>
              Der Gap zwischen Absicht und Realität ist manchmal größer als gedacht.
            </p>
            <div className="mt-10">
              <a href="/" style={{ display: 'inline-block' }}>
                <Button variant="primary">← Zur Startseite</Button>
              </a>
            </div>
          </Col>
        </Grid>
      </Container>
    </main>
  )
}
