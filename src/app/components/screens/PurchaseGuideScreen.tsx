import { Button } from '../ui/button';
import { ArrowLeft, ExternalLink, ShoppingCart, MapPin, Smartphone, CreditCard, Check } from 'lucide-react';
import { Product, formatPrice } from '../../data/mockData';

interface PurchaseGuideScreenProps {
  product: Product;
  recommendedSize: string;
  onBuyNow: () => void;
  onBack: () => void;
}

export function PurchaseGuideScreen({ 
  product, 
  recommendedSize,
  onBuyNow,
  onBack 
}: PurchaseGuideScreenProps) {
  const handleVisitStore = () => {
    if (product.purchaseUrl) {
      window.open(product.purchaseUrl, '_blank');
    }
  };

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
        <h1 className="ml-2 text-foreground">How to Purchase</h1>
      </div>

      {/* Product Summary */}
      <div className="px-6 pb-4">
        <div className="bg-white rounded-2xl p-4 border border-purple-200 shadow-sm">
          <div className="flex gap-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <p className="font-medium text-foreground">{product.name}</p>
              <p className="text-sm text-muted-foreground">{product.brand}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-2xl font-bold text-primary">{formatPrice(product.price)}</span>
                <div className="px-3 py-1 bg-gradient-to-r from-primary to-accent rounded-full">
                  <span className="text-white font-bold text-sm">Size {recommendedSize}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Options */}
      <div className="flex-1 px-6 space-y-4 overflow-auto pb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">Purchase Options</h2>
          
          {/* Online Purchase */}
          <div className="bg-white rounded-xl p-5 border border-purple-200 mb-3 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">Buy Online</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Purchase directly from {product.brand}'s official website
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Home delivery available</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Free returns within 30 days</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Secure payment options</span>
                  </div>
                </div>
                <Button
                  onClick={handleVisitStore}
                  className="w-full bg-gradient-to-r from-primary via-accent to-pink-600 hover:from-purple-700 hover:via-pink-600 hover:to-pink-700 text-white"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit {product.brand} Store
                </Button>
              </div>
            </div>
          </div>

          {/* In-Store Purchase */}
          <div className="bg-white rounded-xl p-5 border border-pink-200 mb-3 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-pink-600 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">Visit a Store</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Try it on in person at a {product.brand} retail location
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-accent" />
                    <span className="text-muted-foreground">Try before you buy</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-accent" />
                    <span className="text-muted-foreground">Expert assistance available</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-accent" />
                    <span className="text-muted-foreground">Immediate availability</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile App */}
          <div className="bg-white rounded-xl p-5 border border-yellow-200 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-amber-500 flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">Use Mobile App</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Download the {product.brand} app for exclusive deals
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-secondary" />
                    <span className="text-muted-foreground">App-only discounts</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-secondary" />
                    <span className="text-muted-foreground">Track your order in real-time</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
          <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Important Purchase Tips
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Always select <strong className="text-primary">Size {recommendedSize}</strong> when ordering this product</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">•</span>
              <span>Save your size recommendation for future purchases</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary mt-0.5">•</span>
              <span>Check the return policy before purchasing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Use this app to check your size for any {product.brand} product</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-6 border-t border-purple-100 bg-white space-y-3">
        <Button
          onClick={handleVisitStore}
          className="w-full h-12 bg-gradient-to-r from-primary via-accent to-pink-600 hover:from-purple-700 hover:via-pink-600 hover:to-pink-700 text-white"
          size="lg"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Buy Size {recommendedSize} Now
        </Button>
        
        <Button
          onClick={onBuyNow}
          variant="outline"
          className="w-full h-12 border-purple-300 text-primary hover:bg-purple-50"
          size="lg"
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}