import { useState } from 'react';

// Import screens
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { SignUpScreen } from './components/screens/SignUpScreen';
import { PrivacySetupScreen } from './components/screens/PrivacySetupScreen';
import { ScanPreparationScreen } from './components/screens/ScanPreparationScreen';
import { CameraScanScreen } from './components/screens/CameraScanScreen';
import { ProcessingScreen } from './components/screens/ProcessingScreen';
import { MeasurementSummaryScreen } from './components/screens/MeasurementSummaryScreen';
import { AvatarPreviewScreen } from './components/screens/AvatarPreviewScreen';
import { BrandSelectionScreen } from './components/screens/BrandSelectionScreen';
import { ProductSelectionScreen } from './components/screens/ProductSelectionScreen';
import { SizeRecommendationScreen } from './components/screens/SizeRecommendationScreen';
import { PurchaseGuideScreen } from './components/screens/PurchaseGuideScreen';
import { FitVisualizationScreen } from './components/screens/FitVisualizationScreen';
import { SimilarItemsScreen } from './components/screens/SimilarItemsScreen';
import { SaveProfileScreen } from './components/screens/SaveProfileScreen';
import { NoMeasurementsScreen } from './components/screens/NoMeasurementsScreen';

// Import types
import { UserMeasurements, Brand, Product, calculateSizeRecommendation } from './data/mockData';

// User Profile Type
interface UserProfile {
  email: string;
  password: string;
  name: string;
  measurements?: UserMeasurements;
}

