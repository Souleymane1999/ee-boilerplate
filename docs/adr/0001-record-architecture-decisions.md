# 1. Consigner les décisions d'architecture

## Statut
Accepté

## Contexte
Les décisions techniques importantes (choix d'une gem, d'un pattern d'architecture, d'un fournisseur externe) se perdent souvent — soit elles ne sont écrites nulle part, soit elles restent enterrées dans l'historique d'une PR que personne ne retrouve six mois plus tard. Une nouvelle équipe (ou vous-même dans un an) a besoin de comprendre *pourquoi* une décision a été prise, pas seulement *ce qui* a été décidé.

## Décision
On utilise des Architecture Decision Records (ADR) au format Michael Nygard : un fichier Markdown numéroté par décision dans `docs/adr/`, jamais modifié après coup (une décision qui change devient un nouvel ADR qui référence l'ancien).

## Conséquences
- Chaque décision technique non triviale (choix de base de données, d'authentification, de stratégie de déploiement, changement d'architecture majeur) doit avoir un ADR.
- Un ADR reste court : contexte, décision, conséquences. Pas besoin d'exhaustivité.
- Ce fichier (`0001`) est lui-même le premier exemple à suivre pour les suivants.

## Gabarit pour un nouvel ADR

```markdown
# N. Titre court à l'impératif

## Statut
Proposé / Accepté / Rejeté / Remplacé par ADR-N

## Contexte
Quel problème ou quelle contrainte a mené à cette décision ?

## Décision
Qu'est-ce qui a été décidé ?

## Conséquences
Qu'est-ce que ça change, en bien ou en moins bien ?
```
