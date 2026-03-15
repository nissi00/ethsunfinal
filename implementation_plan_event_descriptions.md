# Plan d'Implémentation : Affichage des Descriptions d'Événements

L'objectif est d'afficher la description de chaque événement dans sa carte sur la page des événements, en supportant le multilingue.

## Modifications Proposées

### Page Événements (`app/events/page.tsx`)

1. **Fonction Helper `getEventDescription`**
   - Ajouter une fonction pour récupérer `descriptionFr`, `descriptionEn` ou `descriptionEs` selon le `locale` actuel.
   - Assurer un repli sur la version française si la traduction n'est pas disponible.

2. **Interface des Cartes**
   - Insérer un paragraphe `<p>` affichant la description sous le titre de l'événement.
   - Utiliser la classe `line-clamp-3` de Tailwind (si disponible) ou une limite de hauteur pour éviter que les descriptions trop longues ne cassent la mise en page.
   - Ajouter une marge (`mb-4`) pour l'espacement.

## Plan de Vérification

1. **Validation Visuelle**
   - Vérifier que la description apparaît bien sur les cartes.
   - S'assurer que les cartes restent harmonieuses entre elles.
2. **Support Multilingue**
   - Changer la langue du site et vérifier que la description change également (si disponible).
