import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { defaultTheme, type ThemeConfig } from './config'

export interface ThemeContextValue extends ThemeConfig {
  toggleMode: () => void
}

const ThemeContext = createContext<ThemeContextValue>({
  ...defaultTheme,
  toggleMode: () => {},
})

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function applyDarkClass(mode: 'dark' | 'light') {
  document.documentElement.classList.toggle('dark', mode === 'dark')
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeConfig>(() => {
    try {
      const raw = localStorage.getItem('totem_theme')
      return raw ? { ...defaultTheme, ...JSON.parse(raw) } : defaultTheme
    } catch {
      return defaultTheme
    }
  })

  // CSS vars + dark class on mount and whenever theme changes
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--brand-primary', theme.primaryColor)
    root.style.setProperty('--brand-primary-dark', theme.primaryDark)
    root.style.setProperty('--brand-primary-subtle', hexToRgba(theme.primaryColor, 0.12))
    root.style.setProperty('--brand-primary-faint', hexToRgba(theme.primaryColor, 0.06))
    applyDarkClass(theme.mode)
  }, [theme])

  // Synchronous DOM toggle — doesn't wait for React render cycle
  const toggleMode = useCallback(() => {
    setTheme((prev) => {
      const next: ThemeConfig = {
        ...prev,
        mode: prev.mode === 'dark' ? 'light' : 'dark',
      }
      localStorage.setItem('totem_theme', JSON.stringify(next))
      applyDarkClass(next.mode) // apply immediately on click
      return next
    })
  }, [])

  const contextValue = useMemo<ThemeContextValue>(
    () => ({ ...theme, toggleMode }),
    [theme, toggleMode],
  )

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
