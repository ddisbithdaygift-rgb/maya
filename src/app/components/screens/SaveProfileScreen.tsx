import { Button } from '../ui/button';
import { CheckCircle, ShoppingBag, Home, ArrowLeft } from 'lucide-react';

interface SaveProfileScreenProps {
  onBuyNow: () => void;
  onStartOver: () => void;
}

export function SaveProfileScreen({ onBuyNow, onStartOver }: SaveProfileScreenProps) {
  return (
    <div className="flex flex-col min-h-screen p-6 bg-gradient-to-b from-yellow-100 via-yellow-50 to-green-50">
      {/* Optional Back Arrow - hidden for now since this is final screen */}
      {/* <div className="flex items-center mb-6">
        <Button
          onClick={onStartOver}
          variant="ghost"
          size="sm"
          className="p-2 -ml-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div> */}

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-200 to-green-200 flex items-center justify-center mb-6">
          <CheckCircle className="w-12 h-12 text-green-700" />
        </div>

        <h1 className="mb-4 text-center text-green-900">
          Profile Saved Successfully!
        </h1>
        
        <p className="mb-8 text-center text-green-700 max-w-sm">
          Your measurements and preferences have been securely stored. Shop with confidence knowing your perfect size.
        </p>

        <div className="w-full max-w-sm space-y-4 p-6 bg-white rounded-2xl border border-green-100 shadow-sm mb-8">
          <h3 className="text-sm font-semibold text-green-800 mb-3">What's Next?</h3>
          <ul className="space-y-3 text-sm text-green-700">
            <li className="flex items-start gap-3">
              <ShoppingBag className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Browse products with instant size recommendations</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span>View fit visualizations for every item</span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Return anytime - your profile is ready</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          onClick={onBuyNow}
          className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
          size="lg"
        >
          <ShoppingBag className="w-5 h-5 mr-2" />
          Start Shopping
        </Button>
        
        <Button
          onClick={onStartOver}
          variant="outline"
          className="w-full border-green-300 text-green-700 hover:bg-green-50"
        >
          <Home className="w-5 h-5 mr-2" />
          Back to Home
        </Button>
      </div>
    </div>
  );
}