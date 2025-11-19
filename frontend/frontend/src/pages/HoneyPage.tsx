import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { honeyService } from '../services/honeyService';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Card, CardBody } from '../components/common/Card';
import { getImageUrl, formatPrice } from '../utils/helpers';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { honeyImg } from '../assets/assets';

export const HoneyPage: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['honey'],
    queryFn: () => honeyService.getAll(),
  });

  if (isLoading) return <LoadingSpinner size="lg" className="min-h-screen" />;
  if (error) return <div className="text-center py-12">Error loading honey products</div>;

  const honeyProducts = data?.data || [];

  return (
    <div className="min-h-screen bg-surface py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Pure Honey</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {honeyProducts.map((honey) => (
            <Link key={honey._id} to={`/honey/${honey._id}`}>
              <Card hover className="h-full">
                <img
                  src={honey.image ? getImageUrl(honey.image) : honeyImg}
                  alt={honey.name}
                  className="w-full h-48 object-cover"
                />
                <CardBody>
                  <h3 className="text-xl font-semibold mb-2">{honey.name}</h3>
                  <p className="text-text-secondary mb-4 line-clamp-2">{honey.description}</p>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <StarIcon className="h-5 w-5 text-yellow-400" />
                      <span className="ml-1">{honey.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-sm text-text-secondary">Purity: {honey.quality.purity}%</span>
                  </div>
                  {honey.packaging[0] && (
                    <div className="text-primary-green font-semibold">
                      {formatPrice(honey.packaging[0].price)}
                    </div>
                  )}
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

