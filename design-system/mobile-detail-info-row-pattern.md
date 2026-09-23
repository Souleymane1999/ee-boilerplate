---
name: mobile-detail-info-row-pattern
description: Convention for displaying labelled key/value information rows in the mobile UI kit (KYC, account details, card summaries, transaction details). Use this skill when building screens that show structured data in a label-left / value-right layout.
user-invocable: true
---

# Mobile Detail Info Row Pattern — `info-card` / `info-row` Convention

## Rule

Whenever a screen needs to display structured label/value pairs (personal info, transaction details, card summaries, document data, etc.) use the **`info-card` + `info-row`** markup pattern.

Do **not** reach for `detail-grid` / `detail-row-m` — those classes lack a fixed label width and produce misaligned columns (see [Anti-Pattern](#anti-pattern-to-avoid)).

---

## Markup Structure

```html
<div class="info-card">
  <div class="info-row">
    <span class="k">Label</span>
    <span class="v">Value</span>
  </div>
  <div class="info-row">
    <span class="k">Another label</span>
    <span class="v">Another value</span>
  </div>
  <!-- … -->
</div>
```

In JSX:

```jsx
<div className="info-card">
  <div className="info-row">
    <span className="k">Mode</span>
    <span className="v">Mobile Money</span>
  </div>
  <div className="info-row">
    <span className="k">Référence</span>
    <span className="v" style={{ fontFamily: 'var(--font-mono)' }}>I377976535024</span>
  </div>
  <div className="info-row">
    <span className="k">Frais</span>
    <span className="v">0 CFA</span>
  </div>
</div>
```

---

## CSS Rules (styles.css)

```css
/* Info card (KYC-style key/value rows) */
.info-card {
  background: #fff;
  margin: 0 16px 8px;
  border-radius: 16px;
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-xs);
  overflow: hidden;
}

.info-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  font-size: 13.5px;
}

.info-row + .info-row {
  border-top: 1px dashed var(--border-subtle);
}

.info-row .k {
  color: var(--fg-3);   /* muted label colour */
  flex: 0 0 44%;        /* ← fixed label column width — CRITICAL for alignment */
}

.info-row .v {
  color: var(--fg-1);
  font-weight: 600;
  flex: 1;
  text-align: right;
}
```

### The `flex: 0 0 44%` rule

The key CSS rule `flex: 0 0 44%` on `.info-row .k` (the label span) is what keeps all labels in a fixed-width column regardless of text length.
Without it, labels grow to fit their content and values shift unpredictably — this is exactly the failure mode of the `detail-row-m` pattern.

---

## Screens Already Using This Pattern

| Screen | File | What is displayed |
|--------|------|-------------------|
| **KYC** — Vérification d'identité | `Screens2.jsx` | Three `info-card` blocks: *Informations personnelles* (Prénom, Nom, Genre, Date/Lieu de naissance), *Informations complémentaires* (Profession, Pays/Ville de résidence, Adresse), *Information de la pièce* (Type, Numéro, Dates de création/expiration, Autorité émettrice) |
| **Account / Transaction detail** | `Screens.jsx` (DetailScreen) | Transaction metadata: Mode, Référence, De, À, Initié, Frais |
| **Carte VISA — Récapitulatif** | `Screens3.jsx` (CardCreateScreen) | Card creation summary: Type, Émission, Recharge initiale, Total à débiter |

---

## Customising `info-card` Appearance

The card's background and border can be overridden inline for contextual variants (e.g. informational banners):

```jsx
{/* Lime-green info/notice variant */}
<div className="info-card" style={{ margin: '14px 16px 0', background: 'var(--brand-lime-50)', borderColor: 'var(--brand-lime-200)' }}>
  <div className="info-row" style={{ padding: '10px 14px', alignItems: 'center' }}>
    {/* Override flex: 0 0 44% → flex: 0 to let icon be icon-sized */}
    <span className="k" style={{ flex: 0 }}>
      <M_Icon name="zap" style={{ width: 14, height: 14, color: 'var(--brand-lime-700)' }} />
    </span>
    <span className="v" style={{ textAlign: 'left', fontWeight: 500, color: 'var(--fg-2)', fontSize: 12, lineHeight: 1.45 }}>
      La recharge est instantanée…
    </span>
  </div>
</div>
```

> **Note:** When using an icon as the `.k` element in a banner row, override its flex to `0` (not `0 0 44%`) so the icon stays icon-sized and does not consume a 44% column.

---

## Grouping Multiple Cards Under Section Headers

Use `.m-section-h` between `info-card` blocks to label each group:

```jsx
<div className="m-section-h">Informations personnelles</div>
<div className="info-card">
  <div className="info-row"><span className="k">Prénom</span><span className="v">Moustapha</span></div>
  {/* … */}
</div>

<div className="m-section-h">Information de la pièce</div>
<div className="info-card">
  <div className="info-row"><span className="k">Type</span><span className="v">CNI</span></div>
  {/* … */}
</div>
```

---

## Anti-Pattern to Avoid

### `detail-grid` / `detail-row-m`

These classes exist in `styles.css` but are **not used** in any current screen. Do not adopt them for new screens.

```css
/* ❌ Old pattern — DO NOT USE */
.detail-grid    { padding: 12px 0; }
.detail-row-m   { display:flex; justify-content:space-between; align-items:center;
                  padding: 12px 20px; font-size: 13.5px; }
.detail-row-m + .detail-row-m { border-top: 1px dashed var(--border-subtle); }
.detail-row-m .k { color: var(--fg-3); }                        /* ← no fixed width! */
.detail-row-m .v { color: var(--fg-1); font-weight: 600; font-variant-numeric: tabular-nums; }
```

**Why it breaks:** `.detail-row-m .k` has no `flex` or `width` constraint, so the label column width changes with every row depending on its text length. When label lengths differ across rows (e.g. "Type" vs "Numéro de la pièce") the value column shifts left and right, producing a ragged, misaligned layout.

**The fix:** Always use `info-card` + `info-row` with `.k { flex: 0 0 44% }` (already set globally in styles.css) instead.

```jsx
// ❌ DO NOT do this
<div className="detail-grid">
  <div className="detail-row-m">
    <span className="k">Type</span>
    <span className="v">CNI</span>
  </div>
  <div className="detail-row-m">
    <span className="k">Numéro de la pièce</span>
    <span className="v">NER · 0028574</span>
  </div>
</div>

// ✅ DO this instead
<div className="info-card">
  <div className="info-row">
    <span className="k">Type</span>
    <span className="v">CNI</span>
  </div>
  <div className="info-row">
    <span className="k">Numéro de la pièce</span>
    <span className="v" style={{ fontFamily: 'var(--font-mono)' }}>NER · 0028574</span>
  </div>
</div>
```
