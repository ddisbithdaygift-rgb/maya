import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { ArrowLeft, User, Lock, Mail, Eye, EyeOff, CheckCircle } from 'lucide-react';

interface SignUpScreenProps {
  onContinue: (email: string, password: string, name: string) => void;
  onBack: () => void;
  error?: string;
}

export function SignUpScreen({ onContinue, onBack, error }: SignUpScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onContinue(email, password, name);
    }
  };

  const passwordMatch = password === confirmPassword;
  const passwordStrong = password.length >= 6;
  const isValid = 
    name.length > 0 && 
    email.length > 0 && 
    passwordStrong && 
    passwordMatch && 
    agreed;

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
        <h1 className="ml-2 text-green-900">Create Account</h1>
      </div>

      <div className="flex-1 overflow-auto">
        {/* Icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-200 to-green-200 flex items-center justify-center">
            <User className="w-10 h-10 text-green-700" />
          </div>
        </div>

        <p className="text-center mb-6 text-green-700">
          Create an account to save your measurements and get personalized size recommendations
        </p>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-green-800">Full Name *</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" />
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 border-green-200 focus:border-green-500"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-green-800">Email *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 border-green-200 focus:border-green-500"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-green-800">Password *</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 border-green-200 focus:border-green-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 hover:text-green-700"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {password.length > 0 && (
              <div className="flex items-center gap-2">
                {passwordStrong ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-yellow-500" />
                )}
                <p className={`text-xs ${passwordStrong ? 'text-green-600' : 'text-yellow-700'}`}>
                  {passwordStrong ? 'Strong password' : 'Password must be at least 6 characters'}
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-green-800">Confirm Password *</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 pr-10 border-green-200 focus:border-green-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 hover:text-green-700"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {confirmPassword.length > 0 && (
              <div className="flex items-center gap-2">
                {passwordMatch ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-red-500" />
                )}
                <p className={`text-xs ${passwordMatch ? 'text-green-600' : 'text-red-600'}`}>
                  {passwordMatch ? 'Passwords match' : 'Passwords do not match'}
                </p>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Agreement Checkbox */}
          <div className="flex items-start gap-3 pt-2">
            <Checkbox
              id="agree"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
            />
            <Label htmlFor="agree" className="text-sm cursor-pointer text-green-800 leading-relaxed">
              I agree to the Terms of Service and Privacy Policy. My measurements will be securely stored and used only for size recommendations.
            </Label>
          </div>

          {/* Sign Up Button */}
          <Button
            type="submit"
            disabled={!isValid}
            className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
            size="lg"
          >
            Create Account & Continue
          </Button>
        </form>
      </div>

      {/* Login Link */}
      <div className="mt-6 pt-6 border-t border-green-200">
        <p className="text-center text-sm text-green-700">
          Already have an account?{' '}
          <button 
            onClick={onBack}
            className="text-green-600 hover:text-green-700 hover:underline font-medium"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}