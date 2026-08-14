import React from 'react';
import { Product, ProductFinish } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToBasket: (product: Product, finish: ProductFinish) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToBasket,
}) => {
  const [selectedFinish, setSelectedFinish] = React.useState<ProductFinish>(product.defaultFinish);

  return (
    <div 
      className="group bg-white rounded-xl overflow-hidden border border-[#d8c3b4]/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Product Image Container */}
        <div className="relative h-64 sm:h-72 overflow-hidden bg-[#f9ebe3]">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Badge */}
          {product.badge && (
            <span className="absolute top-3 left-3 bg-[#a65836] text-white text-[10px] font-manrope font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-sm">
              {product.badge}
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="p-5">
          <span className="text-[10px] uppercase font-manrope font-bold text-[#894d0d] tracking-widest block">
            {product.series}
          </span>
          
          <h3 className="font-eb-garamond text-xl font-bold text-[#211a15] mt-1 line-clamp-1">
            {product.name}
          </h3>

          <p className="font-manrope text-xs text-[#524439] mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Finish Selector */}
          <div className="mt-4 pt-3 border-t border-[#eee0d7]">
            <span className="text-[10px] font-manrope font-bold text-[#857467] uppercase tracking-wider block mb-2">
              Finish: <span className="text-[#211a15]">{selectedFinish}</span>
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {product.finishes.map((finish) => {
                const finishColorMap: Record<ProductFinish, string> = {
                  'Brushed Copper': '#a65836',
                  'Aged Brass': '#c5a059',
                  'Satin Nickel': '#9aa0a6',
                  'Matte Black': '#211a15',
                  'Rose Gold': '#b76e79',
                };
                const isSelected = selectedFinish === finish;
                return (
                  <button
                    key={finish}
                    onClick={() => setSelectedFinish(finish)}
                    className={`w-5 h-5 rounded-full border transition-transform cursor-pointer ${
                      isSelected
                        ? 'border-[#a65836] scale-125 ring-2 ring-[#a65836]/30'
                        : 'border-stone-300 hover:scale-110'
                    }`}
                    style={{ backgroundColor: finishColorMap[finish] || '#a65836' }}
                    title={finish}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Price & Add to Basket Button */}
      <div className="px-5 pb-5 pt-3 flex items-center justify-between border-t border-[#eee0d7]/60 bg-[#fffaf8]">
        <div>
          <span className="text-[10px] font-manrope text-[#857467] block uppercase font-semibold">Specification Price</span>
          <span className="font-eb-garamond text-xl font-bold text-[#211a15]">
            £{product.price.toLocaleString()}
          </span>
        </div>

        <button
          onClick={() => onAddToBasket(product, selectedFinish)}
          className="btn-copper text-white text-[11px] font-manrope font-bold uppercase tracking-wider px-4 py-2.5 rounded-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">shopping_bag</span>
          <span>Add to Basket</span>
        </button>
      </div>
    </div>
  );
};