type Screen = 
  | 'welcome'
  | 'login'
  | 'signup'
  | 'privacy-setup'
  | 'scan-prep'
  | 'camera-scan'
  | 'processing'
  | 'measurements'
  | 'avatar'
  | 'brands'
  | 'products'
  | 'recommendation'
  | 'purchase-guide'
  | 'fit-visualization'
  | 'similar-items'
  | 'save-profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [userMeasurements, setUserMeasurements] = useState<UserMeasurements | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loginError, setLoginError] = useState<string>('');
  const [signupError, setSignupError] = useState<string>('');

  // Simulated user database (in real app, this would be backend)
  const [userDatabase, setUserDatabase] = useState<UserProfile[]>([
    {
      email: 'demo@fitapp.com',
      password: 'demo123',
      name: 'Demo User',
      measurements: {
        height: 175,
        chest: 95,
        waist: 85,
        hips: 95,
        inseam: 80,
        shoulders: 45,
        gender: 'male'
      }
    }
  ]);

  // Simulate body measurements from scan
  const generateMeasurements = (height: number, gender: 'male' | 'female' | 'other'): UserMeasurements => {
    // Simple estimation based on height and gender
    const baseChest = gender === 'male' ? 95 : 90;
    const baseWaist = gender === 'male' ? 85 : 75;
    const baseHips = gender === 'male' ? 95 : 95;
    
    // Add some variation based on height
    const heightFactor = (height - 170) / 10;
    
    return {
      height,
      chest: Math.round(baseChest + heightFactor * 2),
      waist: Math.round(baseWaist + heightFactor * 1.5),
      hips: Math.round(baseHips + heightFactor * 2),
      gender,
    };
  };

  const handleGetStarted = () => {
    if (currentUser) {
      // Skip to brand selection if profile exists
      setCurrentScreen('brands');
    } else {
      setCurrentScreen('privacy-setup');
    }
  };

  const handleSkip = () => {
    setCurrentScreen('brands');
  };

  const handlePrivacySetup = (height: number, gender: 'male' | 'female' | 'other') => {
    // Store basic info, will complete after scan
    const measurements = generateMeasurements(height, gender);
    setUserMeasurements(measurements);
    setCurrentScreen('scan-prep');
  };

  const handleScanComplete = () => {
    setCurrentScreen('processing');
  };

  const handleProcessingComplete = () => {
    setCurrentScreen('measurements');
  };

  const handleMeasurementsConfirmed = (updatedMeasurements: UserMeasurements) => {
    setUserMeasurements(updatedMeasurements);
    setCurrentScreen('avatar');
  };

  const handleAvatarContinue = () => {
    setCurrentScreen('brands');
  };

  const handleBrandSelected = (brand: Brand) => {
    setSelectedBrand(brand);
    setCurrentScreen('products');
  };

  const handleProductSelected = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen('recommendation');
  };

  const handleViewFit = () => {
    setCurrentScreen('fit-visualization');
  };

  const handleViewSimilar = () => {
    setCurrentScreen('similar-items');
  };

  const handleContinueShopping = () => {
    setCurrentScreen('brands');
    setSelectedProduct(null);
  };

  const handleSaveProfile = () => {
    setCurrentScreen('save-profile');
  };

  const handleStartOver = () => {
    setCurrentScreen('welcome');
    setUserMeasurements(null);
    setSelectedBrand(null);
    setSelectedProduct(null);
    setCurrentUser(null);
  };

  const handleLoginClick = () => {
    setCurrentScreen('login');
  };

  const handleSignupClick = () => {
    setCurrentScreen('signup');
  };

  const handleLoginSubmit = (email: string, password: string) => {
    // Check credentials
    const user = userDatabase.find(u => u.email === email && u.password === password);
    
    if (user) {
      setCurrentUser(user);
      setUserMeasurements(user.measurements || null);
      setLoginError('');
      
      // Redirect based on profile completeness
      if (user.measurements) {
        setCurrentScreen('brands');
      } else {
        setCurrentScreen('privacy-setup');
      }
    } else {
      // Failed login
      setLoginError('Invalid email or password. Try the demo account.');
    }
  };

  const handleSignUpSubmit = (email: string, password: string, name: string) => {
    // Check if user already exists
    const existingUser = userDatabase.find(u => u.email === email);
    
    if (existingUser) {
      setSignupError('An account with this email already exists. Please login instead.');
    } else {
      // Create new user
      const newUser: UserProfile = {
        email,
        password,
        name
      };
      
      setUserDatabase([...userDatabase, newUser]);
      setCurrentUser(newUser);
      setSignupError('');
      
      // New users need to complete their profile
      setCurrentScreen('privacy-setup');
    }
  };

  // Screen navigation helpers
  const goBack = (screen: Screen) => setCurrentScreen(screen);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      <div className="max-w-md mx-auto h-full bg-background shadow-xl overflow-hidden">
        {currentScreen === 'welcome' && (
          <WelcomeScreen
            onGetStarted={handleGetStarted}
            onSkip={handleSkip}
            onLogin={handleLoginClick}
          />
        )}

        {currentScreen === 'login' && (
          <LoginScreen
            onContinue={handleLoginSubmit}
            onSignUp={handleSignupClick}
            onBack={() => goBack('welcome')}
            error={loginError}
          />
        )}

        {currentScreen === 'signup' && (
          <SignUpScreen
            onContinue={handleSignUpSubmit}
            onBack={() => goBack('login')}
            error={signupError}
          />
        )}

        {currentScreen === 'privacy-setup' && (
          <PrivacySetupScreen
            onContinue={handlePrivacySetup}
            onBack={() => goBack('welcome')}
          />
        )}

        {currentScreen === 'scan-prep' && (
          <ScanPreparationScreen
            onReady={() => setCurrentScreen('camera-scan')}
            onBack={() => goBack('privacy-setup')}
          />
        )}

        {currentScreen === 'camera-scan' && (
          <CameraScanScreen
            onComplete={handleScanComplete}
            onBack={() => goBack('scan-prep')}
          />
        )}

        {currentScreen === 'processing' && (
          <ProcessingScreen
            onComplete={handleProcessingComplete}
            onBack={() => goBack('camera-scan')}
          />
        )}

        {currentScreen === 'measurements' && userMeasurements && (
          <MeasurementSummaryScreen
            measurements={userMeasurements}
            onContinue={handleMeasurementsConfirmed}
            onBack={() => goBack('camera-scan')}
          />
        )}

        {currentScreen === 'avatar' && userMeasurements && (
          <AvatarPreviewScreen
            measurements={userMeasurements}
            onContinue={handleAvatarContinue}
            onBack={() => goBack('measurements')}
          />
        )}

        {currentScreen === 'brands' && (
          <BrandSelectionScreen
            onSelectBrand={handleBrandSelected}
            onBack={() => goBack('welcome')}
          />
        )}

        {currentScreen === 'products' && selectedBrand && userMeasurements && (
          <ProductSelectionScreen
            brand={selectedBrand}
            userMeasurements={userMeasurements}
            onSelectProduct={handleProductSelected}
            onBack={() => goBack('brands')}
          />
        )}

        {currentScreen === 'recommendation' && selectedProduct && userMeasurements && (
          <SizeRecommendationScreen
            product={selectedProduct}
            userMeasurements={userMeasurements}
            onViewFit={handleViewFit}
            onViewSimilar={handleViewSimilar}
            onBuyNow={() => setCurrentScreen('purchase-guide')}
            onBack={() => goBack('products')}
          />
        )}

        {currentScreen === 'recommendation' && selectedProduct && !userMeasurements && (
          <NoMeasurementsScreen
            onGetMeasured={() => setCurrentScreen('privacy-setup')}
            onBack={() => goBack('products')}
          />
        )}

        {currentScreen === 'purchase-guide' && selectedProduct && userMeasurements && (
          <PurchaseGuideScreen
            product={selectedProduct}
            recommendedSize={calculateSizeRecommendation(userMeasurements, selectedProduct).recommendedSize}
            onBuyNow={handleContinueShopping}
            onBack={() => goBack('recommendation')}
          />
        )}

        {currentScreen === 'fit-visualization' && selectedProduct && userMeasurements && (
          <FitVisualizationScreen
            product={selectedProduct}
            userMeasurements={userMeasurements}
            onContinue={handleViewSimilar}
            onBack={() => goBack('recommendation')}
          />
        )}

        {currentScreen === 'similar-items' && selectedProduct && userMeasurements && (
          <SimilarItemsScreen
            currentProduct={selectedProduct}
            userMeasurements={userMeasurements}
            onSelectProduct={handleProductSelected}
            onSaveAndExit={handleSaveProfile}
            onBack={() => goBack('recommendation')}
          />
        )}

        {currentScreen === 'save-profile' && (
          <SaveProfileScreen
            onBuyNow={handleContinueShopping}
            onStartOver={handleStartOver}
          />
        )}
      </div>
    </div>
  );
}

