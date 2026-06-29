export type Lang = 'en' | 'es'
export type Category = 'flagship' | 'work' | 'personal'

export interface RepoLink {
  label: string
  href: string
}

export interface ProjectItem {
  id: string
  name: string
  blurb: string
  longBlurb?: string
  features?: string[]
  highlights?: string[]
  tags: string[]
  metrics?: string[]
  icon?: string
  logo?: string
  shot?: string
  category: Category
  repos: RepoLink[]
  live?: string
  accent: string
}

export interface ExpItem {
  role: string
  org: string
  date: string
  bullets: string[]
  tag: string
  logo: string
}

export interface Content {
  nav: { home: string; about: string; work: string; experience: string; skills: string; contact: string }
  hero: {
    badge: string
    titleA: string
    titleB: string
    roles: string[]
    intro: string
    ctaWork: string
    ctaCv: string
    ctaContact: string
    scroll: string
  }
  about: {
    kicker: string
    heading: string
    body: string[]
    stats: { value: string; label: string }[]
  }
  experience: { kicker: string; heading: string; items: ExpItem[] }
  education: { kicker: string; heading: string; items: ExpItem[] }
  work: {
    kicker: string
    heading: string
    sub: string
    featuredLabel: string
    filters: { all: string; work: string; personal: string }
    liveLabel: string
    liveDemo: string
    livePreview: string
    openLive: string
    viewCode: string
    featuresLabel: string
    highlightsLabel: string
    techLabel: string
    projects: ProjectItem[]
    more: string
  }
  skills: { kicker: string; heading: string; sub: string; concepts: string; conceptItems: string[] }
  certs: { kicker: string; heading: string; sub: string; verify: string; items: { code: string; name: string; url: string }[] }
  contact: {
    kicker: string
    heading: string
    body: string
    email: string
    cvEn: string
    cvEs: string
    backTop: string
    built: string
  }
}

const ENTANGLE_REPOS: RepoLink[] = [
  { label: 'Core', href: 'https://github.com/Angel-TFG-UCLM/Entangle-Core' },
  { label: 'Visualizer', href: 'https://github.com/Angel-TFG-UCLM/Entangle-Visualizer' },
]

