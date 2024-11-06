import React, { useState } from 'react';
import { PlusCircle, CheckCircle2, Clock, AlertCircle, Users } from 'lucide-react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import { Task, Priority, User, Role, Department } from './types';

// Mock users data with roles and departments
const mockUsers: User[] = [
  {
    id: 1,
    name: 'สมชาย ใจดี',
    email: 'somchai@company.com',
    password: '123456',
    avatar: 'https://i.pravatar.cc/150?u=1',
    role: Role.ADMIN,
    department: Department.IT,
  },
  {
    id: 2,
    name: 'สมหญิง รักงาน',
    email: 'somying@company.com',
    password: '123456',
    avatar: 'https://i.pravatar.cc/150?u=2',
    role: Role.MANAGER,
    department: Department.HR,
  },
  {
    id: 3,
    name: 'มานะ ตั้งใจ',
    email: 'mana@company.com',
    password: '123456',
    avatar: 'https://i.pravatar.cc/150?u=3',
    role: Role.EMPLOYEE,
    department: Department.SALES,
  },
  {
    id: 4,
    name: 'วิชัย ขยัน',
    email: 'wichai@company.com',
    password: '123456',
    avatar: 'https://i.pravatar.cc/150?u=4',
    role: Role.EMPLOYEE,
    department: Department.MARKETING,
  },
  {
    id: 5,
    name: 'ประภา สดใส',
    email: 'prapa@company.com',
    password: '123456',
    avatar: 'https://i.pravatar.cc/150?u=5',
    role: Role.MANAGER,
    department: Department.FINANCE,
  },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loginError, setLoginError] = useState<string>();

  const handleLogin = (email: string, password: string) => {
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      setLoginError(undefined);
    } else {
      setLoginError('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const addTask = (task: Task) => {
    if (!currentUser) return;
    
    const newTask = {
      ...task,
      id: Date.now(),
      department: currentUser.department,
    };
    setTasks([...tasks, newTask]);
    setIsFormOpen(false);
  };

  const toggleStatus = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Filter tasks based on user role and department
  const getVisibleTasks = () => {
    if (!currentUser) return [];

    switch (currentUser.role) {
      case Role.ADMIN:
        return tasks;
      case Role.MANAGER:
        return tasks.filter(task => task.department === currentUser.department);
      case Role.EMPLOYEE:
        return tasks.filter(
          task =>
            task.department === currentUser.department ||
            task.assignees.some(assignee => assignee.id === currentUser.id)
        );
      default:
        return [];
    }
  };

  const visibleTasks = getVisibleTasks();
  const assignedTasks = visibleTasks.filter(task => task.assignees.length > 0);
  const totalAssignments = visibleTasks.reduce((sum, task) => sum + task.assignees.length, 0);

  // Get available users for task assignment based on department
  const getAvailableUsers = () => {
    if (!currentUser) return [];

    switch (currentUser.role) {
      case Role.ADMIN:
        return mockUsers;
      case Role.MANAGER:
        return mockUsers.filter(user => user.department === currentUser.department);
      default:
        return mockUsers.filter(user => user.department === currentUser.department);
    }
  };

  if (!currentUser) {
    return <LoginForm onLogin={handleLogin} error={loginError} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header user={currentUser} onLogout={handleLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={<CheckCircle2 className="w-6 h-6 text-green-500" />}
              title="งานที่เสร็จแล้ว"
              value={visibleTasks.filter(t => t.completed).length}
            />
            <StatCard
              icon={<Clock className="w-6 h-6 text-yellow-500" />}
              title="งานที่กำลังทำ"
              value={visibleTasks.filter(t => !t.completed).length}
            />
            <StatCard
              icon={<AlertCircle className="w-6 h-6 text-red-500" />}
              title="งานเร่งด่วน"
              value={visibleTasks.filter(t => t.priority === Priority.HIGH).length}
            />
            <StatCard
              icon={<Users className="w-6 h-6 text-blue-500" />}
              title="การมอบหมายงาน"
              value={totalAssignments}
              subtitle={`${assignedTasks.length} งาน`}
            />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">รายการงาน</h2>
              {(currentUser.role === Role.ADMIN || currentUser.role === Role.MANAGER) && (
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <PlusCircle className="w-5 h-5" />
                  เพิ่มงานใหม่
                </button>
              )}
            </div>

            <TaskList
              tasks={visibleTasks}
              onToggleStatus={toggleStatus}
              onDeleteTask={deleteTask}
            />
          </div>

          {isFormOpen && (
            <TaskForm
              onSubmit={addTask}
              onClose={() => setIsFormOpen(false)}
              users={getAvailableUsers()}
            />
          )}
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  subtitle?: string;
}

function StatCard({ icon, title, value, subtitle }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-4">
        {icon}
        <div>
          <h3 className="text-gray-600 text-sm">{title}</h3>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;