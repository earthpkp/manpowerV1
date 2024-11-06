import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Task, Priority, Category, User } from '../types';
import UserSelect from './UserSelect';

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  onClose: () => void;
  users: User[];
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onClose, users }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>(Priority.MEDIUM);
  const [category, setCategory] = useState<Category>(Category.GENERAL);
  const [dueDate, setDueDate] = useState('');
  const [assignees, setAssignees] = useState<User[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: 0, // Will be set in parent
      title,
      description,
      priority,
      category,
      dueDate: dueDate ? new Date(dueDate) : null,
      completed: false,
      createdAt: new Date(),
      assignees,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">เพิ่มงานใหม่</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ชื่องาน
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              รายละเอียด
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ความสำคัญ
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value={Priority.LOW}>ต่ำ</option>
                <option value={Priority.MEDIUM}>ปานกลาง</option>
                <option value={Priority.HIGH}>สูง</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                หมวดหมู่
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value={Category.GENERAL}>ทั่วไป</option>
                <option value={Category.WORK}>งาน</option>
                <option value={Category.PERSONAL}>ส่วนตัว</option>
                <option value={Category.SHOPPING}>ช็อปปิ้ง</option>
              </select>
            </div>
          </div>

          <UserSelect
            users={users}
            selectedUsers={assignees}
            onSelect={setAssignees}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              กำหนดส่ง
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
            >
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;