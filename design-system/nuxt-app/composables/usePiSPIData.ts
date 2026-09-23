// Shared PiSPI mock data, ported verbatim from ui_kits/mobile/PiSPIScreens.jsx.
// Exposed as module-level constants so every PiSPI screen component can consume
// them via Nuxt's composable auto-import (no window globals).

export const PISPI_TX = [
  { id: 1, name: 'Mamadou Diallo', title: 'Transfert envoyé', amount: -48200, when: '7 juin, 11:56', statusLabel: 'Envoyé', tone: 'brand', method: 'Alias PI', ref: 'PI-2406-7721' },
  { id: 2, name: 'Awa Traoré', title: 'Paiement reçu', amount: 12500, when: '7 juin, 10:24', statusLabel: 'Reçu', tone: 'success', method: 'Request to Pay', ref: 'PI-2406-7716' },
  { id: 3, name: 'NIGELEC · Facture', title: 'Facture', amount: -18450, when: '6 juin, 18:14', statusLabel: 'En attente', tone: 'warning', method: 'IBAN', ref: 'PI-2406-7698' },
  { id: 4, name: 'Amina Oumarou', title: 'Demande de paiement', amount: 25000, when: '6 juin, 16:42', statusLabel: 'Reçu', tone: 'warning', method: 'Request to Pay', ref: 'PI-2406-7687' },
  { id: 5, name: 'Ali Issoufou', title: 'Transfert envoyé', amount: -35000, when: '5 juin, 12:05', statusLabel: 'Envoyé', tone: 'brand', method: 'Alias PI', ref: 'PI-2406-7651' },
  { id: 6, name: 'Recharge Airtel', title: 'Recharge', amount: -2050, when: '5 juin, 08:42', statusLabel: 'Succès', tone: 'info', method: 'Autre compte', ref: 'PI-2406-7642' },
  { id: 7, name: 'Hadiza Abdou', title: 'Paiement reçu', amount: 7500, when: '4 juin, 19:18', statusLabel: 'Reçu', tone: 'success', method: 'Alias PI', ref: 'PI-2406-7609' },
]

export const PISPI_CONTACTS = [
  { name: 'Mamadou Diallo', alias: '+227 77 540 19 32', tone: 'brand' },
  { name: 'Awa Traoré', alias: 'awa.tr@pi', tone: 'success' },
  { name: 'Koffi Mensah', alias: 'koffi.m@pi', tone: 'info' },
]

export const PISPI_NOTIFICATION_CATEGORIES = [
  { key: 'unread', label: 'Non lues' },
  { key: 'all', label: 'Tous' },
  { key: 'payment', label: 'Demande de paiement' },
  { key: 'transfer', label: 'Transfert' },
  { key: 'cancellation', label: 'Annulation' },
  { key: 'claim', label: "Revendication d'alias" },
  { key: 'subscription', label: 'Abonnement' },
  { key: 'savings', label: 'Tirelire' },
  { key: 'tontine', label: 'Tontine' },
]

export const PISPI_NOTIFICATIONS = [
  { category: 'claim', unread: true, day: "Aujourd'hui", icon: 'at-sign', title: "Revendication d'alias", text: 'Vous avez reçu une revendication sur votre alias +227 77 540 19 32', badge: 'Important', tone: 'danger' },
  { category: 'payment', unread: true, day: "Aujourd'hui", icon: 'arrow-down-left', title: 'Demande de paiement', text: 'Demandée par Mamadou Diallo · 12.500 CFA', badge: 'À traiter', tone: 'warn' },
  { category: 'payment', unread: false, day: "Aujourd'hui", icon: 'arrow-up-right', title: 'Demande de paiement', text: 'Demandée à Awa Traoré · 10.000 CFA', badge: 'Envoyée', tone: 'neutral' },
  { category: 'transfer', unread: true, day: '7 juin', icon: 'arrow-up-right', title: 'Transaction échouée', text: 'Envoi à Mamadou Diallo · -48.200 CFA', badge: 'Échec', tone: 'danger' },
  { category: 'transfer', unread: false, day: '7 juin', icon: 'rotate-ccw', title: 'Retour de fonds échoué', text: 'Retour à Awa Traoré · 12.500 CFA', badge: 'Échec', tone: 'danger' },
  { category: 'cancellation', unread: true, day: '7 juin', icon: 'rotate-ccw', title: 'Annulation', text: 'Demandée par Mamadou Diallo · PI-2406-7698', badge: 'À traiter', tone: 'warn' },
  { category: 'cancellation', unread: false, day: '6 juin', icon: 'x-circle', title: 'Annulation rejetée', text: 'Demandée à Awa Traoré · rejetée', badge: 'Lu', tone: 'neutral' },
  { category: 'subscription', unread: false, day: '6 juin', icon: 'repeat-2', title: 'Abonnement actif', text: 'NIGELEC sera payé automatiquement le 05 juillet', badge: 'Planifié', tone: 'warn' },
  { category: 'subscription', unread: true, day: '5 juin', icon: 'calendar-clock', title: 'Paiement abonnement proche', text: 'Votre abonnement Canal+ sera exécuté le 7 juin, 11:56', badge: 'Nouveau', tone: 'success' },
  { category: 'savings', unread: true, day: '5 juin', icon: 'piggy-bank', title: 'Tirelire alimentée', text: '5.000 CFA ajoutés à la tirelire Projet Tabaski', badge: 'Nouveau', tone: 'success' },
  { category: 'savings', unread: false, day: '4 juin', icon: 'target', title: 'Objectif tirelire atteint', text: 'La tirelire Études atteint 80% de son objectif', badge: 'Info', tone: 'neutral' },
  { category: 'tontine', unread: true, day: '5 juin', icon: 'users', title: 'Tontine - tour reçu', text: 'Votre tour de tontine Famille Niamey est confirmé', badge: 'Nouveau', tone: 'success' },
  { category: 'tontine', unread: false, day: '4 juin', icon: 'hand-coins', title: 'Cotisation enregistrée', text: 'Votre cotisation de 15.000 CFA a été enregistrée', badge: 'Succès', tone: 'success' },
]

export const PISPI_ALIAS_CONTACTS = [
  { name: 'Amina Oumarou', alias: 'amina.ou@pi', phone: '90 24 76 36', tone: 'warning', hasAlias: true },
  { name: 'Ali Issoufou', alias: '+227 96 74 98 31', phone: '+227 96 74 98 31', tone: 'brand', hasAlias: false },
  { name: 'Awa Traoré', alias: 'awa.tr@pi', phone: '88 40 19 26', tone: 'success', hasAlias: true },
  { name: 'Abdou Karim', alias: '+227 91 40 18 22', phone: '+227 91 40 18 22', tone: 'info', hasAlias: false },
]
