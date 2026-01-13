import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Search, ArrowLeft, ChevronRight } from 'lucide-react';
import { brands, Brand } from '../../data/mockData';

interface BrandSelectionScreenProps {
  onSelectBrand: (brand: Brand) => void;
  onBack: () => void;
}

export function BrandSelectionScreen({ onSelectBrand, onBack }: BrandSelectionScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-background">
      {/* Header with Back Arrow */}
      <div className="flex items-center p-6 pb-4">
        <Button
          onClick={onBack}
          variant="ghost"
          size="sm"
          className="p-2 -ml-2 text-primary hover:text-purple-800 hover:bg-purple-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="ml-2 text-foreground">Choose a Brand</h1>
      </div>

      {/* Brand List */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-3">
          {filteredBrands.map((brand) => (
            <button
              key={brand.id}
              onClick={() => onSelectBrand(brand)}
              className="flex items-center justify-between w-full p-4 bg-white border border-purple-200 rounded-lg hover:border-primary hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="text-left">
                  <p className="font-medium text-foreground">{brand.name}</p>
                  <p className="text-sm text-primary">View products</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-primary" />
            </button>
          ))}
        </div>

        {filteredBrands.length === 0 && (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <p className="text-foreground">No brands found</p>
            <p className="text-sm text-muted-foreground mt-2">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
}