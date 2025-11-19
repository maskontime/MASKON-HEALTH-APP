import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { MealsPage } from './pages/MealsPage';
import { HerbsPage } from './pages/HerbsPage';
import { HoneyPage } from './pages/HoneyPage';  
import { WorkoutsPage } from './pages/WorkoutsPage';
import { ExpertsPage } from './pages/ExpertsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/meals" element={<MealsPage />} />
                  <Route path="/meals/:id" element={<MealsPage />} />
                  <Route path="/herbs" element={<HerbsPage />} />
                  <Route path="/herbs/:id" element={<HerbsPage />} />
                  <Route path="/honey" element={<HoneyPage />} />
                  <Route path="/honey/:id" element={<HoneyPage />} />
                  <Route path="/workouts" element={<WorkoutsPage />} />
                  <Route path="/workouts/:id" element={<WorkoutsPage />} />
                  <Route path="/experts" element={<ExpertsPage />} />
                  <Route path="/experts/:id" element={<ExpertsPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                </Routes>
              </main>
              <Footer />
              <Toaster position="top-right" />
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

