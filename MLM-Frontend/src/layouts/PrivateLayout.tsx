'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import AuthGuard from '@/components/AuthGuard';
import { 
  FaSignOutAlt, 
  FaUser, 
  FaWallet, 
  FaGift, 
  FaChartLine,
  FaRobot,
  FaBars,
  FaTimes
} from 'react-icons/fa';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();

  // Get user initials from firstName and lastName
  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    } else if (user?.firstName) {
      return user.firstName.charAt(0).toUpperCase();
    } else if (user?.lastName) {
      return user.lastName.charAt(0).toUpperCase();
    }
    return 'U';
  };

  // Get full name for display
  const getUserName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    } else if (user?.firstName) {
      return user.firstName;
    } else if (user?.lastName) {
      return user.lastName;
    }
    return 'User';
  };

  return (
    <AuthGuard>
      <div className="flex h-screen bg-gray-900 text-gray-100">
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-gray-900 bg-opacity-80 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-center h-16 px-4 bg-gray-900 border-b border-gray-700">
              <div className="flex items-center">
                <div className="w-8 h-8 relative mr-2">
                  <Image
                    src="/logo.png"
                    alt="NeuroTrade AI"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  NeuroTrade
                </span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
              <Link href="/dashboard/trade" className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200">
                <FaChartLine className="w-5 h-5" />
                <span className="ml-3">Trade</span>
              </Link>
              
              <Link href="/dashboard/account" className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200">
                <FaUser className="w-5 h-5" />
                <span className="ml-3">Account</span>
              </Link>
              
              <Link href="/dashboard/referral" className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200">
                <FaGift className="w-5 h-5" />
                <span className="ml-3">Referral Bonus</span>
              </Link>
              
              <Link href="/dashboard/wallet" className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200">
                <FaWallet className="w-5 h-5" />
                <span className="ml-3">Wallet</span>
              </Link>
            </nav>

            {/* Sign out button at bottom */}
            <div className="p-4 border-t border-gray-700">
              <button 
                onClick={logout}
                className="flex items-center w-full px-4 py-3 text-red-400 hover:bg-red-900 hover:bg-opacity-20 rounded-lg transition-colors duration-200"
              >
                <FaSignOutAlt className="w-5 h-5" />
                <span className="ml-3">Sign Out</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top header */}
          <header className="bg-gray-800 border-b border-gray-700">
            <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
              {/* Mobile menu button */}
              <div className="lg:hidden">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                >
                  {sidebarOpen ? (
                    <FaTimes className="w-6 h-6" />
                  ) : (
                    <FaBars className="w-6 h-6" />
                  )}
                </button>
              </div>

              {/* Spacer to center the right-side content on mobile */}
              <div className="flex-1 lg:hidden"></div>

              {/* Right side items */}
              <div className="flex items-center space-x-4">
                {/* AI Button */}
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-medium flex items-center shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
                  <FaRobot className="w-5 h-5 mr-2" />
                  AI
                </button>

                {/* User info */}
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {getUserInitials()}
                  </div>
                  <span className="ml-2 text-sm font-medium hidden md:block">
                    {getUserName()}
                  </span>
                </div>

                {/* Sign out button */}
                <button 
                  onClick={logout}
                  className="p-2 text-gray-400 hover:text-white"
                >
                  <FaSignOutAlt className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-900">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}