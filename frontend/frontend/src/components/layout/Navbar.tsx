import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { ShoppingCartIcon, UserIcon, Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { logoImg } from '../../assets/assets';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { getItemCount } = useCart();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchTerm.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setSearchTerm('');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-[999]">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logoImg} alt="Maskon Health" className="h-8 w-8" />
              <span className="text-xl font-bold text-primary-green">Maskon Health</span>
            </Link>
          </div>

          {/* Desktop Search (center) */}
          <div className="hidden md:flex flex-1 items-center justify-center px-4">
            <form onSubmit={handleSearchSubmit} className="w-full max-w-md">
              <label htmlFor="navbar-search" className="sr-only">Search</label>
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  id="navbar-search"
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search images, meals, workouts..."
                  className="block w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green"
                />
              </div>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/meals" className="text-gray-700 hover:text-primary-green transition">
              Meals
            </Link>
            <Link to="/herbs" className="text-gray-700 hover:text-primary-green transition">
              Herbs
            </Link>
            <Link to="/honey" className="text-gray-700 hover:text-primary-green transition">
              Honey
            </Link>
            <Link to="/workouts" className="text-gray-700 hover:text-primary-green transition">
              Workouts
            </Link>
            <Link to="/experts" className="text-gray-700 hover:text-primary-green transition">
              Experts
            </Link>

            <Link to="/cart" className="relative text-gray-700 hover:text-primary-green transition">
              <ShoppingCartIcon className="h-6 w-6" />
              {getItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
              <Link to="/profile" className="text-gray-700 hover:text-primary-green transition">
                  <UserIcon className="h-6 w-6" />
                </Link>
                <span className="text-sm text-gray-600">{user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-primary-green transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-primary-green text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative text-gray-700">
              <ShoppingCartIcon className="h-6 w-6" />
              {getItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200">
          {/* Mobile search inside expanded menu */}
          <div className="px-4 pb-3">
            <form onSubmit={(e) => { handleSearchSubmit(e); setIsOpen(false); }}>
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-200 focus:outline-none"
                />
              </div>
            </form>
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/meals"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setIsOpen(false)}
            >
              Meals
            </Link>
            <Link
              to="/herbs"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setIsOpen(false)}
            >
              Herbs
            </Link>
            <Link
              to="/honey"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setIsOpen(false)}
            >
              Honey
            </Link>
            <Link
              to="/workouts"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setIsOpen(false)}
            >
              Workouts
            </Link>
            <Link
              to="/experts"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setIsOpen(false)}
            >
              Experts
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 bg-primary-green text-white rounded text-center"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
            
          </div>
        </div>
      )}
    </nav>
  );
};

