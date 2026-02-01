import React, { useState, useEffect, useCallback } from 'react';
import { View, Product, CartItem, User } from './types';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Catalog from './components/Catalog.tsx';
import { Cart } from './components/Cart.tsx';
import Footer from './components/Footer.tsx';
import ProductModal from './components/ProductModal.tsx';
import Contacts from './components/Contacts.tsx';
import Tracking from './components/Tracking.tsx';
import AuthModal from './components/AuthModal.tsx';
import Dashboard from './components/Dashboard.tsx';
import { MockBackend } from './services/backend.ts';
import { Zap } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTrackingId, setActiveTrackingId] = useState<string>('');
  const [toast, setToast] = useState<{msg: string, visible: boolean}>({msg: '', visible: false});

  useEffect(() => {
    const savedUser = localStorage.getItem('kanjo_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    const syncInterval = setInterval(() => {
      MockBackend.syncOrdersWithTelegram((orderId, status) => {
        setToast({ msg: `ЗАКАЗ ${orderId}: СТАТУС ОБНОВЛЕН ДО ${status.toUpperCase()}`, visible: true });
        setTimeout(() => setToast(prev => ({...prev, visible: false})), 5000);
      });
    }, 5000);

    return () => clearInterval(syncInterval);
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('kanjo_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('kanjo_user');
    setCurrentView('home');
  };

  const handleTrackFromDashboard = (orderId: string) => {
    setActiveTrackingId(orderId);
    setCurrentView('tracking');
  };

  const addToCart = useCallback((product: Product, size: string, color: string) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size && item.selectedColor === color);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedSize === size && item.selectedColor === color)
          ? { ...item, quantity: item.quantity + 1 }
          : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size, selectedColor: color }];
    });
  }, []);

  const removeFromCart = (id: string, size: string, color: string) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.selectedSize === size && item.selectedColor === color)));
  };

  const updateQuantity = (id: string, size: string, color: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id && item.selectedSize === size && item.selectedColor === color) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-[#0a0a0c]">
      <div className={`fixed top-24 right-6 z-[100] transition-all duration-500 transform ${toast.visible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0 pointer-events-none'}`}>
        <div className="bg-cyan-400 text-black px-6 py-4 shadow-[0_0_30px_rgba(6,182,212,0.4)] flex items-center gap-4 border border-white/20">
          <Zap size={20} className="animate-pulse" />
          <span className="font-mono text-xs font-bold tracking-tight">{toast.msg}</span>
        </div>
      </div>

      <Navbar 
        currentView={currentView} 
        setView={setCurrentView} 
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        currentUser={currentUser}
        onAuthClick={() => setIsAuthOpen(true)}
      />

      <main className="flex-grow">
        {currentView === 'home' && (
          <Hero onShopNow={() => setCurrentView('catalog')} />
        )}

        {currentView === 'catalog' && (
          <div className="pt-24 animate-in fade-in duration-1000">
            <Catalog onProductClick={setSelectedProduct} />
          </div>
        )}

        {currentView === 'tracking' && (
          <div className="pt-24">
            <Tracking currentUser={currentUser} initialOrderId={activeTrackingId} />
          </div>
        )}

        {currentView === 'contacts' && (
          <div className="pt-24">
            <Contacts />
          </div>
        )}

        {currentView === 'dashboard' && currentUser && (
          <div className="pt-24">
            <Dashboard 
              user={currentUser} 
              onLogout={handleLogout}
              onTrackOrder={handleTrackFromDashboard}
            />
          </div>
        )}
      </main>

      <Footer />

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateQty={updateQuantity}
        currentUser={currentUser}
      />

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLogin={handleLogin}
      />

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}
    </div>
  );
};

export default App;