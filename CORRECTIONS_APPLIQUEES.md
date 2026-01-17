# Corrections appliquées - 17 janvier 2026

## Problème identifié

Les formulaires et le panneau admin ne fonctionnaient pas à cause d'erreurs de chargement liées au package `resend` qui avait été supprimé.

### Cause racine
- Le package `resend` a été désinstallé
- Le fichier `lib/email-service.ts` importait et utilisait `resend`
- Toutes les routes API des formulaires utilisaient `email-service` :
  - `/api/forms/contact`
  - `/api/forms/inscription`
  - `/api/forms/franchise`
  - `/api/forms/recruitment`
- Les imports échouaient, causant des erreurs 500 sur toutes les soumissions de formulaires

## Solution appliquée

### 1. Désactivation du service d'emails
**Fichier modifié :** `lib/email-service.ts`

- ✅ Commenté l'import de `resend`
- ✅ Commenté l'import des templates d'emails
- ✅ Remplacé les appels `resend.emails.send()` par des logs console
- ✅ Conservé la structure de la fonction pour éviter de casser les routes API
- ✅ Ajouté des logs détaillés pour le débogage

### 2. Suppression du fichier obsolète
**Fichier supprimé :** `lib/resend.ts`

Ce fichier n'était plus nécessaire puisque le package `resend` n'est pas installé.

## Résultat

✅ **Le site fonctionne maintenant correctement**
- Les formulaires peuvent être soumis sans erreur
- Les données sont enregistrées dans la base de données
- Le panneau admin fonctionne normalement
- Aucun email n'est envoyé (fonctionnalité désactivée)

## Logs visibles

Lors de la soumission d'un formulaire, vous verrez dans la console :
```
[EMAIL DISABLED] Would send emails for Contact submission...
[EMAIL DISABLED] Admin notification would be sent to: admin@ethsun-oxford.uk
[EMAIL DISABLED] Visitor confirmation would be sent to: user@example.com
[EMAIL DISABLED] Email sending completed (disabled)
```

## Pour réactiver les emails à l'avenir

Si vous souhaitez réactiver l'envoi d'emails :

1. **Réinstaller le package resend :**
   ```bash
   pnpm add resend
   ```

2. **Dans `lib/email-service.ts` :**
   - Décommenter les imports en haut du fichier
   - Décommenter le code entre `/*` et `*/`
   - Supprimer les logs `[EMAIL DISABLED]`

3. **Recréer `lib/resend.ts` :**
   ```typescript
   import { Resend } from 'resend';
   export const resend = new Resend(process.env.RESEND_API_KEY);
   ```

4. **Vérifier que la clé API est dans `.env` :**
   ```
   RESEND_API_KEY=votre_clé_api
   ```

## État actuel du projet

- ✅ Serveur de développement : **Fonctionnel** (port 3001)
- ✅ Formulaires : **Fonctionnels** (sans emails)
- ✅ Base de données : **Fonctionnelle**
- ✅ Panneau admin : **Fonctionnel**
- ⚠️ Emails : **Désactivés temporairement**
