export interface ThemeConfig {
  brandName: string
  logoUrl: string | null
  primaryColor: string
  primaryDark: string
  mode: 'dark' | 'light'
}

export const defaultTheme: ThemeConfig = {
  brandName: 'TotemPurchase',
  logoUrl: null,
  primaryColor: '#6366f1',
  primaryDark: '#4f46e5',
  mode: 'dark',
}
