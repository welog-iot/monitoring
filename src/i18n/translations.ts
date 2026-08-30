export type Locale = 'it' | 'en';

export const DEFAULT_LOCALE: Locale = 'it';

export const translations = {
  it: {
    // Tabs
    tabMonitor: 'Monitoraggio',
    tabAbout: 'Info',

    // Monitor screen
    bridgeDeflection: 'Deflessione del ponte',
    monitorSubtitle:
      'Inserisci le letture degli inclinometri (radianti) per visualizzare la deflessione del ponte.',
    inclinometers: 'Inclinometri',
    addInclinometer: 'Aggiungi inclinometro',
    maxReached: 'Raggiunto il massimo di {max} inclinometri.',
    deflectionGraph: 'Grafico di deflessione',
    activeCount: '{count} attivi',
    graphComingSoon: 'Grafico in arrivo',
    graphSubtext:
      'La curva di deflessione misurata dai tuoi {count} inclinometri apparirà qui.',
    sensorLabel: 'Sensore {greek}',

    // Inclinometer input
    remove: 'Rimuovi',
    unitRad: 'rad',

    // About screen
    appName: 'WeLog Monitoraggio',
    aboutTagline: 'Monitoraggio della deflessione strutturale dei ponti.',
    howItWorks: 'Come funziona',
    howItWorksBody:
      "Gli inclinometri montati lungo un ponte misurano la rotazione angolare. Combinate, queste letture descrivono come la struttura si deflette sotto carico. Inserisci l'angolo di ogni sensore in radianti nella scheda Monitoraggio; una curva di deflessione verrà tracciata qui a breve.",
    sensorLimits: 'Limiti dei sensori',
    minInclinometers: 'Inclinometri minimi',
    maxInclinometers: 'Inclinometri massimi',
    unit: 'Unità',
    radians: 'radianti',

    // Brand / docs
    brand: 'WeLog',
    docs: 'Docs',
  },
  en: {
    tabMonitor: 'Monitor',
    tabAbout: 'About',
    bridgeDeflection: 'Bridge Deflection',
    monitorSubtitle:
      'Enter inclinometer readings (radians) to visualize bridge deflection.',
    inclinometers: 'Inclinometers',
    addInclinometer: 'Add inclinometer',
    maxReached: 'Maximum of {max} inclinometers reached.',
    deflectionGraph: 'Deflection Graph',
    activeCount: '{count} active',
    graphComingSoon: 'Graph coming soon',
    graphSubtext:
      'The deflection curve measured by your {count} inclinometer(s) will appear here.',
    sensorLabel: 'Sensor {greek}',
    remove: 'Remove',
    unitRad: 'rad',
    appName: 'WeLog Monitoring',
    aboutTagline: 'Structural deflection tracking for bridges.',
    howItWorks: 'How it works',
    howItWorksBody:
      "Inclinometers mounted along a bridge measure angular rotation. Combined, these readings describe how the structure deflects under load. Enter each sensor's angle in radians on the Monitor tab; a deflection curve will be plotted here soon.",
    sensorLimits: 'Sensor limits',
    minInclinometers: 'Minimum inclinometers',
    maxInclinometers: 'Maximum inclinometers',
    unit: 'Unit',
    radians: 'radians',
    brand: 'WeLog',
    docs: 'Docs',
  },
} as const;

export type TranslationKey = keyof typeof translations.it;
