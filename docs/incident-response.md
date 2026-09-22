# Gestion des incidents

## Sévérités

| Niveau | Définition | Exemple | Réponse attendue |
|---|---|---|---|
| **SEV1** | Service indisponible ou perte de données pour tout/la majorité des utilisateurs | API down, base de données inaccessible, faille de sécurité active exploitée | Réponse immédiate, mobilisation jusqu'à résolution, communication toutes les 30 min |
| **SEV2** | Fonctionnalité majeure dégradée ou indisponible pour une partie des utilisateurs | Un endpoint critique renvoie des erreurs 500 en masse, latence x10 | Réponse sous 1h, communication régulière jusqu'à résolution |
| **SEV3** | Bug mineur, dégradation limitée, contournement possible | Erreur cosmétique, fonctionnalité secondaire cassée | Traité en heures ouvrées, pas de mobilisation d'urgence |

## Qui est responsable

- **Incident Commander (IC)** : la première personne qui détecte/reçoit l'alerte assume ce rôle jusqu'à passation explicite. Coordonne, ne débogue pas forcément elle-même.
- **Responsable technique** : la personne (ou l'équipe) qui investigue et applique le correctif.
- **Communicant** : tient informé les parties prenantes (équipe, management, utilisateurs si nécessaire) pendant que l'IC/le technique se concentrent sur la résolution. Sur une petite équipe, l'IC peut cumuler ce rôle.

## Étapes de triage

1. **Détecter** : alerte automatique (Sentry, monitoring) ou signalement (utilisateur, équipe).
2. **Qualifier la sévérité** (SEV1/2/3) selon le tableau ci-dessus.
3. **Déclarer l'incident** : annoncer sur le canal de communication dédié (ex. `#incidents`), désigner l'IC.
4. **Investiguer** : reproduire, isoler la cause (logs, Sentry, métriques — voir `docs/observability.md`).
5. **Mitiger** : stopper l'hémorragie en premier (rollback, feature flag off, scale up) avant de chercher le fix définitif si le SEV1/2 le justifie.
6. **Résoudre** : appliquer le correctif, vérifier en prod.
7. **Clore** : annoncer la résolution, lever la mobilisation.
8. **Post-mortem** : rédiger sous 48h pour un SEV1/SEV2 (template ci-dessous).

## Canal de communication

- Canal dédié : `#incidents` (Slack/Teams ou équivalent) — à créer/adapter selon l'outil de l'équipe.
- Un incident SEV1/SEV2 doit avoir un message d'ouverture (symptôme, impact, IC) et des mises à jour régulières même si "toujours en investigation".
- Statut final toujours communiqué explicitement (résolu, impact, durée).

## Template de post-mortem (blameless)

À copier pour chaque incident SEV1/SEV2 dans `docs/postmortems/AAAA-MM-JJ-titre-court.md` (créer le dossier au besoin) :

```markdown
# Post-mortem : [titre court de l'incident]

- **Date** :
- **Sévérité** : SEV1 / SEV2 / SEV3
- **Durée** : de [heure début] à [heure fin] (X minutes/heures)
- **Incident Commander** :
- **Rédigé par** :

## Résumé (2-3 phrases)

## Impact
- Utilisateurs affectés :
- Fonctionnalités affectées :
- Impact business (si connu) :

## Timeline (heures en UTC ou fuseau explicite)
- HH:MM — détection / alerte
- HH:MM — déclaration de l'incident
- HH:MM — action de mitigation
- HH:MM — cause identifiée
- HH:MM — correctif déployé
- HH:MM — incident clos

## Cause racine
(technique, factuelle — pas de recherche de coupable)

## Ce qui a bien fonctionné

## Ce qui aurait pu mieux fonctionner

## Actions correctives
| Action | Responsable | Échéance |
|---|---|---|
| | | |

## Leçons apprises
```

### Principe "blameless"

L'objectif d'un post-mortem est de comprendre le système et ses failles, jamais de désigner un responsable individuel. Une erreur humaine est toujours le symptôme d'un système qui permettait cette erreur (manque de garde-fou, de test, de documentation, d'alerte) — c'est ça qu'on corrige.
