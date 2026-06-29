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
  tags: string[]
  metrics?: string[]
  icon?: string
  logo?: string
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
    projects: ProjectItem[]
    more: string
  }
  skills: { kicker: string; heading: string; sub: string; concepts: string; conceptItems: string[] }
  certs: { kicker: string; heading: string; sub: string; verify: string; items: { code: string; name: string }[] }
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
      tags: ['Python', 'RAG', 'Azure OpenAI', 'Cosmos DB', 'React'],
      metrics: ['96.7% routing accuracy', '1,087 tests', '0.96 modularity', '2 repositories'],
      logo: 'projects/entangle.png',
      category: 'flagship',
      repos: ENTANGLE_REPOS,
      accent: '#8b5cf6',
    },
    {
      id: 'insurance',
      name: 'insurance-ai-agents',
      blurb: 'Multi-agent AI claims processing for insurance. Governed, secure and auditable, built on Azure OpenAI.',
      tags: ['TypeScript', 'Multi-agent', 'Azure OpenAI'],
      metrics: ['Governed', 'Auditable'],
      icon: 'typescript',
      category: 'work',
      repos: [{ label: 'Code', href: 'https://github.com/aangell98/insurance-ai-agents' }],
      accent: '#7fa6ff',
    },
    {
      id: 'sales-cockpit',
      name: 'sales-cockpit-ai-agents',
      blurb: 'White-label agentic sales cockpit plus a Copilot inside Microsoft Teams for relationship bankers.',
      tags: ['TypeScript', 'Agent Framework', 'Teams'],
      metrics: ['White-label', 'Copilot'],
      icon: 'typescript',
      category: 'work',
      repos: [{ label: 'Code', href: 'https://github.com/aangell98/sales-cockpit-ai-agents' }],
      accent: '#46C7E0',
    },
    {
      id: 'policyforge',
      name: 'policyforge',
      blurb: 'An AI policy and compliance factory. Turns regulatory change into an explainable, auditable diff in one pass.',
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
      tags: ['React', 'FastAPI', 'Azure OpenAI'],
      metrics: ['Omnichannel', 'Real-time'],
      icon: 'react',
      category: 'work',
      repos: [{ label: 'Code', href: 'https://github.com/aangell98/cart-recovery-ai-agents' }],
      accent: '#5fe0c8',
    },
    {
      id: 'sceneforge',
      name: 'sceneforge',
      blurb: 'From a creative brief to a navigable 3D scene in minutes. Coherent art direction, cinematic light and a guided camera.',
      tags: ['TypeScript', 'Three.js', '3D'],
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
      tags: ['TypeScript', 'React Three Fiber', 'Game', 'AI'],
      metrics: ['Playable', 'WebGL'],
      icon: 'threejs',
      category: 'personal',
      repos: [{ label: 'Code', href: 'https://github.com/aangell98/liminal' }],
      live: 'https://aangell98.github.io/liminal/',
      accent: '#ff7a59',
    },
    {
      id: 'bitcoin',
      name: 'Kafka Bitcoin Tracker',
      blurb: 'Real-time Bitcoin price and hash rate visualizer powered by Apache Kafka and Python. A weekend dive into streaming data.',
      tags: ['Python', 'Apache Kafka', 'Streaming'],
      metrics: ['Real-time', 'Streaming'],
      icon: 'kafka',
      category: 'personal',
      repos: [{ label: 'Code', href: 'https://github.com/aangell98/Kafka-Bitcoin-Tracker' }],
      accent: '#f7931a',
    },
    {
      id: 'sentiment',
      name: 'Social Sentiment Tracker',
      blurb: 'Real-time social sentiment analysis with NLP (VADER, TextBlob) and an interactive dashboard. Currently focused on Reddit.',
      tags: ['Python', 'NLP', 'Dashboard'],
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
  const es: Record<string, { blurb: string; tags?: string[]; metrics?: string[] }> = {
    entangle: {
      blurb:
        'Mi Trabajo Fin de Grado. Un agente de IA config-driven (6 workers) con RAG que mapea, analiza y visualiza el ecosistema open source de computación cuántica en GitHub. Dividido en dos repositorios: el motor Core y el Visualizer.',
      metrics: ['96,7% de acierto', '1.087 tests', '0,96 modularidad', '2 repositorios'],
    },
    insurance: {
      blurb: 'Procesamiento multiagente de siniestros de seguros. Gobernado, seguro y auditable, sobre Azure OpenAI.',
      tags: ['TypeScript', 'Multiagente', 'Azure OpenAI'],
      metrics: ['Gobernado', 'Auditable'],
    },
    'sales-cockpit': {
      blurb: 'Cockpit comercial agéntico white-label y un Copilot dentro de Microsoft Teams para banqueros.',
      tags: ['TypeScript', 'Agent Framework', 'Teams'],
      metrics: ['White-label', 'Copilot'],
    },
    policyforge: {
      blurb: 'Una fábrica de políticas y cumplimiento con IA. Convierte el cambio normativo en un diff explicable y auditable.',
      tags: ['TypeScript', 'Compliance', 'Azure OpenAI'],
      metrics: ['Explicable', 'Trazable'],
    },
    'cart-recovery': {
      blurb: 'Agente de IA omnicanal que recupera carritos y presupuestos abandonados en tiempo real. React, FastAPI y Azure OpenAI.',
      tags: ['React', 'FastAPI', 'Azure OpenAI'],
      metrics: ['Omnicanal', 'Tiempo real'],
    },
    sceneforge: {
      blurb: 'De un brief creativo a una escena 3D navegable en minutos. Dirección de arte coherente, luz cinematográfica y cámara guiada.',
      tags: ['TypeScript', 'Three.js', '3D'],
      metrics: ['Mock offline', 'White-label'],
    },
    liminal: {
      blurb: 'Un juego de terror liminal inspirado en los Backrooms que hice por diversión con React Three Fiber, con una entidad de IA que te persigue. Jugable en el navegador.',
      tags: ['TypeScript', 'React Three Fiber', 'Juego', 'IA'],
      metrics: ['Jugable', 'WebGL'],
    },
    bitcoin: {
      blurb: 'Visualizador en tiempo real del precio y hash rate de Bitcoin con Apache Kafka y Python. Una inmersión de fin de semana en streaming de datos.',
      tags: ['Python', 'Apache Kafka', 'Streaming'],
      metrics: ['Tiempo real', 'Streaming'],
    },
    sentiment: {
      blurb: 'Análisis de sentimiento en redes en tiempo real con NLP (VADER, TextBlob) y un dashboard interactivo. Actualmente enfocado en Reddit.',
      tags: ['Python', 'NLP', 'Dashboard'],
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
        { code: 'AZ-900', name: 'Azure Fundamentals' },
        { code: 'DP-900', name: 'Data Fundamentals' },
        { code: 'AI-900', name: 'AI Fundamentals' },
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
        { code: 'AZ-900', name: 'Azure Fundamentals' },
        { code: 'DP-900', name: 'Data Fundamentals' },
        { code: 'AI-900', name: 'AI Fundamentals' },
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
