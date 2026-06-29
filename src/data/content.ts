export type Lang = 'en' | 'es'

export interface ProjectItem {
  name: string
  blurb: string
  tags: string[]
  metrics?: string[]
  href: string
  accent: string
}

export interface ExpItem {
  role: string
  org: string
  date: string
  bullets: string[]
  tag: string
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
  work: { kicker: string; heading: string; sub: string; projects: ProjectItem[]; more: string }
  skills: { kicker: string; heading: string; groups: { title: string; items: string[] }[] }
  certs: { kicker: string; heading: string; sub: string; verify: string; items: { code: string; name: string }[] }
  contact: {
    kicker: string
    heading: string
    body: string
    email: string
    cv: string
    cvEn: string
    cvEs: string
    backTop: string
    built: string
  }
}

const PROJECTS_EN: ProjectItem[] = [
  {
    name: 'Entangle',
    blurb:
      'Bachelor\'s Thesis. A config-driven AI agent (6 workers) with RAG that maps, analyzes and visualizes the open-source quantum computing ecosystem on GitHub.',
    tags: ['Python', 'RAG', 'Azure OpenAI', 'Cosmos DB', 'React'],
    metrics: ['96.7% routing', '1,087 tests', '0.96 modularity'],
    href: 'https://github.com/Angel-TFG-UCLM/Entangle-Core',
    accent: '#46C7E0',
  },
  {
    name: 'insurance-ai-agents',
    blurb: 'Multi-agent AI claims processing for insurance. Governed, secure and auditable, built on Azure OpenAI.',
    tags: ['TypeScript', 'Multi-agent', 'Azure OpenAI'],
    metrics: ['Governed', 'Auditable'],
    href: 'https://github.com/aangell98/insurance-ai-agents',
    accent: '#7fa6ff',
  },
  {
    name: 'sales-cockpit-ai-agents',
    blurb: 'White-label agentic sales cockpit plus a Copilot inside Microsoft Teams for relationship bankers.',
    tags: ['TypeScript', 'Agent Framework', 'Teams'],
    metrics: ['White-label', 'Copilot'],
    href: 'https://github.com/aangell98/sales-cockpit-ai-agents',
    accent: '#46C7E0',
  },
  {
    name: 'policyforge',
    blurb: 'The AI policy and compliance factory. Turns regulatory change into an explainable, auditable diff in one pass.',
    tags: ['TypeScript', 'Compliance', 'Azure OpenAI'],
    metrics: ['Explainable', 'Traceable'],
    href: 'https://github.com/aangell98/policyforge',
    accent: '#9b8cff',
  },
  {
    name: 'cart-recovery-ai-agents',
    blurb: 'Omnichannel AI agent that recovers abandoned carts and quotes in real time. React, FastAPI and Azure OpenAI.',
    tags: ['React', 'FastAPI', 'Azure OpenAI'],
    metrics: ['Omnichannel', 'Real-time'],
    href: 'https://github.com/aangell98/cart-recovery-ai-agents',
    accent: '#5fe0c8',
  },
  {
    name: 'sceneforge',
    blurb: 'From a creative brief to a navigable 3D scene in minutes. Coherent art direction, cinematic light and guided camera.',
    tags: ['TypeScript', '3D', 'Azure-ready'],
    metrics: ['Offline mock', 'White-label'],
    href: 'https://github.com/aangell98/sceneforge',
    accent: '#46C7E0',
  },
]

