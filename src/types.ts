export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum Category {
  GENERAL = 'GENERAL',
  WORK = 'WORK',
  PERSONAL = 'PERSONAL',
  SHOPPING = 'SHOPPING',
}

export enum Role {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  EMPLOYEE = 'EMPLOYEE',
}

export enum Department {
  IT = 'IT',
  HR = 'HR',
  MARKETING = 'MARKETING',
  SALES = 'SALES',
  FINANCE = 'FINANCE',
}

export interface User {
  id: number;
  name: string;
  avatar: string;
  email: string;
  password: string;
  role: Role;
  department: Department;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  category: Category;
  department: Department;
  dueDate: Date | null;
  completed: boolean;
  createdAt: Date;
  assignees: User[];
}