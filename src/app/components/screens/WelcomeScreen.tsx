import { Button } from '../ui/button';
import { Ruler, User } from 'lucide-react';

interface WelcomeScreenProps {
  onGetStarted: () => void;
  onSkip: () => void;
  onLogin: () => void;
}

export function WelcomeScreen({ onGetStarted, onSkip, onLogin }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-purple-100 via-pink-50 to-background">
      {/* Login Button - Top Right */}
      <div className="absolute top-6 right-6">
        <Button
          onClick={onLogin}
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 text-primary hover:text-purple-800 hover:bg-purple-100"
        >
          <User className="w-4 h-4" />
          <span className="font-medium">Login</span>
        </Button>
      </div>

      <div className="flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-secondary">
        <Ruler className="w-12 h-12 text-white" />
      </div>
      
      <div className="mb-2 px-4 py-2 bg-gradient-to-r from-purple-500 via-accent to-secondary rounded-full">
        <span className="text-white font-semibold tracking-wide">MAYA</span>
      </div>
      
      <h1 className="mb-4 text-center text-foreground">
        Find your perfect size before you buy
      </h1>
      
      <p className="mb-12 text-center text-muted-foreground max-w-sm">
        Reduce wrong-size purchases using body scan
      </p>
      
      <div className="w-full max-w-sm space-y-4">
        <Button 
          onClick={onGetStarted}
          className="w-full h-12 bg-gradient-to-r from-primary via-accent to-pink-600 hover:from-purple-700 hover:via-pink-600 hover:to-pink-700 text-white"
          size="lg"
        >
          Get My Size
        </Button>
        
        <Button 
          onClick={onSkip}
          variant="ghost"
          className="w-full text-primary hover:text-purple-800 hover:bg-purple-100"
        >
          Skip / Explore
        </Button>
      </div>
    </div>
  );
}