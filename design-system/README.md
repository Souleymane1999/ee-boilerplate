# Design System — placeholder

**Ce dossier est un placeholder.** Dans un vrai projet, remplacez son contenu par votre design system existant (composants React, tokens de couleurs/typographie, Storybook, etc.) en l'important depuis son propre repo GitHub.

Ne construisez pas un design system ici — ce n'est pas le rôle de ce boilerplate. Ce dossier montre uniquement **où** les choses s'insèrent, avec une structure minimale d'accueil.

## Structure actuelle (exemple, à remplacer)

```
design-system/
├── README.md                       (ce fichier)
├── tokens/
│   └── colors.example.json         (exemple de format de tokens de couleurs)
└── components/
    └── README.md                   (placeholder pour les composants partagés)
```

## Comment brancher votre vrai design system

### Option A — npm workspace (monorepo)

Si votre design system a son propre repo, l'ajouter comme submodule ou le copier dans `design-system/`, puis déclarer un workspace à la racine :

```json
// package.json à la racine (à créer)
{
  "private": true,
  "workspaces": ["frontend", "design-system"]
}
```

Puis dans `frontend/package.json` :

```json
{
  "dependencies": {
    "@votre-org/design-system": "workspace:*"
  }
}
```

### Option B — `npm link` (développement local rapide)

```bash
cd design-system && npm link
cd ../frontend && npm link @votre-org/design-system
```

### Option C — package npm publié

Si le design system est publié sur un registre npm privé (GitHub Packages, npm privé) :

```bash
cd frontend
npm install @votre-org/design-system
```

Dans ce cas, supprimez entièrement ce dossier `design-system/` du boilerplate — il devient inutile.

## Exemple d'usage côté frontend

```tsx
// frontend/src/App.tsx
import { Button } from '@votre-org/design-system';

function App() {
  return <Button variant="primary">Cliquez-moi</Button>;
}
```

(Cet import ne fonctionnera qu'une fois votre vrai design system branché via une des options ci-dessus.)
