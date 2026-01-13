import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { CheckCircle, ArrowLeft, ExternalLink } from 'lucide-react';
import { Product, UserMeasurements, products, calculateSizeRecommendation } from '../../data/mockData';

// DragScroll wrapper component
function DragScroll({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-x-auto overflow-y-hidden ${className}`}>
      {children}
    </div>
  );
}

interface SimilarItemsScreenProps {
  currentProduct: Product;
  userMeasurements: UserMeasurements;
  onSelectProduct: (product: Product) => void;
  onSaveAndExit: () => void;
  onBack: () => void;
}

export function SimilarItemsScreen({ 
  currentProduct,
  userMeasurements,
  onSelectProduct,
  onSaveAndExit,
  onBack 
}: SimilarItemsScreenProps) {
  // Find similar products (same category, excluding current, filtered by gender)
  const similarProducts = products
    .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
    // Filter by gender: show gender-specific + unisex products
    .filter(p => {
      if (p.gender === 'unisex') return true;
      if (userMeasurements.gender === 'other') return true;
      return p.gender === userMeasurements.gender;
    })
    .slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-yellow-50 to-green-50">
      {/* Header with Back Arrow */}
      <div className="flex items-center p-6 pb-4">
        <Button
          onClick={onBack}
          variant="ghost"
          size="sm"
          className="p-2 -ml-2 text-green-700 hover:text-green-800 hover:bg-green-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="ml-2">
          <h1 className="text-green-900">Similar Items</h1>
          <p className="text-sm text-green-600">That fit your measurements</p>
        </div>
      </div>

      {/* Similar Items Grid */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Horizontal scroll hint */}
          <p className="text-xs text-green-600 mb-4 flex items-center gap-2">
            <span>👆 Tap and drag to scroll</span>
          </p>
          
          <DragScroll className="pb-4">
            <div className="flex gap-4 min-w-min">
              {similarProducts.map((product) => {
                const recommendation = calculateSizeRecommendation(userMeasurements, product);
                
                return (
                  <button
                    key={product.id}
                    onClick={() => onSelectProduct(product)}
                    className="flex flex-col bg-white border border-green-200 rounded-lg overflow-hidden hover:border-green-500 hover:shadow-lg transition-all flex-shrink-0 w-[160px]"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-square bg-gray-100 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                      {/* Fit Badge */}
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-green-600 text-white text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Fits You
                        </Badge>
                      </div>
                      {/* Recommended Size */}
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="font-bold bg-yellow-100 text-green-800">
                          {recommendation.recommendedSize}
                        </Badge>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-3 text-left">
                      <p className="text-xs text-green-600 mb-1">{product.brand}</p>
                      <p className="text-sm font-medium line-clamp-2 mb-2 text-green-900">
                        {product.name}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-green-600">
                          {recommendation.confidence}% match
                        </span>
                        <ExternalLink className="w-3 h-3 text-green-600" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </DragScroll>

          {/* Grid view below horizontal scroll */}
          <div className="mt-8">
            <h3 className="text-sm font-medium mb-4 text-green-800">All Similar Items</h3>
            <div className="grid grid-cols-2 gap-4">
              {similarProducts.map((product) => {
                const recommendation = calculateSizeRecommendation(userMeasurements, product);
                
                return (
                  <button
                    key={`grid-${product.id}`}
                    onClick={() => onSelectProduct(product)}
                    className="flex flex-col bg-white border border-green-200 rounded-lg overflow-hidden hover:border-green-500 hover:shadow-lg transition-all"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-square bg-gray-100 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                      {/* Fit Badge */}
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-green-600 text-white text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Fits You
                        </Badge>
                      </div>
                      {/* Recommended Size */}
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="font-bold bg-yellow-100 text-green-800">
                          {recommendation.recommendedSize}
                        </Badge>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-3 text-left">
                      <p className="text-xs text-green-600 mb-1">{product.brand}</p>
                      <p className="text-sm font-medium line-clamp-2 mb-2 text-green-900">
                        {product.name}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-green-600">
                          {recommendation.confidence}% match
                        </span>
                        <ExternalLink className="w-3 h-3 text-green-600" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {similarProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <p className="text-green-700">No similar items available</p>
            <p className="text-sm text-green-600 mt-2">Check back later for more recommendations</p>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="p-6 border-t border-green-100 space-y-3 flex-shrink-0 bg-white">
        <Button
          onClick={onSaveAndExit}
          className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
          size="lg"
        >
          Save Profile & Exit
        </Button>
        <Button
          onClick={onBack}
          variant="outline"
          className="w-full border-green-300 text-green-700 hover:bg-green-50"
        >
          Back to Recommendation
        </Button>
      </div>
    </div>
  );
}