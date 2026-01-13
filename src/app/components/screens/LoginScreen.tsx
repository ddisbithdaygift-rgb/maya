import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ArrowLeft, User, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginScreenProps {
  onContinue: (email: string, password: string) => void;
  onSignUp: () => void;
  onBack: () => void;
  error?: string;
}

export function LoginScreen({ onContinue, onSignUp, onBack, error }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onContinue(email, password);
    }
  };

  const isValid = email.length > 0 && password.length > 0;

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
        <h1 className="ml-2 text-green-900">Welcome Back</h1>
      </div>

      <div className="flex-1">
        {/* Icon */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-200 to-green-200 flex items-center justify-center">
            <User className="w-10 h-10 text-green-700" />
          </div>
        </div>

        <p className="text-center mb-8 text-green-700">
          Login to access your saved measurements and size recommendations
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email/ID Input */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-green-800">Email or User ID</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" />
              <Input
                id="email"
                type="text"
                placeholder="Enter your email or ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 border-green-200 focus:border-green-500"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-green-800">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
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
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Demo Credentials */}
          <div className="p-4 bg-yellow-50 border border-green-200 rounded-lg">
            <p className="text-xs text-green-800 mb-2 font-medium">Demo Account:</p>
            <p className="text-xs text-green-700">Email: demo@fitapp.com</p>
            <p className="text-xs text-green-700">Password: demo123</p>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            disabled={!isValid}
            className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
            size="lg"
          >
            Login
          </Button>
        </form>

        {/* Forgot Password */}
        <div className="text-center mt-4">
          <button className="text-sm text-green-600 hover:text-green-700 hover:underline">
            Forgot Password?
          </button>
        </div>
      </div>

      {/* Sign Up Section */}
      <div className="mt-8 pt-6 border-t border-green-200">
        <p className="text-center text-sm text-green-700 mb-3">
          Don't have an account?
        </p>
        <Button
          onClick={onSignUp}
          variant="outline"
          className="w-full h-12 border-green-300 text-green-700 hover:bg-green-50"
          size="lg"
        >
          Create New Account
        </Button>
      </div>
    </div>
  );
}