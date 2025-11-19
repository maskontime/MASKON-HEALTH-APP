import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { mealService } from '../services/mealService';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Card, CardBody } from '../components/common/Card';
import { getImageUrl } from '../utils/helpers';
import { Link } from 'react-router-dom';
import { ugaliImg } from '../assets/assets';

export const MealsPage: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['meals'],
    queryFn: () => mealService.getAll(),
  });

  if (isLoading) return <LoadingSpinner size="lg" className="min-h-screen" />;
  if (error) return <div className="text-center py-12">Error loading meals</div>;

  const meals = data?.data || [];

  return (
    <div className="min-h-screen bg-surface py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Traditional Meals</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <Link key={meal._id} to={`/meals/${meal._id}`}>
              <Card hover className="h-full">
                <img
                  src={meal.image ? getImageUrl(meal.image) : ugaliImg}
                  alt={meal.name}
                  className="w-full h-48 object-cover"
                />
                <CardBody>
                  <h3 className="text-xl font-semibold mb-2">{meal.name}</h3>
                  <p className="text-text-secondary mb-4 line-clamp-2">{meal.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary-green">{meal.region}</span>
                    <span className="text-text-secondary">{meal.preparationTime} min</span>
                  </div>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

