import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Loader } from 'lucide-react';

const CouponModal = ({ isOpen, onClose }) => {
  const [coupons, setCoupons] = useState([]);
  const [copiedCode, setCopiedCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchCoupons();
    }
  }, [isOpen]);

  const fetchCoupons = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/get-coupon');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
        setCoupons(data.coupons);
      } else {
        setError('Failed to fetch coupons');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Error connecting to server');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Available Coupons</h2>

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader className="animate-spin" size={24} />
            <span className="ml-2">Loading coupons...</span>
          </div>
        ) : (
          <>
            {error ? (
              <div className="text-red-500 p-4 text-center bg-red-50 rounded-lg mb-4">
                {error}
                <button 
                  onClick={fetchCoupons}
                  className="text-blue-500 underline block mt-2"
                >
                  Try again
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {coupons.length > 0 ? (
                  coupons.map((coupon) => (
                    <div
                      key={coupon.code}
                      className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-semibold">{coupon.code}</h3>
                          <p className="text-gray-600">
                            {coupon.discountPercentage}% OFF
                          </p>
                        </div>
                        <button
                          onClick={() => handleCopy(coupon.code)}
                          className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          {copiedCode === coupon.code ? (
                            <Check size={20} className="text-green-500" />
                          ) : (
                            <Copy size={20} />
                          )}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-4">No coupons available</p>
                )}
              </div>
            )}
          </>
        )}

        <div className="mt-6 text-center text-sm text-gray-500">
          Click the copy icon to copy the coupon code
        </div>
      </div>
    </div>
  );
};

export default CouponModal;