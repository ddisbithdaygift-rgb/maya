import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Search, ChevronRight, ArrowLeft } from 'lucide-react';
import { products, Brand, Product, formatPrice, UserMeasurements } from '../../data/mockData';

interface ProductSelectionScreenProps {
  brand: Brand;
  userMeasurements: UserMeasurements;
  onSelectProduct: (product: Product) => void;
  onBack: () => void;
}

export function ProductSelectionScreen({ 
  brand, 
  userMeasurements,
  onSelectProduct, 
  onBack 
}: ProductSelectionScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products
    .filter(p => p.brand === brand.name)
    // Filter by gender: show gender-specific + unisex products
    .filter(p => {
      if (p.gender === 'unisex') return true;
      // Map 'other' to show all products
      if (userMeasurements.gender === 'other') return true;
      return p.gender === userMeasurements.gender;
    })
    .filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
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
        <div className="ml-2">
          <h1 className="text-foreground">{brand.name}</h1>
          <p className="text-sm text-muted-foreground">Select a product</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative px-6 pb-4">
        <Search className="absolute left-9 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 border-purple-200 focus:border-primary"
        />
      </div>

      {/* Product Grid */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <button
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="flex flex-col bg-white border border-purple-200 rounded-lg overflow-hidden hover:border-primary hover:shadow-lg transition-all"
            >
              <div className="aspect-square bg-gray-100 overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
                {/* Gender badge */}
                {product.gender !== 'unisex' && (
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                    product.gender === 'male' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-pink-500 text-white'
                  }`}>
                    {product.gender === 'male' ? '♂ Men' : '♀ Women'}
                  </div>
                )}
              </div>
              <div className="p-3 text-left">
                <Badge variant="secondary" className="mb-2 text-xs bg-purple-100 text-primary">
                  {product.category}
                </Badge>
                <p className="text-sm font-medium line-clamp-2 text-foreground">{product.name}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm font-bold text-primary">
                    {formatPrice(product.price)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {product.sizes.length} sizes
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <p className="text-foreground">No products found</p>
            <p className="text-sm text-muted-foreground mt-2">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
}