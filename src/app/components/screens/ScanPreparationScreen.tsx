import { Button } from '../ui/button';
import { Camera, ArrowLeft } from 'lucide-react';

interface ScanPreparationScreenProps {
  onReady: () => void;
  onBack: () => void;
}

export function ScanPreparationScreen({ onReady, onBack }: ScanPreparationScreenProps) {
  return (
    <div className="flex flex-col min-h-screen p-6 bg-gradient-to-b from-purple-50 via-pink-50 to-background">
      {/* Header with Back Arrow */}
      <div className="flex items-center mb-6">
        <Button
          onClick={onBack}
          variant="ghost"
          size="sm"
          className="p-2 -ml-2 text-primary hover:text-purple-800 hover:bg-purple-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="ml-2 text-foreground">Prepare for Scan</h1>
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-center mb-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-secondary flex items-center justify-center">
            <Camera className="w-16 h-16 text-white" />
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-purple-200 shadow-sm">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-primary font-semibold flex-shrink-0">
              1
            </div>
            <div>
              <p className="font-medium text-foreground">Stand 6 feet from camera</p>
              <p className="text-sm text-muted-foreground">Make sure your full body is visible</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-pink-200 shadow-sm">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-pink-100 text-accent font-semibold flex-shrink-0">
              2
            </div>
            <div>
              <p className="font-medium text-foreground">Wear form-fitting clothes</p>
              <p className="text-sm text-muted-foreground">For accurate measurements</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-yellow-200 shadow-sm">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-secondary font-semibold flex-shrink-0">
              3
            </div>
            <div>
              <p className="font-medium text-foreground">Good lighting required</p>
              <p className="text-sm text-muted-foreground">Stand in a well-lit area</p>
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={onReady}
        className="w-full h-12 bg-gradient-to-r from-primary via-accent to-pink-600 hover:from-purple-700 hover:via-pink-600 hover:to-pink-700 text-white"
        size="lg"
      >
        I'm Ready
      </Button>
    </div>
  );
}