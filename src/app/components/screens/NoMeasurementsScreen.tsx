import { Button } from '../ui/button';
import { Ruler, ArrowLeft } from 'lucide-react';

interface NoMeasurementsScreenProps {
  onGetMeasured?: () => void;
  onBack: () => void;
}

export function NoMeasurementsScreen({ onGetMeasured, onBack }: NoMeasurementsScreenProps) {
  return (
    <div className="flex flex-col min-h-screen p-6 bg-gradient-to-b from-yellow-50 to-green-50">
      {/* Header with Back Arrow */}
      <div className="flex items-center mb-6">
        <Button
          onClick={onBack}
          variant="ghost"
          size="sm"
          className="p-2 -ml-2 text-green-700 hover:text-green-800 hover:bg-green-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="ml-2 text-green-900">Size Recommendation</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        {/* Icon */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-200 to-green-200 flex items-center justify-center mb-6">
          <Ruler className="w-12 h-12 text-green-700" />
        </div>

        {/* Message */}
        <h2 className="text-2xl font-bold text-green-900 mb-4">
          Get Your Perfect Size
        </h2>
        <p className="text-green-700 mb-8 max-w-sm">
          To get personalized size recommendations, we need your body measurements. 
          Take a quick scan to find your perfect fit!
        </p>

        {/* CTA Buttons */}
        <div className="w-full space-y-3">
          <Button
            onClick={onGetMeasured}
            className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
            size="lg"
          >
            <Ruler className="w-5 h-5 mr-2" />
            Get Measured Now
          </Button>
          
          <Button
            onClick={onBack}
            variant="outline"
            className="w-full h-12 border-green-300 text-green-700 hover:bg-green-50"
            size="lg"
          >
            Continue Browsing
          </Button>
        </div>

        {/* Info Box */}
        <div className="mt-8 p-4 bg-yellow-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            <span className="font-semibold">Quick & Easy:</span> The scan takes less than 60 seconds 
            and your measurements are saved for future shopping.
          </p>
        </div>
      </div>
    </div>
  );
}