import React from 'react';
import { Task } from '../types';
import { Trash2, CheckCircle, Circle, Users } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggleStatus: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleStatus,
  onDeleteTask,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        ยังไม่มีงานในระบบ กดปุ่ม "เพิ่มงานใหม่" เพื่อเริ่มต้น
      </div>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'text-red-500';
      case 'MEDIUM':
        return 'text-yellow-500';
      default:
        return 'text-green-500';
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'WORK':
        return 'bg-blue-100 text-blue-800';
      case 'PERSONAL':
        return 'bg-purple-100 text-purple-800';
      case 'SHOPPING':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`bg-white border rounded-lg p-4 transition-all ${
            task.completed ? 'opacity-75' : ''
          }`}
        >
          <div className="flex items-start gap-4">
            <button
              onClick={() => onToggleStatus(task.id)}
              className="mt-1 flex-shrink-0"
            >
              {task.completed ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Circle className="w-5 h-5 text-gray-400" />
              )}
            </button>

            <div className="flex-grow">
              <div className="flex items-start justify-between">
                <div>
                  <h3
                    className={`text-lg font-medium ${
                      task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                    }`}
                  >
                    {task.title}
                  </h3>
                  <p className="text-gray-600 mt-1">{task.description}</p>
                </div>

                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-3 mt-3 flex-wrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryBadgeColor(
                    task.category
                  )}`}
                >
                  {task.category}
                </span>
                <span
                  className={`inline-flex items-center text-sm ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  ความสำคัญ: {task.priority}
                </span>
                {task.dueDate && (
                  <span className="text-sm text-gray-500">
                    กำหนดส่ง: {formatDate(task.dueDate)}
                  </span>
                )}
              </div>

              {task.assignees.length > 0 && (
                <div className="mt-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <div className="flex -space-x-2">
                    {task.assignees.map((user) => (
                      <img
                        key={user.id}
                        src={user.avatar}
                        alt={user.name}
                        title={user.name}
                        className="w-6 h-6 rounded-full border-2 border-white"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {task.assignees.length} คน
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;