import React from 'react';
import { User } from '../types';
import { LogOut, Settings } from 'lucide-react';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-indigo-900">ระบบติดตามงาน</h1>
            <span className="ml-4 px-2 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-md">
              {user.department}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="text-sm">
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-gray-500">{user.role}</p>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center gap-1 px-3 py-1 text-sm text-gray-700 hover:text-red-600 rounded-md hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              ออกจากระบบ
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;