import { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowLeft, Info, CheckCircle } from 'lucide-react';
import { Product, UserMeasurements, calculateSizeRecommendation, formatPrice } from '../../data/mockData';
import { MaleAvatar } from '../avatars/MaleAvatar';
import { FemaleAvatar } from '../avatars/FemaleAvatar';

interface FitVisualizationScreenProps {
  product: Product;
  userMeasurements: UserMeasurements;
  onContinue: () => void;
  onBack: () => void;
}

export function FitVisualizationScreen({ 
  product, 
  userMeasurements,
  onContinue,
  onBack 
}: FitVisualizationScreenProps) {
  const recommendation = calculateSizeRecommendation(userMeasurements, product);
  const [selectedSize, setSelectedSize] = useState(recommendation.recommendedSize);
  const isMale = userMeasurements.gender === 'male';

  const getFitLevel = (userMeas: number, garmentMeas: number) => {
    const diff = garmentMeas - userMeas;
    if (diff < -5) return { level: 'too-tight', label: 'Too Tight', color: 'bg-red-500', gradient: 'from-red-500/40 to-red-600/60' };
    if (diff < 0) return { level: 'snug', label: 'Snug', color: 'bg-orange-500', gradient: 'from-orange-500/40 to-orange-600/60' };
    if (diff < 5) return { level: 'perfect', label: 'Perfect', color: 'bg-primary', gradient: 'from-primary/40 to-accent/60' };
    if (diff < 10) return { level: 'relaxed', label: 'Relaxed', color: 'bg-blue-500', gradient: 'from-blue-500/40 to-blue-600/60' };
    return { level: 'loose', label: 'Loose', color: 'bg-gray-500', gradient: 'from-gray-500/40 to-gray-600/60' };
  };

  const garmentMeasurements = product.measurements[selectedSize];
  const chestFit = getFitLevel(userMeasurements.chest, garmentMeasurements.chest);
  const waistFit = getFitLevel(userMeasurements.waist, garmentMeasurements.waist);
  const hipsFit = getFitLevel(userMeasurements.hips, garmentMeasurements.hips);

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
        <div className="ml-2 flex-1">
          <h1 className="text-foreground">Fit Preview</h1>
          <p className="text-sm text-muted-foreground">{product.name} - Size {selectedSize}</p>
        </div>
        <p className="text-lg font-bold text-primary">{formatPrice(product.price)}</p>
      </div>

      {/* Avatar with Garment Overlay */}
      <div className="flex-1 bg-gradient-to-b from-purple-900 via-blue-900 to-gray-900 relative overflow-hidden">
        {/* Background Rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-[280px] h-[280px] rounded-full border-2 border-purple-400/30" />
          <div className="absolute w-[360px] h-[360px] rounded-full border-2 border-purple-400/20" />
          <div className="absolute w-[440px] h-[440px] rounded-full border-2 border-blue-400/20" />
        </div>

        {/* Avatar Container */}
        <div className="relative h-full flex items-center justify-center px-6 py-8">
          <div className="relative" style={{ height: '420px', width: '280px' }}>
            {/* Render gender-based avatar */}
            <div className="scale-90">
              {isMale ? <MaleAvatar /> : <FemaleAvatar />}
            </div>

            {/* Garment Overlay on Avatar */}
            <div 
              className={`
                absolute top-[110px] left-1/2 -translate-x-1/2 
                rounded-3xl transition-all duration-500 pointer-events-none
                bg-gradient-to-br ${chestFit.gradient}
                backdrop-blur-sm border-2 border-white/30
                ${chestFit.level === 'too-tight' ? 'w-[90px] h-[140px]' : ''}
                ${chestFit.level === 'snug' ? 'w-[100px] h-[150px]' : ''}
                ${chestFit.level === 'perfect' ? 'w-[110px] h-[160px]' : ''}
                ${chestFit.level === 'relaxed' ? 'w-[125px] h-[170px]' : ''}
                ${chestFit.level === 'loose' ? 'w-[140px] h-[180px]' : ''}
              `}
              style={{
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              }}
            />

            {/* Fit Indicators */}
            <div className="absolute -right-4 top-[120px] space-y-3">
              <div className="flex items-center gap-2">
                <div className={`px-3 py-1.5 rounded-full shadow-lg text-xs font-medium text-white ${chestFit.color}`}>
                  Chest: {chestFit.label}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`px-3 py-1.5 rounded-full shadow-lg text-xs font-medium text-white ${waistFit.color}`}>
                  Waist: {waistFit.label}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`px-3 py-1.5 rounded-full shadow-lg text-xs font-medium text-white ${hipsFit.color}`}>
                  Hips: {hipsFit.label}
                </div>
              </div>
            </div>

            {/* Overall Fit Badge */}
            <div className="absolute -left-4 top-[120px]">
              <Badge 
                className={`${chestFit.color} text-white px-4 py-2 text-sm shadow-lg`}
              >
                {chestFit.label === 'Perfect' ? '✓ ' : ''}{chestFit.label} Fit
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Size Selector */}
      <div className="px-6 py-4 bg-white">
        <p className="text-sm font-medium mb-3 text-foreground">Try Different Sizes</p>
        <div className="flex gap-2 flex-wrap justify-center">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`
                px-6 py-3 rounded-lg border-2 transition-all
                ${size === selectedSize
                  ? 'border-primary bg-purple-50 text-primary font-semibold'
                  : 'border-purple-200 bg-white text-muted-foreground'
                }
                ${size === recommendation.recommendedSize && size !== selectedSize
                  ? 'ring-2 ring-secondary'
                  : ''
                }
              `}
            >
              <span className="font-medium">{size}</span>
              {size === recommendation.recommendedSize && (
                <CheckCircle className="w-4 h-4 inline-block ml-1 text-primary" />
              )}
            </button>
          ))}
        </div>
        {recommendation.recommendedSize !== selectedSize && (
          <p className="text-xs text-center text-muted-foreground mt-2">
            Size {recommendation.recommendedSize} is recommended for you
          </p>
        )}
      </div>

      {/* Fit Details */}
      <div className="px-6 pb-4 bg-white">
        <div className="grid grid-cols-3 gap-3 p-4 bg-purple-50 rounded-xl border border-purple-200">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Chest</p>
            <p className="text-sm font-medium text-foreground">{garmentMeasurements.chest} cm</p>
            <p className="text-xs text-muted-foreground">vs {userMeasurements.chest} cm</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Waist</p>
            <p className="text-sm font-medium text-foreground">{garmentMeasurements.waist} cm</p>
            <p className="text-xs text-muted-foreground">vs {userMeasurements.waist} cm</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Hips</p>
            <p className="text-sm font-medium text-foreground">{garmentMeasurements.hips} cm</p>
            <p className="text-xs text-muted-foreground">vs {userMeasurements.hips} cm</p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="px-6 pb-4 bg-white">
        <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <Info className="w-5 h-5 text-yellow-700 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-yellow-800">
            Visual preview only. Actual fit may vary based on fabric, style, and brand sizing.
          </p>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-6 border-t border-purple-100 bg-white space-y-3">
        <Button
          onClick={onContinue}
          className="w-full h-12 bg-gradient-to-r from-primary via-accent to-pink-600 hover:from-purple-700 hover:via-pink-600 hover:to-pink-700 text-white"
          size="lg"
        >
          Continue Shopping
        </Button>
        <Button
          onClick={onBack}
          variant="ghost"
          className="w-full text-primary hover:bg-purple-50"
        >
          Back to Recommendation
        </Button>
      </div>
    </div>
  );
}