function projectsEN(): ProjectItem[] {
  return [
    {
      id: 'entangle',
      name: 'Entangle',
      blurb:
        'My Bachelor\'s Thesis. A config-driven AI agent (6 workers) with RAG that maps, analyzes and visualizes the open-source quantum computing ecosystem on GitHub. Split into two repositories: the Core engine and the Visualizer.',
      longBlurb:
        'Entangle is a research-grade analytics platform that maps and analyzes the global open-source quantum computing ecosystem on GitHub. The Core backend crawls repositories, organizations and developers matching a taxonomy of 70+ quantum keywords, enriches them with collaboration metadata, computes network metrics and serves everything through a 56-endpoint FastAPI. The Visualizer turns that data into an interactive dashboard with a 2D collaboration graph, an immersive 3D quantum universe and an AI chat assistant.',
      features: [
        'Domain-aware ingestion crawling GitHub via 70+ quantum keywords across repos, users and organizations',
        'Collaboration network analysis with NetworkX: centrality, community detection and bridge-user identification',
        '2D force-directed graph plus an immersive 3D quantum universe built with React Three Fiber',
        'AI chat assistant (Azure AI Foundry) with tool-calling over the live dataset, streamed via SSE',
        'Multi-language UI in 5 languages with KaTeX-rendered quantum glossary',
      ],
      highlights: [
        'SonarQube quality gate PASSED, A/A/A ratings, ~28k LOC across both repos',
        '56 REST endpoints with SSE streaming and a permanent metric cache',
        'One-command azd deploy: Container Apps, Cosmos DB vCore, AI Foundry, managed identity',
      ],
      tags: ['Python', 'RAG', 'Azure OpenAI', 'Cosmos DB', 'React', 'Three.js'],
      metrics: ['96.7% routing accuracy', '1,087 tests', '0.96 modularity', '2 repositories'],
      logo: 'projects/entangle.png',
      category: 'flagship',
      repos: ENTANGLE_REPOS,
      live: 'https://blue-rock-0771cc403.1.azurestaticapps.net',
      shot: 'projects/shots/entangle.png',
      accent: '#8b5cf6',
    },
    {
      id: 'insurance',
      name: 'insurance-ai-agents',
      blurb: 'Multi-agent AI claims processing for insurance. Governed, secure and auditable, built on Azure OpenAI.',
      longBlurb:
        'A governed, multi-agent AI platform for end-to-end auto insurance claims processing, built as a white-label enterprise demo. Three specialized agents (Intake, Risk, Compliance) are orchestrated by Microsoft Agent Framework, and every LLM call is routed through an Azure APIM AI Gateway enforcing content safety, per-agent token limits and a full audit log. CODEOWNERS per domain and an automated Eval Gate deliver banking-grade control over AI agents.',
      features: [
        'Three specialized agents (Intake, Risk, Compliance) via Microsoft Agent Framework',
        'Azure APIM AI Gateway: content safety, per-agent token limits, managed-identity auth (no keys)',
        'Real-time voice channel through the same pipeline (Azure OpenAI realtime)',
        'Automated Eval Gate on every PR with a golden dataset, including a prompt-injection test',
        'Domain-scoped CODEOWNERS for banking-grade change governance',
      ],
      highlights: [
        'Live-edit a compliance rule, open a PR, and the Eval Gate blocks merge without approval',
        'Zero-secret infrastructure: APIM reaches Azure OpenAI via managed identity',
        'White-label from a single brand.ts; second brand on a separate branch',
      ],
      tags: ['TypeScript', 'Python', 'Agent Framework', 'Azure OpenAI', 'APIM'],
      metrics: ['Governed', 'Auditable', 'Eval Gate'],
      icon: 'typescript',
      category: 'work',
      repos: [{ label: 'Code', href: 'https://github.com/aangell98/insurance-ai-agents' }],
      live: 'https://ambitious-river-0f1566b03.7.azurestaticapps.net',
      shot: 'projects/shots/insurance.png',
      accent: '#7fa6ff',
    },
    {
      id: 'sales-cockpit',
      name: 'sales-cockpit-ai-agents',
      blurb: 'White-label agentic sales cockpit plus a Copilot inside Microsoft Teams for relationship bankers.',
      longBlurb:
        'A white-label, governed agentic sales cockpit for relationship bankers, built end to end on the Microsoft AI platform. It delivers live KPIs and gamification over WebSocket, streams personalized Next Best Action recommendations token by token via Azure OpenAI, and embeds a grounded Copilot inside Microsoft Teams through a Bot Framework bot that answers with citations from a knowledge base.',
      features: [
        'Live KPI cockpit and gamification updated in real time over WebSocket',
        'Streaming Next Best Action agent: product, propensity, channel, timing, premium and commission',
        'Copilot inside Microsoft Teams (Bot Framework) answering with citations as Adaptive Cards',
        'Two modes: cinematic zero-backend Intro and a fully live Azure OpenAI mode',
        'Microsoft governance stack: CODEOWNERS, Eval Gate, managed identity, APIM',
      ],
      highlights: [
        'Three agents (Copilot, Next Best Action, Script Generator) with high-fidelity mock fallbacks',
        'Power BI / Microsoft Fabric integration for KPIs and ranking',
        'Rebrandable for any financial client by editing a single brand.ts',
      ],
      tags: ['TypeScript', 'Agent Framework', 'Teams', 'Azure OpenAI'],
      metrics: ['White-label', 'Copilot', 'Real-time'],
      icon: 'typescript',
      category: 'work',
      repos: [{ label: 'Code', href: 'https://github.com/aangell98/sales-cockpit-ai-agents' }],
      live: 'https://agreeable-flower-09b095e03.7.azurestaticapps.net',
      shot: 'projects/shots/sales-cockpit.png',
      accent: '#46C7E0',
    },
    {
      id: 'policyforge',
      name: 'policyforge',
      blurb: 'An AI policy and compliance factory. Turns regulatory change into an explainable, auditable diff in one pass.',
      longBlurb:
        'PolicyForge transforms regulatory changes into actionable artifacts in a single orchestrated pass. Given a policy document and a new regulation (EU AI Act, GDPR update), it produces a clause-by-clause semantic diff, an AI-drafted update in the document\'s own tone, risk flags, an impact map, a requirement-to-control traceability matrix and a fully auditable decision timeline.',
      features: [
        'Semantic diff engine comparing policy clauses against new regulatory text',
        'AI-drafted policy update generated in the original document\'s voice',
        'Risk flags and an impact map ranked by effort and residual risk',
        'Traceability matrix linking requirement to control to evidence to owner',
        'Audit timeline logging every AI decision with source, reason and actor',
      ],
      highlights: [
        'Runs fully offline in a deterministic mock mode, no Azure setup needed',
        'White-label from a single brand.ts file',
        'Azure OpenAI with AAD auth, no API keys stored',
      ],
      tags: ['TypeScript', 'Compliance', 'Azure OpenAI'],
      metrics: ['Explainable', 'Traceable'],
      icon: 'typescript',
      category: 'work',
      repos: [{ label: 'Code', href: 'https://github.com/aangell98/policyforge' }],
      accent: '#9b8cff',
    },
    {
      id: 'cart-recovery',
      name: 'cart-recovery-ai-agents',
      blurb: 'Omnichannel AI agent that recovers abandoned carts and quotes in real time. React, FastAPI and Azure OpenAI.',
      longBlurb:
        'A white-label, omnichannel agentic system that detects abandoned carts in real time, reasons over journey signals to diagnose why customers dropped off, and autonomously recovers the sale through a live, streaming conversation over the customer\'s preferred channel. Built on Azure OpenAI and Microsoft Agent Framework in a governed sequential graph.',
      features: [
        'Live abandonment radar streaming carts over WebSocket, scored by recovery probability',
        'Streaming AI diagnosis of why a customer abandoned and the best channel and incentive',
        'Omnichannel negotiation agent that handles real objections and closes the sale',
        'Graceful no plus a live post-mortem coaching from an Analyst agent',
        'Real phone channel: scan a QR and the agent messages you on Telegram or WhatsApp',
      ],
      highlights: [
        'Three agents in a governed sequential graph, each with mock fallbacks so the demo never breaks',
        'Intro mode runs entirely on mock data, no backend required',
        'White-label with a BRANDING guide and an architecture-diagram generator',
      ],
      tags: ['React', 'FastAPI', 'Azure OpenAI', 'Agent Framework'],
      metrics: ['Omnichannel', 'Real-time', 'Streaming'],
      icon: 'react',
      category: 'work',
      repos: [{ label: 'Code', href: 'https://github.com/aangell98/cart-recovery-ai-agents' }],
      live: 'https://purple-forest-08b16d503.7.azurestaticapps.net',
      shot: 'projects/shots/cart-recovery.png',
      accent: '#5fe0c8',
    },
    {
      id: 'sceneforge',
      name: 'sceneforge',
      blurb: 'From a creative brief to a navigable 3D scene in minutes. Coherent art direction, cinematic light and a guided camera.',
      longBlurb:
        'SceneForge converts a creative brief (free text plus reference images) into a fully navigable, cinematically lit 3D web scene in minutes. A multi-step AI pipeline builds a Three.js scene with coherent lighting, volumetric fog, two art-direction variants on the same blocking, a guided cinematic camera and one-click in-browser video export.',
      features: [
        'Animated pipeline mapping each step to its Azure service',
        'Interactive 3D viewer with free orbit and a guided cinematic camera',
        'Two art-direction variants on the same geometric blocking',
        'Color palette auto-extracted from reference image pixels',
        'In-browser video export to WebM via the native MediaRecorder API',
      ],
      highlights: [
        'Monorepo: one shared TypeScript package powers server generation and offline fallback',
        'Full i18n and a premium Azure-inspired design system',
        'Deterministic offline mock mode, no API keys needed',
      ],
      tags: ['TypeScript', 'Three.js', 'React Three Fiber', '3D'],
      metrics: ['Offline mock', 'White-label'],
      icon: 'threejs',
      category: 'work',
      repos: [{ label: 'Code', href: 'https://github.com/aangell98/sceneforge' }],
      accent: '#46C7E0',
    },
    {
      id: 'liminal',
      name: 'Liminal',
      blurb: 'A Backrooms-inspired liminal horror game I built for fun with React Three Fiber, with an AI-driven entity that hunts you. Playable in the browser.',
      longBlurb:
        'Liminal is a first-person liminal horror game playable in the browser, set in an infinite Backrooms-inspired office. Its centerpiece is a custom dual-brain AI inspired by Alien: Isolation: an omniscient Director manages tension while a sensory-only Entity stalks you using A* pathfinding and finite-state machines. Every sound is generated in real time through the Web Audio API, with no audio samples at all.',
      features: [
        'Dual AI system: a Director managing tension and an Entity that only perceives what it sees or hears',
        'Stalking FSM: wander, investigate, stalk, chase and search, building boldness before committing',
        'Found-footage VHS aesthetic with fisheye, chromatic aberration and film grain',
        '100% procedural spatial audio synthesized in real time via the Web Audio API',
        'Full mobile support with on-screen joystick and auto deploy to GitHub Pages',
      ],
      highlights: [
        'The Entity only teleports when you are not looking and it has no line of sight, no cheap scares',
        'Lights physically flicker as the Entity approaches, a fair diegetic warning',
        'Built entirely in TypeScript with React Three Fiber and Three.js',
      ],
      tags: ['TypeScript', 'React Three Fiber', 'Game', 'AI', 'Web Audio'],
      metrics: ['Playable', 'WebGL', 'Custom AI'],
      icon: 'threejs',
      category: 'personal',
      repos: [{ label: 'Code', href: 'https://github.com/aangell98/liminal' }],
      live: 'https://aangell98.github.io/liminal/',
      shot: 'projects/shots/liminal.png',
      accent: '#ff7a59',
    },
    {
      id: 'bitcoin',
      name: 'Kafka Bitcoin Tracker',
      blurb: 'Real-time Bitcoin price and hash rate visualizer powered by Apache Kafka and Python. A weekend dive into streaming data.',
      longBlurb:
        'A real-time cryptocurrency data pipeline that streams live Bitcoin price ticks and network hash rate through Apache Kafka and renders them in an interactive candlestick and line chart dashboard. Built as an academic data-management project, it demonstrates a full producer and consumer architecture with industry-standard streaming tools.',
      features: [
        'Live WebSocket price feed producing a Kafka message every second',
        'Hash rate tracking polled every 60 seconds on a separate Kafka topic',
        'Real-time OHLC candlestick chart with the forming candle updating on every tick',
        'Dual-axis visualization overlaying price and network hash rate',
        'Cross-platform startup scripts for Windows, Linux and macOS',
      ],
      highlights: [
        'Stores up to 10,000 data points before scrolling old data out',
        'Full producer and consumer architecture with Kafka and ZooKeeper',
        'Plotly Dash dashboard with live updates',
      ],
      tags: ['Python', 'Apache Kafka', 'Plotly Dash', 'Streaming'],
      metrics: ['Real-time', 'Streaming'],
      icon: 'kafka',
      category: 'personal',
      repos: [{ label: 'Code', href: 'https://github.com/aangell98/Kafka-Bitcoin-Tracker' }],
      accent: '#f7931a',
    },
    {
      id: 'sentiment',
      name: 'Social Sentiment Tracker',
      blurb: 'Real-time social sentiment analysis with transformer NLP and an interactive dashboard. Currently focused on Reddit.',
      longBlurb:
        'A Python pipeline that scrapes Reddit comments in real time and runs them through a multilingual transformer NLP model to classify public sentiment at five granular levels. The analyzed data is surfaced in a Streamlit dashboard with distribution charts, hourly trends and top positive and negative comment tables. Cleanly split into data collection, NLP processing and visualization.',
      features: [
        'Flexible Reddit scraping via PRAW: whole subreddit or a single post by URL',
        'Multilingual transformer sentiment analysis (RoBERTa, five classes)',
        'Interactive Streamlit dashboard with distribution and hourly trend charts',
        'Word cloud visualization of comment text frequency',
        'Make-driven pipeline: scrape, analyze, visualize',
      ],
      highlights: [
        'Transformer pipeline is more sophisticated than the classic VADER approach',
        'Sentiment mapped to a numeric scale for quantitative trend analysis',
        'Clean three-layer architecture with secure credential handling',
      ],
      tags: ['Python', 'NLP', 'Transformers', 'Streamlit'],
      metrics: ['NLP', 'Real-time'],
      icon: 'python',
      category: 'personal',
      repos: [{ label: 'Code', href: 'https://github.com/aangell98/SocialMediaSentimentTracker' }],
      accent: '#5fe0c8',
    },
  ]
}

