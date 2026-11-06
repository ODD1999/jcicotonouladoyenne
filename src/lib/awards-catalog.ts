/**
 * Référentiel du document « Les Awards de la Locale — Explication des catégories »
 * JCI Cotonou La Doyenne · Mandat 2026 « Plein Potentiel » · soirée du 13 novembre 2026.
 *
 * Le document réserve le vote des membres aux Awards « Full ».
 * Les autres distinctions sont confiées au jury ou relèvent des hommages/choix du Président.
 * Le mode "homage" désigne une attribution non compétitive, malgré la mention "Partenaire de l'année".
 */
export type AwardMode = 'jury' | 'public' | 'honor' | 'president';
export type AwardCatalogItem = {
  position: number;
  name: string;
  description: string;
  family: string;
  mode: AwardMode;
};
export const AWARDS_CATALOG_2026: readonly AwardCatalogItem[] = [
 {position:1, name:'Award du Meilleur Officer', family:"Awards de l'Excellence", mode:'jury', description:"Distingue l’officer qui a le mieux tenu son poste au Comité directeur : objectifs atteints, disponibilité, initiatives et qualité du travail rendu."},
 {position:2, name:'Award du Meilleur Directeur de projet', family:"Awards de l'Excellence", mode:'jury', description:"Distingue le directeur de projet qui a planifié, mobilisé son équipe, géré le budget, réalisé l’activité et remis son rapport."},
 {position:3, name:"Award du Meilleur Projet de l'année", family:"Awards de l'Excellence", mode:'jury', description:"Récompense le projet et son équipe pour l’impact sur les bénéficiaires, l’organisation et l’alignement avec la mission JCI."},
 {position:4, name:'Award du Meilleur Membre de commission', family:"Awards de l'Excellence", mode:'jury', description:"Valorise l’assiduité, les propositions et les contributions aux livrables des commissions."},
 {position:5, name:"Award de la Révélation de l'année", family:"Awards de l'Excellence", mode:'jury', description:"Réservé aux membres entrés dans la locale en 2026, qui se sont rapidement intégrés et ont pris des responsabilités."},
 {position:6, name:"Award du Meilleur Membre de l'année", family:"Awards de l'Excellence", mode:'jury', description:"Distinction majeure du mandat : engagement constant, contributions multiples, valeurs JCI et esprit « Plein Potentiel »."},
 {position:7, name:'Award du Leadership', family:"Awards de l'Excellence", mode:'jury', description:"Récompense une attitude : fédérer, inspirer, décider et faire grandir les autres, avec ou sans titre officiel."},
 {position:8, name:"Award de l'Impact communautaire", family:"Awards de l'Excellence", mode:'jury', description:"Distingue le membre ou l’action ayant apporté le changement concret le plus significatif dans la communauté."},
 {position:9, name:"Award de l'Assiduité", family:"Awards de l'Engagement", mode:'jury', description:"Récompense la présence et la régularité aux réunions, assemblées générales et activités, sur la base des feuilles de présence."},
 {position:10, name:"Award du Pilier de l'ombre", family:"Awards de l'Engagement", mode:'jury', description:"Remercie le membre actif dans les coulisses : logistique, salles, administratif et soutien indispensable aux activités."},
 {position:11, name:'Award du Recruteur', family:"Awards de l'Engagement", mode:'jury', description:"Récompense le membre ayant recruté le plus de nouveaux membres et accompagné leur intégration."},
 {position:12, name:'Full Énergie', family:'Awards « Full »', mode:'public', description:"Pour le membre qui met l’ambiance, motive les troupes et donne de l’énergie à chaque activité."},
 {position:13, name:'Full Style', family:'Awards « Full »', mode:'public', description:"Pour le membre le plus élégant et le plus soigné de l’année, dont l’image reflète aussi le leadership."},
 {position:14, name:'Full Réseaux', family:'Awards « Full »', mode:'public', description:"Pour le membre qui publie, partage et fait connaître la locale sur les réseaux sociaux : l’ambassadeur numérique."},
 {position:15, name:'« Toujours en route »', family:'Awards « Full »', mode:'public', description:"Prix humoristique, attribué avec bienveillance au membre qui arrive souvent en retard. Le lauréat est prévenu discrètement à l’avance."},
 {position:16, name:'Award spécial du Parrain du mandat', family:"Awards d'honneur", mode:'honor', description:"Hommage au Sénateur Luc GNACADJA, parrain du mandat, pour son soutien, ses conseils et son accompagnement."},
 {position:17, name:"Award d'honneur des Aînés", family:"Awards d'honneur", mode:'honor', description:"Honore les Past Presidents et Sénateurs restés proches de la locale par leurs conseils, présence et soutien."},
 {position:18, name:"Award des Membres d'honneur", family:"Awards d'honneur", mode:'honor', description:"Exprime la gratitude envers les membres d’honneur ayant soutenu les actions du mandat."},
 {position:19, name:"Award du Partenaire de l'année", family:"Awards d'honneur", mode:'honor', description:"Distingue le partenaire le plus engagé et constant auprès de la locale, par un apport financier, matériel ou en visibilité."},
 {position:20, name:'Award de reconnaissance des Partenaires', family:"Awards d'honneur", mode:'honor', description:"Remerciement collectif aux partenaires qui ont rendu les activités du mandat possibles."},
 {position:21, name:'Award Coup de cœur du Président', family:'Award de clôture', mode:'president', description:"Choix personnel et secret du Président, pour une personne marquante par un geste, un engagement ou un soutien."}
];
