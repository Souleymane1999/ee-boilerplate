// Shared mobile mock-data consts, hoisted from the original Screens*.jsx files
// where they lived at module/global scope. Nuxt auto-imports these named
// exports so any screen component can reference them directly.

// From Screens.jsx — Accueil transactions list. Also consumed by MobileUI.
export const HOME_TX = [
  { id: 1, name: 'Salaire Octobre',     tone: 'success', amount:  450000, when: "Aujourd'hui · 11:31", statusLabel: 'Reçu' },
  { id: 2, name: 'Moustapha K.',         tone: 'brand',   amount: -48200,  when: "Aujourd'hui · 09:02", statusLabel: 'Envoyé', method: 'Mobile Money' },
  { id: 3, name: 'NIGELEC · Facture',    tone: 'warning', amount: -18450,  when: "Hier · 18:14",       statusLabel: 'En attente' },
  { id: 4, name: 'Recharge Airtel',      tone: 'info',    amount: -2050,   when: '02/05',              statusLabel: 'Succès' },
  { id: 5, name: 'AmanaTa retrait',      tone: 'danger',  amount: -1500,   when: '29/04',              statusLabel: 'Échec' },
]

// From Screens2.jsx — Historique des transactions.
export const HTX = [
  { service: 'Dépôt', op: 'AIRTEL', amount: 2050,  date: "29/04/2026 · 09:01", ref: 'I377976535024', status: 'ok',   tone: 'orange', icon: 'wallet' },
  { service: 'Recharge iMoney', op: 'AMANA',  amount: 2050,  date: "29/04/2026 · 09:01", ref: 'I534685087550', status: 'pend', tone: 'amana',  icon: 'arrow-down-to-line' },
  { service: "Transfert d'argent", op: 'AMANA', amount: 2000,  date: "29/04/2026 · 09:00", ref: 'I651745644184', status: 'err',  tone: 'amana',  icon: 'send' },
  { service: 'Retrait', op: 'AIRTEL', amount: 2050, date: "29/04/2026 · 08:59", ref: 'I367033581881', status: 'ok',   tone: 'lime',   icon: 'wallet' },
  { service: 'Chap-Chap', op: 'AIRTEL', amount: 100, date: "28/04/2026 · 11:18", ref: 'I951080001820', status: 'ok',   tone: 'blue',   icon: 'smartphone' },
  { service: 'Retrait', op: 'AIRTEL', amount: 100,  date: "27/04/2026 · 11:56", ref: 'I344394601837', status: 'ok',   tone: 'lime',   icon: 'wallet' },
  { service: 'Retrait', op: 'AIRTEL', amount: 100,  date: "27/04/2026 · 11:56", ref: 'I856028377154', status: 'err',  tone: 'lime',   icon: 'wallet' },
]

export const htxToneMap = {
  orange: { bg: '#FFEDD9', fg: '#B5610B' },
  amana:  { bg: '#E0F0DA', fg: '#2E6B26' },
  lime:   { bg: '#F2F6D6', fg: '#5E6A1A' },
  blue:   { bg: '#E0EDFC', fg: '#1E4F86' },
}

// Original name in Screens2.jsx was `statusLabel`; renamed to avoid clashing
// with DetailScreen's unrelated local `statusTone` map. Shared by History and
// Recharge screens.
export const htxStatusLabel = { ok: 'Succès', err: 'Échec', pend: 'Initié', run: 'En cours' }

// From Screens2.jsx — Historique de recharge.
export const RECHARGES = [
  { amount: 1500,  method: 'Recharge via AmanaTa', date: '29/04/2026 · 18:52', ref: '253969495570', status: 'err' },
  { amount: 1000,  method: 'Recharge via AmanaTa', date: '29/04/2026 · 18:51', ref: '956360147242', status: 'err' },
  { amount: 10000, method: 'Recharge via Falaphone', date: '24/03/2026 · 14:40', ref: '627915843953', status: 'run' },
  { amount: 25000, method: 'Recharge via Guichet Amana', date: '17/03/2026 · 09:12', ref: '883401221045', status: 'ok' },
]
