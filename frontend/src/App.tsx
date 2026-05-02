import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './theme/ThemeProvider'
import MenuPage from './pages/MenuPage'
import CartPage from './pages/CartPage'
import PaymentPage from './pages/PaymentPage'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/carrinho" element={<CartPage />} />
          <Route path="/pagamento" element={<PaymentPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
