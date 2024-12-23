import React, { useState } from 'react';
import { ShoppingCart, Search, Ticket, MessageCircle, User, X as CloseIcon } from 'lucide-react';
import CartPage from '../cart/CartPage';
import CouponModal from '../couponModal';
import ComplaintModal from '../complaintModal';

export const EcommerceLanding = ({ userData, onLogout }) => {
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCoupons, setShowCoupons] = useState(false);
  const [showComplaints, setShowComplaints] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const removeItem = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout with items:', cartItems);
  };
  const ProfileModal = ({ isOpen, onClose, userData }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">My Profile</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <CloseIcon size={24} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-center mb-6">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <User size={48} className="text-gray-400" />
              </div>
            </div>

            {/* Common Information */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Name:</span>
                <span>{userData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Email:</span>
                <span>{userData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Phone:</span>
                <span>{userData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Account Type:</span>
                <span className="capitalize">{userData.role}</span>
              </div>
            </div>

            {/* Seller-specific Information */}
            {userData.role === 'seller' && (
              <div className="space-y-2 pt-4 border-t">
                <h3 className="font-semibold text-lg mb-2">Business Details</h3>
                <div className="flex justify-between">
                  <span className="font-medium">Business Name:</span>
                  <span>{userData.businessName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">GST Number:</span>
                  <span>{userData.gstNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Business Address:</span>
                  <span>{userData.businessAddress}</span>
                </div>
              </div>
            )}

            {/* User-specific Information */}
            {userData.role === 'user' && (
              <div className="space-y-2 pt-4 border-t">
                <h3 className="font-semibold text-lg mb-2">Shipping Details</h3>
                <div className="flex justify-between">
                  <span className="font-medium">Default Address:</span>
                  <span>{userData.address}</span>
                </div>
              </div>
            )}

            <button
              onClick={onLogout}
              className="w-full mt-6 bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  };
  const products = [
    {
      id: 1,
      name: "Stripe Royal Blue Suit Set",
      price: 5749.00,
      description: "Elegant blue suit with golden stripes",
      image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?ixlib=rb-4.0.3"
    },
    {
      id: 2,
      name: "Peachy Bloom Cotton Suit Set",
      price: 6249.00,
      description: "Flowing peach anarkali suit",
      image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?ixlib=rb-4.0.3"
    },
    {
      id: 3,
      name: "Mauve Mirage Co-ord Set",
      price: 4999.00,
      description: "Stylish mauve palazzo set",
      image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?ixlib=rb-4.0.3"
    },
    {
      id: 4,
      name: "Multicolour Floral Chinnon Saree",
      price: 8249.00,
      description: "Designer printed saree",
      image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?ixlib=rb-4.0.3"
    },
    {
      id: 5,
      name: "Emerald Green Silk Saree",
      price: 8249.00,
      description: "Traditional silk saree with zari work",
      image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?ixlib=rb-4.0.3"
    },
    {
      id: 6,
      name: "Ruby Red Party Gown",
      price: 8249.00,
      description: "Elegant evening wear gown",
      image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?ixlib=rb-4.0.3"
    },
    {
      id: 7,
      name: "Golden Zari Work Lehenga",
      price: 8249.00,
      description: "Bridal collection lehenga",
      image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?ixlib=rb-4.0.3"
    },
    {
      id: 8,
      name: "Stripe Royal Blue Suit Set",
      price: 5749.00,
      description: "Elegant blue suit with golden stripes",
      image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?ixlib=rb-4.0.3"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Banner */}
      <div className="bg-rose-500 text-white text-center py-2 px-4">
        SALE - UPTO 80% OFF + EXTRA 10% OFF ON PREPAID ORDERS
      </div>

      {/* Navbar */}
      <nav className="bg-white shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8 w-full">
              {/* Logo */}
              <h1 className="text-2xl font-serif">MY TAILOR ZONE BY SAHIBA</h1>

              {/* Search Bar */}
              <div className="flex-1 max-w-xl">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
                </div>
              </div>

              {/* Right Icons */}
              <div className="flex items-center space-x-6">
              <button 
                  onClick={() => setShowProfile(true)}
                  className="hover:text-rose-500"
                >
                  <User size={24} />
                </button>
                <button 
                  onClick={() => setShowCart(true)}
                  className="hover:text-rose-500 relative"
                >
                  <ShoppingCart size={24} />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      {cartItems.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                  )}
                </button>
                <button 
                  onClick={() => setShowCoupons(true)}
                  className="hover:text-rose-500"
                >
                  <Ticket size={24} />
                </button>
                <button 
                  onClick={() => setShowComplaints(true)}
                  className="hover:text-rose-500"
                >
                  <MessageCircle size={24} />
                </button>
                <button
                  onClick={onLogout}
                  className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Menu Categories */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8 py-4 overflow-x-auto">
            {['NEW ARRIVALS', 'ETHNIC WEAR', 'BEST SELLERS', 'DRESSES', 'CO-ORDS & JUMPSUITS', 'TOPS & SHIRTS', 'UNDER 1499 STORE'].map((category) => (
              <button
                key={category}
                className="text-gray-700 hover:text-rose-500 whitespace-nowrap font-medium"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                  <p className="mt-1 text-gray-500">{product.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-medium text-gray-900">₹{product.price.toFixed(2)}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modals */}
      <ProfileModal
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        userData={userData}
      />
      {showCart && (
        <CartPage
          cartItems={cartItems}
          onClose={() => setShowCart(false)}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
          onCheckout={handleCheckout}
        />
      )}

      {showCoupons && (
        <CouponModal 
          isOpen={showCoupons}
          onClose={() => setShowCoupons(false)}
        />
      )}

      {showComplaints && (
        <ComplaintModal 
          isOpen={showComplaints}
          onClose={() => setShowComplaints(false)}
          userData={userData}
        />
      )}
    </div>
  );
};

export default EcommerceLanding;