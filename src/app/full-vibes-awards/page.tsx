"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./awards.module.scss";
import { OL_SOEURS, TITLES } from "@/lib/awards-voter-options";
type Category = { id: number; name: string; description: string };
type Candidate = {
  id: number;
  category_id: number;
  name: string;
  title: string;
  photo: string;
};
type Identity = {
  firstName: string;
  lastName: string;
  phone: string;
  title: string;
  type: "member" | "ol" | "guest";
  organization: string;
};
const initial: Identity = {
  firstName: "",
  lastName: "",
  phone: "",
  title: "",
  type: "member",
  organization: "",
};
export default function FullVibesAwards() {
  const [identity, setIdentity] = useState<Identity>(initial),
    [identified, setIdentified] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]),
    [candidates, setCandidates] = useState<Candidate[]>([]),
    [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true),
    [index, setIndex] = useState(0),
    [choices, setChoices] = useState<Record<number, number>>({});
  const [review, setReview] = useState(false),
    [done, setDone] = useState(""),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [preview, setPreview] = useState(false),
    [recette, setRecette] = useState(false);
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const demo = query.get("preview") === "1";
    const recipe = query.get("recette") === "1" && !demo;
    setPreview(demo);
    setRecette(recipe);
    fetch(
      demo
        ? "/api/awards/admin?preview=1"
        : recipe
          ? "/api/awards/admin/recette"
          : "/api/awards",
      { cache: "no-store" },
    )
      .then(async (r) => {
        if (!r.ok)
          throw Error(
            r.status === 401
              ? "Connectez-vous d’abord à l’administration pour accéder à l’aperçu."
              : "Impossible de récupérer les awards.",
          );
        return r.json();
      })
      .then((d) => {
        setCategories(d.categories);
        setCandidates(d.candidates);
        setOpen(d.open);
      })
      .catch((e) =>
        setError(
          e instanceof Error
            ? e.message
            : "Impossible de charger les catégories.",
        ),
      )
      .finally(() => setLoading(false));
  }, []);
  const category = categories[index],
    selected = category ? choices[category.id] : undefined;
  const choose = (id: number) => {
    if (!category) return;
    setChoices((s) => ({ ...s, [category.id]: id }));
    if (index < categories.length - 1) {
      setTimeout(
        () =>
          setIndex((current) => Math.min(current + 1, categories.length - 1)),
        340,
      );
    } else setTimeout(() => setReview(true), 340);
  };
  const submit = async () => {
    setBusy(true);
    setError("");
    try {
      if (preview) {
        setDone("DEMONSTRATION");
        setReview(false);
        return;
      }
      const r = await fetch(
        recette ? "/api/awards/admin/recette" : "/api/awards",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...identity,
            votes: Object.entries(choices).map(([categoryId, candidateId]) => ({
              categoryId: Number(categoryId),
              candidateId,
            })),
          }),
        },
      );
      const d = await r.json();
      if (!r.ok) throw Error(d.error || "Enregistrement impossible");
      setDone(d.ballotId);
      setReview(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className={styles.shell}>
      <div className={styles.glowOne} />
      <div className={styles.glowTwo} />
      <header className={styles.topbar}>
        <Link className={styles.logo} href="/">
          <img src="/logos/logo-white.png" alt="JCI Logo" />
        </Link>
        <span className={styles.topBadge}>FULLL POTENTIAL</span>
      </header>
      <main className={styles.main}>
        <div className={styles.eyebrow}>✦ LA CÉLÉBRATION DES TALENTS ✦</div>
        <h1 className={styles.title}>
          FULL <em>VIBES</em>
          <br />
          AWARDS<span className={styles.star}>✦</span>
        </h1>
        <p className={styles.intro}>
          Les talents brillent. Votre voix les révèle.
        </p>
        {recette && (
          <div className={styles.notice}>
            RECETTE EN LIGNE · Vos bulletins seront enregistrés dans Neon,
            marqués TEST et exclus des résultats officiels.{" "}
            <Link href="/full-vibes-awards/admin">
              Retour à l’administration
            </Link>
          </div>
        )}
        {preview && (
          <div className={styles.notice}>
            MODE APERÇU ADMINISTRATEUR · Aucun vote ne sera enregistré.{" "}
            <Link href="/full-vibes-awards/admin">
              Retour à l’administration
            </Link>
          </div>
        )}
        {loading ? (
          <div className={styles.notice}>Chargement de la cérémonie…</div>
        ) : done ? (
          <section className={styles.panel}>
            <div className={styles.success}>✦</div>
            <h2>
              {preview
                ? "Aperçu terminé !"
                : recette
                  ? "Vote de recette enregistré !"
                  : "Votre voix compte !"}
            </h2>
            <p>
              {preview
                ? `Merci ${identity.firstName}. Le parcours de démonstration est terminé : aucun bulletin n’a été enregistré.`
                : recette
                  ? `Merci ${identity.firstName}. Ton bulletin de recette est conservé dans Neon, hors du décompte officiel.`
                  : `Merci ${identity.firstName} pour votre participation aux Full Vibes Awards.`}
            </p>
            {!preview && (
              <small className={styles.ballotReference}>
                Référence de votre bulletin :{" "}
                <strong>{done.slice(0, 8).toUpperCase()}</strong>
              </small>
            )}
            {(preview || recette) && (
              <div className={styles.successActions}>
                <button
                  type="button"
                  className={styles.restartVote}
                  onClick={() => {
                    setDone("");
                    setChoices({});
                    setIndex(0);
                    setReview(false);
                    setIdentified(false);
                  }}
                >
                  {recette
                    ? "Faire un autre vote de test"
                    : "Recommencer la simulation"}{" "}
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            )}
          </section>
        ) : !open ? (
          <div className={styles.notice}>
            Le vote est actuellement fermé. À très bientôt !
          </div>
        ) : categories.length === 0 ? (
          <div className={styles.notice}>
            {preview || recette
              ? "Aucun candidat actif dans cette campagne de test. Créez un award de recette, ajoutez ses candidats dans Configuration, puis rechargez la page."
              : "Les catégories seront annoncées prochainement."}
          </div>
        ) : !identified ? (
          <div className={styles.notice}>
            Indiquez votre identité pour participer au vote.
          </div>
        ) : (
          <section className={styles.panel}>
            <div className={styles.progressHead}>
              <span>
                {review
                  ? "RÉCAPITULATIF"
                  : `CATÉGORIE ${String(index + 1).padStart(2, "0")}`}
              </span>
              <span>
                {Object.keys(choices).length} sélection(s) · {categories.length}{" "}
                catégories
              </span>
            </div>
            <div className={styles.progress}>
              <div
                style={{
                  width: `${review ? 100 : ((index + 1) / categories.length) * 100}%`,
                }}
              />
            </div>
            {review ? (
              <>
                <h2>Votre sélection</h2>
                <p className={styles.muted}>
                  Vérifiez vos favoris avant de confirmer votre bulletin.
                </p>
                <div className={styles.recap}>
                  {categories.map((cat, i) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setIndex(i);
                        setReview(false);
                      }}
                    >
                      <span>{cat.name}</span>
                      <strong>
                        {candidates.find((c) => c.id === choices[cat.id])
                          ?.name || "Sans vote"}
                      </strong>
                    </button>
                  ))}
                </div>
                <div className={styles.nav}>
                  <button
                    type="button"
                    className={styles.back}
                    onClick={() => setReview(false)}
                  >
                    ← Retour
                  </button>
                  <button
                    type="button"
                    className={styles.next}
                    disabled={busy || !Object.keys(choices).length}
                    onClick={submit}
                  >
                    {busy
                      ? "Envoi…"
                      : preview
                        ? "Terminer la simulation ✦"
                        : recette
                          ? "Enregistrer mon vote TEST ✦"
                          : "Confirmer mes votes ✦"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className={styles.categoryHeader}>
                  <div className={styles.categoryCounter}>
                    PRIX {String(index + 1).padStart(2, "0")}
                  </div>
                  <h2>{category.name}</h2>
                  <p>{category.description}</p>
                </div>
                <div className={styles.grid}>
                  {candidates
                    .filter((c) => c.category_id === category.id)
                    .map((c) => (
                      <button
                        type="button"
                        key={c.id}
                        className={`${styles.candidate} ${selected === c.id ? styles.chosen : ""}`}
                        onClick={() => choose(c.id)}
                        aria-pressed={selected === c.id}
                      >
                        <div className={styles.photo}>
                          {c.photo ? (
                            <img src={c.photo} alt={c.name} />
                          ) : (
                            <span>✦</span>
                          )}
                          <span className={styles.tick}>
                            {selected === c.id ? "✓" : "+"}
                          </span>
                        </div>
                        <div className={styles.candidateText}>
                          <strong>{c.name}</strong>
                          <small>{c.title}</small>
                        </div>
                      </button>
                    ))}
                </div>
                {candidates.filter((c) => c.category_id === category.id)
                  .length === 0 && (
                  <p className={styles.muted}>
                    Les candidats de cette catégorie seront bientôt publiés.
                  </p>
                )}
                <div className={styles.nav}>
                  <button
                    type="button"
                    className={styles.back}
                    disabled={index === 0}
                    onClick={() => setIndex((i) => Math.max(0, i - 1))}
                  >
                    ← Précédent
                  </button>
                  <button
                    type="button"
                    className={styles.next}
                    onClick={() =>
                      index === categories.length - 1
                        ? setReview(true)
                        : setIndex((i) => i + 1)
                    }
                  >
                    {index === categories.length - 1
                      ? "Récapitulatif"
                      : "Suivant →"}
                  </button>
                </div>
              </>
            )}
          </section>
        )}
        {error && (
          <p role="alert" className={styles.error}>
            {error}
          </p>
        )}
      </main>
      <footer className={styles.footer}>
        JCI COTONOU LA DOYENNE <span>✦</span> FULL VIBES AWARDS
      </footer>
      {open && !loading && !identified && !done && (
        <div className={styles.overlay}>
          <form
            className={styles.modal}
            onSubmit={(e) => {
              e.preventDefault();
              if (identity.phone.replace(/\D/g, "").length < 8) {
                setError("Veuillez saisir un numéro valide.");
                return;
              }
              setError("");
              setIdentified(true);
            }}
          >
            <div className={styles.modalBadge}>BIENVENUE AUX AWARDS ✦</div>
            <h2>
              Avant de vibrer,
              <br />
              <em>présentons-nous.</em>
            </h2>
            <p>
              Quelques informations pour associer votre voix à votre
              participation.
            </p>
            <div className={styles.fields}>
              <label>
                Nom
                <input
                  required
                  maxLength={100}
                  autoComplete="family-name"
                  value={identity.lastName}
                  onChange={(e) =>
                    setIdentity((v) => ({ ...v, lastName: e.target.value }))
                  }
                  placeholder="Votre nom"
                />
              </label>
              <label>
                Prénom
                <input
                  required
                  maxLength={100}
                  autoComplete="given-name"
                  value={identity.firstName}
                  onChange={(e) =>
                    setIdentity((v) => ({ ...v, firstName: e.target.value }))
                  }
                  placeholder="Votre prénom"
                />
              </label>
              <label>
                Numéro de téléphone
                <input
                  required
                  type="tel"
                  maxLength={25}
                  autoComplete="tel"
                  value={identity.phone}
                  onChange={(e) =>
                    setIdentity((v) => ({ ...v, phone: e.target.value }))
                  }
                  placeholder="XX XX XX XX XX"
                />
              </label>
              <label>
                Titre
                <select
                  required
                  value={identity.title}
                  onChange={(e) =>
                    setIdentity((v) => ({ ...v, title: e.target.value }))
                  }
                >
                  <option value="">Sélectionnez votre titre</option>
                  {TITLES.map((title) => (
                    <option key={title} value={title}>
                      {title}
                    </option>
                  ))}
                </select>
              </label>
              <label className={styles.full}>
                Votre statut
                <select
                  value={identity.type}
                  onChange={(e) =>
                    setIdentity((v) => ({
                      ...v,
                      type: e.target.value as Identity["type"],
                      organization: "",
                    }))
                  }
                >
                  <option value="member">Membre JCI Cotonou La Doyenne</option>
                  <option value="ol">
                    Membre d’une organisation locale sœur
                  </option>
                  <option value="guest">Sympathisant / Invité</option>
                </select>
              </label>
              {identity.type === "ol" && (
                <label className={styles.full}>
                  Organisation locale sœur
                  <select
                    required
                    value={identity.organization}
                    onChange={(e) =>
                      setIdentity((v) => ({
                        ...v,
                        organization: e.target.value,
                      }))
                    }
                  >
                    <option value="">
                      Sélectionnez votre organisation locale
                    </option>
                    {OL_SOEURS.map((ol) => (
                      <option key={ol} value={ol}>
                        {ol}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </div>
            <p className={styles.privacy}>
              Vos informations sont utilisées uniquement pour la gestion et la
              vérification du scrutin.
            </p>
            {error && (
              <p role="alert" className={styles.error}>
                {error}
              </p>
            )}
            <button type="submit" className={styles.enter}>
              Découvrir les catégories <span>→</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