function projectsES(): ProjectItem[] {
  const en = projectsEN()
  const es: Record<string, { blurb: string; longBlurb?: string; features?: string[]; highlights?: string[]; tags?: string[]; metrics?: string[] }> = {
    entangle: {
      blurb:
        'Mi Trabajo Fin de Grado. Un agente de IA config-driven (6 workers) con RAG que mapea, analiza y visualiza el ecosistema open source de computación cuántica en GitHub. Dividido en dos repositorios: el motor Core y el Visualizer.',
      longBlurb:
        'Entangle es una plataforma de analítica que mapea y analiza el ecosistema open source de computación cuántica en GitHub. El backend Core rastrea repositorios, organizaciones y desarrolladores que encajan con una taxonomía de más de 70 palabras clave cuánticas, los enriquece con metadatos de colaboración, calcula métricas de red y lo sirve todo a través de una FastAPI de 56 endpoints. El Visualizer convierte esos datos en un dashboard interactivo con un grafo de colaboración 2D, un universo cuántico 3D inmersivo y un asistente de IA.',
      features: [
        'Ingesta por dominio que rastrea GitHub con más de 70 palabras clave cuánticas en repos, usuarios y organizaciones',
        'Análisis de red de colaboración con NetworkX: centralidad, detección de comunidades e identificación de bridge users',
        'Grafo dirigido por fuerzas 2D y un universo cuántico 3D inmersivo con React Three Fiber',
        'Asistente de IA (Azure AI Foundry) con tool-calling sobre el dataset en vivo, vía SSE',
        'Interfaz multiidioma en 5 lenguas con glosario cuántico renderizado en KaTeX',
      ],
      highlights: [
        'Quality gate de SonarQube superado, valoraciones A/A/A, ~28k LOC entre ambos repos',
        '56 endpoints REST con streaming SSE y caché permanente de métricas',
        'Despliegue azd en un comando: Container Apps, Cosmos DB vCore, AI Foundry, identidad gestionada',
      ],
      metrics: ['96,7% de acierto', '1.087 tests', '0,96 modularidad', '2 repositorios'],
      tags: ['Python', 'RAG', 'Azure OpenAI', 'Cosmos DB', 'React', 'Three.js'],
    },
    insurance: {
      blurb: 'Procesamiento multiagente de siniestros de seguros. Gobernado, seguro y auditable, sobre Azure OpenAI.',
      longBlurb:
        'Una plataforma de IA multiagente y gobernada para procesar siniestros de auto de principio a fin, como demo empresarial white-label. Tres agentes especializados (Intake, Riesgo, Compliance) orquestados con Microsoft Agent Framework, y cada llamada al LLM pasa por un AI Gateway de Azure APIM que aplica content safety, límites de tokens por agente y un registro de auditoría completo. CODEOWNERS por dominio y un Eval Gate automático aportan control de nivel bancario sobre los agentes de IA.',
      features: [
        'Tres agentes especializados (Intake, Riesgo, Compliance) con Microsoft Agent Framework',
        'AI Gateway de Azure APIM: content safety, límites de tokens por agente, auth con identidad gestionada (sin claves)',
        'Canal de voz en tiempo real sobre el mismo pipeline (Azure OpenAI realtime)',
        'Eval Gate automático en cada PR con un golden dataset, incluido un test de prompt injection',
        'CODEOWNERS por dominio para una gobernanza de cambios de nivel bancario',
      ],
      highlights: [
        'Edita una regla de compliance, abre un PR y el Eval Gate bloquea el merge sin aprobación',
        'Infraestructura sin secretos: APIM accede a Azure OpenAI con identidad gestionada',
        'White-label desde un solo brand.ts; segunda marca en otra rama',
      ],
      tags: ['TypeScript', 'Python', 'Agent Framework', 'Azure OpenAI', 'APIM'],
      metrics: ['Gobernado', 'Auditable', 'Eval Gate'],
    },
    'sales-cockpit': {
      blurb: 'Cockpit comercial agéntico white-label y un Copilot dentro de Microsoft Teams para banqueros.',
      longBlurb:
        'Un cockpit comercial agéntico, white-label y gobernado para banqueros, construido de principio a fin sobre la plataforma de IA de Microsoft. Ofrece KPIs y gamificación en vivo por WebSocket, transmite recomendaciones de Next Best Action token a token con Azure OpenAI, e integra un Copilot fundamentado dentro de Microsoft Teams mediante un bot de Bot Framework que responde con citas de una base de conocimiento.',
      features: [
        'Cockpit de KPIs y gamificación actualizado en tiempo real por WebSocket',
        'Agente Next Best Action en streaming: producto, propensión, canal, momento, prima y comisión',
        'Copilot dentro de Microsoft Teams (Bot Framework) que responde con citas en Adaptive Cards',
        'Dos modos: Intro cinematográfico sin backend y un modo en vivo con Azure OpenAI',
        'Stack de gobernanza Microsoft: CODEOWNERS, Eval Gate, identidad gestionada, APIM',
      ],
      highlights: [
        'Tres agentes (Copilot, Next Best Action, Generador de guion) con fallbacks mock de alta fidelidad',
        'Integración con Power BI / Microsoft Fabric para KPIs y ranking',
        'Re-marcable para cualquier cliente financiero editando un solo brand.ts',
      ],
      tags: ['TypeScript', 'Agent Framework', 'Teams', 'Azure OpenAI'],
      metrics: ['White-label', 'Copilot', 'Tiempo real'],
    },
    policyforge: {
      blurb: 'Una fábrica de políticas y cumplimiento con IA. Convierte el cambio normativo en un diff explicable y auditable.',
      longBlurb:
        'PolicyForge convierte los cambios normativos en artefactos accionables en una sola pasada orquestada. Dada una política y una nueva normativa (EU AI Act, actualización de GDPR), genera un diff semántico cláusula a cláusula, una actualización redactada por IA en el tono del documento, alertas de riesgo, un mapa de impacto, una matriz de trazabilidad de requisito a control y una línea temporal de decisiones totalmente auditable.',
      features: [
        'Motor de diff semántico que compara las cláusulas de la política con el nuevo texto normativo',
        'Actualización de la política redactada por IA en la voz del documento original',
        'Alertas de riesgo y un mapa de impacto ordenado por esfuerzo y riesgo residual',
        'Matriz de trazabilidad que enlaza requisito con control, evidencia y responsable',
        'Línea temporal de auditoría que registra cada decisión de IA con origen, motivo y actor',
      ],
      highlights: [
        'Funciona 100% offline en un modo mock determinista, sin configurar Azure',
        'White-label desde un solo archivo brand.ts',
        'Azure OpenAI con auth AAD, sin almacenar claves',
      ],
      tags: ['TypeScript', 'Compliance', 'Azure OpenAI'],
      metrics: ['Explicable', 'Trazable'],
    },
    'cart-recovery': {
      blurb: 'Agente de IA omnicanal que recupera carritos y presupuestos abandonados en tiempo real. React, FastAPI y Azure OpenAI.',
      longBlurb:
        'Un sistema agéntico, omnicanal y white-label que detecta carritos abandonados en tiempo real, razona sobre las señales del journey para diagnosticar por qué se fue el cliente y recupera la venta de forma autónoma mediante una conversación en streaming por el canal preferido del cliente. Construido sobre Azure OpenAI y Microsoft Agent Framework en un grafo secuencial gobernado.',
      features: [
        'Radar de abandono en vivo que transmite carritos por WebSocket, puntuados por probabilidad de recuperación',
        'Diagnóstico de IA en streaming de por qué abandonó el cliente y el mejor canal e incentivo',
        'Agente de negociación omnicanal que maneja objeciones reales y cierra la venta',
        'Un "no" elegante más una sesión de coaching post-mortem de un agente Analista',
        'Canal de teléfono real: escanea un QR y el agente te escribe por Telegram o WhatsApp',
      ],
      highlights: [
        'Tres agentes en un grafo secuencial gobernado, cada uno con fallbacks mock para que la demo nunca falle',
        'El modo Intro funciona solo con datos mock, sin backend',
        'White-label con guía de BRANDING y un generador de diagramas de arquitectura',
      ],
      tags: ['React', 'FastAPI', 'Azure OpenAI', 'Agent Framework'],
      metrics: ['Omnicanal', 'Tiempo real', 'Streaming'],
    },
    sceneforge: {
      blurb: 'De un brief creativo a una escena 3D navegable en minutos. Dirección de arte coherente, luz cinematográfica y cámara guiada.',
      longBlurb:
        'SceneForge convierte un brief creativo (texto libre más imágenes de referencia) en una escena web 3D navegable y con luz cinematográfica en minutos. Un pipeline de IA multietapa construye una escena Three.js con iluminación coherente, niebla volumétrica, dos variantes de dirección de arte sobre el mismo blocking, una cámara cinematográfica guiada y exportación de vídeo en el navegador con un clic.',
      features: [
        'Pipeline animado que mapea cada paso a su servicio de Azure',
        'Visor 3D interactivo con órbita libre y una cámara cinematográfica guiada',
        'Dos variantes de dirección de arte sobre el mismo blocking geométrico',
        'Paleta de color extraída automáticamente de los píxeles de la imagen de referencia',
        'Exportación de vídeo a WebM en el navegador con la API nativa MediaRecorder',
      ],
      highlights: [
        'Monorepo: un paquete TypeScript compartido alimenta la generación en servidor y el fallback offline',
        'i18n completo y un sistema de diseño premium inspirado en Azure',
        'Modo mock offline determinista, sin necesidad de claves',
      ],
      tags: ['TypeScript', 'Three.js', 'React Three Fiber', '3D'],
      metrics: ['Mock offline', 'White-label'],
    },
    liminal: {
      blurb: 'Un juego de terror liminal inspirado en los Backrooms que hice por diversión con React Three Fiber, con una entidad de IA que te persigue. Jugable en el navegador.',
      longBlurb:
        'Liminal es un juego de terror liminal en primera persona jugable en el navegador, ambientado en una oficina infinita inspirada en los Backrooms. Su pieza central es una IA de doble cerebro inspirada en Alien: Isolation: un Director omnisciente gestiona la tensión mientras una Entidad puramente sensorial te acecha usando pathfinding A* y máquinas de estados. Todo el sonido se genera en tiempo real con la Web Audio API, sin ninguna muestra de audio.',
      features: [
        'Sistema de IA doble: un Director que gestiona la tensión y una Entidad que solo percibe lo que ve u oye',
        'FSM de acecho: deambular, investigar, acechar, perseguir y buscar, ganando audacia antes de lanzarse',
        'Estética found-footage VHS con ojo de pez, aberración cromática y grano de película',
        'Audio espacial 100% procedural sintetizado en tiempo real con la Web Audio API',
        'Soporte móvil completo con joystick en pantalla y auto-deploy a GitHub Pages',
      ],
      highlights: [
        'La Entidad solo se teletransporta cuando no la miras y sin línea de visión, nada de sustos baratos',
        'Las luces parpadean físicamente cuando la Entidad se acerca, un aviso diegético justo',
        'Construido íntegramente en TypeScript con React Three Fiber y Three.js',
      ],
      tags: ['TypeScript', 'React Three Fiber', 'Juego', 'IA', 'Web Audio'],
      metrics: ['Jugable', 'WebGL', 'IA propia'],
    },
    bitcoin: {
      blurb: 'Visualizador en tiempo real del precio y hash rate de Bitcoin con Apache Kafka y Python. Una inmersión de fin de semana en streaming de datos.',
      longBlurb:
        'Un pipeline de datos en tiempo real que transmite el precio de Bitcoin y el hash rate de la red a través de Apache Kafka y los muestra en un dashboard interactivo de velas y líneas. Construido como proyecto académico de gestión de datos, demuestra una arquitectura completa de productor y consumidor con herramientas estándar de streaming.',
      features: [
        'Feed de precio por WebSocket en vivo que produce un mensaje de Kafka cada segundo',
        'Seguimiento del hash rate consultado cada 60 segundos en un topic de Kafka aparte',
        'Gráfico de velas OHLC en tiempo real con la vela en formación actualizándose en cada tick',
        'Visualización de doble eje superponiendo precio y hash rate de la red',
        'Scripts de arranque multiplataforma para Windows, Linux y macOS',
      ],
      highlights: [
        'Almacena hasta 10.000 puntos de datos antes de descartar los antiguos',
        'Arquitectura completa de productor y consumidor con Kafka y ZooKeeper',
        'Dashboard Plotly Dash con actualizaciones en vivo',
      ],
      tags: ['Python', 'Apache Kafka', 'Plotly Dash', 'Streaming'],
      metrics: ['Tiempo real', 'Streaming'],
    },
    sentiment: {
      blurb: 'Análisis de sentimiento en redes en tiempo real con NLP de transformers y un dashboard interactivo. Actualmente enfocado en Reddit.',
      longBlurb:
        'Un pipeline en Python que extrae comentarios de Reddit en tiempo real y los pasa por un modelo NLP multilingüe de transformers para clasificar el sentimiento en cinco niveles. Los datos analizados se muestran en un dashboard de Streamlit con gráficos de distribución, tendencias por hora y tablas de los comentarios más positivos y negativos. Dividido limpiamente en recolección, procesamiento NLP y visualización.',
      features: [
        'Scraping flexible de Reddit con PRAW: subreddit completo o un solo post por URL',
        'Análisis de sentimiento con transformer multilingüe (RoBERTa, cinco clases)',
        'Dashboard interactivo de Streamlit con gráficos de distribución y tendencia por hora',
        'Visualización de nube de palabras de la frecuencia del texto',
        'Pipeline dirigido por Make: extraer, analizar, visualizar',
      ],
      highlights: [
        'El pipeline de transformers es más sofisticado que el enfoque clásico con VADER',
        'Sentimiento mapeado a una escala numérica para análisis cuantitativo de tendencias',
        'Arquitectura limpia de tres capas con manejo seguro de credenciales',
      ],
      tags: ['Python', 'NLP', 'Transformers', 'Streamlit'],
      metrics: ['NLP', 'Tiempo real'],
    },
  }
  return en.map((p) => ({ ...p, ...es[p.id], tags: es[p.id].tags ?? p.tags }))
}

