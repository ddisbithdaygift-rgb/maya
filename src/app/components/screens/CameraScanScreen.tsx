import { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { User, CheckCircle, AlertTriangle, Camera, ArrowLeft } from 'lucide-react';

interface CameraScanScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

export function CameraScanScreen({ onComplete, onBack }: CameraScanScreenProps) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [distance, setDistance] = useState<'perfect' | 'too-close' | 'too-far'>('perfect');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [useSimulation, setUseSimulation] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const steps = [
    'Stand straight facing the camera',
    'Turn slowly to your right',
    'Turn to show your side profile',
    'Almost done...',
  ];

  // Initialize camera directly without permission check
  useEffect(() => {
    if (useSimulation) return;

    const initCamera = async () => {
      setIsInitializing(true);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user', // Use front camera on mobile
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        });

        streamRef.current = stream;
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            setCameraReady(true);
            setCameraError(null);
            setIsInitializing(false);
          };
        }
      } catch (err) {
        setIsInitializing(false);
        // Handle camera errors gracefully
        if (err instanceof Error) {
          if (err.name === 'NotAllowedError') {
            setCameraError('Camera permission needed. Click "Allow" in your browser, then click Retry.');
          } else if (err.name === 'NotFoundError') {
            setCameraError('No camera detected on this device.');
          } else if (err.name === 'NotReadableError') {
            setCameraError('Camera is being used by another app. Please close it and retry.');
          } else {
            setCameraError('Camera unavailable. Error: ' + err.name);
          }
        }
      }
    };

    initCamera();

    // Cleanup function
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [useSimulation]);

  useEffect(() => {
    // Simulate distance changes
    const distanceInterval = setInterval(() => {
      const rand = Math.random();
      if (rand > 0.7) setDistance('too-close');
      else if (rand < 0.2) setDistance('too-far');
      else setDistance('perfect');
    }, 2000);

    return () => clearInterval(distanceInterval);
  }, []);

  const handleCapture = () => {
    // Simulate scanning progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 5;
      });

      setStep((prev) => {
        if (prev < steps.length - 1) {
          return Math.floor((progress + 5) / (100 / steps.length));
        }
        return prev;
      });
    }, 200);
  };

  const handleUseSimulation = () => {
    setUseSimulation(true);
    setCameraError(null);
    setCameraReady(true);
  };

  const handleRetryCamera = async () => {
    setCameraError(null);
    setCameraReady(false);
    
    // Force camera initialization
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          setCameraReady(true);
          setCameraError(null);
        };
      }
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          setCameraError('Camera access denied. Please allow camera access in your browser settings.');
        } else if (err.name === 'NotFoundError') {
          setCameraError('No camera found. You can continue with simulated scanning.');
        } else if (err.name === 'NotReadableError') {
          setCameraError('Camera is already in use. You can continue with simulated scanning.');
        } else {
          setCameraError('Unable to access camera. You can continue with simulated scanning.');
        }
      }
    }
  };

  const distanceColors = {
    'perfect': 'text-primary',
    'too-close': 'text-orange-600',
    'too-far': 'text-red-600',
  };

  const distanceText = {
    'perfect': 'Perfect Distance ✓',
    'too-close': 'Move Back',
    'too-far': 'Move Closer',
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Camera Preview Area */}
      <div className="relative flex-1 bg-black overflow-hidden">
        {/* Live Camera Feed */}
        {!useSimulation && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Simulated Camera Background */}
        {useSimulation && (
          <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900">
            <div className="absolute inset-0 opacity-20" 
              style={{
                backgroundImage: 'radial-gradient(circle at 50% 50%, #4B5563 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            />
          </div>
        )}

        {/* Camera Error Overlay */}
        {cameraError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/90 p-6 z-10">
            <div className="text-center max-w-sm">
              <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <p className="text-white mb-2 font-medium">{cameraError}</p>
              <p className="text-sm text-gray-400 mb-6">
                For demo purposes, you can use our simulated body scanning.
              </p>
              <div className="space-y-3">
                <Button
                  onClick={handleRetryCamera}
                  variant="outline"
                  className="w-full bg-transparent border-blue-500 text-blue-400 hover:bg-blue-500/10"
                  size="lg"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Retry Camera
                </Button>
                <Button
                  onClick={handleUseSimulation}
                  className="w-full"
                  size="lg"
                >
                  Use Simulated Scan
                </Button>
                <Button
                  onClick={onBack}
                  variant="ghost"
                  className="w-full text-white hover:text-white hover:bg-white/10"
                >
                  Go Back
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {!cameraReady && !cameraError && !useSimulation && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-white">Starting camera...</p>
              <p className="text-sm text-gray-400 mt-2">Please allow camera access when prompted</p>
              <div className="mt-6">
                <Button
                  onClick={handleRetryCamera}
                  variant="outline"
                  className="bg-transparent border-white/20 text-white hover:bg-white/10"
                >
                  Retry Camera Access
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Body Silhouette Overlay */}
        {cameraReady && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-48 h-96 border-2 border-dashed border-white/40 rounded-full flex items-center justify-center">
              <User className="w-32 h-32 text-white/30" />
            </div>
          </div>
        )}

        {/* Distance Indicator */}
        {cameraReady && (
          <div className="absolute top-6 left-0 right-0 flex justify-center">
            <div className={`px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm ${distanceColors[distance]}`}>
              <p className="text-sm">{distanceText[distance]}</p>
            </div>
          </div>
        )}

        {/* Simulation Badge */}
        {useSimulation && cameraReady && (
          <div className="absolute top-6 right-6">
            <div className="px-3 py-1 rounded-full bg-blue-600/80 backdrop-blur-sm">
              <p className="text-xs">Simulated</p>
            </div>
          </div>
        )}

        {/* Instructions */}
        {cameraReady && (
          <div className="absolute bottom-32 left-0 right-0 px-6">
            <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4">
              <p className="text-center mb-2">
                {steps[step]}
              </p>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="p-6 bg-black">
        {progress === 0 ? (
          <div className="space-y-3">
            <Button
              onClick={handleCapture}
              disabled={!cameraReady}
              className="w-full h-14 text-lg"
              size="lg"
            >
              Start Capture
            </Button>
            <Button
              onClick={onBack}
              variant="ghost"
              className="w-full text-white hover:text-white hover:bg-white/10"
            >
              Back
            </Button>
          </div>
        ) : progress === 100 ? (
          <div className="flex items-center justify-center gap-2 text-green-500">
            <CheckCircle className="w-6 h-6" />
            <p>Scan Complete!</p>
          </div>
        ) : (
          <div className="text-center text-gray-400">
            <p className="text-sm">Hold steady...</p>
          </div>
        )}
      </div>
    </div>
  );
}