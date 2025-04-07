import { Card } from '@/components/ui/card';
import { Users, FileText, Image, Mail } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Pages</p>
              <p className="text-2xl font-semibold text-gray-900">12</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <Image className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Portfolio Items</p>
              <p className="text-2xl font-semibold text-gray-900">24</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <Users className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Testimonials</p>
              <p className="text-2xl font-semibold text-gray-900">8</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <Mail className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">New Messages</p>
              <p className="text-2xl font-semibold text-gray-900">3</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {/* Activity items will be added here */}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100">
              <p className="text-sm font-medium text-blue-600">Add New Page</p>
            </button>
            <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100">
              <p className="text-sm font-medium text-green-600">Upload Portfolio</p>
            </button>
            <button className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100">
              <p className="text-sm font-medium text-yellow-600">Manage Menu</p>
            </button>
            <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100">
              <p className="text-sm font-medium text-purple-600">Update Settings</p>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
} 