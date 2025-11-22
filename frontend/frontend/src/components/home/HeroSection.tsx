import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export const HeroSection: React.FC = () => {
  return (
  <div className="relative bg-gradient-to-r from-primary-green to-secondary-orange text-white pt-24">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Traditional African Wellness
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover natural health solutions through traditional meals, medicinal herbs, pure honey, and authentic fitness practices
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/herbs">
              <Button size="lg" variant="secondary">
                Explore Herbs
              </Button>
            </Link>
            <Link to="/meals">
              <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
                View Meals
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

