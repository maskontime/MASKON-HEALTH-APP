import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { workoutService } from '../services/workoutService';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Card, CardBody } from '../components/common/Card';
import { getImageUrl } from '../utils/helpers';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { workoutImg } from '../assets/assets';

export const WorkoutsPage: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['workouts'],
    queryFn: () => workoutService.getAll(),
  });

  if (isLoading) return <LoadingSpinner size="lg" className="min-h-screen" />;
  if (error) return <div className="text-center py-12">Error loading workouts</div>;

  const workouts = data?.data || [];

  return (
    <div className="min-h-screen bg-surface py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Fitness Plans</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout) => (
            <Link key={workout._id} to={`/workouts/${workout._id}`}>
              <Card hover className="h-full">
                <img
                  src={workout.image ? getImageUrl(workout.image) : workoutImg}
                  alt={workout.name}
                  className="w-full h-48 object-cover"
                />
                <CardBody>
                  <h3 className="text-xl font-semibold mb-2">{workout.name}</h3>
                  <p className="text-text-secondary mb-4 line-clamp-2">{workout.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <StarIcon className="h-5 w-5 text-yellow-400" />
                      <span className="ml-1">{workout.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-text-secondary">
                      {workout.duration.value} {workout.duration.unit}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      workout.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                      workout.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {workout.difficulty}
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

