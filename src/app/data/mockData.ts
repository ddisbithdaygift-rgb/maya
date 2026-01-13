// Mock data for brands and products

export interface Product {
  id: string;
  name: string;
  brand: string;
  image: string;
  category: string;
  price: number; // Price in INR (Indian Rupees)
  gender: 'male' | 'female' | 'unisex'; // Gender-specific clothing
  purchaseUrl?: string;
  sizes: string[];
  measurements: {
    [size: string]: {
      chest: number;
      waist: number;
      hips: number;
    };
  };
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
}

// Currency formatter for Indian Rupees
export const formatPrice = (price: number): string => {
  return `₹${price.toLocaleString('en-IN')}`;
};

export const brands: Brand[] = [
  { id: '1', name: 'Nike', logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100' },
  { id: '2', name: 'Adidas', logo: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=100' },
  { id: '3', name: 'Zara', logo: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=100' },
  { id: '4', name: 'H&M', logo: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=100' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Fit T-Shirt',
    brand: 'Nike',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    category: 'T-Shirts',
    price: 2499, // ₹2,499
    gender: 'unisex',
    purchaseUrl: 'https://www.nike.com/t/classic-fit-t-shirt',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    measurements: {
      'XS': { chest: 86, waist: 76, hips: 86 },
      'S': { chest: 91, waist: 81, hips: 91 },
      'M': { chest: 96, waist: 86, hips: 96 },
      'L': { chest: 101, waist: 91, hips: 101 },
      'XL': { chest: 106, waist: 96, hips: 106 },
    },
  },
  {
    id: '2',
    name: 'Sport Performance Shirt',
    brand: 'Nike',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400',
    category: 'T-Shirts',
    price: 3299, // ₹3,299
    gender: 'unisex',
    purchaseUrl: 'https://www.nike.com/t/sport-performance-shirt',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    measurements: {
      'XS': { chest: 85, waist: 75, hips: 85 },
      'S': { chest: 90, waist: 80, hips: 90 },
      'M': { chest: 95, waist: 85, hips: 95 },
      'L': { chest: 100, waist: 90, hips: 100 },
      'XL': { chest: 105, waist: 95, hips: 105 },
    },
  },
  {
    id: '3',
    name: 'Running Hoodie',
    brand: 'Adidas',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
    category: 'Hoodies',
    price: 4149, // ₹4,149
    gender: 'unisex',
    purchaseUrl: 'https://www.adidas.com/t/running-hoodie',
    sizes: ['S', 'M', 'L', 'XL'],
    measurements: {
      'S': { chest: 92, waist: 82, hips: 92 },
      'M': { chest: 97, waist: 87, hips: 97 },
      'L': { chest: 102, waist: 92, hips: 102 },
      'XL': { chest: 107, waist: 97, hips: 107 },
    },
  },
  {
    id: '4',
    name: 'Cotton Casual Tee',
    brand: 'Zara',
    image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=400',
    category: 'T-Shirts',
    price: 1659, // ₹1,659
    gender: 'unisex',
    purchaseUrl: 'https://www.zara.com/t/cotton-casual-tee',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    measurements: {
      'XS': { chest: 88, waist: 78, hips: 88 },
      'S': { chest: 93, waist: 83, hips: 93 },
      'M': { chest: 98, waist: 88, hips: 98 },
      'L': { chest: 103, waist: 93, hips: 103 },
      'XL': { chest: 108, waist: 98, hips: 108 },
    },
  },
  {
    id: '5',
    name: 'Slim Fit Shirt',
    brand: 'H&M',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400',
    category: 'Shirts',
    price: 2075, // ₹2,075
    gender: 'unisex',
    purchaseUrl: 'https://www.hm.com/t/slim-fit-shirt',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    measurements: {
      'XS': { chest: 84, waist: 74, hips: 84 },
      'S': { chest: 89, waist: 79, hips: 89 },
      'M': { chest: 94, waist: 84, hips: 94 },
      'L': { chest: 99, waist: 89, hips: 99 },
      'XL': { chest: 104, waist: 94, hips: 104 },
    },
  },
  {
    id: '6',
    name: 'Basic Cotton Tee',
    brand: 'H&M',
    image: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400',
    category: 'T-Shirts',
    price: 1499, // ₹1,499
    gender: 'unisex',
    purchaseUrl: 'https://www.hm.com/t/basic-cotton-tee',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    measurements: {
      'XS': { chest: 87, waist: 77, hips: 87 },
      'S': { chest: 92, waist: 82, hips: 92 },
      'M': { chest: 97, waist: 87, hips: 97 },
      'L': { chest: 102, waist: 92, hips: 102 },
      'XL': { chest: 107, waist: 97, hips: 107 },
    },
  },
  // Men's specific clothing
  {
    id: '7',
    name: 'Men\'s Crew Neck T-Shirt',
    brand: 'Nike',
    image: 'https://images.unsplash.com/photo-1622445275576-721325763afe?w=400',
    category: 'T-Shirts',
    price: 2299, // ₹2,299
    gender: 'male',
    purchaseUrl: 'https://www.nike.com/t/mens-crew-neck-t-shirt',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    measurements: {
      'S': { chest: 94, waist: 84, hips: 94 },
      'M': { chest: 100, waist: 90, hips: 100 },
      'L': { chest: 106, waist: 96, hips: 106 },
      'XL': { chest: 112, waist: 102, hips: 112 },
      'XXL': { chest: 118, waist: 108, hips: 118 },
    },
  },
  {
    id: '8',
    name: 'Men\'s Training Jacket',
    brand: 'Adidas',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
    category: 'Jackets',
    price: 5499, // ₹5,499
    gender: 'male',
    purchaseUrl: 'https://www.adidas.com/t/mens-training-jacket',
    sizes: ['M', 'L', 'XL', 'XXL'],
    measurements: {
      'M': { chest: 102, waist: 92, hips: 102 },
      'L': { chest: 108, waist: 98, hips: 108 },
      'XL': { chest: 114, waist: 104, hips: 114 },
      'XXL': { chest: 120, waist: 110, hips: 120 },
    },
  },
  {
    id: '9',
    name: 'Men\'s Formal Shirt',
    brand: 'Zara',
    image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=400',
    category: 'Shirts',
    price: 2999, // ₹2,999
    gender: 'male',
    purchaseUrl: 'https://www.zara.com/t/mens-formal-shirt',
    sizes: ['S', 'M', 'L', 'XL'],
    measurements: {
      'S': { chest: 92, waist: 82, hips: 92 },
      'M': { chest: 98, waist: 88, hips: 98 },
      'L': { chest: 104, waist: 94, hips: 104 },
      'XL': { chest: 110, waist: 100, hips: 110 },
    },
  },
  // Women's specific clothing
  {
    id: '10',
    name: 'Women\'s Yoga Top',
    brand: 'Nike',
    image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400',
    category: 'T-Shirts',
    price: 2799, // ₹2,799
    gender: 'female',
    purchaseUrl: 'https://www.nike.com/t/womens-yoga-top',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    measurements: {
      'XS': { chest: 82, waist: 64, hips: 88 },
      'S': { chest: 86, waist: 68, hips: 92 },
      'M': { chest: 90, waist: 72, hips: 96 },
      'L': { chest: 94, waist: 76, hips: 100 },
      'XL': { chest: 98, waist: 80, hips: 104 },
    },
  },
  {
    id: '11',
    name: 'Women\'s Running Tank',
    brand: 'Adidas',
    image: 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=400',
    category: 'T-Shirts',
    price: 1899, // ₹1,899
    gender: 'female',
    purchaseUrl: 'https://www.adidas.com/t/womens-running-tank',
    sizes: ['XS', 'S', 'M', 'L'],
    measurements: {
      'XS': { chest: 80, waist: 62, hips: 86 },
      'S': { chest: 84, waist: 66, hips: 90 },
      'M': { chest: 88, waist: 70, hips: 94 },
      'L': { chest: 92, waist: 74, hips: 98 },
    },
  },
  {
    id: '12',
    name: 'Women\'s Casual Blouse',
    brand: 'Zara',
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400',
    category: 'Shirts',
    price: 2499, // ₹2,499
    gender: 'female',
    purchaseUrl: 'https://www.zara.com/t/womens-casual-blouse',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    measurements: {
      'XS': { chest: 84, waist: 66, hips: 90 },
      'S': { chest: 88, waist: 70, hips: 94 },
      'M': { chest: 92, waist: 74, hips: 98 },
      'L': { chest: 96, waist: 78, hips: 102 },
      'XL': { chest: 100, waist: 82, hips: 106 },
    },
  },
  {
    id: '13',
    name: 'Women\'s Floral Dress',
    brand: 'H&M',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
    category: 'Dresses',
    price: 3299, // ₹3,299
    gender: 'female',
    purchaseUrl: 'https://www.hm.com/t/womens-floral-dress',
    sizes: ['XS', 'S', 'M', 'L'],
    measurements: {
      'XS': { chest: 82, waist: 64, hips: 90 },
      'S': { chest: 86, waist: 68, hips: 94 },
      'M': { chest: 90, waist: 72, hips: 98 },
      'L': { chest: 94, waist: 76, hips: 102 },
    },
  },
];

export interface UserMeasurements {
  height: number;
  chest: number;
  waist: number;
  hips: number;
  gender: 'male' | 'female' | 'other';
}

export function calculateSizeRecommendation(
  userMeasurements: UserMeasurements,
  product: Product
): {
  recommendedSize: string;
  confidence: number;
  warnings: string[];
} {
  let bestSize = '';
  let minDiff = Infinity;
  const warnings: string[] = [];

  // Find the size with the closest fit
  for (const size of product.sizes) {
    const garmentMeasurements = product.measurements[size];
    
    // Calculate difference (simple average of all measurements)
    const chestDiff = Math.abs(garmentMeasurements.chest - userMeasurements.chest);
    const waistDiff = Math.abs(garmentMeasurements.waist - userMeasurements.waist);
    const hipsDiff = Math.abs(garmentMeasurements.hips - userMeasurements.hips);
    
    const totalDiff = chestDiff + waistDiff + hipsDiff;
    
    if (totalDiff < minDiff) {
      minDiff = totalDiff;
      bestSize = size;
    }
  }

  // Calculate confidence (100% - percentage difference)
  const avgDiff = minDiff / 3; // Average difference across measurements
  const confidence = Math.max(70, Math.min(98, 100 - avgDiff));

  // Check for warnings
  const recommendedMeasurements = product.measurements[bestSize];
  
  if (userMeasurements.chest > recommendedMeasurements.chest + 2) {
    warnings.push('May feel tight at chest');
  }
  if (userMeasurements.waist > recommendedMeasurements.waist + 2) {
    warnings.push('May feel tight at waist');
  }
  if (userMeasurements.hips > recommendedMeasurements.hips + 2) {
    warnings.push('May feel tight at hips');
  }
  
  if (userMeasurements.chest < recommendedMeasurements.chest - 5) {
    warnings.push('May feel loose at chest');
  }
  if (userMeasurements.waist < recommendedMeasurements.waist - 5) {
    warnings.push('May feel loose at waist');
  }

  return {
    recommendedSize: bestSize,
    confidence: Math.round(confidence),
    warnings,
  };
}