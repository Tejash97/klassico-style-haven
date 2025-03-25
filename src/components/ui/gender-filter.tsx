
import React from 'react';
import { useSearchParams } from 'react-router-dom';

interface GenderFilterProps {
  currentCategory?: string;
}

const GenderFilter: React.FC<GenderFilterProps> = ({ currentCategory }) => {
  const [searchParams] = useSearchParams();
  const currentGender = searchParams.get('gender');
  const basePath = currentCategory ? `/${currentCategory}` : '/products';
  
  // Preserve other query params when changing gender
  const getFilterUrl = (gender: string | null) => {
    const params = new URLSearchParams(searchParams);
    
    if (gender) {
      params.set('gender', gender);
    } else {
      params.delete('gender');
    }
    
    const queryString = params.toString();
    return `${basePath}${queryString ? `?${queryString}` : ''}`;
  };
  
  return (
    <div className="flex flex-col space-y-2">
      <a 
        href={getFilterUrl('male')}
        className={`py-2 px-3 rounded-md transition-colors ${
          currentGender === 'male' 
            ? 'bg-black text-white' 
            : 'bg-white text-gray-800 hover:bg-gray-100'
        }`}
      >
        Men
      </a>
      <a 
        href={getFilterUrl('female')}
        className={`py-2 px-3 rounded-md transition-colors ${
          currentGender === 'female' 
            ? 'bg-black text-white' 
            : 'bg-white text-gray-800 hover:bg-gray-100'
        }`}
      >
        Women
      </a>
      <a 
        href={getFilterUrl('unisex')}
        className={`py-2 px-3 rounded-md transition-colors ${
          currentGender === 'unisex' 
            ? 'bg-black text-white' 
            : 'bg-white text-gray-800 hover:bg-gray-100'
        }`}
      >
        Unisex
      </a>
      <a 
        href={getFilterUrl(null)}
        className={`py-2 px-3 rounded-md transition-colors ${
          !currentGender 
            ? 'bg-black text-white' 
            : 'bg-white text-gray-800 hover:bg-gray-100'
        }`}
      >
        All
      </a>
    </div>
  );
};

export default GenderFilter;
