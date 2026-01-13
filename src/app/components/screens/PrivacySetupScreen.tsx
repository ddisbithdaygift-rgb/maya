import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Shield, Camera, Lock, ArrowLeft } from 'lucide-react';

interface PrivacySetupScreenProps {
  onContinue: (height: number, gender: 'male' | 'female' | 'other') => void;
  onBack: () => void;
}

export function PrivacySetupScreen({ onContinue, onBack }: PrivacySetupScreenProps) {
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'inch'>('cm');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('female');
  const [agreed, setAgreed] = useState(false);

  const handleContinue = () => {
    const heightNum = parseFloat(height);
    if (heightNum && heightNum > 0 && agreed) {
      // Convert inches to cm if needed (1 inch = 2.54 cm)
      const heightInCm = heightUnit === 'inch' ? Math.round(heightNum * 2.54) : heightNum;
      onContinue(heightInCm, gender);
    }
  };

  const isValid = height && parseFloat(height) > 0 && agreed;

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
        <h1 className="ml-2 text-foreground">Privacy & Setup</h1>
      </div>

      <div className="flex-1">
        {/* Privacy Points */}
        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-3">
            <Camera className="w-5 h-5 text-primary mt-1" />
            <p className="text-sm text-foreground">Camera used only for body measurement</p>
          </div>
          
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-accent mt-1" />
            <p className="text-sm text-foreground">Face not stored</p>
          </div>
          
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-secondary mt-1" />
            <p className="text-sm text-foreground">Data encrypted & reusable</p>
          </div>
        </div>

        {/* Height Input with Unit Toggle */}
        <div className="space-y-2 mb-6">
          <Label htmlFor="height" className="text-foreground">Height *</Label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                id="height"
                type="number"
                placeholder={heightUnit === 'cm' ? 'e.g., 175' : 'e.g., 69'}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="border-purple-200 focus:border-primary"
              />
            </div>
            <div className="flex border border-purple-200 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => setHeightUnit('cm')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  heightUnit === 'cm'
                    ? 'bg-primary text-white'
                    : 'bg-white text-primary hover:bg-purple-50'
                }`}
              >
                cm
              </button>
              <button
                type="button"
                onClick={() => setHeightUnit('inch')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  heightUnit === 'inch'
                    ? 'bg-primary text-white'
                    : 'bg-white text-primary hover:bg-purple-50'
                }`}
              >
                inch
              </button>
            </div>
          </div>
        </div>

        {/* Gender Selection */}
        <div className="space-y-3 mb-6">
          <Label className="text-foreground">Body Type / Gender</Label>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={gender === 'male' ? 'default' : 'outline'}
              onClick={() => setGender('male')}
              className={`h-12 ${
                gender === 'male'
                  ? 'bg-primary hover:bg-purple-700 text-white'
                  : 'border-purple-200 text-primary hover:bg-purple-50'
              }`}
            >
              Male
            </Button>
            <Button
              variant={gender === 'female' ? 'default' : 'outline'}
              onClick={() => setGender('female')}
              className={`h-12 ${
                gender === 'female'
                  ? 'bg-accent hover:bg-pink-600 text-white'
                  : 'border-pink-200 text-accent hover:bg-pink-50'
              }`}
            >
              Female
            </Button>
            <Button
              variant={gender === 'other' ? 'default' : 'outline'}
              onClick={() => setGender('other')}
              className={`h-12 ${
                gender === 'other'
                  ? 'bg-secondary hover:bg-yellow-500 text-white'
                  : 'border-yellow-200 text-secondary hover:bg-yellow-50'
              }`}
            >
              Other
            </Button>
          </div>
        </div>

        {/* Agreement Checkbox */}
        <div className="flex items-start gap-3 mb-8">
          <Checkbox
            id="agree"
            checked={agreed}
            onCheckedChange={(checked) => setAgreed(checked as boolean)}
          />
          <Label htmlFor="agree" className="text-sm cursor-pointer text-foreground">
            I agree to the terms and understand my data will be used for size recommendations only
          </Label>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="space-y-3">
        <Button
          onClick={handleContinue}
          disabled={!isValid}
          className="w-full h-12 bg-gradient-to-r from-primary via-accent to-pink-600 hover:from-purple-700 hover:via-pink-600 hover:to-pink-700 text-white"
          size="lg"
        >
          Start Scan
        </Button>
      </div>
    </div>
  );
}