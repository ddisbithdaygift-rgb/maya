export function FemaleAvatar() {
  return (
    <svg viewBox="0 0 280 500" className="w-full h-full drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Skin tone gradient */}
        <radialGradient id="femaleSkin" cx="40%" cy="30%">
          <stop offset="0%" style={{ stopColor: '#ffe8db', stopOpacity: 1 }} />
          <stop offset="60%" style={{ stopColor: '#ffd4c4', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#f0bcab', stopOpacity: 1 }} />
        </radialGradient>
        
        {/* Hair gradient - long flowing */}
        <linearGradient id="femaleHair" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#4a2f1f', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#2d1810', stopOpacity: 1 }} />
        </linearGradient>
        
        {/* Dress gradient - elegant blue */}
        <radialGradient id="blueDress" cx="50%" cy="30%">
          <stop offset="0%" style={{ stopColor: '#8fa8d4', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#6b8ab8', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#4a6a94', stopOpacity: 1 }} />
        </radialGradient>
        
        {/* Black boots gradient */}
        <linearGradient id="blackBoots" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#2a2a2a', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#0f0f0f', stopOpacity: 1 }} />
        </linearGradient>
        
        <filter id="shadow3D">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.4"/>
        </filter>
      </defs>

      {/* Long flowing hair - back layer */}
      <g filter="url(#shadow3D)">
        <path d="M 95 40 Q 85 25 105 18 Q 140 12 175 18 Q 195 25 185 40 L 188 120 Q 185 140 180 155 L 175 165 Q 172 140 170 120 L 168 100 Q 165 80 140 78 Q 115 80 112 100 L 110 120 Q 108 140 105 165 L 100 155 Q 95 140 92 120 Z" 
              fill="url(#femaleHair)" />
      </g>

      {/* Head */}
      <ellipse cx="140" cy="60" rx="36" ry="42" fill="url(#femaleSkin)" filter="url(#shadow3D)" />
      
      {/* Hair front */}
      <g filter="url(#shadow3D)">
        <path d="M 104 35 Q 98 25 115 20 Q 140 16 165 20 Q 182 25 176 35 L 178 50 Q 175 45 170 50 L 165 55 Q 160 48 140 47 Q 120 48 115 55 L 110 50 Q 105 45 102 50 Z" 
              fill="url(#femaleHair)" />
        {/* Hair bangs */}
        <path d="M 118 35 Q 118 45 120 50" stroke="url(#femaleHair)" strokeWidth="3" strokeLinecap="round" />
        <path d="M 140 32 Q 140 42 140 50" stroke="url(#femaleHair)" strokeWidth="3" strokeLinecap="round" />
        <path d="M 162 35 Q 162 45 160 50" stroke="url(#femaleHair)" strokeWidth="3" strokeLinecap="round" />
      </g>
      
      {/* Face features */}
      {/* Eyes */}
      <ellipse cx="123" cy="58" rx="4.5" ry="5.5" fill="#2d2020" />
      <ellipse cx="157" cy="58" rx="4.5" ry="5.5" fill="#2d2020" />
      
      {/* Eyebrows */}
      <path d="M 115 50 Q 123 48 131 50" stroke="#3a2518" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 149 50 Q 157 48 165 50" stroke="#3a2518" strokeWidth="2" fill="none" strokeLinecap="round" />
      
      {/* Eye highlights */}
      <ellipse cx="125" cy="57" rx="1.5" ry="2" fill="#fff" opacity="0.9" />
      <ellipse cx="159" cy="57" rx="1.5" ry="2" fill="#fff" opacity="0.9" />
      
      {/* Eyelashes */}
      <path d="M 118 56 Q 116 54 115 52" stroke="#2d2020" strokeWidth="1" fill="none" />
      <path d="M 128 56 Q 130 54 131 52" stroke="#2d2020" strokeWidth="1" fill="none" />
      <path d="M 152 56 Q 150 54 149 52" stroke="#2d2020" strokeWidth="1" fill="none" />
      <path d="M 162 56 Q 164 54 165 52" stroke="#2d2020" strokeWidth="1" fill="none" />
      
      {/* Nose */}
      <path d="M 140 65 Q 138 68 140 70" stroke="#e8a996" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      
      {/* Lips - pink/coral */}
      <path d="M 130 76 Q 140 80 150 76" stroke="#d87b85" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 130 76 Q 140 78 150 76" stroke="#f0a0a8" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      
      {/* Neck */}
      <rect x="122" y="98" width="36" height="28" fill="url(#femaleSkin)" rx="7" />
      
      {/* Shoulders and arms with dress straps */}
      <g filter="url(#shadow3D)">
        {/* Arms */}
        <ellipse cx="75" cy="170" rx="14" ry="65" fill="url(#femaleSkin)" transform="rotate(-8 75 170)" />
        <ellipse cx="205" cy="170" rx="14" ry="65" fill="url(#femaleSkin)" transform="rotate(8 205 170)" />
        
        {/* Forearms */}
        <ellipse cx="70" cy="240" rx="11" ry="48" fill="url(#femaleSkin)" transform="rotate(-5 70 240)" />
        <ellipse cx="210" cy="240" rx="11" ry="48" fill="url(#femaleSkin)" transform="rotate(5 210 240)" />
      </g>
      
      {/* Elegant ruffled dress */}
      <g filter="url(#shadow3D)">
        {/* Bodice - sweetheart neckline */}
        <path d="M 88 130 Q 85 135 85 145 L 82 185 Q 85 190 92 190 L 188 190 Q 195 190 198 185 L 195 145 Q 195 135 192 130 Q 185 125 170 123 L 165 128 Q 160 132 140 132 Q 120 132 115 128 L 110 123 Q 95 125 88 130 Z" 
              fill="url(#blueDress)" />
        
        {/* Dress decorative top */}
        <path d="M 110 125 Q 115 130 140 130 Q 165 130 170 125" stroke="#7a95c2" strokeWidth="2" fill="none" />
        
        {/* Waist belt */}
        <rect x="85" y="187" width="110" height="10" fill="#8ba5c9" rx="2" opacity="0.9" />
        <circle cx="140" cy="192" r="4" fill="#6b8ab8" />
        
        {/* First ruffle layer */}
        <path d="M 88 197 Q 88 205 95 215 Q 105 225 115 222 Q 128 219 140 222 Q 152 219 165 222 Q 175 225 185 215 Q 192 205 192 197 Z" 
              fill="url(#blueDress)" opacity="0.95" />
        
        {/* Second ruffle layer */}
        <path d="M 92 215 Q 92 225 98 237 Q 108 248 118 244 Q 130 240 140 244 Q 150 240 162 244 Q 172 248 182 237 Q 188 225 188 215 Z" 
              fill="url(#blueDress)" opacity="0.9" />
        
        {/* Third ruffle layer - shorter dress */}
        <path d="M 96 237 Q 93 248 100 262 Q 110 275 120 270 Q 130 266 140 270 Q 150 266 160 270 Q 170 275 180 262 Q 187 248 184 237 Z" 
              fill="url(#blueDress)" opacity="0.85" />
        
        {/* Dress hem highlight */}
        <ellipse cx="140" cy="270" rx="50" ry="10" fill="url(#blueDress)" opacity="0.6" />
        
        {/* Ruffle details - decorative lines */}
        <path d="M 100 210 Q 110 212 120 210" stroke="#6b8ab8" strokeWidth="1" fill="none" opacity="0.6" />
        <path d="M 160 210 Q 170 212 180 210" stroke="#6b8ab8" strokeWidth="1" fill="none" opacity="0.6" />
      </g>
      
      {/* Legs */}
      <g filter="url(#shadow3D)">
        <rect x="110" y="273" width="28" height="105" fill="url(#femaleSkin)" rx="7" />
        <rect x="142" y="273" width="28" height="105" fill="url(#femaleSkin)" rx="7" />
      </g>
      
      {/* Black combat boots */}
      <g filter="url(#shadow3D)">
        {/* Left boot */}
        <rect x="105" y="378" width="34" height="65" fill="url(#blackBoots)" rx="5" />
        <ellipse cx="122" cy="380" rx="18" ry="8" fill="url(#blackBoots)" />
        
        {/* Right boot */}
        <rect x="141" y="378" width="34" height="65" fill="url(#blackBoots)" rx="5" />
        <ellipse cx="158" cy="380" rx="18" ry="8" fill="url(#blackBoots)" />
        
        {/* Boot soles */}
        <ellipse cx="122" cy="448" rx="20" ry="11" fill="#0a0a0a" />
        <ellipse cx="158" cy="448" rx="20" ry="11" fill="#0a0a0a" />
        
        {/* Boot details - studs/buckles */}
        <g opacity="0.6">
          <circle cx="115" cy="395" r="2" fill="#5a5a5a" />
          <circle cx="115" cy="410" r="2" fill="#5a5a5a" />
          <circle cx="115" cy="425" r="2" fill="#5a5a5a" />
          
          <circle cx="151" cy="395" r="2" fill="#5a5a5a" />
          <circle cx="151" cy="410" r="2" fill="#5a5a5a" />
          <circle cx="151" cy="425" r="2" fill="#5a5a5a" />
        </g>
        
        {/* Boot highlights */}
        <ellipse cx="118" cy="400" rx="3" ry="7" fill="#3a3a3a" opacity="0.7" />
        <ellipse cx="154" cy="400" rx="3" ry="7" fill="#3a3a3a" opacity="0.7" />
      </g>
    </svg>
  );
}