export const CONTENT: Record<Lang, Content> = {
  en: {
    nav: { home: 'Home', about: 'About', work: 'Work', experience: 'Experience', skills: 'Skills', contact: 'Contact' },
    hero: {
      badge: 'Open to opportunities',
      titleA: 'Angel Luis',
      titleB: 'Lara Martin',
      roles: ['Computer Engineer', 'Full Stack Developer', 'Cloud & AI', 'Game Dev & 3D'],
      intro:
        'I design and build software end to end, from cloud and AI systems to full stack products and the odd 3D game. Always learning, always shipping. Currently a Cloud & AI Specialist Intern at Microsoft.',
      ctaWork: 'View my work',
      ctaCv: 'Download CV',
      ctaContact: 'Get in touch',
      scroll: 'Scroll',
    },
    about: {
      kicker: 'About',
      heading: 'Computer Engineer who loves to build',
      body: [
        'I am a Computer Engineer who enjoys the whole stack: cloud and AI, backend, frontend and everything in between. I design scalable systems, build AI agents and RAG, and ship products end to end.',
        'Off the clock you will find me building 3D games, tinkering with AI side projects and learning whatever catches my eye. Curious, proactive and a fast learner who cares about clean engineering and real impact.',
      ],
      stats: [
        { value: '9+', label: 'Projects shipped' },
        { value: '3', label: 'Microsoft certifications' },
        { value: '1,087', label: 'Tests in my thesis' },
        { value: 'C1', label: 'English level' },
      ],
    },
    experience: {
      kicker: 'Experience',
      heading: 'Where I have worked',
      items: [
        {
          role: 'Cloud & AI Specialist Intern',
          org: 'Microsoft',
          date: 'Jan 2026 - Present',
          tag: 'Cloud & AI',
          logo: 'microsoft',
          bullets: [
            'Design and optimize scalable Azure cloud architectures for enterprise customers.',
            'Drive AI, application modernization and cloud adoption initiatives.',
            'Author technical documentation and partner with cross-functional teams.',
          ],
        },
        {
          role: 'Cybersecurity Technician',
          org: 'Tata Consultancy Services - Roche Farma',
          date: 'Jun 2022 - Aug 2022',
          tag: 'Security',
          logo: 'tcs',
          bullets: [
            'Administered server permissions and user privileges with least privilege.',
            'Reviewed security certificates and audited access for compliance.',
          ],
        },
        {
          role: 'Global Operations Center Technician',
          org: 'Tata Consultancy Services - Roche Farma',
          date: 'Mar 2022 - Jun 2022',
          tag: 'Operations',
          logo: 'tcs',
          bullets: [
            'Diagnosed and fixed incidents on global infrastructure, minimizing downtime.',
            'Supported international customers end to end.',
          ],
        },
      ],
    },
    education: {
      kicker: 'Education',
      heading: 'Academic background',
      items: [
        {
          role: 'BSc Computer Engineering, Information Systems',
          org: 'University of Castilla-La Mancha',
          date: '2022 - 2026',
          tag: 'Graduated July 2026',
          logo: 'uclm',
          bullets: [
            'Distributed architectures, cloud technologies, AI fundamentals and process automation.',
            'Thesis: Entangle, mapping and analysis of the quantum computing ecosystem on GitHub.',
          ],
        },
        {
          role: 'Network Systems Administration Technician',
          org: 'IES Arciprestre de Hita',
          date: '2020 - 2022',
          tag: 'Systems',
          logo: 'ies',
          bullets: ['Linux and Windows Server, Active Directory, networking and web services.'],
        },
      ],
    },
    work: {
      kicker: 'Selected work',
      heading: 'Things I have built',
      sub: 'From my thesis to professional AI demos and personal side projects. Filter and explore.',
      featuredLabel: 'Featured project',
      filters: { all: 'All', work: 'Professional', personal: 'Personal' },
      liveLabel: 'Live',
      liveDemo: 'Live demo',
      livePreview: 'Live preview',
      openLive: 'Open live demo',
      viewCode: 'View code',
      featuresLabel: 'Key features',
      highlightsLabel: 'Highlights',
      techLabel: 'Built with',
      projects: projectsEN(),
      more: 'See all on GitHub',
    },
    skills: {
      kicker: 'Toolbox',
      heading: 'Tech I build with',
      sub: 'The tools I reach for, from cloud and backend to frontend and 3D.',
      concepts: 'And concepts I work with',
      conceptItems: ['Cloud Architecture', 'AI Agents', 'RAG', 'Microservices', 'CI/CD', 'Cybersecurity', 'Data Analysis'],
    },
    certs: {
      kicker: 'Certifications',
      heading: 'Verified credentials',
      sub: 'Microsoft certified. Click any badge to verify on Microsoft Learn.',
      verify: 'Verify on Microsoft Learn',
      items: [
        { code: 'AZ-900', name: 'Azure Fundamentals', url: 'https://learn.microsoft.com/en-us/users/angelluislaramartin-9888/credentials/4a28e43bae9bd17?ref=https%3A%2F%2Fwww.linkedin.com%2F' },
        { code: 'DP-900', name: 'Data Fundamentals', url: 'https://learn.microsoft.com/en-us/users/angelluislaramartin-9888/credentials/af6a368f9fa5ac25?ref=https%3A%2F%2Fwww.linkedin.com%2F' },
        { code: 'AI-900', name: 'AI Fundamentals', url: 'https://learn.microsoft.com/en-us/users/angelluislaramartin-9888/credentials/75ed5e0b82e24c7f?ref=https%3A%2F%2Fwww.linkedin.com%2F' },
      ],
    },
    contact: {
      kicker: 'Contact',
      heading: 'Let us build something',
      body: 'Open to new opportunities and interesting challenges. Reach out and let us talk.',
      email: 'Email me',
      cvEn: 'CV (English)',
      cvEs: 'CV (Spanish)',
      backTop: 'Back to top',
      built: 'Designed and built by Angel Luis Lara Martin with React, Three.js and Framer Motion.',
    },
  },
  es: {
    nav: { home: 'Inicio', about: 'Sobre mí', work: 'Proyectos', experience: 'Experiencia', skills: 'Skills', contact: 'Contacto' },
    hero: {
      badge: 'Abierto a oportunidades',
      titleA: 'Angel Luis',
      titleB: 'Lara Martin',
      roles: ['Ingeniero Informático', 'Desarrollador Full Stack', 'Cloud e IA', 'Game Dev & 3D'],
      intro:
        'Diseño y construyo software de principio a fin, desde sistemas cloud e IA hasta productos full stack y algún juego 3D. Siempre aprendiendo, siempre entregando. Actualmente Cloud & AI Specialist Intern en Microsoft.',
      ctaWork: 'Ver proyectos',
      ctaCv: 'Descargar CV',
      ctaContact: 'Hablemos',
      scroll: 'Desliza',
    },
    about: {
      kicker: 'Sobre mí',
      heading: 'Ingeniero Informático al que le encanta crear',
      body: [
        'Soy Ingeniero Informático y disfruto de todo el stack: cloud e IA, backend, frontend y todo lo que hay en medio. Diseño sistemas escalables, construyo agentes de IA y RAG, y desarrollo productos de principio a fin.',
        'Fuera del trabajo me vas a encontrar creando juegos 3D, trasteando con proyectos de IA y aprendiendo lo que se me cruce. Curioso, proactivo y con ganas, me importa la ingeniería limpia y el impacto real.',
      ],
      stats: [
        { value: '9+', label: 'Proyectos creados' },
        { value: '3', label: 'Certificaciones Microsoft' },
        { value: '1.087', label: 'Tests en mi TFG' },
        { value: 'C1', label: 'Nivel de inglés' },
      ],
    },
    experience: {
      kicker: 'Experiencia',
      heading: 'Dónde he trabajado',
      items: [
        {
          role: 'Cloud & AI Specialist Intern',
          org: 'Microsoft',
          date: 'Ene 2026 - Actualidad',
          tag: 'Cloud e IA',
          logo: 'microsoft',
          bullets: [
            'Diseño y optimizo arquitecturas cloud escalables en Azure para clientes empresariales.',
            'Impulso iniciativas de IA, modernización de aplicaciones y adopción cloud.',
            'Documento soluciones y colaboro con equipos multidisciplinares.',
          ],
        },
        {
          role: 'Técnico de Ciberseguridad',
          org: 'Tata Consultancy Services - Roche Farma',
          date: 'Jun 2022 - Ago 2022',
          tag: 'Seguridad',
          logo: 'tcs',
          bullets: [
            'Administré permisos de servidores y privilegios con mínimo privilegio.',
            'Revisé certificados de seguridad y audité accesos para cumplimiento.',
          ],
        },
        {
          role: 'Técnico de Global Operations Center',
          org: 'Tata Consultancy Services - Roche Farma',
          date: 'Mar 2022 - Jun 2022',
          tag: 'Operaciones',
          logo: 'tcs',
          bullets: [
            'Diagnostiqué y resolví incidencias en infraestructura global, reduciendo la inactividad.',
            'Atendí a clientes internacionales de principio a fin.',
          ],
        },
      ],
    },
    education: {
      kicker: 'Formación',
      heading: 'Formación académica',
      items: [
        {
          role: 'Grado en Ingeniería Informática, Sistemas de la Información',
          org: 'Universidad de Castilla-La Mancha',
          date: '2022 - 2026',
          tag: 'Graduado en julio de 2026',
          logo: 'uclm',
          bullets: [
            'Arquitecturas distribuidas, tecnologías cloud, fundamentos de IA y automatización de procesos.',
            'TFG: Entangle, mapeo y análisis del ecosistema de computación cuántica en GitHub.',
          ],
        },
        {
          role: 'Técnico en Administración de Sistemas Informáticos en Red',
          org: 'IES Arciprestre de Hita',
          date: '2020 - 2022',
          tag: 'Sistemas',
          logo: 'ies',
          bullets: ['Linux y Windows Server, Active Directory, redes y servicios web.'],
        },
      ],
    },
    work: {
      kicker: 'Trabajo seleccionado',
      heading: 'Cosas que he construido',
      sub: 'Desde mi TFG hasta demos profesionales de IA y proyectos personales. Filtra y explora.',
      featuredLabel: 'Proyecto destacado',
      filters: { all: 'Todos', work: 'Profesional', personal: 'Personal' },
      liveLabel: 'En vivo',
      liveDemo: 'Demo en vivo',
      livePreview: 'Vista en vivo',
      openLive: 'Abrir demo en vivo',
      viewCode: 'Ver código',
      featuresLabel: 'Características',
      highlightsLabel: 'Aspectos destacados',
      techLabel: 'Construido con',
      projects: projectsES(),
      more: 'Ver todo en GitHub',
    },
    skills: {
      kicker: 'Herramientas',
      heading: 'Tecnologías con las que construyo',
      sub: 'Las herramientas a las que recurro, de cloud y backend a frontend y 3D.',
      concepts: 'Y conceptos con los que trabajo',
      conceptItems: ['Arquitectura Cloud', 'Agentes de IA', 'RAG', 'Microservicios', 'CI/CD', 'Ciberseguridad', 'Análisis de Datos'],
    },
    certs: {
      kicker: 'Certificaciones',
      heading: 'Credenciales verificadas',
      sub: 'Certificado por Microsoft. Pulsa cualquier insignia para verificar en Microsoft Learn.',
      verify: 'Verificar en Microsoft Learn',
      items: [
        { code: 'AZ-900', name: 'Azure Fundamentals', url: 'https://learn.microsoft.com/en-us/users/angelluislaramartin-9888/credentials/4a28e43bae9bd17?ref=https%3A%2F%2Fwww.linkedin.com%2F' },
        { code: 'DP-900', name: 'Data Fundamentals', url: 'https://learn.microsoft.com/en-us/users/angelluislaramartin-9888/credentials/af6a368f9fa5ac25?ref=https%3A%2F%2Fwww.linkedin.com%2F' },
        { code: 'AI-900', name: 'AI Fundamentals', url: 'https://learn.microsoft.com/en-us/users/angelluislaramartin-9888/credentials/75ed5e0b82e24c7f?ref=https%3A%2F%2Fwww.linkedin.com%2F' },
      ],
    },
    contact: {
      kicker: 'Contacto',
      heading: 'Construyamos algo',
      body: 'Abierto a nuevas oportunidades y retos interesantes. Escríbeme y hablamos.',
      email: 'Enviar email',
      cvEn: 'CV (Inglés)',
      cvEs: 'CV (Español)',
      backTop: 'Volver arriba',
      built: 'Diseñado y construido por Angel Luis Lara Martin con React, Three.js y Framer Motion.',
    },
  },
}

