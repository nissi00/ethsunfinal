# 🚀 Quick Start Guide

## Installation & Démarrage

### 1. Synchroniser la Base de Données

Si c'est la première fois, synchronisez le schema Prisma avec Supabase:

```bash
npx prisma db push
```

### 2. Injecter les Partenaires de Test

```bash
node seedPartners.js
```

**Output attendu:**
```
🌱 Seeding partners...
✅ Partner created: Oxford University
✅ Partner created: Business Excellence
✅ Partner created: Global Leaders
✅ Partner created: Learning Hub

🎉 Partners seeded successfully!
```

### 3. Démarrer le Serveur

```bash
npm run dev
```

Le serveur démarre sur `http://localhost:3000`

---

## 🔐 Identifiants Admin

**Email:** `admin@ethsun-oxford.uk`  
**Mot de passe:** `admin123`

⚠️ **À faire immédiatement après la première connexion:**
1. Aller à `/admin/settings`
2. Changer le mot de passe

---

## 📸 Premières Étapes

### 1. Voir le Carrousel sur la Page d'Accueil

1. Ouvrir `http://localhost:3000`
2. Scroller jusqu'à la section "Nos partenaires"
3. Tester:
   - Défilement automatique (5 secondes)
   - Boutons précédent/suivant
   - Cliquer sur les points d'indicateur

**Résultat:** Le carrousel affiche les 4 partenaires de test

### 2. Voir les Images dans les Certifications

