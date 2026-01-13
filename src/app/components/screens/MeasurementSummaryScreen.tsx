import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Edit2, Check, X, ArrowLeft } from 'lucide-react';
import { UserMeasurements } from '../../data/mockData';

interface MeasurementSummaryScreenProps {
  measurements: UserMeasurements;
  onContinue: (updatedMeasurements: UserMeasurements) => void;
  onBack: () => void;
}

export function MeasurementSummaryScreen({ 
  measurements, 
  onContinue,
  onBack 
}: MeasurementSummaryScreenProps) {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [unit, setUnit] = useState<'cm' | 'inch'>('cm');
  const [currentMeasurements, setCurrentMeasurements] = useState(measurements);
  const [tempValue, setTempValue] = useState('');

  const convertToInch = (cm: number) => Math.round(cm / 2.54 * 10) / 10;
  const convertToCm = (inch: number) => Math.round(inch * 2.54);

  const displayValue = (cm: number) => {
    return unit === 'cm' ? cm : convertToInch(cm);
  };

  const startEdit = (field: string, value: number) => {
    setEditingField(field);
    setTempValue(displayValue(value).toString());
  };

  const cancelEdit = () => {
    setEditingField(null);
    setTempValue('');
  };

  const saveEdit = (field: keyof UserMeasurements) => {
    const numValue = parseFloat(tempValue);
    if (numValue && numValue > 0) {
      const valueInCm = unit === 'inch' ? convertToCm(numValue) : numValue;
      setCurrentMeasurements({
        ...currentMeasurements,
        [field]: valueInCm
      });
    }
    setEditingField(null);
    setTempValue('');
  };

  const handleContinue = () => {
    onContinue(currentMeasurements);
  };

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
        <h1 className="ml-2 text-foreground">Your Measurements</h1>
      </div>

      <div className="flex-1">
        <p className="mb-4 text-muted-foreground">
          Measurements are estimated from your scan
        </p>

        {/* Unit Toggle */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-medium text-foreground">Unit</p>
          <div className="flex border border-purple-200 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setUnit('cm')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                unit === 'cm'
                  ? 'bg-primary text-white'
                  : 'bg-white text-primary hover:bg-purple-50'
              }`}
            >
              cm
            </button>
            <button
              type="button"
              onClick={() => setUnit('inch')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                unit === 'inch'
                  ? 'bg-primary text-white'
                  : 'bg-white text-primary hover:bg-purple-50'
              }`}
            >
              inch
            </button>
          </div>
        </div>

        {/* Measurements Grid */}
        <div className="space-y-4 mb-8">
          <div className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
            editingField === 'height' ? 'bg-purple-50 border-2 border-primary' : 'bg-white border-2 border-purple-200'
          }`}>
            <div className="flex items-center gap-3 flex-1">
              <Edit2 className={`w-5 h-5 ${editingField === 'height' ? 'text-primary' : 'text-muted-foreground'}`} />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Height</p>
                {editingField === 'height' ? (
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="number"
                      step="0.1"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="w-24 h-8 border-primary"
                      autoFocus
                    />
                    <span className="flex items-center text-sm text-muted-foreground min-w-[40px]">
                      {unit}
                    </span>
                  </div>
                ) : (
                  <p className="text-xl">
                    {displayValue(currentMeasurements.height)} {unit}
                  </p>
                )}
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => editingField === 'height' ? saveEdit('height') : startEdit('height', currentMeasurements.height)}
            >
              {editingField === 'height' ? (
                <Check className="w-4 h-4" />
              ) : (
                <Edit2 className="w-4 h-4" />
              )}
            </Button>
            {editingField === 'height' && (
              <Button
                size="sm"
                variant="ghost"
                onClick={cancelEdit}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          <div className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
            editingField === 'chest' ? 'bg-pink-50 border-2 border-accent' : 'bg-white border-2 border-pink-200'
          }`}>
            <div className="flex items-center gap-3 flex-1">
              <Edit2 className={`w-5 h-5 ${editingField === 'chest' ? 'text-accent' : 'text-muted-foreground'}`} />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Chest</p>
                {editingField === 'chest' ? (
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="number"
                      step="0.1"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="w-24 h-8 border-accent"
                      autoFocus
                    />
                    <span className="flex items-center text-sm text-muted-foreground min-w-[40px]">
                      {unit}
                    </span>
                  </div>
                ) : (
                  <p className="text-xl">
                    {displayValue(currentMeasurements.chest)} {unit}
                  </p>
                )}
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => editingField === 'chest' ? saveEdit('chest') : startEdit('chest', currentMeasurements.chest)}
            >
              {editingField === 'chest' ? (
                <Check className="w-4 h-4" />
              ) : (
                <Edit2 className="w-4 h-4" />
              )}
            </Button>
            {editingField === 'chest' && (
              <Button
                size="sm"
                variant="ghost"
                onClick={cancelEdit}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          <div className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
            editingField === 'waist' ? 'bg-purple-50 border-2 border-primary' : 'bg-white border-2 border-purple-200'
          }`}>
            <div className="flex items-center gap-3 flex-1">
              <Edit2 className={`w-5 h-5 ${editingField === 'waist' ? 'text-primary' : 'text-muted-foreground'}`} />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Waist</p>
                {editingField === 'waist' ? (
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="number"
                      step="0.1"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="w-24 h-8 border-primary"
                      autoFocus
                    />
                    <span className="flex items-center text-sm text-muted-foreground min-w-[40px]">
                      {unit}
                    </span>
                  </div>
                ) : (
                  <p className="text-xl">
                    {displayValue(currentMeasurements.waist)} {unit}
                  </p>
                )}
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => editingField === 'waist' ? saveEdit('waist') : startEdit('waist', currentMeasurements.waist)}
            >
              {editingField === 'waist' ? (
                <Check className="w-4 h-4" />
              ) : (
                <Edit2 className="w-4 h-4" />
              )}
            </Button>
            {editingField === 'waist' && (
              <Button
                size="sm"
                variant="ghost"
                onClick={cancelEdit}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          <div className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
            editingField === 'hips' ? 'bg-pink-50 border-2 border-accent' : 'bg-white border-2 border-pink-200'
          }`}>
            <div className="flex items-center gap-3 flex-1">
              <Edit2 className={`w-5 h-5 ${editingField === 'hips' ? 'text-accent' : 'text-muted-foreground'}`} />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Hips</p>
                {editingField === 'hips' ? (
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="number"
                      step="0.1"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="w-24 h-8 border-accent"
                      autoFocus
                    />
                    <span className="flex items-center text-sm text-muted-foreground min-w-[40px]">
                      {unit}
                    </span>
                  </div>
                ) : (
                  <p className="text-xl">
                    {displayValue(currentMeasurements.hips)} {unit}
                  </p>
                )}
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => editingField === 'hips' ? saveEdit('hips') : startEdit('hips', currentMeasurements.hips)}
            >
              {editingField === 'hips' ? (
                <Check className="w-4 h-4" />
              ) : (
                <Edit2 className="w-4 h-4" />
              )}
            </Button>
            {editingField === 'hips' && (
              <Button
                size="sm"
                variant="ghost"
                onClick={cancelEdit}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <p className="text-sm text-foreground">
            💡 Tap the edit icon to adjust any measurement. These measurements will be used to recommend the perfect size for you across all brands.
          </p>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="space-y-3 mt-8">
        <Button
          onClick={handleContinue}
          className="w-full h-12 bg-gradient-to-r from-primary via-accent to-pink-600 hover:from-purple-700 hover:via-pink-600 hover:to-pink-700 text-white"
          size="lg"
        >
          Looks Good
        </Button>
      </div>
    </div>
  );
}
