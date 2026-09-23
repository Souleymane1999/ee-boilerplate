---
name: mobile-screen-navigation-header
description: Convention for screen-level navigation headers in the mobile UI kit. Use this skill when building or reviewing sub-screens that need a back button, a centred title, and an optional right-side action icon.
user-invocable: true
---

# Mobile Screen Navigation Header — `MNav` Convention

## Rule

Every sub-screen (i.e. any screen reachable by navigating away from the home tab) **must** use the shared `MNav` component for its navigation header.
Do **not** build a one-off header with inline `style` props and a raw `<button>` back button.

---

## Component Definition

`MNav` is declared in `ui_kits/mobile/components.jsx`:

```jsx
const MNav = ({ title, onBack, right }) => (
  <div className="m-nav">
    <button className="btn" onClick={onBack}>
      <M_Icon name="chevron-left" />
    </button>
    <div className="title">{title}</div>
    {right || <div style={{ width: 38 }}></div>}
  </div>
);
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | ✅ | Centred screen title displayed in the nav bar |
| `onBack` | `function` | ✅ | Called when the chevron-left back button is tapped |
| `right` | `JSX element` | ❌ | Optional action button placed in the right slot. When omitted, a 38 px spacer is rendered automatically to keep the title centred |

### CSS (styles.css)

```css
.m-nav          { display:flex; align-items:center; padding: 0 12px; height: 48px; gap: 6px; flex-shrink:0; }
.m-nav .btn     { background:#fff; border: 1px solid var(--border-subtle); width: 38px; height: 38px;
                  border-radius: 12px; display:flex; align-items:center; justify-content:center;
                  cursor:pointer; padding: 0; box-shadow: var(--shadow-xs); }
.m-nav .btn .lucide { width: 18px; height: 18px; color: var(--fg-1); }
.m-nav .btn.red .lucide { color: var(--danger); }
.m-nav .title   { flex: 1; text-align:center; font-weight: 700; font-size: 16px;
                  color: var(--fg-1); letter-spacing: -0.01em; }
```

---

## When to Use

Use `MNav` on **every** screen that:

- Is pushed onto the navigation stack (has a "back" destination)
- Needs a centred title
- Optionally needs a single contextual action in the top-right corner

---

## Screens Already Using `MNav`

| Screen | File | Right action |
|--------|------|-------------|
| **KYC** — Vérification d'identité | `Screens2.jsx` | `shield-check` icon (lime green background) |
| **Settings** — Paramètres | `Screens2.jsx` | `log-out` icon (red variant — `className="btn red"`) |
| **Recharge** — Recharger mon compte | `Screens2.jsx` | *(none — spacer only)* |
| **CardsListScreen** — Mes cartes VISA | `Screens3.jsx` | `hand-coins` icon (lime green background) |
| Historique des transactions | `Screens2.jsx` | `qr-code` icon (brand-ink background) |
| Dépôt | `Screens2.jsx` | `wallet` icon (orange/warning background `#FFEDD9`) |
| Paramètres agent | `Screens2.jsx` | `more-vertical` icon |
| Menu Transactions | `Screens2.jsx` | *(none)* |
| Détail carte (VISA) | `Screens3.jsx` | `settings-2` icon (orange/warning background) |
| Recharger ma carte | `Screens3.jsx` | *(none)* |
| Créer une nouvelle carte | `Screens3.jsx` | *(none)* |

---

## Placing Action Icons via the `right` Prop

Pass a `<button className="btn">` element with a styled background and a `<M_Icon>` inside:

```jsx
// Lime green action (e.g. funding / recharge)
<MNav
  title="Mes cartes VISA"
  onBack={onBack}
  right={
    <button className="btn" style={{ background: 'var(--brand-lime-600)', borderColor: 'var(--brand-lime-700)' }}>
      <M_Icon name="hand-coins" style={{ width: 18, height: 18, color: '#fff' }} />
    </button>
  }
/>

// Orange/warning action (e.g. settings)
<MNav
  title="Détail carte"
  onBack={onBack}
  right={
    <button className="btn" style={{ background: '#FFEDD9', borderColor: '#F5C685' }}>
      <M_Icon name="settings-2" style={{ width: 18, height: 18, color: '#B5610B' }} />
    </button>
  }
/>

// Destructive action (logout)
<MNav
  title="Paramètres"
  onBack={onBack}
  right={<button className="btn red"><M_Icon name="log-out" /></button>}
/>
```

Common right-slot icons and their semantic meaning:

| Icon | Background | Use case |
|------|-----------|----------|
| `hand-coins` | brand-lime-600 | Funding / recharge shortcut |
| `settings-2` | `#FFEDD9` (orange-tint) | Item-level settings |
| `log-out` | `btn red` class | Destructive sign-out |
| `wallet` | `#FFEDD9` (orange-tint) | Wallet / balance action |
| `qr-code` | brand-ink (dark) | Scan / QR code |
| `more-vertical` | default white | Overflow/contextual menu |

---

## Anti-Pattern to Avoid

The screens in `Screens.jsx` (Home, Send, DetailScreen) use **manual inline headers** — this is an older pattern that predates `MNav` and should not be replicated:

```jsx
// ❌ DO NOT do this on new screens
<div style={{ display:'flex', alignItems:'center', padding: '0 16px', height: 44 }}>
  <button onClick={onBack} style={{ background: 'transparent', border: 0, padding: 6, cursor: 'pointer' }}>
    <M_Icon name="chevron-left" />
  </button>
  <div style={{ flex: 1, textAlign: 'center', fontWeight: 600, fontSize: 15, color: 'var(--fg-1)' }}>
    {title}
  </div>
  <div style={{ width: 32 }}></div>
</div>

// ✅ DO this instead
<MNav title={title} onBack={onBack} />
```

Problems with the inline pattern: inconsistent height (44 px vs 48 px), no shared button styling, harder to maintain, ignores the design system button tokens.
