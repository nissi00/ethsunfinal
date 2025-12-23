import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
    console.log("🌱 Seeding database...")

    // Create admin user
    const hashedPassword = await hash("admin123", 12)

    const adminUser = await prisma.user.upsert({
        where: { email: "admin@ethsun-oxford.uk" },
        update: {},
        create: {
            email: "admin@ethsun-oxford.uk",
            password: hashedPassword,
            name: "Admin ETHSUN",
            role: "admin",
        },
    })
    console.log("✅ Admin user created:", adminUser.email)

    // Create default site settings
    const settings = await prisma.siteSettings.upsert({
        where: { id: "main" },
        update: {},
        create: {
            id: "main",
            primaryColor: "#0A2A43",
            secondaryColor: "#153D63",
            accentColor: "#C9A44A",
            textColor: "#4A4A4A",
            bgColor: "#F5F6F7",
            contactEmail: "info@ethsun-oxford.uk",
            contactPhone: "+44 74 2420 1585",
            address: "Oxford, United Kingdom",
            adminEmail: "admin@ethsun-oxford.uk",
        },
    })
    console.log("✅ Site settings created")

    // Create default stats
    const statsData = [
        { value: "36", labelFr: "Programmes Certifiants", labelEn: "Certified Programs", labelEs: "Programas Certificados", sortOrder: 0 },
        { value: "5,000+", labelFr: "Apprenants Formés", labelEn: "Students Trained", labelEs: "Estudiantes Formados", sortOrder: 1 },
        { value: "95%", labelFr: "Taux de Satisfaction", labelEn: "Satisfaction Rate", labelEs: "Tasa de Satisfacción", sortOrder: 2 },
        { value: "12", labelFr: "Pays de Présence", labelEn: "Countries", labelEs: "Países", sortOrder: 3 },
    ]

    for (const stat of statsData) {
        await prisma.stat.create({ data: stat })
    }
    console.log("✅ Stats created:", statsData.length)

    // Create default testimonials
    const testimonialsData = [
        {
            textFr: "Le certificat ETHSUN m'a permis d'acquérir une compétence directement applicable dans mon entreprise.",
            textEn: "The ETHSUN certificate allowed me to acquire a skill directly applicable in my company.",
            author: "Jean-Marc Kouadio",
            role: "Responsable Opérations, Abidjan",
            rating: 5,
        },
        {
            textFr: "Les modules sont structurés, accessibles et très pertinents. J'ai particulièrement apprécié les études de cas.",
            textEn: "The modules are structured, accessible and very relevant. I particularly appreciated the case studies.",
            author: "Marie Diallo",
            role: "Directrice Adjointe, Dakar",
            rating: 5,
        },
        {
            textFr: "Une formation flexible, riche et très bien encadrée. Je recommande à tous les managers.",
            textEn: "A flexible, rich and very well supervised training. I recommend it to all managers.",
            author: "Pierre Dubois",
            role: "Manager RH, Genève",
            rating: 5,
        },
    ]

    for (const testimonial of testimonialsData) {
        await prisma.testimonial.create({ data: testimonial })
    }
    console.log("✅ Testimonials created:", testimonialsData.length)

    // Create certification categories
    const categoriesData = [
        { slug: "management", nameFr: "Management & Leadership", nameEn: "Management & Leadership", nameEs: "Gestión y Liderazgo", sortOrder: 0 },
        { slug: "ethics", nameFr: "Éthique & Conformité", nameEn: "Ethics & Compliance", nameEs: "Ética y Cumplimiento", sortOrder: 1 },
        { slug: "public", nameFr: "Gouvernance Publique", nameEn: "Public Governance", nameEs: "Gobernanza Pública", sortOrder: 2 },
        { slug: "hr", nameFr: "Ressources Humaines", nameEn: "Human Resources", nameEs: "Recursos Humanos", sortOrder: 3 },
        { slug: "digital", nameFr: "Digitalisation", nameEn: "Digitalization", nameEs: "Digitalización", sortOrder: 4 },
        { slug: "realestate", nameFr: "Immobilier & Construction", nameEn: "Real Estate & Construction", nameEs: "Inmobiliaria y Construcción", sortOrder: 5 },
        { slug: "tourism", nameFr: "Tourisme & Hôtellerie", nameEn: "Tourism & Hospitality", nameEs: "Turismo y Hostelería", sortOrder: 6 },
        { slug: "entrepreneurship", nameFr: "Entrepreneuriat", nameEn: "Entrepreneurship", nameEs: "Emprendimiento", sortOrder: 7 },
    ]

    const categories: { [key: string]: string } = {}
    for (const cat of categoriesData) {
        const created = await prisma.certificationCategory.upsert({
            where: { slug: cat.slug },
            update: {},
            create: cat,
        })
        categories[cat.slug] = created.id
    }
    console.log("✅ Certification categories created:", categoriesData.length)

    // Create certifications
    const certificationsData = [
        // Management & Leadership
        { slug: "leadership-strategique-et-gouvernance", categorySlug: "management", titleFr: "Leadership Stratégique et Gouvernance", titleEn: "Strategic Leadership and Governance", titleEs: "Liderazgo Estratégico y Gobernanza", duration: "4 semaines", level: "Avancé", price: "1200€", startDate: "10 Janvier 2026", descriptionFr: "Développer le leadership stratégique et la gouvernance efficace.", objectifsFr: JSON.stringify(["Leadership efficace", "Gestion d'équipe", "Prise de décision"]), debouchesFr: JSON.stringify(["Manager", "Consultant", "Directeur opérationnel"]) },
        { slug: "management-equipe-performance", categorySlug: "management", titleFr: "Management d'Équipe et Performance", titleEn: "Team Management and Performance", titleEs: "Gestión de Equipos y Rendimiento", duration: "3 semaines", level: "Intermédiaire", price: "900€", startDate: "10 Janvier 2026", descriptionFr: "Optimiser la performance des équipes et la gestion managériale.", objectifsFr: JSON.stringify(["Gestion de projet", "Motivation des équipes", "Suivi des performances"]), debouchesFr: JSON.stringify(["Manager", "Consultant", "Directeur opérationnel"]) },
        { slug: "leadership-transformationnel", categorySlug: "management", titleFr: "Leadership Transformationnel", titleEn: "Transformational Leadership", titleEs: "Liderazgo Transformacional", duration: "4 semaines", level: "Avancé", price: "1200€", startDate: "", descriptionFr: "Apprendre à transformer et inspirer les organisations.", objectifsFr: JSON.stringify(["Vision stratégique", "Innovation", "Management du changement"]), debouchesFr: JSON.stringify(["Manager", "Consultant", "Directeur opérationnel"]) },
        // Ethics & Compliance
        { slug: "ethique-professionnelle-deontologie", categorySlug: "ethics", titleFr: "Éthique Professionnelle et Déontologie", titleEn: "Professional Ethics and Deontology", titleEs: "Ética Profesional y Deontología", duration: "3 semaines", level: "Fondamental", price: "800€", startDate: "10 Janvier 2026", descriptionFr: "Maîtriser les principes d'éthique professionnelle et de déontologie.", objectifsFr: JSON.stringify(["Respect des normes", "Responsabilité", "Transparence"]), debouchesFr: JSON.stringify(["Manager", "Consultant", "Directeur opérationnel"]) },
        { slug: "conformite-anticorruption-iso37001", categorySlug: "ethics", titleFr: "Conformité Anticorruption (ISO 37001)", titleEn: "Anti-Corruption Compliance (ISO 37001)", titleEs: "Cumplimiento Anticorrupción (ISO 37001)", duration: "4 semaines", level: "Avancé", price: "1400€", startDate: "10 Janvier 2026", descriptionFr: "Comprendre et appliquer les normes ISO 37001 contre la corruption.", objectifsFr: JSON.stringify(["Conformité réglementaire", "Audit interne", "Contrôle des risques"]), debouchesFr: JSON.stringify(["Manager", "Consultant", "Directeur opérationnel"]) },
        { slug: "gestion-risques-controle-interne", categorySlug: "ethics", titleFr: "Gestion des Risques et Contrôle Interne", titleEn: "Risk Management and Internal Control", titleEs: "Gestión de Riesgos y Control Interno", duration: "3 semaines", level: "Intermédiaire", price: "1000€", startDate: "10 Janvier 2026", descriptionFr: "Savoir identifier et gérer les risques internes d'une organisation.", objectifsFr: JSON.stringify(["Évaluation des risques", "Procédures internes", "Reporting"]), debouchesFr: JSON.stringify(["Manager", "Consultant", "Directeur opérationnel"]) },
        // Public Governance
        { slug: "gouvernance-publique-administration", categorySlug: "public", titleFr: "Gouvernance Publique et Administration", titleEn: "Public Governance and Administration", titleEs: "Gobernanza Pública y Administración", duration: "3 semaines", level: "Intermédiaire", price: "950€", startDate: "10 Janvier 2026", descriptionFr: "Renforcer les pratiques de bonne gouvernance dans le secteur public.", objectifsFr: JSON.stringify(["Gestion publique", "Politiques publiques", "Transparence"]), debouchesFr: JSON.stringify(["Manager", "Consultant", "Directeur opérationnel"]) },
        { slug: "marches-publics-theorie-pratique", categorySlug: "public", titleFr: "Marchés Publics: Théorie et Pratique", titleEn: "Public Procurement: Theory and Practice", titleEs: "Contratación Pública: Teoría y Práctica", duration: "4 semaines", level: "Avancé", price: "1300€", startDate: "10 Janvier 2026", descriptionFr: "Maîtriser la théorie et la pratique des marchés publics.", objectifsFr: JSON.stringify(["Appels d'offres", "Réglementation", "Contrats publics"]), debouchesFr: JSON.stringify(["Manager", "Consultant", "Directeur opérationnel"]) },
        { slug: "gestion-budgetaire-finances-publiques", categorySlug: "public", titleFr: "Gestion Budgétaire et Finances Publiques", titleEn: "Budget Management and Public Finance", titleEs: "Gestión Presupuestaria y Finanzas Públicas", duration: "3 semaines", level: "Intermédiaire", price: "1000€", startDate: "10 Janvier 2026", descriptionFr: "Optimiser la gestion budgétaire et financière du secteur public.", objectifsFr: JSON.stringify(["Budget annuel", "Contrôle des dépenses", "Audit"]), debouchesFr: JSON.stringify(["Manager", "Consultant", "Directeur opérationnel"]) },
        // Human Resources
        { slug: "mediation-professionnelle", categorySlug: "hr", titleFr: "Médiation Professionnelle", titleEn: "Professional Mediation", titleEs: "Mediación Profesional", duration: "4 semaines", level: "Avancé", price: "1100€", startDate: "10 Janvier 2026", descriptionFr: "Développer des compétences de médiation et résolution de conflits.", objectifsFr: JSON.stringify(["Communication efficace", "Négociation", "Gestion de conflits"]), debouchesFr: JSON.stringify(["Manager", "Consultant", "Directeur opérationnel"]) },
        { slug: "intelligence-emotionnelle-qualite-relationnelle", categorySlug: "hr", titleFr: "Intelligence Émotionnelle et Qualité Relationnelle", titleEn: "Emotional Intelligence and Relational Quality", titleEs: "Inteligencia Emocional y Calidad Relacional", duration: "3 semaines", level: "Intermédiaire", price: "900€", startDate: "10 Janvier 2026", descriptionFr: "Améliorer les relations professionnelles et la gestion des émotions.", objectifsFr: JSON.stringify(["Écoute active", "Empathie", "Relations interpersonnelles"]), debouchesFr: JSON.stringify(["Manager", "Consultant", "Directeur opérationnel"]) },
        { slug: "gestion-ressources-humaines-modernes", categorySlug: "hr", titleFr: "Gestion des Ressources Humaines Modernes", titleEn: "Modern Human Resources Management", titleEs: "Gestión Moderna de Recursos Humanos", duration: "4 semaines", level: "Intermédiaire", price: "1200€", startDate: "10 Janvier 2026", descriptionFr: "Optimiser la gestion moderne du capital humain.", objectifsFr: JSON.stringify(["Recrutement", "Développement des talents", "Climat social"]), debouchesFr: JSON.stringify(["Manager", "Consultant", "Directeur opérationnel"]) },
        // Digitalization
        { slug: "transformation-numerique-organisations", categorySlug: "digital", titleFr: "Transformation Numérique des Organisations", titleEn: "Digital Transformation of Organizations", titleEs: "Transformación Digital de Organizaciones", duration: "4 semaines", level: "Avancé", price: "1400€", startDate: "10 Janvier 2026", descriptionFr: "Accompagner la transformation numérique des organisations.", objectifsFr: JSON.stringify(["Digitalisation", "Innovation", "Outils numériques"]), debouchesFr: JSON.stringify(["Manager", "Consultant", "Directeur opérationnel"]) },
        { slug: "intelligence-artificielle-appliquee", categorySlug: "digital", titleFr: "Intelligence Artificielle Appliquée", titleEn: "Applied Artificial Intelligence", titleEs: "Inteligencia Artificial Aplicada", duration: "4 semaines", level: "Avancé", price: "1500€", startDate: "10 Janvier 2026", descriptionFr: "Appliquer l'IA pour améliorer les processus et décisions.", objectifsFr: JSON.stringify(["Machine Learning", "Automatisation", "Optimisation"]), debouchesFr: JSON.stringify(["Manager", "Consultant", "Directeur opérationnel"]) },
        { slug: "cybersecurite-resilience", categorySlug: "digital", titleFr: "Cybersécurité et Résilience", titleEn: "Cybersecurity and Resilience", titleEs: "Ciberseguridad y Resiliencia", duration: "4 semaines", level: "Avancé", price: "1400€", startDate: "10 Janvier 2026", descriptionFr: "Protéger les systèmes et données contre les cybermenaces.", objectifsFr: JSON.stringify(["Sécurité réseau", "Protection des données", "Plan de continuité"]), debouchesFr: JSON.stringify(["Manager", "Consultant", "Directeur opérationnel"]) },
        // Real Estate
        { slug: "gestion-projet-immobilier", categorySlug: "realestate", titleFr: "Gestion de Projet Immobilier", titleEn: "Real Estate Project Management", titleEs: "Gestión de Proyectos Inmobiliarios", duration: "4 semaines", level: "Avancé", price: "1300€", startDate: "10 Janvier 2026", descriptionFr: "Planifier et gérer efficacement des projets immobiliers.", objectifsFr: JSON.stringify(["Planification", "Réglementation", "Suivi de chantier"]), debouchesFr: JSON.stringify(["Manager", "Consultant", "Directeur opérationnel"]) },
        { slug: "investissement-immobilier", categorySlug: "realestate", titleFr: "Investissement Immobilier", titleEn: "Real Estate Investment", titleEs: "Inversión Inmobiliaria", duration: "3 semaines", level: "Intermédiaire", price: "1100€", startDate: "10 Janvier 2026", descriptionFr: "Apprendre à investir efficacement dans l'immobilier.", objectifsFr: JSON.stringify(["Analyse financière", "Stratégie d'investissement", "Rentabilité"]), debouchesFr: JSON.stringify(["Manager", "Consultant", "Directeur opérationnel"]) },
        { slug: "gestion-locative-maintenance", categorySlug: "realestate", titleFr: "Gestion Locative et Maintenance", titleEn: "Rental Management and Maintenance", titleEs: "Gestión de Alquileres y Mantenimiento", duration: "3 semaines", level: "Intermédiaire", price: "900€", startDate: "10 Janvier 2026", descriptionFr: "Assurer la gestion et maintenance des biens locatifs.", objectifsFr: JSON.stringify(["Gestion locative", "Maintenance", "Satisfaction des locataires"]), debouchesFr: JSON.stringify(["Manager", "Consultant", "Directeur opérationnel"]) },
        // Tourism
        { slug: "management-touristique", categorySlug: "tourism", titleFr: "Management Touristique", titleEn: "Tourism Management", titleEs: "Gestión Turística", duration: "4 semaines", level: "Intermédiaire", price: "1100€", startDate: "10 Janvier 2026", descriptionFr: "Optimiser la gestion des structures touristiques.", objectifsFr: JSON.stringify(["Organisation touristique", "Expérience client", "Marketing"]), debouchesFr: JSON.stringify(["Manager", "Consultant", "Directeur opérationnel"]) },
        { slug: "qualite-service-hotelier", categorySlug: "tourism", titleFr: "Qualité de Service Hôtelier", titleEn: "Hotel Service Quality", titleEs: "Calidad del Servicio Hotelero", duration: "3 semaines", level: "Intermédiaire", price: "950€", startDate: "10 Janvier 2026", descriptionFr: "Améliorer la qualité de service et la satisfaction client.", objectifsFr: JSON.stringify(["Service client", "Standards hôteliers", "Formation du personnel"]), debouchesFr: JSON.stringify(["Manager", "Consultant", "Directeur opérationnel"]) },
        { slug: "marketing-territorial", categorySlug: "tourism", titleFr: "Marketing Territorial", titleEn: "Territorial Marketing", titleEs: "Marketing Territorial", duration: "3 semaines", level: "Intermédiaire", price: "900€", startDate: "10 Janvier 2026", descriptionFr: "Développer et promouvoir l'attractivité touristique d'un territoire.", objectifsFr: JSON.stringify(["Marketing local", "Promotion touristique", "Stratégie digitale"]), debouchesFr: JSON.stringify(["Manager", "Consultant", "Directeur opérationnel"]) },
        // Entrepreneurship
        { slug: "creation-entreprise", categorySlug: "entrepreneurship", titleFr: "Création d'Entreprise", titleEn: "Business Creation", titleEs: "Creación de Empresas", duration: "3 semaines", level: "Fondamental", price: "850€", startDate: "10 Janvier 2026", descriptionFr: "Créer et lancer une entreprise rentable et viable.", objectifsFr: JSON.stringify(["Business model", "Plan d'affaires", "Financement"]), debouchesFr: JSON.stringify(["Manager", "Consultant", "Directeur opérationnel"]) },
        { slug: "internationalisation-pme", categorySlug: "entrepreneurship", titleFr: "Internationalisation des PME", titleEn: "SME Internationalization", titleEs: "Internacionalización de PYMES", duration: "4 semaines", level: "Avancé", price: "1200€", startDate: "10 Janvier 2026", descriptionFr: "Développer les PME à l'international.", objectifsFr: JSON.stringify(["Export", "Stratégie globale", "Partenariats internationaux"]), debouchesFr: JSON.stringify(["Manager", "Consultant", "Directeur opérationnel"]) },
        { slug: "levee-fonds-partenariats", categorySlug: "entrepreneurship", titleFr: "Levée de Fonds et Partenariats", titleEn: "Fundraising and Partnerships", titleEs: "Recaudación de Fondos y Alianzas", duration: "3 semaines", level: "Avancé", price: "1100€", startDate: "10 Janvier 2026", descriptionFr: "Obtenir des financements et développer des partenariats stratégiques.", objectifsFr: JSON.stringify(["Levée de fonds", "Investisseurs", "Partenariats"]), debouchesFr: JSON.stringify(["Manager", "Consultant", "Directeur opérationnel"]) },
    ]

    let certCount = 0
    for (const cert of certificationsData) {
        const { categorySlug, ...certData } = cert
        const existingCert = await prisma.certification.findUnique({ where: { slug: cert.slug } })
        if (!existingCert) {
            const created = await prisma.certification.create({
                data: {
                    ...certData,
                    categoryId: categories[categorySlug],
                },
            })
            // Add default modules
            await prisma.certificationModule.createMany({
                data: [
                    { certificationId: created.id, titleFr: "Module 1", descriptionFr: "Introduction et fondamentaux", sortOrder: 0 },
                    { certificationId: created.id, titleFr: "Module 2", descriptionFr: "Concepts avancés", sortOrder: 1 },
                    { certificationId: created.id, titleFr: "Module 3", descriptionFr: "Applications pratiques", sortOrder: 2 },
                    { certificationId: created.id, titleFr: "Module 4", descriptionFr: "Études de cas", sortOrder: 3 },
                    { certificationId: created.id, titleFr: "Module 5", descriptionFr: "Projet final et évaluation", sortOrder: 4 },
                ],
            })
            certCount++
        }
    }
    console.log("✅ Certifications created:", certCount)

    console.log("\n🎉 Seeding completed!")
    console.log("\n📧 Admin login credentials:")
    console.log("   Email: admin@ethsun-oxford.uk")
    console.log("   Password: admin123")
    console.log("\n⚠️  Please change the password after first login!")
}

main()
    .catch((e) => {
        console.error("❌ Error during seeding:", e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
