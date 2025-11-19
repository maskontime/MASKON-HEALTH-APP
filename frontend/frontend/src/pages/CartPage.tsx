import React from 'react';
import { useCart } from '../context/CartContext';
import { Card, CardBody } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { formatPrice } from '../utils/helpers';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-surface py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-text-secondary mb-8">Add some items to get started!</p>
          <Link to="/herbs">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <Button variant="outline" size="sm" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>

        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <Card key={`${item.productType}-${item.productId}`}>
              <CardBody>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{'name' in item.product ? item.product.name : 'Product'}</h3>
                    <p className="text-text-secondary text-sm capitalize">{item.productType}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.productId, item.productType, item.quantity - 1)}
                        className="px-2 py-1 border rounded"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.productType, item.quantity + 1)}
                        className="px-2 py-1 border rounded"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-semibold w-24 text-right">
                      {item.productType === 'herb' && 'price' in item.product
                        ? formatPrice(item.product.price.amount * item.quantity, item.product.price.unit)
                        : item.productType === 'honey' && 'packaging' in item.product && item.product.packaging[0]
                        ? formatPrice(item.product.packaging[0].price * item.quantity)
                        : 'N/A'}
                    </span>
                    <button
                      onClick={() => removeItem(item.productId, item.productType)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <Card>
          <CardBody>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold">Total:</span>
              <span className="text-2xl font-bold text-primary-green">
                {formatPrice(getTotalPrice())}
              </span>
            </div>
            <Link to="/checkout">
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </Link>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

