import React, { useState } from 'react';
import { X, Plus, Percent } from 'lucide-react';

const CouponPage = ({ onClose, isAdmin = false }) => {
  const [newCoupon, setNewCoupon] = useState({ code: '', discountPercentage: '' });
  const [error, setError] = useState('');

 
  const [coupons, setCoupons] = useState([
    { code: 'SUMMER30', discountPercentage: 30 },
    { code: 'SAVE20', discountPercentage: 20 },
    { code: 'WELCOME10', discountPercentage: 10 }
  ]);

  const handleAddCoupon = () => {
    setError('');
    
    if (!newCoupon.code || !newCoupon.discountPercentage) {
      setError('Please fill in all fields');
      return;
    }

    if (isNaN(newCoupon.discountPercentage) || newCoupon.discountPercentage <= 0 || newCoupon.discountPercentage > 100) {
      setError('Discount must be between 1 and 100');
      return;
    }

    setCoupons([...coupons, newCoupon]);
    setNewCoupon({ code: '', discountPercentage: '' });
  };

  const handleDeleteCoupon = (code) => {
    setCoupons(coupons.filter(coupon => coupon.code !== code));
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Available Coupons</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Admin Add Coupon Form */}
          {isAdmin && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-4">Add New Coupon</h3>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    value={newCoupon.code}
                    onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Discount Percentage"
                    value={newCoupon.discountPercentage}
                    onChange={(e) => setNewCoupon({ ...newCoupon, discountPercentage: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  onClick={handleAddCoupon}
                  className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center justify-center"
                >
                  <Plus size={20} className="mr-2" />
                  Add Coupon
                </button>
              </div>
            </div>
          )}

          {/* Coupons List */}
          <div className="space-y-4">
            {coupons.map((coupon) => (
              <div
                key={coupon.code}
                className="bg-white border rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Percent size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{coupon.code}</h3>
                    <p className="text-sm text-gray-600">{coupon.discountPercentage}% OFF</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleCopyCode(coupon.code)}
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
                  >
                    Copy
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => handleDeleteCoupon(coupon.code)}
                      className="p-1 hover:bg-red-100 text-red-500 rounded"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4">
          <p className="text-sm text-gray-600 text-center">
            Use these coupons at checkout to get amazing discounts!
          </p>
        </div>
      </div>
    </div>
  );
};

export default CouponPage;