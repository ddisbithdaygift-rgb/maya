import { useEffect, useRef, useState } from 'react';
import '@google/model-viewer';
import { MaleAvatar } from './MaleAvatar';
import { FemaleAvatar } from './FemaleAvatar';

interface Avatar3DProps {
  modelPath?: string;
  autoRotate?: boolean;
  cameraOrbit?: string;
  height?: string;
  gender?: 'male' | 'female' | 'other';
  use3D?: boolean;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

export function Avatar3D({ 
  modelPath = '/white_mesh.glb',
  autoRotate = true,
  cameraOrbit = '0deg 75deg 2.5m',
  height = '100%',
  gender = 'male',
  use3D = false
}: Avatar3DProps) {
  const modelViewerRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(!use3D);
  const [modelError, setModelError] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasSetupListenersRef = useRef(false);

  useEffect(() => {
    // If not using 3D, show SVG immediately
    if (!use3D) {
      setUseFallback(true);
      setIsLoading(false);
      return;
    }

    // Wait for the element to be available in the DOM
    const checkAndSetup = () => {
      const modelViewer = modelViewerRef.current;
      
      if (!modelViewer) {
        console.log('⏳ Waiting for model-viewer element...');
        // Try again in a bit
        setTimeout(checkAndSetup, 100);
        return;
      }

      // Prevent duplicate setup
      if (hasSetupListenersRef.current) {
        return;
      }
      hasSetupListenersRef.current = true;

      console.log('✅ model-viewer element found!');
      console.log('🔍 Attempting to load 3D model from:', modelPath);
      console.log('🔍 Full URL:', window.location.origin + modelPath);

      // Set timeout to fall back to SVG if loading takes too long
      timeoutRef.current = setTimeout(() => {
        console.warn('⏱️ 3D Model loading timeout (10s) - using SVG fallback');
        console.warn('💡 This usually means:');
        console.warn('   1. File is not in /public folder');
        console.warn('   2. File name is wrong');
        console.warn('   3. Dev server needs restart');
        console.warn('   4. File is too large');
        setUseFallback(true);
        setIsLoading(false);
      }, 10000);

      const handleLoad = () => {
        console.log('✅ 3D Model loaded successfully!');
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        setIsLoading(false);
        setUseFallback(false);
        setModelError(null);
      };
      
      const handleError = (event: any) => {
        const errorMsg = event?.detail?.message || event?.detail || 'Unknown error';
        console.error('❌ 3D Model loading error:', errorMsg);
        console.error('📍 Attempted path:', modelPath);
        console.error('💡 Make sure white_mesh.glb is in the /public folder');
        console.error('🔄 Did you restart the dev server?');
        
        setModelError(errorMsg);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        setUseFallback(true);
        setIsLoading(false);
      };

      const handleProgress = (event: any) => {
        const progress = event?.detail?.totalProgress || 0;
        console.log('📥 Loading progress:', Math.round(progress * 100) + '%');
      };

      // Check if file exists
      console.log('🔍 Checking if file exists...');
      fetch(modelPath, { method: 'HEAD' })
        .then(response => {
          console.log('📡 Response status:', response.status);
          console.log('📡 Response headers:', response.headers.get('content-type'));
          
          if (!response.ok) {
            console.error('❌ File not found (HTTP', response.status + '):', modelPath);
            console.error('📂 Expected location: /public/white_mesh.glb');
            console.error('💡 RESTART DEV SERVER: Ctrl+C then npm run dev');
            setUseFallback(true);
            setIsLoading(false);
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }
          } else {
            const contentType = response.headers.get('content-type');
            const contentLength = response.headers.get('content-length');
            
            console.log('✅ File exists at:', modelPath);
            console.log('📦 Content-Type:', contentType);
            console.log('📊 File size:', contentLength ? (parseInt(contentLength) / 1024 / 1024).toFixed(2) + ' MB' : 'unknown');
            
            if (contentType && !contentType.includes('model') && !contentType.includes('octet-stream')) {
              console.warn('⚠️ Unexpected content-type:', contentType);
              console.warn('💡 Expected: model/gltf-binary or application/octet-stream');
              console.error('🚨 THE FILE IS NOT ACTUALLY THERE! You are getting an HTML 404 page!');
              console.error('🚨 Please manually check: Open http://localhost:5173/white_mesh.glb in your browser');
              console.error('🚨 If it shows 404, the file is NOT in /public folder!');
              
              // Immediately fall back since we know the file isn't there
              setUseFallback(true);
              setIsLoading(false);
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
              }
              return;
            }
            
            // File looks good, let model-viewer try to load it
            console.log('🚀 Starting 3D model load...');
          }
        })
        .catch(err => {
          console.error('❌ Could not check file existence:', err);
          console.error('💡 This might be a network issue or CORS problem');
        });

      modelViewer.addEventListener('load', handleLoad);
      modelViewer.addEventListener('error', handleError);
      modelViewer.addEventListener('progress', handleProgress);
    };

    // Start checking for the element
    checkAndSetup();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      const modelViewer = modelViewerRef.current;
      if (modelViewer) {
        // Remove event listeners - using a try-catch to prevent errors on unmount
        try {
          modelViewer.removeEventListener('load', () => {});
          modelViewer.removeEventListener('error', () => {});
          modelViewer.removeEventListener('progress', () => {});
        } catch (e) {
          // Ignore cleanup errors
        }
      }
      hasSetupListenersRef.current = false;
    };
  }, [use3D, modelPath]);

  // Use SVG fallback
  if (useFallback) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative" style={{ height: '500px', width: '280px' }}>
          {gender === 'male' ? <MaleAvatar /> : <FemaleAvatar />}
        </div>
      </div>
    );
  }

  // Show 3D model
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Loading 3D model...</p>
          </div>
        </div>
      )}
      
      <model-viewer
        ref={modelViewerRef}
        src={modelPath}
        alt="3D Avatar Model"
        auto-rotate={autoRotate}
        camera-controls
        camera-orbit={cameraOrbit}
        style={{ 
          width: '100%', 
          height: height,
          minHeight: '300px',
          display: isLoading ? 'none' : 'block'
        }}
        environment-image="neutral"
        shadow-intensity="1"
        exposure="1"
      />
    </div>
  );
}