// CFA currency formatting — West African style: "." thousands separator,
// no decimals, suffixed unit. Auto-imported by Nuxt across all components.
export const fmtCFA = (n: number): string => {
  const whole = Math.round(Math.abs(n))
  return whole.toLocaleString('en-US').replace(/,/g, '.')
}
