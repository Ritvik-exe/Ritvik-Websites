import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CuratedSpaces } from './components/CuratedSpaces';
import { CategoryShoppingView } from './components/CategoryShoppingView';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { ProductCategory, ProductFinish, Product } from './types';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<'home' | ProductCategory>('home');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Show Toast Notification
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Scroll Helpers
  const handleNavigateContact = () => {
    const el = document.getElementById('contact-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactForProduct = (product: Product) => {
    handleNavigateContact();
    showToast(`Inquiring about ${product.name}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#eee0d7] text-[#211a15] font-manrope selection:bg-[#b55c3f] selection:text-white relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#211a15] text-white px-5 py-3 rounded-lg shadow-2xl border border-[#b55c3f] flex items-center gap-3 animate-fadeIn">
          <span className="material-symbols-outlined text-[#b55c3f]">check_circle</span>
          <span className="text-xs font-manrope font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCatalog={() => setActiveCategory('baths')}
        onNavigateContact={handleNavigateContact}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-grow">
        {activeCategory === 'home' ? (
          <>
            <Hero onExplore={() => setActiveCategory('baths')} />
            <CuratedSpaces />
          </>
        ) : (
          <CategoryShoppingView
            activeCategory={activeCategory as ProductCategory}
            onSelectCategory={(cat) => setActiveCategory(cat)}
            products={PRODUCTS}
            onContactUs={handleContactForProduct}
          />
        )}

        {/* Contact Information & Interactive Form Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigateContact={handleNavigateContact}
        onOpenCatalog={() => setActiveCategory('baths')}
      />
    </div>
  );
}
