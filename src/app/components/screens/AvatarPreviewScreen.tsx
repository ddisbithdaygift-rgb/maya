import { Button } from '../ui/button';
import { User, Ruler, RotateCcw, Undo2, RefreshCw, Sparkles } from 'lucide-react';
import { UserMeasurements } from '../../data/mockData';
import { MaleAvatar } from '../avatars/MaleAvatar';
import { FemaleAvatar } from '../avatars/FemaleAvatar';

interface AvatarPreviewScreenProps {
  measurements: UserMeasurements;
  onContinue: () => void;
  onBack: () => void;
}

export function AvatarPreviewScreen({ measurements, onContinue, onBack }: AvatarPreviewScreenProps) {
  const isMale = measurements.gender === 'male';
  
  // Calculate recommended size based on measurements (aligned with size recommendation logic)
  const getRecommendedSize = () => {
    const { chest, waist, hips, gender } = measurements;
    
    // Standard size measurements (averaged across typical brands)
    const standardSizes = gender === 'male' 
      ? {
          'XS': { chest: 86, waist: 76, hips: 90 },
          'S': { chest: 92, waist: 82, hips: 96 },
          'M': { chest: 98, waist: 88, hips: 102 },
          'L': { chest: 104, waist: 94, hips: 108 },
          'XL': { chest: 110, waist: 100, hips: 114 },
        }
      : {
          'XS': { chest: 82, waist: 64, hips: 90 },
          'S': { chest: 88, waist: 70, hips: 96 },
          'M': { chest: 94, waist: 76, hips: 102 },
          'L': { chest: 100, waist: 82, hips: 108 },
          'XL': { chest: 106, waist: 88, hips: 114 },
        };
    
    // Find the size with the smallest total difference (same logic as calculateSizeRecommendation)
    let bestSize = 'M';
    let minDiff = Infinity;
    
    Object.entries(standardSizes).forEach(([size, sizeMeasurements]) => {
      const chestDiff = Math.abs(sizeMeasurements.chest - chest);
      const waistDiff = Math.abs(sizeMeasurements.waist - waist);
      const hipsDiff = Math.abs(sizeMeasurements.hips - hips);
      const totalDiff = chestDiff + waistDiff + hipsDiff;
      
      if (totalDiff < minDiff) {
        minDiff = totalDiff;
        bestSize = size;
      }
    });
    
    return bestSize;
  };
  
  const recommendedSize = getRecommendedSize();
  const allSizes = ['XS', 'S', 'M', 'L', 'XL'];
  
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-gray-900 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 flex-shrink-0">
        <Button
          onClick={onBack}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/10"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mr-1">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Button>
        <div className="flex flex-col items-center">
          <h2 className="text-white font-medium">Your Avatar</h2>
          <span className="text-xs text-white/60 capitalize">{measurements.gender}</span>
        </div>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Avatar Display Area */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden px-6">
        {/* Circular Rings Background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-[280px] h-[280px] rounded-full border-2 border-purple-400/30" />
          <div className="absolute w-[360px] h-[360px] rounded-full border-2 border-purple-400/20" />
          <div className="absolute w-[440px] h-[440px] rounded-full border-2 border-blue-400/20" />
          <div className="absolute w-[520px] h-[520px] rounded-full border-2 border-blue-400/10" />
        </div>

        {/* 3D Avatar Container */}
        <div className="relative z-10" style={{ height: '500px', width: '280px' }}>
          {/* Render avatar based on gender - use SVG for now */}
          {isMale ? <MaleAvatar /> : <FemaleAvatar />}

          {/* Measurement Points - Floating badges on right */}
          <div className="absolute right-[-10px] top-8 flex flex-col items-end gap-6">
            <div className="flex items-center gap-3 animate-fadeIn">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1.5 rounded-full shadow-lg text-xs font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                Head
              </div>
              <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-purple-400" />
              </div>
            </div>
          </div>

          <div className="absolute right-[-10px] top-32 flex flex-col items-end gap-6">
            <div className="flex items-center gap-3 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full shadow-lg text-xs font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                Chest
              </div>
              <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              </div>
            </div>
          </div>

          <div className="absolute right-[-10px] top-52 flex flex-col items-end gap-6">
            <div className="flex items-center gap-3 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              <div className="bg-gradient-to-r from-secondary to-amber-500 text-white px-3 py-1.5 rounded-full shadow-lg text-xs font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                Waist
              </div>
              <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              </div>
            </div>
          </div>

          <div className="absolute right-[-10px] top-72 flex flex-col items-end gap-6">
            <div className="flex items-center gap-3 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
              <div className="bg-gradient-to-r from-accent to-pink-600 text-white px-3 py-1.5 rounded-full shadow-lg text-xs font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                Hips
              </div>
              <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-pink-400" />
              </div>
            </div>
          </div>

          {/* Left side controls */}
          <div className="absolute left-[-5px] top-[35%] flex flex-col gap-3">
            <button className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all">
              <Undo2 className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all">
              <RotateCcw className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="px-6 pb-6 space-y-4">
        {/* Recommended Size Display */}
        <div className="p-5 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-md rounded-2xl border border-white/20">
          <p className="text-xs text-white/70 text-center mb-3">Recommended Size</p>
          
          {/* Size Options */}
          <div className="flex justify-center gap-2 mb-3">
            {allSizes.map((size) => (
              <div
                key={size}
                className={`
                  w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm
                  transition-all duration-300
                  ${size === recommendedSize 
                    ? 'bg-gradient-to-br from-secondary via-accent to-pink-500 text-white scale-110 shadow-xl shadow-pink-500/50 ring-2 ring-pink-300' 
                    : 'bg-white/10 text-white/40 scale-90'
                  }
                `}
              >
                {size}
              </div>
            ))}
          </div>
          
          {/* Size Info */}
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-secondary" />
            <p className="text-sm text-white font-medium">
              Best Fit: <span className="text-secondary font-bold text-lg">{recommendedSize}</span>
            </p>
          </div>
        </div>

        {/* Measurements Grid */}
        <div className="grid grid-cols-3 gap-2 p-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
          <div className="text-center">
            <p className="text-xs text-white/50">Chest</p>
            <p className="text-sm text-white font-medium">{measurements.chest} cm</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-white/50">Waist</p>
            <p className="text-sm text-white font-medium">{measurements.waist} cm</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-white/50">Hips</p>
            <p className="text-sm text-white font-medium">{measurements.hips} cm</p>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-3">
          <Button
            onClick={onContinue}
            className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium shadow-lg"
            size="lg"
          >
            Continue to Size Finder
          </Button>
        </div>
      </div>
    </div>
  );
}