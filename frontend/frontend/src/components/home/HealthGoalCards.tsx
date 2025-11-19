import React from 'react';
import { HEALTH_GOALS } from '../../utils/constants';
import { Card, CardBody } from '../common/Card';

export const HealthGoalCards: React.FC = () => {
  return (
    <section className="py-12 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Your Health Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HEALTH_GOALS.map((goal) => (
            <Card key={goal.id} hover>
              <CardBody>
                <div className="flex items-start space-x-4">
                  <span className="text-4xl">{goal.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{goal.title}</h3>
                    <p className="text-text-secondary">{goal.description}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

