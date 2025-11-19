import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../utils/constants';
import { Card, CardBody } from '../common/Card';

export const CategoryCards: React.FC = () => {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Explore Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category) => (
            <Link key={category.id} to={category.route}>
              <Card hover className="h-full">
                <CardBody className="text-center">
                  <span className="text-6xl mb-4 block">{category.icon}</span>
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-text-secondary">{category.description}</p>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

