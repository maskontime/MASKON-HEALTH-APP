import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { HealthGoalCards } from '../components/home/HealthGoalCards';
import { CategoryCards } from '../components/home/CategoryCards';
import { SearchBar } from '../components/search/SearchBar';

export const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <div className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchBar />
        </div>
      </div>
      <HealthGoalCards />
      <CategoryCards />
    </div>
  );
};