const PROJECTS_ES: ProjectItem[] = [
  {
    name: 'Entangle',
    blurb:
      'Trabajo Fin de Grado. Agente de IA config-driven (6 workers) con RAG que mapea, analiza y visualiza el ecosistema open source de computación cuántica en GitHub.',
    tags: ['Python', 'RAG', 'Azure OpenAI', 'Cosmos DB', 'React'],
    metrics: ['96,7% enrutado', '1.087 tests', '0,96 modularidad'],
    href: 'https://github.com/Angel-TFG-UCLM/Entangle-Core',
    accent: '#46C7E0',
  },
  {
    name: 'insurance-ai-agents',
    blurb: 'Procesamiento multiagente de siniestros de seguros. Gobernado, seguro y auditable, sobre Azure OpenAI.',
    tags: ['TypeScript', 'Multiagente', 'Azure OpenAI'],
    metrics: ['Gobernado', 'Auditable'],
    href: 'https://github.com/aangell98/insurance-ai-agents',
    accent: '#7fa6ff',
  },
  {
    name: 'sales-cockpit-ai-agents',
    blurb: 'Cockpit comercial agentico white-label y un Copilot dentro de Microsoft Teams para banqueros.',
    tags: ['TypeScript', 'Agent Framework', 'Teams'],
    metrics: ['White-label', 'Copilot'],
    href: 'https://github.com/aangell98/sales-cockpit-ai-agents',
    accent: '#46C7E0',
  },
  {
    name: 'policyforge',
    blurb: 'La fábrica de políticas y cumplimiento con IA. Convierte el cambio normativo en un diff explicable y auditable.',
    tags: ['TypeScript', 'Compliance', 'Azure OpenAI'],
    metrics: ['Explicable', 'Trazable'],
    href: 'https://github.com/aangell98/policyforge',
    accent: '#9b8cff',
  },
  {
    name: 'cart-recovery-ai-agents',
    blurb: 'Agente de IA omnicanal que recupera carritos y presupuestos abandonados en tiempo real. React, FastAPI y Azure OpenAI.',
    tags: ['React', 'FastAPI', 'Azure OpenAI'],
    metrics: ['Omnicanal', 'Tiempo real'],
    href: 'https://github.com/aangell98/cart-recovery-ai-agents',
    accent: '#5fe0c8',
  },
  {
    name: 'sceneforge',
    blurb: 'De un brief creativo a una escena 3D navegable en minutos. Dirección de arte coherente, luz cinematográfica y cámara guiada.',
    tags: ['TypeScript', '3D', 'Azure-ready'],
    metrics: ['Mock offline', 'White-label'],
    href: 'https://github.com/aangell98/sceneforge',
    accent: '#46C7E0',
  },
]

