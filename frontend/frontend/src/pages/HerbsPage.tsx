import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { herbService } from '../services/herbService';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Card, CardBody } from '../components/common/Card';
import { getImageUrl, formatPrice } from '../utils/helpers';
import { Link } from 'react-router-dom';
import { moringaImg } from '../assets/assets';

export const HerbsPage: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['herbs'],
    queryFn: () => herbService.getAll(),
  });

  if (isLoading) return <LoadingSpinner size="lg" className="min-h-screen" />;
  if (error) return <div className="text-center py-12">Error loading herbs</div>;

  const herbs = data?.data || [];

  return (
    <div className="min-h-screen bg-surface py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Medicinal Herbs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {herbs.map((herb) => (
            <Link key={herb._id} to={`/herbs/${herb._id}`}>
              <Card hover className="h-full">
                <img
                  src={herb.image ? getImageUrl(herb.image) : moringaImg}
                  alt={herb.name}
                  className="w-full h-48 object-cover"
                />
                <CardBody>
                  <h3 className="text-xl font-semibold mb-2">{herb.name}</h3>
                  {herb.scientificName && (
                    <p className="text-sm text-text-secondary italic mb-2">{herb.scientificName}</p>
                  )}
                  <p className="text-text-secondary mb-4 line-clamp-2">{herb.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary-green font-semibold">
                      {formatPrice(herb.price.amount, herb.price.unit)}
                    </span>
                    <span className={`text-sm px-2 py-1 rounded ${
                      herb.availability === 'in-stock' ? 'bg-green-100 text-green-800' :
                      herb.availability === 'out-of-stock' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {herb.availability}
                    </span>
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

