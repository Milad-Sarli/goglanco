'use client';

import Link from 'next/link';
import { 
  LayoutDashboard, 
  FileText, 
  Image, 
  Settings, 
  ShoppingBag, 
  Users, 
  LogOut
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Pages', href: '/admin/pages', icon: FileText },
  { name: 'Media', href: '/admin/media', icon: Image },
  { name: 'Products', href: '/admin/products', icon: ShoppingBag },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen flex-shrink-0 hidden md:block">
      <div className="p-6">
        <Link href="/admin" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Goglanco</span>
        </Link>
      </div>
      <nav className="mt-6">
        <ul className="space-y-2 px-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link 
                href={item.href}
                className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
          <li className="pt-6">
            <Link 
              href="/api/auth/signout"
              className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors text-red-400"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
} 