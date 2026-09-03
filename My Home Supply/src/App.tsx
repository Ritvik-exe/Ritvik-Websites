import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { CuratedSpaces } from './components/CuratedSpaces';
import { ProductShowcaseSlider } from './components/ProductShowcaseSlider';
import { CategoryShoppingView } from './components/CategoryShoppingView';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsAndConditions } from './components/TermsAndConditions';
import { PRODUCTS } from './data/products';
import { ProductCategory, ProductFinish, Product } from './types';
import { useSEO } from './utils/seo';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<'home' | 'privacy' | 'terms' | ProductCategory>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dynamic SEO management
  useSEO({ activeCategory, searchQuery });

  // Show Toast Notification
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Scroll Helpers
  const handleNavigateContact = () => {
    // If we are on privacy or terms page, navigate back to home first, then scroll
    if (activeCategory === 'privacy' || activeCategory === 'terms') {
      setActiveCategory('home');
      setTimeout(() => {
        const el = document.getElementById('contact-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById('contact-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleContactForProduct = (product: Product) => {
    handleNavigateContact();
    showToast(`Inquiring about ${product.name}`);
  };

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim() && (activeCategory === 'home' || activeCategory === 'privacy' || activeCategory === 'terms')) {
      setActiveCategory('bathroom'); // Route to search results automatically
    }
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
        activeCategory={activeCategory === 'privacy' || activeCategory === 'terms' ? 'home' : activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCatalog={() => {
          setActiveCategory('bathroom');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateContact={handleNavigateContact}
        searchQuery={searchQuery}
        onSearchQueryChange={handleSearchQueryChange}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-grow pt-24 md:pt-32">
        {activeCategory === 'home' ? (
          <>
            <ProductShowcaseSlider onSelectCategory={(cat) => {
              setActiveCategory(cat);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} />
            <CuratedSpaces onSelectCategory={(cat) => {
              setActiveCategory(cat);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} />
            <ContactSection />
          </>
        ) : activeCategory === 'privacy' ? (
          <PrivacyPolicy onBackToHome={() => {
            setActiveCategory('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} />
        ) : activeCategory === 'terms' ? (
          <TermsAndConditions onBackToHome={() => {
            setActiveCategory('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} />
        ) : (
          <>
            <CategoryShoppingView
              activeCategory={activeCategory as ProductCategory}
              onSelectCategory={(cat) => setActiveCategory(cat)}
              products={PRODUCTS}
              onContactUs={handleContactForProduct}
              searchQuery={searchQuery}
            />
            <ContactSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigateContact={handleNavigateContact}
        onNavigatePrivacy={() => {
          setActiveCategory('privacy');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateTerms={() => {
          setActiveCategory('terms');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
