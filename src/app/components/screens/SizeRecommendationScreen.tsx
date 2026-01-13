import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { CheckCircle, AlertTriangle, ArrowLeft, Eye, ArrowRight, ShoppingBag } from 'lucide-react';
import { Product, UserMeasurements, calculateSizeRecommendation, formatPrice } from '../../data/mockData';

interface SizeRecommendationScreenProps {
  product: Product;
  userMeasurements: UserMeasurements;
  onViewFit: () => void;
  onViewSimilar: () => void;
  onBuyNow: () => void;
  onBack: () => void;
}

export function SizeRecommendationScreen({ 
  product,
  userMeasurements,
  onViewFit,
  onViewSimilar,
  onBuyNow,
  onBack 
}: SizeRecommendationScreenProps) {
  const recommendation = calculateSizeRecommendation(userMeasurements, product);

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
        <h1 className="ml-2 text-foreground">Your Size</h1>
      </div>

      {/* Product Image */}
      <div className="w-full aspect-square bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Recommendation */}
      <div className="flex-1 p-6 bg-white rounded-t-3xl -mt-6 relative">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Recommended Size</p>
            <p className="text-2xl font-bold text-primary">{formatPrice(product.price)}</p>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary via-accent to-pink-600 text-white rounded-2xl shadow-lg">
              <span className="text-3xl font-bold">{recommendation.recommendedSize}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <p className="font-medium text-foreground">Great Fit</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Confidence</span>
                  <span className="font-medium text-foreground">{recommendation.confidence}%</span>
                </div>
                <Progress value={recommendation.confidence} className="h-2" />
              </div>
            </div>
          </div>
        </div>

        {/* Warnings */}
        {recommendation.warnings.length > 0 && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-700 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-yellow-900 mb-1">Fit Notes</p>
                <ul className="text-sm text-yellow-800 space-y-1">
                  {recommendation.warnings.map((warning, index) => (
                    <li key={index}>• {warning}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Size Chart */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-3 text-foreground">Available Sizes</p>
          <div className="flex gap-2 flex-wrap">
            {product.sizes.map((size) => (
              <div
                key={size}
                className={`
                  px-4 py-2 rounded-lg border-2 transition-all
                  ${size === recommendation.recommendedSize
                    ? 'border-primary bg-purple-50 text-primary font-semibold'
                    : 'border-purple-200 bg-white text-muted-foreground'}`}
              >
                <span className="font-medium">{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Measurement Comparison */}
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <p className="text-sm font-medium mb-3 text-foreground">Size {recommendation.recommendedSize} Measurements</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Chest</span>
              <span className="text-foreground font-medium">{product.measurements[recommendation.recommendedSize].chest} cm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Waist</span>
              <span className="text-foreground font-medium">{product.measurements[recommendation.recommendedSize].waist} cm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Hips</span>
              <span className="text-foreground font-medium">{product.measurements[recommendation.recommendedSize].hips} cm</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-6 border-t border-purple-100 bg-white space-y-3">
        <Button
          onClick={onBuyNow}
          className="w-full h-12 bg-gradient-to-r from-primary via-accent to-pink-600 hover:from-purple-700 hover:via-pink-600 hover:to-pink-700 text-white"
          size="lg"
        >
          <ShoppingBag className="w-5 h-5 mr-2" />
          Buy Size {recommendation.recommendedSize} - {formatPrice(product.price)}
        </Button>

        <Button
          onClick={onViewFit}
          variant="outline"
          className="w-full h-12 border-purple-300 text-primary hover:bg-purple-50"
          size="lg"
        >
          <Eye className="w-5 h-5 mr-2" />
          View Fit Preview
        </Button>
        
        <Button
          onClick={onViewSimilar}
          variant="outline"
          className="w-full h-12 border-pink-300 text-accent hover:bg-pink-50"
          size="lg"
        >
          Similar Items That Fit
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>

        <Button
          onClick={onBack}
          variant="ghost"
          className="w-full text-primary hover:bg-purple-50"
        >
          Back to Products
        </Button>
      </div>
    </div>
  );
}