1. Aller à `http://localhost:3000/certifications`
2. Les cartes de certification affichent des gradients par défaut
3. (Nous allons ajouter les images dans l'admin)

### 3. Ajouter une Image à une Certification

1. Se connecter: `http://localhost:3000/admin/login`
2. Credentials: admin@ethsun-oxford.uk / admin123
3. Aller à `/admin/content/certifications`
4. Cliquer l'onglet **"Gestion des images"**
5. Cliquer **"Modifier l'image"** sur une carte
6. Entrer une URL d'image (voir exemples ci-dessous)
7. Cliquer **"Sauvegarder"**

**Résultat:** L'image s'affiche immédiatement dans `/certifications`

### 4. Ajouter/Gérer des Partenaires

1. Admin connecté
2. Aller à `/admin/partners`
3. Cliquer **"Ajouter un partenaire"**
4. Remplir:
   - **Nom:** Ex: "Microsoft"
   - **URL logo:** Lien HTTPS vers image
   - **Site web:** Optionnel
   - **Ordre:** Position dans le carrousel
5. Cliquer **"Sauvegarder"**

**Résultat:** Nouveau partenaire visible dans le carrousel

---

## 🖼️ URLs d'Images à Tester

### Licences gratuites (Unsplash, Pexels, Pixabay)

```
https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop
https://images.unsplash.com/photo-1611162617305-c69b3fa7fbe0?w=800&h=600&fit=crop
https://images.unsplash.com/photo-1620265635307-c4b65d7f7bb6?w=800&h=600&fit=crop
https://images.unsplash.com/photo-1611271437281-a783a1ad4038?w=200&h=100&fit=crop
```

### Format recommandé
- Largeur min: 800px
- Hauteur min: 600px
- Ratio: 16:9
- Format: PNG, JPG, WebP
- Taille: < 500KB

---

## 🔧 Commandes Utiles

```bash
# Démarrer le serveur de dev
npm run dev

# Build pour production
npm run build

# Démarrer le serveur production
npm start

# Visualiser la BD Supabase
npx prisma studio

# Réinitialiser la BD (⚠️ PERTE DE DONNÉES!)
npx prisma db push --force-reset

# Générer le client Prisma
npx prisma generate
```

---

## 📂 Structure des Fichiers Créés

```
app/
├── admin/
│   └── partners/
│       └── page.tsx                 # Gestion partenaires
├── api/
│   ├── admin/
│   │   └── certifications/[id]/
│   │       └── image/route.ts       # API image certification
│   └── site/
│       └── partners/
│           ├── route.ts             # API partenaires
│           └── [id]/route.ts        # API partenaire (PATCH/DELETE)
└── certifications/
    └── page.tsx                     # Modifié (affichage images)

components/
└── partner-carousel.tsx              # Carrousel partenaires

prisma/
├── schema.prisma                    # Modifié (Partner + imageUrl)
└── seed.ts                          # Modifié (seed partenaires)

FEATURE_GUIDE.md                     # Documentation complète
IMPLEMENTATION_SUMMARY.md            # Résumé technique
IMPLEMENTATION_CHECKLIST.md          # Checklist
QUICKSTART.md                        # Ce fichier
```

---

## ❓ FAQ

### Q: Le carrousel ne s'affiche pas
**A:** 
1. Vérifier que `seedPartners.js` a été exécuté
2. Vérifier que les URLs des logos sont valides
3. Ouvrir console (F12) pour voir les erreurs

### Q: Les images ne s'affichent pas dans les certifications
**A:**
1. Aller à `/admin/content/certifications`
2. Onglet "Gestion des images"
3. Ajouter les URLs d'image
4. Vérifier que les URLs sont HTTPS

### Q: Erreur "Unauthorized" en admin
**A:**
1. Vérifier que vous êtes connecté
2. Vérifier que vous êtes connecté en tant qu'admin
3. Reconnectez-vous si session expirée

### Q: Comment changer le mot de passe admin?
**A:**
1. Se connecter avec les identifiants actuels
2. Aller à `/admin/settings`
3. Changer le mot de passe
4. Se reconnecter avec le nouveau

### Q: Comment ajouter plus de partenaires?
**A:**
Deux options:
1. Via l'interface admin (`/admin/partners`)
2. Via le script seed (modifier `seedPartners.js`)

### Q: Comment personnaliser les couleurs du carrousel?
**A:**
Modifier dans `components/partner-carousel.tsx` ligne ~20:
```tsx
className="w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] py-12"
```

---

## 🎯 Flux Typique d'Utilisation

### Pour l'Administrateur ETHSUN

```
1. Connectez-vous
   admin@ethsun-oxford.uk / admin123

2. Allez à /admin/partners
   → Gérez les logos des partenaires

3. Allez à /admin/content/certifications
   → Onglet "Gestion des images"
   → Ajoutez des images aux certifications

4. Vérifiez sur le site public
   http://localhost:3000
   → Carrousel visible après "View All"
   → Images dans /certifications
```

### Pour les Visiteurs

```
1. Visitent la page d'accueil
   → Voient le carrousel des partenaires

2. Visitent /certifications
   → Voient les images des certifications

3. Cliquent sur une certification
   → Détails de la formation
```

---

## 📞 Support & Dépannage

### Voir la Documentation Complète
👉 Lisez `FEATURE_GUIDE.md` pour:
- Instructions détaillées
- Recommandations techniques
- Dépannage complet
- Prochaines étapes

### Vérifier les Logs
```bash
# Console du navigateur (F12)
# → Network tab: vérifier les requêtes API
# → Console tab: vérifier les erreurs JavaScript

# Terminal du serveur
# → npm run dev affiche les logs du serveur
```

### Vérifier la BD
```bash
# Visualiser la BD avec Prisma Studio
npx prisma studio
# Ouvre une interface à http://localhost:5555
```

---

## ✨ Résumé

Vous avez maintenant:
- ✅ Carrousel de partenaires sur la page d'accueil
- ✅ Images pour les certifications
- ✅ Panneau admin pour gérer les deux
- ✅ API REST complète et sécurisée
- ✅ Design intégré aux couleurs ETHSUN
- ✅ Multilingue supporté

**Prêt pour la production! 🚀**

---

## 🎓 Prochaines Formations (Optionnel)

Pour aller plus loin:

1. **Ajouter un upload d'images**
   - Intégrer Supabase Storage
   - Permettre upload fichier direct

2. **Optimiser les images**
   - Compression automatique
   - Thumbnails
   - Lazy loading

3. **Ajouter des statistiques**
   - Tracker vues partenaires
   - Analytics des images

4. **Améliorer l'expérience utilisateur**
   - Lightbox pour les images
   - Galerie multiple par certification
   - SEO images (metadata)

---

**Bon développement! 🎉**
