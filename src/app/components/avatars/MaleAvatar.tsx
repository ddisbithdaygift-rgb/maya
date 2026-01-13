export function MaleAvatar() {
  return (
    <svg viewBox="0 0 280 500" className="w-full h-full drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Skin tone gradients */}
        <radialGradient id="maleSkin" cx="40%" cy="30%">
          <stop offset="0%" style={{ stopColor: '#ffd5b8', stopOpacity: 1 }} />
          <stop offset="60%" style={{ stopColor: '#f4c4a0', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#d9a586', stopOpacity: 1 }} />
        </radialGradient>
        
        {/* Hair gradient */}
        <linearGradient id="maleHair" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#2d1f17', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#1a100a', stopOpacity: 1 }} />
        </linearGradient>
        
        {/* Denim jacket gradient */}
        <radialGradient id="denimJacket" cx="50%" cy="30%">
          <stop offset="0%" style={{ stopColor: '#7ba4db', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#5a8bc9', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#3d6ba8', stopOpacity: 1 }} />
        </radialGradient>
        
        {/* White hoodie */}
        <radialGradient id="whiteHoodie" cx="50%" cy="40%">
          <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#e8e8e8', stopOpacity: 1 }} />
        </radialGradient>
        
        {/* Black pants */}
        <linearGradient id="blackPants" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#3a3a3a', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#1a1a1a', stopOpacity: 1 }} />
        </linearGradient>
        
        {/* White shoes */}
        <radialGradient id="whiteShoes" cx="40%" cy="30%">
          <stop offset="0%" style={{ stopColor: '#f0f5ff', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#e0ebff', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#b8d4ff', stopOpacity: 1 }} />
        </radialGradient>
        
        <filter id="shadow3D">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.4"/>
        </filter>
      </defs>

      {/* Head */}
      <ellipse cx="140" cy="50" rx="35" ry="40" fill="url(#maleSkin)" filter="url(#shadow3D)" />
      
      {/* Hair - short style with glasses effect */}
      <path d="M 105 25 Q 100 15 120 12 Q 140 10 160 12 Q 180 15 175 25 L 175 55 Q 170 45 140 43 Q 110 45 105 55 Z" 
            fill="url(#maleHair)" filter="url(#shadow3D)" />
      
      {/* Glasses */}
      <g opacity="0.9">
        <rect x="115" y="48" width="20" height="15" rx="3" fill="none" stroke="#2a2a2a" strokeWidth="2" />
        <rect x="145" y="48" width="20" height="15" rx="3" fill="none" stroke="#2a2a2a" strokeWidth="2" />
        <line x1="135" y1="55" x2="145" y2="55" stroke="#2a2a2a" strokeWidth="2" />
        <path d="M 115 55 Q 110 52 105 55" stroke="#2a2a2a" strokeWidth="2" fill="none" />
        <path d="M 165 55 Q 170 52 175 55" stroke="#2a2a2a" strokeWidth="2" fill="none" />
      </g>
      
      {/* Eyes behind glasses */}
      <ellipse cx="125" cy="55" rx="3" ry="4" fill="#2d2020" />
      <ellipse cx="155" cy="55" rx="3" ry="4" fill="#2d2020" />
      <ellipse cx="127" cy="55" rx="1" ry="1.5" fill="#fff" opacity="0.8" />
      <ellipse cx="157" cy="55" rx="1" ry="1.5" fill="#fff" opacity="0.8" />
      
      {/* Smile */}
      <path d="M 128 68 Q 140 73 152 68" stroke="#d89070" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      
      {/* Neck */}
      <rect x="125" y="85" width="30" height="25" fill="url(#maleSkin)" rx="5" />
      
      {/* White Hoodie - visible at neck */}
      <g filter="url(#shadow3D)">
        <ellipse cx="140" cy="120" rx="45" ry="18" fill="url(#whiteHoodie)" />
        <path d="M 95 120 L 95 145 Q 100 150 110 150 L 170 150 Q 180 150 185 145 L 185 120 Z" 
              fill="url(#whiteHoodie)" />
        {/* Hoodie text "PEACE" */}
        <text x="140" y="140" fontSize="12" fill="#5a8bc9" textAnchor="middle" fontWeight="bold">PEACE</text>
      </g>
      
      {/* Denim Jacket */}
      <g filter="url(#shadow3D)">
        {/* Shoulders and sleeves */}
        <ellipse cx="70" cy="160" rx="20" ry="75" fill="url(#denimJacket)" transform="rotate(-10 70 160)" />
        <ellipse cx="210" cy="160" rx="20" ry="75" fill="url(#denimJacket)" transform="rotate(10 210 160)" />
        
        {/* Main jacket body */}
        <path d="M 85 140 L 80 220 Q 85 225 95 225 L 185 225 Q 195 225 200 220 L 195 140 Q 190 135 140 133 Q 90 135 85 140 Z" 
              fill="url(#denimJacket)" />
        
        {/* Jacket collar */}
        <path d="M 115 133 L 110 145 L 120 150 L 125 138 Z" fill="#5278a8" />
        <path d="M 165 133 L 170 145 L 160 150 L 155 138 Z" fill="#5278a8" />
        
        {/* Pocket details */}
        <rect x="100" y="170" width="20" height="18" rx="2" fill="none" stroke="#4a6fa5" strokeWidth="1.5" />
        <rect x="160" y="170" width="20" height="18" rx="2" fill="none" stroke="#4a6fa5" strokeWidth="1.5" />
        
        {/* Buttons */}
        <circle cx="135" cy="155" r="3" fill="#3a3a3a" />
        <circle cx="145" cy="155" r="3" fill="#3a3a3a" />
        <circle cx="140" cy="180" r="3" fill="#3a3a3a" />
        <circle cx="140" cy="205" r="3" fill="#3a3a3a" />
      </g>
      
      {/* Hands */}
      <g filter="url(#shadow3D)">
        <ellipse cx="62" cy="238" rx="12" ry="15" fill="url(#maleSkin)" transform="rotate(-10 62 238)" />
        <ellipse cx="218" cy="238" rx="12" ry="15" fill="url(#maleSkin)" transform="rotate(10 218 238)" />
      </g>
      
      {/* Black Pants */}
      <g filter="url(#shadow3D)">
        {/* Left leg */}
        <rect x="110" y="225" width="32" height="165" fill="url(#blackPants)" rx="6" />
        {/* Right leg */}
        <rect x="138" y="225" width="32" height="165" fill="url(#blackPants)" rx="6" />
        
        {/* Pants pockets - subtle lines */}
        <path d="M 118 245 L 115 260" stroke="#2a2a2a" strokeWidth="1.5" fill="none" />
        <path d="M 162 245 L 165 260" stroke="#2a2a2a" strokeWidth="1.5" fill="none" />
        
        {/* Belt */}
        <rect x="108" y="223" width="64" height="8" fill="#3a3a3a" rx="1" />
        <rect x="135" y="223" width="10" height="8" fill="#5a5a5a" rx="1" />
      </g>
      
      {/* White Sneakers */}
      <g filter="url(#shadow3D)">
        {/* Left shoe */}
        <ellipse cx="126" cy="395" rx="22" ry="12" fill="url(#whiteShoes)" />
        <path d="M 110 380 L 108 395 Q 112 400 126 400 Q 140 400 144 395 L 142 380 Q 138 375 126 375 Q 114 375 110 380 Z" 
              fill="url(#whiteShoes)" />
        {/* Left shoe sole */}
        <ellipse cx="126" cy="400" rx="24" ry="10" fill="#e0e0e0" />
        
        {/* Right shoe */}
        <ellipse cx="154" cy="395" rx="22" ry="12" fill="url(#whiteShoes)" />
        <path d="M 138 380 L 136 395 Q 140 400 154 400 Q 168 400 172 395 L 170 380 Q 166 375 154 375 Q 142 375 138 380 Z" 
              fill="url(#whiteShoes)" />
        {/* Right shoe sole */}
        <ellipse cx="154" cy="400" rx="24" ry="10" fill="#e0e0e0" />
        
        {/* Shoe highlights and details */}
        <ellipse cx="122" cy="385" rx="4" ry="6" fill="#ffffff" opacity="0.4" />
        <ellipse cx="150" cy="385" rx="4" ry="6" fill="#ffffff" opacity="0.4" />
        
        {/* Laces */}
        <path d="M 120 383 Q 126 381 132 383" stroke="#b8d4ff" strokeWidth="1.5" fill="none" />
        <path d="M 148 383 Q 154 381 160 383" stroke="#b8d4ff" strokeWidth="1.5" fill="none" />
      </g>
    </svg>
  );
}
