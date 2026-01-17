# Guide des Nouvelles Fonctionnalités: Carrousel Partenaires et Images de Certification

## 📋 Vue d'ensemble

Ce guide décrit comment utiliser les deux nouvelles fonctionnalités implémentées:

1. **Carrousel de Logos Partenaires** - Affiche sur la page d'accueil après le bouton "View All"
2. **Images d'Illustration des Certifications** - Modifiable via le panneau admin

---

## 🎠 Carrousel de Partenaires

### Page Publique

Le carrousel s'affiche automatiquement sur la **page d'accueil** (`/`) après la section "Certifications".

**Fonctionnalités:**
- Défilement automatique tous les 5 secondes
- Navigation manuelle avec boutons `<` et `>`
- Indicateurs de position (points cliquables)
- Design responsive adapté à tous les écrans
- Couleurs thématiques (dégradé bleu ETHSUN)

### Administration - Gestion des Partenaires

**URL:** `/admin/partners`

#### Ajouter un partenaire:
1. Cliquez sur **"Ajouter un partenaire"**
2. Remplissez les champs:
   - **Nom** (obligatoire): Nom complet du partenaire
   - **URL du logo** (obligatoire): Lien HTTP(S) vers l'image du logo
   - **Site web** (optionnel): Lien du site web du partenaire
   - **Ordre d'affichage**: Position dans le carrousel (0 = première position)
3. Cliquez sur **"Sauvegarder"**

#### Modifier un partenaire:
1. Cliquez sur le bouton **"Éditer"** (crayon) à côté du partenaire
2. Modifiez les champs souhaités
3. Cliquez sur **"Sauvegarder"**

#### Supprimer un partenaire:
1. Cliquez sur le bouton **"Supprimer"** (poubelle) rouge
2. Confirmez la suppression

**Notes importantes:**
- Les logos doivent être accessibles via HTTP(S)
- Les formats recommandés: PNG, SVG, JPG avec transparence si possible
- Dimensions recommandées: min 200x100px
- Le tri est basé sur le champ "Ordre d'affichage"

---

## 🖼️ Images des Certifications

### Page Publique

Les images s'affichent dans les **cartes de certification** sur:
- Page `/certifications` (vue catalogue)
- Page d'accueil `/` (section "Nos Certifications")

**Affichage:**
- Si une image est définie: elle remplace le gradient par défaut
- Si pas d'image: affiche le gradient bleu (dégradé original)
- Dimensions: 100% de la largeur, hauteur fixe

### Administration - Gestion des Images

**URL:** `/admin/content/certifications`

#### Onglet "Gestion des images":

1. **Voir l'état des images:**
   - Grille en mosaïque affichant toutes les certifications
   - Aperçu de chaque image (si disponible)
   - Badge indiquant "Image définie" (vert) ou "Pas d'image" (orange)

2. **Modifier l'image d'une certification:**
   - Cliquez sur le bouton **"Modifier l'image"** sur la carte
   - Entrez l'URL de l'image dans le champ
   - Un aperçu s'affiche en temps réel
   - Cliquez sur **"Sauvegarder"**

3. **Supprimer une image:**
   - Laissez le champ URL vide
   - Cliquez sur **"Sauvegarder"**

**Recommandations pour les images:**
- Format: JPG, PNG, WebP
- Dimensions: Au minimum 800x600px pour une bonne qualité
- Aspect ratio: 16:9 recommandé (pour les cartes de certification)
- Taille fichier: < 500KB de préférence
- Accessible via URL HTTPS (de préférence)

**Sources d'images recommandées:**
- Unsplash (https://unsplash.com) - Libre d'utilisation
- Pexels (https://pexels.com) - Libre d'utilisation
- Pixabay (https://pixabay.com) - Libre d'utilisation
- CDN personnalisé ou Supabase Storage

---

## 🔧 Informations Techniques

### Architecture Base de Données

#### Table: `Partner`
```sql
- id: String (PRIMARY KEY)
- name: String
- logoUrl: String
- website: String (NULLABLE)
- sortOrder: Int (DEFAULT: 0)
- isActive: Boolean (DEFAULT: true)
- createdAt: DateTime
- updatedAt: DateTime
```

#### Table: `Certification` (Champ ajouté)
```sql
- imageUrl: String (NULLABLE) -- Nouveau champ
```

### API Endpoints

#### Partenaires
```
GET    /api/site/partners           - Récupère tous les partenaires actifs
POST   /api/site/partners           - Crée un nouveau partenaire (admin)
PATCH  /api/site/partners/:id       - Modifie un partenaire (admin)
DELETE /api/site/partners/:id       - Supprime un partenaire (admin)
```

#### Images de Certification
```
PATCH  /api/admin/certifications/:id/image  - Met à jour l'image (admin)
```

### Composants React

#### `<PartnerCarousel />`
Localisation: `/components/partner-carousel.tsx`
- Récupère les partenaires via l'API
- Gère le défilement automatique
- Suporte la navigation manuelle
- Cache "no-store" pour les mises à jour en temps réel

---

## 📱 Utilisation Multilingue

**Carrousel des partenaires:**
- Le titre "Nos partenaires" change automatiquement selon la langue
- Textes statiques: "Nos partenaires" (français), "Our partners" (anglais), "Nuestros socios" (espagnol)

**Images des certifications:**
- Les images sont indépendantes de la langue
- La même image s'affiche pour tous les locales

---

## ⚡ Guide de Dépannage

### Le carrousel ne s'affiche pas
- Vérifiez que vous avez ajouté au moins un partenaire actif
- Vérifiez les URLs des logos (HTTP/HTTPS valide)
- Ouvrez la console navigateur pour voir les erreurs réseau

### Les images ne s'affichent pas
- Confirmez que les URLs sont correctes (HTTPS de préférence)
- Vérifiez les CORS si images d'un autre domaine
- Utilisez des images accessibles publiquement

### Erreur: Unauthorized (401)
- Vérifiez que vous êtes connecté en tant qu'admin
- Vérifiez que votre session n'a pas expiré
- Reconnectez-vous si nécessaire

---

## 🚀 Prochaines Étapes Optionnelles

Pour améliorer encore le système:

1. **Upload d'images directement:**
   - Ajouter un champ d'upload de fichier (via Supabase Storage)
   - Générer automatiquement les URLs

2. **Optimisation des images:**
   - Redimensionner automatiquement
   - Compresser les formats
   - Créer des thumbnails

3. **Galerie de certifications:**
   - Ajouter plusieurs images par certification
   - Créer une galerie lightbox sur la page détail

4. **Statistiques:**
   - Tracker les partenaires les plus vus
   - Analytics des images (engagement)

---

## 📞 Support

En cas de problème:
1. Vérifiez les erreurs dans la console navigateur (F12)
2. Consultez les logs du serveur (terminal npm run dev)
3. Vérifiez l'état de la base de données Supabase
4. Assurez-vous que toutes les migrations Prisma sont appliquées

