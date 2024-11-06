import React from 'react';
import { User } from '../types';
import { User as UserIcon, X } from 'lucide-react';

interface UserSelectProps {
  users: User[];
  selectedUsers: User[];
  onSelect: (users: User[]) => void;
}

const UserSelect: React.FC<UserSelectProps> = ({ users, selectedUsers, onSelect }) => {
  const availableUsers = users.filter(
    user => !selectedUsers.some(selected => selected.id === user.id)
  );

  const handleAddUser = (userId: string) => {
    if (!userId) return;
    const user = users.find(u => u.id === parseInt(userId));
    if (user) {
      onSelect([...selectedUsers, user]);
    }
  };

  const handleRemoveUser = (userId: number) => {
    onSelect(selectedUsers.filter(user => user.id !== userId));
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        มอบหมายให้
      </label>

      <div className="flex flex-wrap gap-2 mb-2">
        {selectedUsers.map(user => (
          <span
            key={user.id}
            className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-50 text-indigo-700 rounded-md text-sm"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-4 h-4 rounded-full"
            />
            {user.name}
            <button
              type="button"
              onClick={() => handleRemoveUser(user.id)}
              className="text-indigo-400 hover:text-indigo-600"
            >
              <X className="w-4 h-4" />
            </button>
          </span>
        ))}
      </div>

      <div className="relative">
        <select
          value=""
          onChange={(e) => handleAddUser(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pl-10"
          disabled={availableUsers.length === 0}
        >
          <option value="">เพิ่มผู้รับผิดชอบ...</option>
          {availableUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <UserIcon className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
}

export default UserSelect;