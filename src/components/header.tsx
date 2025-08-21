'use client';

import Link from 'next/link';
import Image from 'next/image';
import dojoIcon from "../../public/images/dojoIcon.png";
// MVP: Removed authentication imports
// import { useState } from 'react';
// import { usePathname } from 'next/navigation';
// import { useAuthContext } from '@/contexts/AuthContext';
// import { 
//   User,
//   LogOut,
//   Mail
// } from 'lucide-react';

export function Header() {
  // MVP: Removed user authentication state and functions
  // const [isProfileOpen, setIsProfileOpen] = useState(false);
  // const pathname = usePathname();
  // const { user, logout } = useAuthContext();

  // const handleLogout = async () => {
  //   try {
  //     await logout();
  //     setIsProfileOpen(false);
  //   } catch (error) {
  //     console.error('Logout failed:', error);
  //   }
  // };

  // const closeProfileDropdown = () => {
  //   setIsProfileOpen(false);
  // };
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-8 sm:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src={dojoIcon}
                alt="AP Dojo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-extrabold tracking-wide text-gray-900">
                AP <span className="text-blue-500">Dojo</span>
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-8">
            <Link
              href="/select-practice-units?subject=macro"
              className="text-gray-700 hover:text-blue-600 transition-colors font-semibold"
            >
              MCQ Practice
            </Link>
            
            <Link
              href="/unit-study-guides"
              className="text-gray-700 hover:text-blue-600 transition-colors font-semibold"
            >
              Unit Cheat Sheets
            </Link>
          </nav>

          {/* User Actions - MVP: Removed for minimal header */}
          {/* 
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => {
                    setIsProfileOpen(!isProfileOpen);
                  }}
                  className="flex items-center space-x-2 p-2 text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-50"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium">
                    {user.email ? user.email.split('@')[0] : 'User'}
                  </span>
                </button>
                
                {isProfileOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          */}
        </div>
      </div>
    </header>
  );
} 