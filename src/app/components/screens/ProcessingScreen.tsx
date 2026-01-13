import { useEffect } from 'react';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';

interface ProcessingScreenProps {
  onComplete: () => void;
  onBack?: () => void;
}

export function ProcessingScreen({ onComplete, onBack }: ProcessingScreenProps) {
  useEffect(() => {
    // Simulate processing time
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gradient-to-b from-purple-100 via-pink-50 to-background">
      {/* Header with Back Arrow */}
      {onBack && (
        <div className="flex items-center mb-6">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="p-2 -ml-2 text-primary hover:text-purple-800 hover:bg-purple-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center">
        <Loader2 className="w-16 h-16 text-primary animate-spin mb-6" />
        <h2 className="text-2xl font-semibold mb-2 text-foreground">Analyzing Your Body</h2>
        <p className="text-muted-foreground">This will only take a moment...</p>
      </div>
    </div>
  );
}