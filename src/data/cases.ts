export type CaseStudy = {
  slug: string
  client: string
  sector: string
  title: string
  tagline: string
  tags: string[]
  duration: string
  scale: string
  lead: string
  gap: string        // Der Gap — was war das eigentliche strukturelle Problem?
  shift: string      // Was haben wir getan?
  result: string     // Was hat sich verändert?
  quote?: { text: string; author: string; role: string }
  color: 'terra' | 'sage' | 'ink' | 'neutral'
  featured?: boolean
  /** Path relative to /public — e.g. '/projects/wd40.jpg'. Omit to show placeholder. */
  image?: string
}

export const cases: CaseStudy[] = [
  {
    slug: 'innovationskraft-durch-zusammenarbeit',
    client: 'WD-40 Company',
    sector: 'Consumer Goods',
    title: 'Innovationskraft durch Zusammenarbeit',
    tagline: 'Wie ein Marktführer lernte, seinen eigenen Erfolg zu hinterfragen.',
    tags: ['Innovation', 'Operating Model', 'Cross-funktional'],
    duration: '8 Monate',
    scale: 'DACH-Organisation',
    lead: 'Mary-Jane Bolten',
    gap: 'Kommerzielle und organisatorische Innovationen kollidierten mit etablierten Praktiken. Silodenken verhinderte, dass neue Ideen die Abteilungsgrenze überwanden — obwohl die Marktführerschaft es erlaubt hätte, mutig zu sein.',
    shift: 'Entwicklung und Implementierung eines passgenauen Innovations-Frameworks: von der Tiefenanalyse der Prozesslandschaft bis zum pilotierten Praxisprojekt mit Design-Thinking-Methoden. Wir haben nicht die Mindsets der Menschen verändert — sondern die Strukturen, die ihre Zusammenarbeit verhinderten.',
    result: 'Ein Framework, das innovative Zusammenarbeitsformen in praktikable Prozessstrukturen überführt. Silos wurden durchbrochen, eine angepasste Fehlerkultur etabliert und die Fähigkeit geschaffen, künftigen Herausforderungen proaktiv zu begegnen.',
    quote: {
      text: 'Es war sehr beeindruckend, wie schnell uns 1789 bereits nach dem ersten Kennenlernen vollends durchdrungen hat.',
      author: 'Daniel Kalisch',
      role: 'General Manager WD-40 D.A.CH.',
    },
    color: 'terra',
    featured: true,
  },
  {
    slug: 'effektivitaet-und-kundennaehe',
    client: 'Procter & Gamble',
    sector: 'Consumer Goods',
    title: 'Effektivität und Kundennähe durch Dezentralität',
    tagline: 'Wenn Effizienz-Logik der Kundennähe im Weg steht.',
    tags: ['Transformation', 'Dezentralisierung', 'Operating Model'],
    duration: '9 Monate',
    scale: '200 Mitarbeitende',
    lead: 'Patrick Breitenbach',
    gap: 'Die Customer Service Organisation war auf Masseneffizienz ausgerichtet — in einer Welt, die individuelle Reaktionsfähigkeit verlangt. Das erzeugte strukturellen Reibungsverlust: Kunden warteten, Mitarbeitende fühlten sich handlungsunfähig.',
    shift: 'Partizipative Entwicklung eines neuen Operating Models: Leadership Workshops, Intensivanalysen, ein freiwilliges Projektteam das gemeinsam mit 1789 das Konzept entwickelte — pilotiert, bevor es unternehmensweit ausgerollt wurde.',
    result: 'Autonome, kundennahe Teams mit echter Entscheidungskraft. Schnellere Reaktionsfähigkeit auf individuelle Anforderungen. Dezentralisierung nicht als Kontrollverlust — sondern als Wertschöpfungsgewinn.',
    color: 'ink',
    featured: true,
  },
  {
    slug: 'integration',
    client: 'teccle Group',
    sector: 'IT-Services / Mittelstand',
    title: 'Integration: 15 Firmen, eine Organisation',
    tagline: 'Target Operating Model für ein Netzwerk, das zusammenwachsen wollte.',
    tags: ['M&A', 'Post-Merger-Integration', 'Selbstwirksamkeit'],
    duration: '~2 Jahre',
    scale: '500 Mitarbeitende, 15+ Unternehmen',
    lead: 'Patrick Breitenbach & Mary-Jane Bolten',
    gap: 'Die Konsolidierung über 15 IT-Service-Unternehmen erzeugte ein strukturelles Dilemma: End-to-End-Betreuung anbieten, ohne lokale Kundenbeziehungen zu opfern. Wachstum und Selbstbestimmung schienen sich gegenseitig auszuschließen.',
    shift: 'Zweiphasiger Prozess: Entwicklung eines Referenzmodells mit Geschäftsführung und Führungskräften (4 Monate), dann Integration der Mitarbeiterstimmen durch Workshops, Interviews und Arbeitsgruppen über 1,5 Jahre. Die Einheit "Professional Services" als Pilot.',
    result: 'Ein dezentrales Operating Model, in dem Teams eigenständig und kompetenzbasiert entscheiden — im Rahmen klarer Strukturen. Enge Kundenbeziehungen erhalten. Selbstbestimmung der Mitarbeitenden gestärkt statt geschwächt.',
    color: 'sage',
    featured: true,
  },
  {
    slug: 'motivieren-und-entwickeln',
    client: 'WTS',
    sector: 'Steuerberatung / Professional Services',
    title: 'Motivieren und Entwickeln',
    tagline: 'Performance & Compensation als Organisationsfrage — nicht als HR-Thema.',
    tags: ['Performance', 'Compensation', 'Governance'],
    duration: '~12 Monate',
    scale: '1.700 Berater:innen, 13 Standorte',
    lead: 'Mary-Jane Bolten',
    gap: 'Mangelnde Transparenz bei Bewertungs- und Gehaltsregelungen erodierte Vertrauen. Führungskräfte kämpften mit Administrationsaufwand, HR mit Excel-Chaos — während das Unternehmen wuchs und die Systeme stagnierten.',
    shift: 'Über ein Jahr intensive Zusammenarbeit mit der HR-Leitung: Workshopdesign und Moderation auf Management- und Mitarbeitendenebene. Vorbereitung und begleitete Implementierung eines neuen Performance and Compensation Models.',
    result: 'Partnerschaftliche Beziehungen zwischen Führungskraft und Mitarbeitenden. Klare Karrierestufen, Gremienentscheidungen, schnellere Kommunikation. Überarbeitete Gesprächszyklen und Überstundenregelungen.',
    quote: {
      text: 'Besonders wertvoll war die Unterstützung beim Workshopdesign und der Moderation großer Gruppen.',
      author: 'Viola Krauss',
      role: 'Head of HR, WTS Deutschland',
    },
    color: 'neutral',
  },
  {
    slug: 'kohaerente-vision',
    client: 'METRO.digital',
    sector: 'Digital / Corporate',
    title: 'Kohärente Vision',
    tagline: 'Target Operating Model für eine Organisation im Übergang.',
    tags: ['Target Operating Model', 'Strategie', 'Selbstorganisation'],
    duration: '7 Monate',
    scale: '~2.000 Mitarbeitende',
    lead: 'Mary-Jane Bolten',
    gap: 'Trotz positiver Kulturveränderung stagnierten Produktivitätssteigerungen. Viele Initiativen zielten in unterschiedliche, teils widersprüchliche Richtungen. Führungsverantwortung war unklar — eine Organisation, die sich selbst im Weg stand.',
    shift: 'Entwicklung eines "Far Future Model" als zukunftsweisende Vision: kohärente Strukturen für Führung, Entscheidungsfindung, Budgetierung und Personalmanagement. Organisationsübergreifendes Team, evidenzbasiert durch Pilotphasen.',
    result: 'Ein integriertes Target Operating Model mit selbstorganisierten, kundenorientierten Teams und agilen Arbeitsweisen. Richtung gewonnen — ohne die Energie der laufenden Transformation zu bremsen.',
    color: 'terra',
  },
  {
    slug: 'skalierung-und-qualitaet',
    client: 'greyt',
    sector: 'Kreativagentur',
    title: 'Skalierung und Qualität durch Struktur',
    tagline: 'Wie eine Kreativagentur Wachstum und Eigenständigkeit zusammendachte.',
    tags: ['Wachstum', 'Operating Model', 'Selbstorganisation'],
    duration: '13 Monate',
    scale: '~40 Mitarbeitende',
    lead: 'Mary-Jane Bolten',
    gap: 'Schnelles Wachstum verschob den Fokus auf kurzfristige Aufgaben. Informelle Prozesse und breite Führungsspannen verhinderten Qualitätssicherung und Kompetenzentwicklung — die Organisation drohte, hinter ihren eigenen Ambitionen zurückzubleiben.',
    shift: '7 Monate Strategieentwicklung mit der Geschäftsführung, 6 Monate Implementierung mit den Mitarbeitenden. Einsatz des 1789 Board Games zur praktischen Erprobung neuer Arbeitsweisen — lernen durch Tun statt durch Folie.',
    result: 'Klare Organisationsstrategie mit Kunden- und Specialist-Teams. Organisches Wachstum nach dem "Zellteilung"-Prinzip. Gestärkte Selbstorganisation und echtes Mitarbeiter-Ownership.',
    color: 'sage',
  },
  {
    slug: 'verbindliche-entscheidungen',
    client: 'Medizin Gruppe',
    sector: 'Gesundheitswesen',
    title: 'Verbindliche Entscheidungen',
    tagline: 'Governance für einen Konzern mit 40 Tochterunternehmen.',
    tags: ['Governance', 'Top-Level', 'Dezentralität'],
    duration: '9 Monate',
    scale: '40+ Tochterunternehmen, ~8.000 Beschäftigte',
    lead: 'Mary-Jane Bolten',
    gap: 'Dezentrale Autonomie ermöglichte Agilität — verhinderte aber strategische Gesamtmaßnahmen. Die Balance zwischen unternehmerischer Freiheit und zentralen Entscheidungen war nicht strukturell gelöst, sondern wurde täglich neu ausgehandelt.',
    shift: 'Interviews und Workshops mit Geschäftsführern und Tochterunternehmen-Repräsentanten. Koordination verschiedener Perspektiven zu einem strukturierten Governance-Modell mit klassifizierten Verbindlichkeitsstufen.',
    result: 'Governance-Struktur mit klar klassifizierten Verbindlichkeitsstufen: bindend, gemeinsam, freiwillig. Implementierungsmechanismen wie Verrechnungspreise und Anreize für Early Adopter. Verbindlichkeit ohne Autonomieverlust.',
    color: 'ink',
  },
  {
    slug: 'entscheidungen-mit-strategischem-ausmass',
    client: 'Procter & Gamble',
    sector: 'Consumer Goods',
    title: 'Entscheidungen mit strategischem Ausmaß',
    tagline: 'Operating Model für eine Stabstelle, die alles koordiniert — aber sich selbst nicht.',
    tags: ['Operating Model', 'Führung', 'Governance'],
    duration: '2 Monate',
    scale: '7-köpfiges Führungsteam',
    lead: 'Patrick Breitenbach',
    gap: 'Nach einem Führungswechsel herrschten in der zentralen Stabstelle unklare Verantwortlichkeiten und Kompetenzen. Das Ergebnis: Zurückhaltung, Unsicherheit, Lähmung — ausgerechnet dort, wo strategische Impulse entstehen sollten.',
    shift: 'Zweimonatige intensive Zusammenarbeit mit dem siebenköpfigen Team. Interviews, Sparrings und der Einsatz des 1789 Board Games zur Visualisierung von Entscheidungen und Abhängigkeiten. Abschluss durch Transformations-Workshop.',
    result: 'Klar definierte individuelle und gemeinsame Verantwortlichkeiten. Transparente Kommunikationswege. Neuer operativer Führungspunkt für Entscheidungssicherheit — ein kleines Team, das wieder weiß, was es zu entscheiden hat.',
    color: 'neutral',
  },
]

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug)
}

export const featuredCases = cases.filter((c) => c.featured)
