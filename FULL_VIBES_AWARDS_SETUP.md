# Full Vibes Awards — configuration et recette

> **Procédure à jour (06/11/2026) :** suivre prioritairement `FULL_VIBES_AWARDS_RECETTE_PRODUCTION.md`. Le circuit ancien ci-dessous proposant l’ouverture du scrutin public pendant les essais est remplacé par le mode recette authentifié `?recette=1`, qui préserve le vote officiel fermé.

Le module est autonome dans le site Next.js JCI Cotonou La Doyenne.

## Pages

- Vote : `/full-vibes-awards`
- Administration : `/full-vibes-awards/admin`
- API publique : `/api/awards`
- API administrateur : `/api/awards/admin`

## Configuration de l'environnement

Les variables à configurer côté **serveur** sont :

- `DATABASE_URL` : URL PostgreSQL Neon, déjà utilisée par les autres formulaires du site sur Vercel.
- `AWARDS_ADMIN_PASSWORD` : mot de passe fort **distinct** du mot de passe Neon, choisi pour la console Awards.

En local, placer ces deux valeurs dans `.env.local` **sans le commiter**. Le fichier est ignoré par `.gitignore`.
Sur Vercel, vérifier les variables dans les environnements Preview et Production. Après modification de variables, redéployer la version appropriée. Ne jamais inclure les secrets dans le code, un commit ou un ticket public.

### Sécurité opérationnelle

- Aucun OTP/SMS. Les déclarations d'identité sont enregistrées telles que renseignées ; **elles ne constituent pas une authentification forte**.
- Tous les bulletins sont conservés. L'administration signale les numéros de téléphone répétés et peut exclure/réintégrer un bulletin avec motif.
- Le dépouillement ne compte pas les bulletins exclus. Les votes archivés ne sont pas effacés.
- Le scrutin est **fermé par défaut**. Ne l'ouvrir qu'après avoir configuré les candidats et effectué les tests.
- Éviter d'utiliser la production Neon pour les votes de test : préparer une branche/base Neon de test ou sauvegarder les données avant tout test.
- L'accès administrateur est contrôlé côté API et protégé par un cookie HttpOnly temporaire.
- L'export actuel est un CSV UTF-8 avec BOM et séparateur point-virgule, compatible Excel ; ce n'est pas encore un fichier XLSX natif.

## Circuit de recette conseillé

1. Configurer la base de test Neon et le mot de passe admin.
2. Démarrer : `npm run dev -- --port 3106`.
3. Visiter `/full-vibes-awards/admin` et se connecter.
4. Créer deux catégories, avec leurs descriptions, puis au moins deux candidats par catégorie.
5. Tester la modification d'un nom, d'un titre, d'une photo et la mise en veille d'un candidat.
6. Vérifier que le scrutin fermé empêche la soumission.
7. Ouvrir le scrutin depuis l'admin, puis recharger la page de vote.
8. Tester un votant JCI CLD, un membre d'OL sœur et un invité (données fictives).
9. Tester Sélection, Précédent, Suivant, récapitulatif, correction du choix et confirmation.
10. Vérifier qu'un bulletin apparaît dans l'administration et que les résultats sont corrects.
11. Soumettre un second bulletin avec le même téléphone : les deux doivent exister et le second apparaître comme doublon possible.
12. Exclure manuellement l'un des bulletins et vérifier la diminution des résultats ; le réintégrer pour vérifier le rétablissement.
13. Exporter le CSV, vérifier les colonnes et l'ouverture dans Excel.
14. Fermer le scrutin ; vérifier que la page publique refuse de nouveaux bulletins.
15. Vérifier le rendu mobile, l'absence de fuite de données nominatives sur une API publique et le comportement en cas de coupure réseau.

## Points à traiter avant ouverture au public

- Connexion Neon opérationnelle depuis le runtime visé.
- Mot de passe admin présent, robuste et non partagé.
- Validation réelle du cycle vote / décompte / export.
- Test des permissions, du débit API et de la confidentialité des données.
- Stratégie de détection des doublons validée par les organisateurs.
- Validation de l'édition et des catégories et candidatures définitives.
