import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';
import { Card, CardBody, CardHeader } from '../components/common/Card';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center text-primary-green">Login</h2>
          <p className="text-center text-text-secondary mt-2">
            Sign in to your Maskon Health account
          </p>
        </CardHeader>
        <CardBody>
          <LoginForm onSuccess={handleSuccess} />
        </CardBody>
      </Card>
    </div>
  );
};

