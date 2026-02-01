
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  hoverImage: string;
  description: string;
  sizes: string[];
  colors: string[];
  tags: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  isVerified: boolean;
  notifications: Notification[];
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Обработка' | 'Отправлен' | 'Доставлен';
  items: number;
}

export type View = 'home' | 'catalog' | 'contacts' | 'tracking' | 'dashboard';