export const SKILL_LOGOS: { key: string; label: string }[] = [
  { key: 'azure', label: 'Azure' },
  { key: 'aws', label: 'AWS' },
  { key: 'python', label: 'Python' },
  { key: 'typescript', label: 'TypeScript' },
  { key: 'javascript', label: 'JavaScript' },
  { key: 'react', label: 'React' },
  { key: 'java', label: 'Java' },
  { key: 'postgresql', label: 'SQL' },
  { key: 'docker', label: 'Docker' },
  { key: 'githubactions', label: 'GitHub Actions' },
  { key: 'linux', label: 'Linux' },
  { key: 'threejs', label: 'Three.js' },
  { key: 'fastapi', label: 'FastAPI' },
  { key: 'kafka', label: 'Kafka' },
  { key: 'mongodb', label: 'MongoDB' },
]

export const LINKS = {
  email: 'mailto:angelluislara@hotmail.es',
  linkedin: 'https://www.linkedin.com/in/angelllm',
  github: 'https://github.com/aangell98',
  learn: 'https://learn.microsoft.com/en-us/users/angelluislaramartin-9888/credentials?tab=credentials-tab',
  learnEs: 'https://learn.microsoft.com/es-es/users/angelluislaramartin-9888/credentials?tab=credentials-tab',
  cvEn: 'https://github.com/aangell98/aangell98/raw/main/cv/CV_EN.pdf',
  cvEs: 'https://github.com/aangell98/aangell98/raw/main/cv/CV_ES.pdf',
}
