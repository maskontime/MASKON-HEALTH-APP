import React from 'react';
import { useCart } from '../context/CartContext';
import { Card, CardBody } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { formatPrice } from '../utils/helpers';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

export const CheckoutPage: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>();

  const onSubmit = (data: CheckoutFormData) => {
    // Mock payment processing
    toast.success('Order placed successfully!');
    clearCart();
    navigate('/');
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-surface py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                  {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                  {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    {...register('phone', { required: 'Phone is required' })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                  {errors.phone && <p className="text-red-600 text-sm">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <input
                    {...register('address', { required: 'Address is required' })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                  {errors.address && <p className="text-red-600 text-sm">{errors.address.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input
                    {...register('city', { required: 'City is required' })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                  {errors.city && <p className="text-red-600 text-sm">{errors.city.message}</p>}
                </div>

                <Button type="submit" className="w-full">
                  Place Order
                </Button>
              </form>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div key={`${item.productType}-${item.productId}`} className="flex justify-between">
                    <span>{'name' in item.product ? item.product.name : 'Product'} x {item.quantity}</span>
                    <span>
                      {item.productType === 'herb' && 'price' in item.product
                        ? formatPrice(item.product.price.amount * item.quantity, item.product.price.unit)
                        : item.productType === 'honey' && 'packaging' in item.product && item.product.packaging[0]
                        ? formatPrice(item.product.packaging[0].price * item.quantity)
                        : 'N/A'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-primary-green">{formatPrice(getTotalPrice())}</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

