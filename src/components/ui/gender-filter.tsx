
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface GenderFilterProps {
  className?: string;
}

const GenderFilter: React.FC<GenderFilterProps> = ({ className }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentGender = searchParams.get('gender') || 'all';
  
  const handleGenderChange = (gender: string) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (gender === 'all') {
      newParams.delete('gender');
    } else {
      newParams.set('gender', gender);
    }
    
    navigate(`?${newParams.toString()}`);
  };
  
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <button 
        onClick={() => handleGenderChange('all')}
        className={cn(
          "px-4 py-2 text-sm font-medium rounded transition-colors",
          currentGender === 'all' 
            ? "bg-klassico-navy text-white" 
            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
        )}
      >
        All
      </button>
      <button 
        onClick={() => handleGenderChange('male')}
        className={cn(
          "px-4 py-2 text-sm font-medium rounded transition-colors",
          currentGender === 'male' 
            ? "bg-klassico-navy text-white" 
            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
        )}
      >
        Men
      </button>
      <button 
        onClick={() => handleGenderChange('female')}
        className={cn(
          "px-4 py-2 text-sm font-medium rounded transition-colors",
          currentGender === 'female' 
            ? "bg-klassico-navy text-white" 
            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
        )}
      >
        Women
      </button>
      <button 
        onClick={() => handleGenderChange('unisex')}
        className={cn(
          "px-4 py-2 text-sm font-medium rounded transition-colors",
          currentGender === 'unisex' 
            ? "bg-klassico-navy text-white" 
            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
        )}
      >
        Unisex
      </button>
    </div>
  );
};

export default GenderFilter;
