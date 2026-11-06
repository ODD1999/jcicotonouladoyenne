# Full Vibes Awards — Recette complète puis passage en production

## Objectif et séparation

La **recette en ligne** utilise la même expérience de vote que la plateforme officielle, mais une route administrateur dédiée : `/full-vibes-awards?recette=1`. Les bulletins sont réellement écrits dans **Neon**, marqués `is_test=true`, exclus du décompte et exportables en CSV. Le scrutin public `/full-vibes-awards` reste **fermé** pendant les tests.

Les awards de recette sont marqués `is_test=true`. Le formulaire standard « Ajouter un candidat » permet d'y téléverser des portraits avec Vercel Blob et d'enregistrer les candidatures. Les anciens candidats saisis sur une catégorie officielle peuvent être marqués **TEST** individuellement, mais **ne le sont jamais automatiquement**.

## Circuit complet de recette — à faire depuis l'administration

1. Se connecter à `http://localhost:3002/full-vibes-awards/admin`.
2. Ouvrir **Configuration → Recette complète** et créer un award temporaire « TEST · Full Énergie » avec une description.
3. Dans **Ajouter un candidat**, sélectionner cet award et saisir deux candidats fictifs avec nom, prénom, fonction, photo JPG/PNG/WebP.
4. Vérifier dans **Catégories et candidatures** les deux fiches, éditer le titre et la photo de l'une, masquer puis réafficher un candidat.
5. Cliquer sur **Ouvrir le vote de recette en ligne** (la session admin doit être connectée sur le même navigateur). Le vote public officiel reste fermé.
6. Remplir l'identité, choisir le titre et, pour `Organisation locale sœur`, une OL dans le sélecteur ; voter, corriger le choix, confirmer.
7. Recommencer avec **le même numéro de téléphone** puis effectuer un autre vote avec un numéro différent.
8. Revenir dans **Participants** et vérifier les bulletins `Test · hors décompte`, les numéros et les titres.
9. Vérifier dans **Recette complète** le nombre de bulletins de test, le nombre de votes, les numéros répétés et les voix TEST par candidat.
10. Contrôler dans **Résultats** que le décompte officiel est **inchangé**, puis exporter le CSV et vérifier les lignes TEST.
11. Sur les candidatures enregistrées **avant** la mise en place de la recette, utiliser explicitement **Marquer TEST** seulement pour celles qui doivent être effacées. Ne pas marquer les candidats définitifs.
12. Une fois les essais terminés et après vérification, cliquer sur **Supprimer uniquement les données de TEST**, saisir exactement `SUPPRIMER TEST` et vérifier les compteurs. **Ne pas déclencher ce nettoyage avant d'avoir terminé les tests.**

La suppression est conditionnée à la fermeture du scrutin officiel. Elle supprime les bulletins `is_test=true`, les awards `is_test=true`, leurs candidats et les candidats individuellement marqués `is_test=true`. Elle refuse tout candidat ou award de test encore associé à un bulletin non-test. Les photos Blob spécifiquement associées à ces candidats sont aussi supprimées lorsqu'elles sont dans le stockage Awards et qu'aucun candidat officiel non-test ne les réutilise ; un éventuel échec de suppression d'image est signalé.

## Préparation de la production (après recette)

- Vérifier que le nettoyage de tous les bulletins et candidats TEST a bien été exécuté. Les 21 catégories officielles sont conservées.
- Renseigner les candidats définitifs (et leurs portraits) pour les Awards **Full** effectivement ouverts au vote. Masquer les awards qui ne sont pas soumis au vote.
- Confirmer la règle organisationnelle des doublons : plusieurs bulletins avec le même téléphone sont permis et signalés, sans exclusion automatique ; l'administration tranche au cas par cas.
- **Remplacer le mot de passe admin de test qui a circulé dans la conversation** par un nouveau secret fort jamais publié. Configurer `AWARDS_ADMIN_PASSWORD` sur Vercel.
- Configurer sur Vercel **Production** : `DATABASE_URL` (branche/base Neon cible), `BLOB_READ_WRITE_TOKEN` et `AWARDS_ADMIN_PASSWORD`. Ne jamais commiter ces valeurs. Vérifier les droits d'accès, sauvegardes et le domaine HTTPS.
- Ne **pas** définir `AWARDS_RECETTE_ENABLED=true` en production : les routes et outils de recette sont désactivés par défaut en `NODE_ENV=production`.
- Tester après déploiement les pages, la connexion admin, les portraits, l'API et l'état **FERMÉ** du scrutin. Vérifier le comportement sur mobile.
- L'ouverture officielle est bloquée côté API si une donnée de test reste présente, s'il n'y a aucun award public actif ou si un award public actif manque de candidat actif non-test.
- Avant toute diffusion publique : finaliser la limitation des tentatives de connexion et des requêtes de vote, la supervision, la politique de confidentialité et les contrôles de charge.

**Statut :** fonctionnalité de recette disponible en développement ; aucun nettoyage ni déploiement de production ne doit être considéré comme exécuté du seul fait de ce document.
