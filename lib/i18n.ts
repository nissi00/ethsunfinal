export type Locale = "en" | "fr" | "es"

export const translations = {
  en: {
    nav: {
      home: "Home",
      certifications: "Certifications",
      events: "Events",
      corporateAcademies: "Corporate Academies",
      franchise: "Franchise",
      resources: "Resources",
      about: "About",
      contact: "Contact",
      learnerSpace: "Learner Space",
    },
    home: {
      title: "ETHSUN Executive Education Oxford",
      subtitle: "Training, Certification and Organizational Transformation",
      intro:
        "ETHSUN Executive Education Oxford is an international institution specialized in professional training, the design of online certification programs and the creation of digital academies for businesses, public organizations and institutions. Based in Oxford, we deploy an executive education model founded on academic rigor, pedagogical innovation and international quality.",
      certifications: {
        title: "Online Certification Programs",
        desc: "Recognized professional certificates, accessible worldwide, delivered via our LMS platform.",
      },
      events: {
        title: "Professional Events",
        desc: "High-impact institutional and commercial events organized by our franchises.",
      },
      academies: {
        title: "Corporate Academies",
        desc: "We design and deploy complete digital academies for companies.",
      },
      franchise: {
        title: "Become an ETHSUN Franchisee",
        desc: "Access a proven premium training model and develop a highly profitable training center.",
      },
      presence: {
        title: "International Presence",
        desc: "A network established in Africa, Europe, and Asia, structured around academic governance centralized in Oxford.",
      },
    },
    footer: {
      tagline: "Excellence in Executive Education",
      contact: "Contact",
      email: "Email",
      phone: "Phone",
      address: "Address",
      oxford: "Oxford, United Kingdom",
      links: "Quick Links",
      legal: "Legal",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      rights: "All rights reserved.",
    },
    cta: {
      learnMore: "Learn More",
      viewAll: "View All",
      register: "Register",
      contact: "Contact Us",
      apply: "Apply Now",
      download: "Download Catalog",
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      certifications: "Certifications",
      events: "Événements",
      corporateAcademies: "Académies d'Entreprise",
      franchise: "Franchise",
      resources: "Ressources",
      about: "À Propos",
      contact: "Contact",
      learnerSpace: "Espace Apprenant",
    },
    home: {
      title: "ETHSUN Executive Education Oxford",
      subtitle: "Formation, Certification et Transformation des Organisations",
      intro:
        "ETHSUN Executive Education Oxford est une institution internationale spécialisée dans la formation professionnelle, la conception de programmes certifiants en ligne et la création d'académies digitales pour les entreprises, organisations publiques et institutions. Basée à Oxford, nous déployons un modèle d'éducation executive fondé sur la rigueur académique, l'innovation pédagogique et la qualité internationale.",
      certifications: {
        title: "Programmes Certifiants en Ligne",
        desc: "Des certificats professionnels reconnus, accessibles partout dans le monde, délivrés via notre plateforme LMS.",
      },
      events: {
        title: "Événements Professionnels",
        desc: "Des événements institutionnels et commerciaux à fort impact organisés par nos franchises.",
      },
      academies: {
        title: "Académies d'Entreprise",
        desc: "Nous concevons et déployons des académies digitales complètes pour les entreprises.",
      },
      franchise: {
        title: "Devenir Franchisé ETHSUN",
        desc: "Accédez à un modèle éprouvé de formation premium et développez un centre de formation à forte rentabilité.",
      },
      presence: {
        title: "Présence Internationale",
        desc: "Un réseau implanté en Afrique, Europe, Asie, structuré autour d'une gouvernance académique centralisée à Oxford.",
      },
    },
    footer: {
      tagline: "Excellence en Éducation Executive",
      contact: "Contact",
      email: "Email",
      phone: "Téléphone",
      address: "Adresse",
      oxford: "Oxford, Royaume-Uni",
      links: "Liens Rapides",
      legal: "Légal",
      privacy: "Politique de Confidentialité",
      terms: "Conditions d'Utilisation",
      rights: "Tous droits réservés.",
    },
    cta: {
      learnMore: "En Savoir Plus",
      viewAll: "Voir Tout",
      register: "S'Inscrire",
      contact: "Nous Contacter",
      apply: "Postuler",
      download: "Télécharger le Catalogue",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      certifications: "Certificaciones",
      events: "Eventos",
      corporateAcademies: "Academias Corporativas",
      franchise: "Franquicia",
      resources: "Recursos",
      about: "Acerca De",
      contact: "Contacto",
      learnerSpace: "Espacio del Estudiante",
    },
    home: {
      title: "ETHSUN Executive Education Oxford",
      subtitle: "Formación, Certificación y Transformación Organizacional",
      intro:
        "ETHSUN Executive Education Oxford es una institución internacional especializada en formación profesional, diseño de programas de certificación en línea y creación de academias digitales para empresas, organizaciones públicas e instituciones. Con sede en Oxford, implementamos un modelo de educación ejecutiva basado en rigor académico, innovación pedagógica y calidad internacional.",
      certifications: {
        title: "Programas de Certificación en Línea",
        desc: "Certificados profesionales reconocidos, accesibles en todo el mundo, entregados a través de nuestra plataforma LMS.",
      },
      events: {
        title: "Eventos Profesionales",
        desc: "Eventos institucionales y comerciales de alto impacto organizados por nuestras franquicias.",
      },
      academies: {
        title: "Academias Corporativas",
        desc: "Diseñamos e implementamos academias digitales completas para empresas.",
      },
      franchise: {
        title: "Conviértase en Franquiciado ETHSUN",
        desc: "Acceda a un modelo probado de formación premium y desarrolle un centro de formación altamente rentable.",
      },
      presence: {
        title: "Presencia Internacional",
        desc: "Una red establecida en África, Europa y Asia, estructurada en torno a una gobernanza académica centralizada en Oxford.",
      },
    },
    footer: {
      tagline: "Excelencia en Educación Ejecutiva",
      contact: "Contacto",
      email: "Email",
      phone: "Teléfono",
      address: "Dirección",
      oxford: "Oxford, Reino Unido",
      links: "Enlaces Rápidos",
      legal: "Legal",
      privacy: "Política de Privacidad",
      terms: "Términos de Servicio",
      rights: "Todos los derechos reservados.",
    },
    cta: {
      learnMore: "Saber Más",
      viewAll: "Ver Todo",
      register: "Registrarse",
      contact: "Contáctenos",
      apply: "Aplicar Ahora",
      download: "Descargar Catálogo",
    },
  },
}

export function getTranslation(locale: Locale) {
  return translations[locale] || translations.en
}
