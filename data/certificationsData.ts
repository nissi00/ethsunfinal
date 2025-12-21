// src/data/certificationsData.ts

export type Cert = {
  slug: string
  title: { fr: string; en: string; es: string }
  duration: string
  level: string
  price: string
  startDate: string
  description: string
  objectifs: string[]
  modules: { title: string; description: string }[]
  debouches: string[]
}


export const certifications: Cert[] = [
  // Management & Leadership
  {
    slug: "leadership-strategique-et-gouvernance",
    title: { fr: "Leadership Stratégique et Gouvernance", en: "Strategic Leadership and Governance", es: "Liderazgo Estratégico y Gobernanza" },
    duration: "4 semaines",
    startDate: "10 Janvier 2026",
    level: "Avancé",
    price: "1200€",
    description: "Développer le leadership stratégique et la gouvernance efficace.",
    objectifs: ["Leadership efficace", "Gestion d’équipe", "Prise de décision"],
    modules: [
    { title: "Module 1", description: "Introduction au leadership stratégique" },
    { title: "Module 2", description: "Gestion des parties prenantes" },
    { title: "Module 3", description: "Gouvernance et compliance" },
    { title: "Module 4", description: "Stratégie et innovation" },
    { title: "Module 5", description: "Projet final" }
  ],
  
    debouches: ["Manager", "Consultant", "Directeur opérationnel"]
  },
  {
    slug: "management-equipe-performance",
    title: { fr: "Management d'Équipe et Performance", en: "Team Management and Performance", es: "Gestión de Equipos y Rendimiento" },
    duration: "3 semaines",
    level: "Intermédiaire",
    price: "900€",
    description: "Optimiser la performance des équipes et la gestion managériale.",
    objectifs: ["Gestion de projet", "Motivation des équipes", "Suivi des performances"],
    startDate: "10 Janvier 2026",
     modules: [
    { title: "Module 1", description: "Introduction au leadership stratégique" },
    { title: "Module 2", description: "Gestion des parties prenantes" },
    { title: "Module 3", description: "Gouvernance et compliance" },
    { title: "Module 4", description: "Stratégie et innovation" },
    { title: "Module 5", description: "Projet final" }
  ],
  
    debouches: ["Manager", "Consultant", "Directeur opérationnel"]
  },
  {
    slug: "leadership-transformationnel",
    title: { fr: "Leadership Transformationnel", en: "Transformational Leadership", es: "Liderazgo Transformacional" },
    duration: "4 semaines",
    level: "Avancé",
    price: "1200€",
    description: "Apprendre à transformer et inspirer les organisations.",
    objectifs: ["Vision stratégique", "Innovation", "Management du changement"],
    startDate: "",
    modules: [
    { title: "Module 1", description: "Introduction au leadership stratégique" },
    { title: "Module 2", description: "Gestion des parties prenantes" },
    { title: "Module 3", description: "Gouvernance et compliance" },
    { title: "Module 4", description: "Stratégie et innovation" },
    { title: "Module 5", description: "Projet final" }
  ],
  
    debouches: ["Manager", "Consultant", "Directeur opérationnel"]
  },

  // Éthique & Conformité
  {
    slug: "ethique-professionnelle-deontologie",
    title: { fr: "Éthique Professionnelle et Déontologie", en: "Professional Ethics and Deontology", es: "Ética Profesional y Deontología" },
    duration: "3 semaines",
    level: "Fondamental",
    price: "800€",
    description: "Maîtriser les principes d’éthique professionnelle et de déontologie.",
    objectifs: ["Respect des normes", "Responsabilité", "Transparence"],
    startDate: "10 Janvier 2026",
     modules: [
    { title: "Module 1", description: "Introduction au leadership stratégique" },
    { title: "Module 2", description: "Gestion des parties prenantes" },
    { title: "Module 3", description: "Gouvernance et compliance" },
    { title: "Module 4", description: "Stratégie et innovation" },
    { title: "Module 5", description: "Projet final" }
  ],
  
    debouches: ["Manager", "Consultant", "Directeur opérationnel"]
  },
  {
    slug: "conformite-anticorruption-iso37001",
    title: { fr: "Conformité Anticorruption (ISO 37001)", en: "Anti-Corruption Compliance (ISO 37001)", es: "Cumplimiento Anticorrupción (ISO 37001)" },
    duration: "4 semaines",
    level: "Avancé",
    price: "1400€",
    description: "Comprendre et appliquer les normes ISO 37001 contre la corruption.",
    objectifs: ["Conformité réglementaire", "Audit interne", "Contrôle des risques"],
    startDate: "10 Janvier 2026",
     modules: [
    { title: "Module 1", description: "Introduction au leadership stratégique" },
    { title: "Module 2", description: "Gestion des parties prenantes" },
    { title: "Module 3", description: "Gouvernance et compliance" },
    { title: "Module 4", description: "Stratégie et innovation" },
    { title: "Module 5", description: "Projet final" }
  ],
  
    debouches: ["Manager", "Consultant", "Directeur opérationnel"]
  },
  {
    slug: "gestion-risques-controle-interne",
    title: { fr: "Gestion des Risques et Contrôle Interne", en: "Risk Management and Internal Control", es: "Gestión de Riesgos y Control Interno" },
    duration: "3 semaines",
    level: "Intermédiaire",
    price: "1000€",
    description: "Savoir identifier et gérer les risques internes d’une organisation.",
    objectifs: ["Évaluation des risques", "Procédures internes", "Reporting"],
    startDate: "10 Janvier 2026",
     modules: [
    { title: "Module 1", description: "Introduction au leadership stratégique" },
    { title: "Module 2", description: "Gestion des parties prenantes" },
    { title: "Module 3", description: "Gouvernance et compliance" },
    { title: "Module 4", description: "Stratégie et innovation" },
    { title: "Module 5", description: "Projet final" }
  ],
  
    debouches: ["Manager", "Consultant", "Directeur opérationnel"]
  },

  // Gouvernance Publique
  {
    slug: "gouvernance-publique-administration",
    title: { fr: "Gouvernance Publique et Administration", en: "Public Governance and Administration", es: "Gobernanza Pública y Administración" },
    duration: "3 semaines",
    level: "Intermédiaire",
    price: "950€",
    description: "Renforcer les pratiques de bonne gouvernance dans le secteur public.",
    objectifs: ["Gestion publique", "Politiques publiques", "Transparence"],
    startDate: "10 Janvier 2026",
     modules: [
    { title: "Module 1", description: "Introduction au leadership stratégique" },
    { title: "Module 2", description: "Gestion des parties prenantes" },
    { title: "Module 3", description: "Gouvernance et compliance" },
    { title: "Module 4", description: "Stratégie et innovation" },
    { title: "Module 5", description: "Projet final" }
  ],
  
    debouches: ["Manager", "Consultant", "Directeur opérationnel"]
  },
  {
    slug: "marches-publics-theorie-pratique",
    title: { fr: "Marchés Publics: Théorie et Pratique", en: "Public Procurement: Theory and Practice", es: "Contratación Pública: Teoría y Práctica" },
    duration: "4 semaines",
    level: "Avancé",
    price: "1300€",
    description: "Maîtriser la théorie et la pratique des marchés publics.",
    objectifs: ["Appels d’offres", "Réglementation", "Contrats publics"],
    startDate: "10 Janvier 2026",
     modules: [
    { title: "Module 1", description: "Introduction au leadership stratégique" },
    { title: "Module 2", description: "Gestion des parties prenantes" },
    { title: "Module 3", description: "Gouvernance et compliance" },
    { title: "Module 4", description: "Stratégie et innovation" },
    { title: "Module 5", description: "Projet final" }
  ],
  
    debouches: ["Manager", "Consultant", "Directeur opérationnel"]
  },
  {
    slug: "gestion-budgetaire-finances-publiques",
    title: { fr: "Gestion Budgétaire et Finances Publiques", en: "Budget Management and Public Finance", es: "Gestión Presupuestaria y Finanzas Públicas" },
    duration: "3 semaines",
    level: "Intermédiaire",
    price: "1000€",
    description: "Optimiser la gestion budgétaire et financière du secteur public.",
    objectifs: ["Budget annuel", "Contrôle des dépenses", "Audit"],
    startDate: "10 Janvier 2026",
     modules: [
    { title: "Module 1", description: "Introduction au leadership stratégique" },
    { title: "Module 2", description: "Gestion des parties prenantes" },
    { title: "Module 3", description: "Gouvernance et compliance" },
    { title: "Module 4", description: "Stratégie et innovation" },
    { title: "Module 5", description: "Projet final" }
  ],
  
    debouches: ["Manager", "Consultant", "Directeur opérationnel"]
  },

  // Ressources Humaines
  {
    slug: "mediation-professionnelle",
    title: { fr: "Médiation Professionnelle", en: "Professional Mediation", es: "Mediación Profesional" },
    duration: "4 semaines",
    level: "Avancé",
    price: "1100€",
    description: "Développer des compétences de médiation et résolution de conflits.",
    objectifs: ["Communication efficace", "Négociation", "Gestion de conflits"],
    startDate: "10 Janvier 2026",
     modules: [
    { title: "Module 1", description: "Introduction au leadership stratégique" },
    { title: "Module 2", description: "Gestion des parties prenantes" },
    { title: "Module 3", description: "Gouvernance et compliance" },
    { title: "Module 4", description: "Stratégie et innovation" },
    { title: "Module 5", description: "Projet final" }
  ],
  
    debouches: ["Manager", "Consultant", "Directeur opérationnel"]
  },
  {
    slug: "intelligence-emotionnelle-qualite-relationnelle",
    title: { fr: "Intelligence Émotionnelle et Qualité Relationnelle", en: "Emotional Intelligence and Relational Quality", es: "Inteligencia Emocional y Calidad Relacional" },
    duration: "3 semaines",
    level: "Intermédiaire",
    price: "900€",
    description: "Améliorer les relations professionnelles et la gestion des émotions.",
    objectifs: ["Écoute active", "Empathie", "Relations interpersonnelles"],
    startDate: "10 Janvier 2026",
     modules: [
    { title: "Module 1", description: "Introduction au leadership stratégique" },
    { title: "Module 2", description: "Gestion des parties prenantes" },
    { title: "Module 3", description: "Gouvernance et compliance" },
    { title: "Module 4", description: "Stratégie et innovation" },
    { title: "Module 5", description: "Projet final" }
  ],
  
    debouches: ["Manager", "Consultant", "Directeur opérationnel"]
  },
  {
    slug: "gestion-ressources-humaines-modernes",
    title: { fr: "Gestion des Ressources Humaines Modernes", en: "Modern Human Resources Management", es: "Gestión Moderna de Recursos Humanos" },
    duration: "4 semaines",
    level: "Intermédiaire",
    price: "1200€",
    description: "Optimiser la gestion moderne du capital humain.",
    objectifs: ["Recrutement", "Développement des talents", "Climat social"],
    startDate: "10 Janvier 2026",
     modules: [
    { title: "Module 1", description: "Introduction au leadership stratégique" },
    { title: "Module 2", description: "Gestion des parties prenantes" },
    { title: "Module 3", description: "Gouvernance et compliance" },
    { title: "Module 4", description: "Stratégie et innovation" },
    { title: "Module 5", description: "Projet final" }
  ],
  
    debouches: ["Manager", "Consultant", "Directeur opérationnel"]
  },

  // Digitalisation
  {
    slug: "transformation-numerique-organisations",
    title: { fr: "Transformation Numérique des Organisations", en: "Digital Transformation of Organizations", es: "Transformación Digital de Organizaciones" },
    duration: "4 semaines",
    level: "Avancé",
    price: "1400€",
    description: "Accompagner la transformation numérique des organisations.",
    objectifs: ["Digitalisation", "Innovation", "Outils numériques"],
    startDate: "10 Janvier 2026",
     modules: [
    { title: "Module 1", description: "Introduction au leadership stratégique" },
    { title: "Module 2", description: "Gestion des parties prenantes" },
    { title: "Module 3", description: "Gouvernance et compliance" },
    { title: "Module 4", description: "Stratégie et innovation" },
    { title: "Module 5", description: "Projet final" }
  ],
  
    debouches: ["Manager", "Consultant", "Directeur opérationnel"]
  },
  {
    slug: "intelligence-artificielle-appliquee",
    title: { fr: "Intelligence Artificielle Appliquée", en: "Applied Artificial Intelligence", es: "Inteligencia Artificial Aplicada" },
    duration: "4 semaines",
    level: "Avancé",
    price: "1500€",
    description: "Appliquer l’IA pour améliorer les processus et décisions.",
    objectifs: ["Machine Learning", "Automatisation", "Optimisation"],
    startDate: "10 Janvier 2026",
     modules: [
    { title: "Module 1", description: "Introduction au leadership stratégique" },
    { title: "Module 2", description: "Gestion des parties prenantes" },
    { title: "Module 3", description: "Gouvernance et compliance" },
    { title: "Module 4", description: "Stratégie et innovation" },
    { title: "Module 5", description: "Projet final" }
  ],
  
    debouches: ["Manager", "Consultant", "Directeur opérationnel"]
  },
  {
    slug: "cybersecurite-resilience",
    title: { fr: "Cybersécurité et Résilience", en: "Cybersecurity and Resilience", es: "Ciberseguridad y Resiliencia" },
    duration: "4 semaines",
    level: "Avancé",
    price: "1400€",
    description: "Protéger les systèmes et données contre les cybermenaces.",
    objectifs: ["Sécurité réseau", "Protection des données", "Plan de continuité"],
    startDate: "10 Janvier 2026",
     modules: [
    { title: "Module 1", description: "Introduction au leadership stratégique" },
    { title: "Module 2", description: "Gestion des parties prenantes" },
    { title: "Module 3", description: "Gouvernance et compliance" },
    { title: "Module 4", description: "Stratégie et innovation" },
    { title: "Module 5", description: "Projet final" }
  ],
  
    debouches: ["Manager", "Consultant", "Directeur opérationnel"]
  },

  // Immobilier & Construction
  {
    slug: "gestion-projet-immobilier",
    title: { fr: "Gestion de Projet Immobilier", en: "Real Estate Project Management", es: "Gestión de Proyectos Inmobiliarios" },
    duration: "4 semaines",
    level: "Avancé",
    price: "1300€",
    description: "Planifier et gérer efficacement des projets immobiliers.",
    objectifs: ["Planification", "Réglementation", "Suivi de chantier"],
    startDate: "10 Janvier 2026",
     modules: [
    { title: "Module 1", description: "Introduction au leadership stratégique" },
    { title: "Module 2", description: "Gestion des parties prenantes" },
    { title: "Module 3", description: "Gouvernance et compliance" },
    { title: "Module 4", description: "Stratégie et innovation" },
    { title: "Module 5", description: "Projet final" }
  ],
  
    debouches: ["Manager", "Consultant", "Directeur opérationnel"]
  },
  {
    slug: "investissement-immobilier",
    title: { fr: "Investissement Immobilier", en: "Real Estate Investment", es: "Inversión Inmobiliaria" },
    duration: "3 semaines",
    level: "Intermédiaire",
    price: "1100€",
    description: "Apprendre à investir efficacement dans l’immobilier.",
    objectifs: ["Analyse financière", "Stratégie d’investissement", "Rentabilité"],
    startDate: "10 Janvier 2026",
     modules: [
    { title: "Module 1", description: "Introduction au leadership stratégique" },
    { title: "Module 2", description: "Gestion des parties prenantes" },
    { title: "Module 3", description: "Gouvernance et compliance" },
    { title: "Module 4", description: "Stratégie et innovation" },
    { title: "Module 5", description: "Projet final" }
  ],
  
    debouches: ["Manager", "Consultant", "Directeur opérationnel"]
  },
  {
    slug: "gestion-locative-maintenance",
    title: { fr: "Gestion Locative et Maintenance", en: "Rental Management and Maintenance", es: "Gestión de Alquileres y Mantenimiento" },
    duration: "3 semaines",
    level: "Intermédiaire",
    price: "900€",
    description: "Assurer la gestion et maintenance des biens locatifs.",
    objectifs: ["Gestion locative", "Maintenance", "Satisfaction des locataires"],
    startDate: "10 Janvier 2026",
     modules: [
    { title: "Module 1", description: "Introduction au leadership stratégique" },
    { title: "Module 2", description: "Gestion des parties prenantes" },
    { title: "Module 3", description: "Gouvernance et compliance" },
    { title: "Module 4", description: "Stratégie et innovation" },
    { title: "Module 5", description: "Projet final" }
  ],
  
    debouches: ["Manager", "Consultant", "Directeur opérationnel"]
  },

  // Tourisme & Hôtellerie
  {
    slug: "management-touristique",
    title: { fr: "Management Touristique", en: "Tourism Management", es: "Gestión Turística" },
    duration: "4 semaines",
    level: "Intermédiaire",
    price: "1100€",
    description: "Optimiser la gestion des structures touristiques.",
    objectifs: ["Organisation touristique", "Expérience client", "Marketing"],
    startDate: "10 Janvier 2026",
     modules: [
    { title: "Module 1", description: "Introduction au leadership stratégique" },
    { title: "Module 2", description: "Gestion des parties prenantes" },
    { title: "Module 3", description: "Gouvernance et compliance" },
    { title: "Module 4", description: "Stratégie et innovation" },
    { title: "Module 5", description: "Projet final" }
  ],
  
    debouches: ["Manager", "Consultant", "Directeur opérationnel"]
  },
  {
    slug: "qualite-service-hotelier",
    title: { fr: "Qualité de Service Hôtelier", en: "Hotel Service Quality", es: "Calidad del Servicio Hotelero" },
    duration: "3 semaines",
    level: "Intermédiaire",
    price: "950€",
    description: "Améliorer la qualité de service et la satisfaction client.",
    objectifs: ["Service client", "Standards hôteliers", "Formation du personnel"],
    startDate: "10 Janvier 2026",
     modules: [
    { title: "Module 1", description: "Introduction au leadership stratégique" },
    { title: "Module 2", description: "Gestion des parties prenantes" },
    { title: "Module 3", description: "Gouvernance et compliance" },
    { title: "Module 4", description: "Stratégie et innovation" },
    { title: "Module 5", description: "Projet final" }
  ],
  
    debouches: ["Manager", "Consultant", "Directeur opérationnel"]
  },
  {
    slug: "marketing-territorial",
    title: { fr: "Marketing Territorial", en: "Territorial Marketing", es: "Marketing Territorial" },
    duration: "3 semaines",
    level: "Intermédiaire",
    price: "900€",
    description: "Développer et promouvoir l’attractivité touristique d’un territoire.",
    objectifs: ["Marketing local", "Promotion touristique", "Stratégie digitale"],
    startDate: "10 Janvier 2026",
     modules: [
    { title: "Module 1", description: "Introduction au leadership stratégique" },
    { title: "Module 2", description: "Gestion des parties prenantes" },
    { title: "Module 3", description: "Gouvernance et compliance" },
    { title: "Module 4", description: "Stratégie et innovation" },
    { title: "Module 5", description: "Projet final" }
  ],
  
    debouches: ["Manager", "Consultant", "Directeur opérationnel"]
  },

  // Entrepreneuriat
  {
    slug: "creation-entreprise",
    title: { fr: "Création d'Entreprise", en: "Business Creation", es: "Creación de Empresas" },
    duration: "3 semaines",
    level: "Fondamental",
    price: "850€",
    description: "Créer et lancer une entreprise rentable et viable.",
    objectifs: ["Business model", "Plan d’affaires", "Financement"],
    startDate: "10 Janvier 2026",
     modules: [
    { title: "Module 1", description: "Introduction au leadership stratégique" },
    { title: "Module 2", description: "Gestion des parties prenantes" },
    { title: "Module 3", description: "Gouvernance et compliance" },
    { title: "Module 4", description: "Stratégie et innovation" },
    { title: "Module 5", description: "Projet final" }
  ],
  
    debouches: ["Manager", "Consultant", "Directeur opérationnel"]
  },
  {
    slug: "internationalisation-pme",
    title: { fr: "Internationalisation des PME", en: "SME Internationalization", es: "Internacionalización de PYMES" },
    duration: "4 semaines",
    level: "Avancé",
    price: "1200€",
    description: "Développer les PME à l’international.",
    objectifs: ["Export", "Stratégie globale", "Partenariats internationaux"],
    startDate: "10 Janvier 2026",
     modules: [
    { title: "Module 1", description: "Introduction au leadership stratégique" },
    { title: "Module 2", description: "Gestion des parties prenantes" },
    { title: "Module 3", description: "Gouvernance et compliance" },
    { title: "Module 4", description: "Stratégie et innovation" },
    { title: "Module 5", description: "Projet final" }
  ],
  
    debouches: ["Manager", "Consultant", "Directeur opérationnel"]
  },
  {
    slug: "levee-fonds-partenariats",
    title: { fr: "Levée de Fonds et Partenariats", en: "Fundraising and Partnerships", es: "Recaudación de Fondos y Alianzas" },
    duration: "3 semaines",
    level: "Avancé",
    price: "1100€",
    description: "Obtenir des financements et développer des partenariats stratégiques.",
    objectifs: ["Levée de fonds", "Investisseurs", "Partenariats"],
    startDate: "10 Janvier 2026",
     modules: [
    { title: "Module 1", description: "Introduction au leadership stratégique" },
    { title: "Module 2", description: "Gestion des parties prenantes" },
    { title: "Module 3", description: "Gouvernance et compliance" },
    { title: "Module 4", description: "Stratégie et innovation" },
    { title: "Module 5", description: "Projet final" }
  ],
  
    debouches: ["Manager", "Consultant", "Directeur opérationnel"]
  },
]

export default certifications
