import React, { useState } from 'react';
import { Minus, Plus, X } from 'lucide-react';

const CartPage = ({ onClose, cartItems, updateQuantity, removeItem, onCheckout }) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  
  const availableCoupons = {
    'SAVE10': { discount: 0.10, name: '10% Off' },
    'SAVE20': { discount: 0.20, name: '20% Off' },
    'SUMMER30': { discount: 0.30, name: '30% Off' }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    return calculateSubtotal() * appliedCoupon.discount;
  };

  const calculateTax = () => {
    return (calculateSubtotal() - calculateDiscount()) * 0.1; // 10% tax after discount
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() + calculateTax();
  };

  const handleApplyCoupon = () => {
    setCouponError('');
    const coupon = availableCoupons[couponCode.toUpperCase()];
    
    if (!couponCode) {
      setCouponError('Please enter a coupon code');
      return;
    }

    if (!coupon) {
      setCouponError('Invalid coupon code');
      return;
    }

    if (appliedCoupon) {
      setCouponError('A coupon is already applied');
      return;
    }

    setAppliedCoupon(coupon);
    setCouponCode('');
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col">
        {/* Cart Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Shopping Cart ({cartItems.length} items)</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
              <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0"></div>
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="p-2 hover:bg-red-100 text-red-500 rounded"
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Coupon Section */}
        <div className="border-t p-4">
          {appliedCoupon ? (
            <div className="flex items-center justify-between bg-green-50 p-2 rounded">
              <span className="text-green-700">
                {appliedCoupon.name} applied!
              </span>
              <button
                onClick={removeCoupon}
                className="text-red-500 hover:text-red-700"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 p-2 border rounded"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Apply
                </button>
              </div>
              {couponError && (
                <p className="text-red-500 text-sm">{couponError}</p>
              )}
            </div>
          )}
        </div>

        {/* Cart Summary */}
        <div className="border-t p-4 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{calculateSubtotal().toFixed(2)}</span>
            </div>
            {appliedCoupon && (
              <div className="flex justify-between text-green-600">
                <span>Discount ({appliedCoupon.name})</span>
                <span>-₹{calculateDiscount().toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Tax (10%)</span>
              <span>{calculateTax().toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t pt-2">
              <span>Total</span>
              <span>₹{calculateTotal().toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={onCheckout}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
