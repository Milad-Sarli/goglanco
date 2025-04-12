import { Sidebar } from "@/components/admin/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Image, MessageSquare, Users } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="md:pl-[280px]">
        <main className="container mx-auto p-4 md:p-6 lg:p-8 pt-20 md:pt-8">
          <div className="mb-6 space-y-2">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
              Welcome to your website management dashboard.
            </p>
          </div>

          <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card className="w-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm md:text-base font-medium">Total Visitors</CardTitle>
                <Activity className="w-4 h-4 md:w-5 md:h-5 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold">1,234</div>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">+12% from last month</p>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm md:text-base font-medium">Page Sections</CardTitle>
                <Image className="w-4 h-4 md:w-5 md:h-5 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold">5</div>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Hero, Services, Features, etc.</p>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm md:text-base font-medium">Testimonials</CardTitle>
                <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold">12</div>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">4 new this month</p>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm md:text-base font-medium">Users</CardTitle>
                <Users className="w-4 h-4 md:w-5 md:h-5 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold">3</div>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Administrators</p>
              </CardContent>
            </Card>
          </div>

          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Recent Activity</CardTitle>
              <CardDescription className="text-sm md:text-base">
                Your recent actions and system events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-3 shrink-0">
                    <Image className="w-4 h-4 md:w-5 md:h-5 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <p className="text-sm md:text-base font-medium">Hero Section Updated</p>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full mr-3 shrink-0">
                    <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-green-600 dark:text-green-300" />
                  </div>
                  <div>
                    <p className="text-sm md:text-base font-medium">New Testimonial Added</p>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Yesterday</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full mr-3 shrink-0">
                    <Users className="w-4 h-4 md:w-5 md:h-5 text-purple-600 dark:text-purple-300" />
                  </div>
                  <div>
                    <p className="text-sm md:text-base font-medium">New Admin User Added</p>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">3 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
} 