import React, { useState } from 'react';
import { LoginPage } from './LoginPage';
import { UserSignup } from './UserSignup';
import { SellerSignup } from './SellersSignup'; 
import { EcommerceLanding } from './EcommerceLanding';

export const AuthFlow = () => {
  const [currentView, setCurrentView] = useState('userLogin');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = (data) => {
    console.log('Login data:', data);
    setUserData(data);
    setIsLoggedIn(true);
  };

  const handleSignup = (data) => {
    console.log('Signup data:', data);
    setUserData(data);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setCurrentView('userLogin');
  };

  const renderAuthComponent = () => {
    switch (currentView) {
      case 'userLogin':
        return (
          <LoginPage
            userType="user"
            onLogin={handleLogin}
            onSwitchToSignup={() => setCurrentView('userSignup')}
          />
        );
      case 'sellerLogin':
        return (
          <LoginPage
            userType="seller"
            onLogin={handleLogin}
            onSwitchToSignup={() => setCurrentView('sellerSignup')}
          />
        );
      case 'userSignup':
        return (
          <UserSignup
            onSignup={handleSignup}
            onSwitchToLogin={() => setCurrentView('userLogin')}
          />
        );
      case 'sellerSignup':
        return (
          <SellerSignup
            onSignup={handleSignup}
            onSwitchToLogin={() => setCurrentView('sellerLogin')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {!isLoggedIn && (
        <div>
          <div className="flex justify-center space-x-4 p-4">
            <button
              onClick={() => setCurrentView('userLogin')}
              className={`px-4 py-2 rounded ${
                currentView.startsWith('user') ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              User
            </button>
            <button
              onClick={() => setCurrentView('sellerLogin')}
              className={`px-4 py-2 rounded ${
                currentView.startsWith('seller') ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              Seller
            </button>
          </div>
          {renderAuthComponent()}
        </div>
      )}
      {isLoggedIn && <EcommerceLanding userData={userData} onLogout={handleLogout} />}
    </div>
  );
};

export default AuthFlow;