import { Sidebar } from "@/components/admin/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Image, MessageSquare, Users } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <Sidebar />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden md:ml-64">
        <main className="flex-1 p-4 md:p-6 pt-16 md:pt-6">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">Welcome to your website management dashboard.</p>
          </div>

          <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
                <Activity className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Page Sections</CardTitle>
                <Image className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Hero, Services, Features, etc.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Testimonials</CardTitle>
                <MessageSquare className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">4 new this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Users</CardTitle>
                <Users className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Administrators</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-4 md:mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your recent actions and system events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-3">
                      <Image className="w-4 h-4 text-blue-600 dark:text-blue-300" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Hero Section Updated</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full mr-3">
                      <MessageSquare className="w-4 h-4 text-green-600 dark:text-green-300" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New Testimonial Added</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full mr-3">
                      <Users className="w-4 h-4 text-purple-600 dark:text-purple-300" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New Admin User Added</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
} 