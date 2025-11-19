import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { personnelService } from '../services/personnelService';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Card, CardBody } from '../components/common/Card';
import { getImageUrl } from '../utils/helpers';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { logoImg } from '../assets/assets';

export const ExpertsPage: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['personnel'],
    queryFn: () => personnelService.getAll(),
  });

  if (isLoading) return <LoadingSpinner size="lg" className="min-h-screen" />;
  if (error) return <div className="text-center py-12">Error loading experts</div>;

  const experts = data?.data || [];

  return (
    <div className="min-h-screen bg-surface py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Expert Directory</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.map((expert) => (
            <Link key={expert._id} to={`/experts/${expert._id}`}>
              <Card hover className="h-full">
                <div className="relative">
                  <img
                    src={expert.profileImage ? getImageUrl(expert.profileImage) : logoImg}
                    alt={expert.name}
                    className="w-full h-48 object-cover"
                  />
                  {expert.isVerified && (
                    <div className="absolute top-2 right-2">
                      <CheckBadgeIcon className="h-6 w-6 text-blue-500" />
                    </div>
                  )}
                </div>
                <CardBody>
                  <h3 className="text-xl font-semibold mb-2">{expert.name}</h3>
                  <p className="text-text-secondary mb-2">{expert.specialization}</p>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-primary-green capitalize">{expert.role}</span>
                    <div className="flex items-center">
                      <StarIcon className="h-5 w-5 text-yellow-400" />
                      <span className="ml-1">{expert.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary">
                    {expert.experience} years experience
                  </p>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