export const CONTENT: Record<Lang, Content> = {
  en: {
    nav: { home: 'Home', about: 'About', work: 'Work', experience: 'Experience', skills: 'Skills', contact: 'Contact' },
    hero: {
      badge: 'Open to opportunities',
      titleA: 'Ángel Luis',
      titleB: 'Lara Martín',
      roles: ['Computer Engineer', 'Cloud & AI Specialist', 'AI Agents & RAG', 'Azure Architect'],
      intro:
        'I build cloud architectures, AI agents and RAG systems that turn complex problems into measurable value. Currently a Cloud & AI Specialist Intern at Microsoft.',
      ctaWork: 'View my work',
      ctaCv: 'Download CV',
      ctaContact: 'Get in touch',
      scroll: 'Scroll',
    },
    about: {
      kicker: 'About',
      heading: 'Engineering value with Cloud and AI',
      body: [
        'I am a Computer Engineer specialized in Cloud and AI. I design scalable architectures on Azure and AWS, build multi-agent and RAG systems, and ship full stack products end to end.',
        'Proactive, curious and a fast learner. I care about clean engineering, measurable impact and experiences that feel effortless.',
      ],
      stats: [
        { value: '6+', label: 'AI projects shipped' },
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
          bullets: ['Linux and Windows Server, Active Directory, networking and web services.'],
        },
      ],
    },
    work: {
      kicker: 'Selected work',
      heading: 'Projects I am proud of',
      sub: 'A selection of AI, cloud and full stack projects. More on my GitHub.',
      projects: PROJECTS_EN,
      more: 'See all on GitHub',
    },
    skills: {
      kicker: 'Toolbox',
      heading: 'Skills and technologies',
      groups: [
        { title: 'Cloud & AI', items: ['Microsoft Azure', 'AWS', 'Azure OpenAI', 'RAG', 'AI Agents', 'Cloud Architecture'] },
        { title: 'Languages & Frameworks', items: ['Python', 'TypeScript', 'JavaScript', 'React', 'Java', 'SQL'] },
        { title: 'Systems & DevOps', items: ['Linux', 'Windows Server', 'Docker', 'GitHub Actions', 'Cybersecurity'] },
      ],
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
      body: 'Open to opportunities in Cloud and AI. Reach out and let us talk.',
      email: 'Email me',
      cv: 'Download CV',
      cvEn: 'CV (English)',
      cvEs: 'CV (Spanish)',
      backTop: 'Back to top',
      built: 'Designed and built by Ángel Luis Lara Martín with React, Three.js and Framer Motion.',
    },
  },
  es: {
    nav: { home: 'Inicio', about: 'Sobre mi', work: 'Proyectos', experience: 'Experiencia', skills: 'Skills', contact: 'Contacto' },
    hero: {
      badge: 'Abierto a oportunidades',
      titleA: 'Ángel Luis',
      titleB: 'Lara Martín',
      roles: ['Ingeniero Informático', 'Especialista Cloud & IA', 'Agentes de IA & RAG', 'Arquitecto Azure'],
      intro:
        'Construyo arquitecturas cloud, agentes de IA y sistemas RAG que convierten problemas complejos en valor medible. Actualmente Cloud & AI Specialist Intern en Microsoft.',
      ctaWork: 'Ver proyectos',
      ctaCv: 'Descargar CV',
      ctaContact: 'Hablemos',
      scroll: 'Desliza',
    },
    about: {
      kicker: 'Sobre mi',
      heading: 'Generando valor con Cloud e IA',
      body: [
        'Soy Ingeniero Informático especializado en Cloud e IA. Diseño arquitecturas escalables en Azure y AWS, construyo sistemas multiagente y RAG, y desarrollo productos full stack de principio a fin.',
        'Proactivo, curioso y con gran capacidad de aprendizaje. Me importa la ingeniería limpia, el impacto medible y las experiencias que se sienten naturales.',
      ],
      stats: [
        { value: '6+', label: 'Proyectos de IA' },
        { value: '3', label: 'Certificaciones Microsoft' },
        { value: '1.087', label: 'Tests en mi TFG' },
        { value: 'C1', label: 'Nivel de ingles' },
      ],
    },
    experience: {
      kicker: 'Experiencia',
      heading: 'Donde he trabajado',
      items: [
        {
          role: 'Cloud & AI Specialist Intern',
          org: 'Microsoft',
          date: 'Ene 2026 - Actualidad',
          tag: 'Cloud & IA',
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
          bullets: [
            'Diagnostiqué y resolví incidencias en infraestructura global, reduciendo la inactividad.',
            'Atendí a clientes internacionales de principio a fin.',
          ],
        },
      ],
    },
    education: {
      kicker: 'Formacion',
      heading: 'Formación académica',
      items: [
        {
          role: 'Grado en Ingeniería Informática, Sistemas de la Información',
          org: 'Universidad de Castilla-La Mancha',
          date: '2022 - 2026',
          tag: 'Graduado en julio de 2026',
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
          bullets: ['Linux y Windows Server, Active Directory, redes y servicios web.'],
        },
      ],
    },
    work: {
      kicker: 'Trabajo seleccionado',
      heading: 'Proyectos de los que estoy orgulloso',
      sub: 'Una selección de proyectos de IA, cloud y full stack. Más en mi GitHub.',
      projects: PROJECTS_ES,
      more: 'Ver todo en GitHub',
    },
    skills: {
      kicker: 'Herramientas',
      heading: 'Aptitudes y tecnologias',
      groups: [
        { title: 'Cloud e IA', items: ['Microsoft Azure', 'AWS', 'Azure OpenAI', 'RAG', 'Agentes de IA', 'Arquitectura Cloud'] },
        { title: 'Lenguajes y Frameworks', items: ['Python', 'TypeScript', 'JavaScript', 'React', 'Java', 'SQL'] },
        { title: 'Sistemas y DevOps', items: ['Linux', 'Windows Server', 'Docker', 'GitHub Actions', 'Ciberseguridad'] },
      ],
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
      body: 'Abierto a oportunidades en Cloud e IA. Escríbeme y hablamos.',
      email: 'Enviar email',
      cv: 'Descargar CV',
      cvEn: 'CV (Ingles)',
      cvEs: 'CV (Español)',
      backTop: 'Volver arriba',
      built: 'Diseñado y construido por Ángel Luis Lara Martín con React, Three.js y Framer Motion.',
    },
  },
}

export const LINKS = {
  email: 'mailto:angelluislara@hotmail.es',
  linkedin: 'https://www.linkedin.com/in/angelllm',
  github: 'https://github.com/aangell98',
  learn: 'https://learn.microsoft.com/en-us/users/angelluislaramartin-9888/credentials?tab=credentials-tab',
  learnEs: 'https://learn.microsoft.com/es-es/users/angelluislaramartin-9888/credentials?tab=credentials-tab',
  cvEn: 'https://github.com/aangell98/aangell98/raw/main/cv/CV_EN.pdf',
  cvEs: 'https://github.com/aangell98/aangell98/raw/main/cv/CV_ES.pdf',
}
