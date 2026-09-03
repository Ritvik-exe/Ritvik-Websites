import React, { useState } from 'react';
import { Logo } from './Logo';
import { ProductCategory, MainCategory, SubCategory } from '../types';

interface NavbarProps {
  activeCategory: 'home' | ProductCategory;
  onSelectCategory: (category: 'home' | ProductCategory) => void;
  onOpenCatalog: () => void;
  onNavigateContact: () => void;
  searchQuery?: string;
  onSearchQueryChange?: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenCatalog,
  onNavigateContact,
  searchQuery = '',
  onSearchQueryChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHoverCategory, setActiveHoverCategory] = useState<MainCategory | null>(null);

  // Core navigation structure
  const mainCategories: {
    id: MainCategory;
    label: string;
    subcategories: { id: SubCategory; label: string; icon: string }[];
  }[] = [
    {
      id: 'bathroom',
      label: 'Bathrooms',
      subcategories: [
        { id: 'baths', label: 'Baths', icon: 'bathtub' },
        { id: 'showers', label: 'Showers', icon: 'shower' },
        { id: 'taps', label: 'Taps', icon: 'water_do' },
        { id: 'vanities', label: 'Vanities', icon: 'dresser' },
        { id: 'toilets', label: 'Toilets', icon: 'wc' },
      ],
    },
    {
      id: 'heating',
      label: 'Heating',
      subcategories: [
        { id: 'underfloor', label: 'Underfloor Heating', icon: 'heat' },
        { id: 'radiators', label: 'Radiators', icon: 'grid_view' },
        { id: 'towel_rails', label: 'Towel Rails', icon: 'dry_cleaning' },
      ],
    },
    {
      id: 'tiles',
      label: 'Tiles',
      subcategories: [
        { id: 'floor_tiles', label: 'Floor Tiles', icon: 'layers' },
        { id: 'wall_tiles', label: 'Wall Tiles', icon: 'view_quilt' },
        { id: 'outdoor_tiles', label: 'Outdoor Tiles', icon: 'nature_people' },
        { id: 'bathroom_tiles', label: 'Bathroom Tiles', icon: 'shower' },
        { id: 'kitchen_tiles', label: 'Kitchen Tiles', icon: 'kitchen' },
      ],
    },
    {
      id: 'plumbing',
      label: 'Plumbing',
      subcategories: [
        { id: 'pipes_fittings', label: 'Pipes & Fittings', icon: 'construction' },
        { id: 'waste_traps', label: 'Waste & Traps', icon: 'pipe' },
        { id: 'valves_connectors', label: 'Valves & Connectors', icon: 'settings_input_component' },
      ],
    },
  ];

  // Determine which main category the active subcategory belongs to
  const getActiveMainCategory = (): MainCategory | 'home' => {
    if (activeCategory === 'home') return 'home';
    const found = mainCategories.find(
      (m) =>
        m.id === activeCategory ||
        m.subcategories.some((s) => s.id === activeCategory)
    );
    return found ? found.id : 'bathroom';
  };

  const activeMain = getActiveMainCategory();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-[#eee0d7] shadow-sm">
      {/* Top Header: Logo, Search Bar, Quick Buttons */}
      <div className="bg-[#fffcfb] border-b border-[#f5ebe6] py-3 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Brand Logo */}
          <div 
            className="flex items-center cursor-pointer py-1 shrink-0"
            onClick={() => {
              onSelectCategory('home');
              if (onSearchQueryChange) onSearchQueryChange('');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            title="Return to Home"
          >
            <Logo size="md" />
          </div>

          {/* Center: Victorian-inspired Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
            <div className="w-full relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#857467] text-lg select-none">
                search
              </span>
              <input
                type="text"
                placeholder="Search baths, showers, tiles, radiators, plumbing..."
                value={searchQuery}
                onChange={(e) => {
                  if (onSearchQueryChange) {
                    onSearchQueryChange(e.target.value);
                  }
                }}
                className="w-full bg-[#f8f5f2] border border-[#d8c3b4]/60 rounded-full py-2.5 pl-11 pr-4 text-sm text-[#211a15] placeholder-[#857467] focus:outline-none focus:border-[#b55c3f] focus:bg-white focus:ring-1 focus:ring-[#b55c3f] transition-all font-manrope"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchQueryChange?.('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#857467] hover:text-[#b55c3f] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              )}
            </div>
          </div>

          {/* Right: Quick actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Contact Us button */}
            <button
              onClick={onNavigateContact}
              className="hidden sm:flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold text-[#524439] hover:text-[#b55c3f] transition-colors px-3 py-2 cursor-pointer font-manrope"
            >
              <span className="material-symbols-outlined text-lg">support_agent</span>
              <span>Contact</span>
            </button>

            {/* Catalog Trigger */}
            <button
              onClick={onOpenCatalog}
              className="btn-copper text-white h-9 sm:h-10 px-3.5 sm:px-4 rounded-full font-manrope text-[11px] uppercase tracking-wider font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[17px]">
                menu_book
              </span>
              <span>Catalog</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#211a15] hover:text-[#b55c3f] transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden bg-white px-6 py-2 border-b border-[#eee0d7]">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#857467] text-lg">
            search
          </span>
          <input
            type="text"
            placeholder="Search our catalog..."
            value={searchQuery}
            onChange={(e) => onSearchQueryChange?.(e.target.value)}
            className="w-full bg-[#f8f5f2] border border-[#d8c3b4]/60 rounded-full py-2 pl-10 pr-4 text-xs text-[#211a15]"
          />
        </div>
      </div>

      {/* Main Core Columns Navigation Bar */}
      <div className="hidden md:block bg-white px-6 lg:px-12 relative">
        <div className="max-w-[1440px] mx-auto flex justify-center items-center h-12 relative">
          <nav className="flex items-center gap-12">
            {mainCategories.map((category) => {
              const isCurrentlyActive = activeMain === category.id;
              return (
                <div
                  key={category.id}
                  className="relative h-12 flex items-center group cursor-pointer"
                  onMouseEnter={() => setActiveHoverCategory(category.id)}
                  onMouseLeave={() => setActiveHoverCategory(null)}
                  onClick={() => {
                    onSelectCategory(category.id);
                  }}
                >
                  <button
                    className={`font-manrope text-sm font-bold uppercase tracking-wider transition-all duration-300 relative py-1 cursor-pointer ${
                      isCurrentlyActive ? 'text-[#b55c3f]' : 'text-[#524439] hover:text-[#b55c3f]'
                    }`}
                  >
                    {category.label}
                  </button>
                  <span className={`absolute bottom-0 left-0 h-[3px] bg-[#b55c3f] transition-all duration-300 ${
                    isCurrentlyActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />

                  {/* Mega Dropdown menu */}
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-white border border-[#eee0d7] shadow-xl rounded-b-xl py-4 px-6 min-w-[280px] hidden group-hover:block z-50 animate-fadeIn">
                    <p className="text-[10px] font-bold text-[#b55c3f] uppercase tracking-widest mb-2 pb-1 border-b border-[#f5ebe6]">
                      Browse {category.label}
                    </p>
                    <div className="flex flex-col gap-1">
                      {category.subcategories.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectCategory(sub.id);
                          }}
                          className="flex items-center gap-3 text-left py-2 px-3 rounded-lg hover:bg-[#fff9f6] text-sm text-[#524439] hover:text-[#b55c3f] transition-all cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-lg text-[#857467] group-hover:text-[#b55c3f]">
                            {sub.icon}
                          </span>
                          <span className="font-medium">{sub.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Sub-Navigation Strip (Shows subsections of currently selected Main Category for easy access) */}
      {activeMain !== 'home' && (
        <div className="hidden md:block bg-[#fffcfb] border-t border-[#f5ebe6] py-2.5 px-6 lg:px-12">
          <div className="max-w-[1440px] mx-auto flex items-center justify-center gap-3 flex-wrap">
            <span className="text-[10px] font-bold text-[#857467] uppercase tracking-wider mr-2">
              Explore:
            </span>
            {/* "All" button */}
            <button
              onClick={() => onSelectCategory(activeMain)}
              className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                activeCategory === activeMain
                  ? 'bg-[#b55c3f] text-white'
                  : 'bg-white border border-[#eee0d7] text-[#524439] hover:border-[#b55c3f] hover:text-[#b55c3f]'
              }`}
            >
              All {activeMain.charAt(0).toUpperCase() + activeMain.slice(1)}s
            </button>

            {/* Subsection buttons */}
            {mainCategories
              .find((m) => m.id === activeMain)
              ?.subcategories.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => onSelectCategory(sub.id)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                    activeCategory === sub.id
                      ? 'bg-[#b55c3f] text-white'
                      : 'bg-white border border-[#eee0d7] text-[#524439] hover:border-[#b55c3f] hover:text-[#b55c3f]'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#d8c3b4] px-6 py-4 shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-2">
            {mainCategories.map((category) => (
              <div key={category.id} className="py-2 border-b border-[#f5ebe6]">
                <button
                  onClick={() => {
                    onSelectCategory(category.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left font-manrope text-sm font-extrabold uppercase tracking-wider py-1 ${
                    activeMain === category.id ? 'text-[#b55c3f]' : 'text-[#211a15]'
                  }`}
                >
                  {category.label}
                </button>
                <div className="pl-4 mt-2 flex flex-col gap-1.5">
                  {category.subcategories.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => {
                        onSelectCategory(sub.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`text-left font-manrope text-xs py-1.5 flex items-center gap-2 ${
                        activeCategory === sub.id ? 'text-[#b55c3f] font-bold' : 'text-[#524439]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">
                        {sub.icon}
                      </span>
                      <span>{sub.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={() => {
                onNavigateContact();
                setMobileMenuOpen(false);
              }}
              className="text-left font-manrope text-sm font-extrabold uppercase tracking-wider py-2 text-[#211a15] hover:text-[#b55c3f]"
            >
              Contact Us
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
