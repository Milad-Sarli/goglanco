'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';
import gsap from 'gsap';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  User, 
  Settings, 
  MessageSquare, 
  Bell, 
  HelpCircle, 
  Camera,
  Mail,
  MapPin,
  Shield,
  Palette,
  Globe,
  Lock,
  FileText,
  Star,
  Clock,
  CheckCircle,
  ImageIcon,
  ClipboardList,
  Loader2,
  Phone, 
  Calendar,
  Trash2,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getUserProfile, updateUserProfile, changePassword, User as UserType, ChangePasswordData } from '@/services/userService';
import { getUserConsultationRequests, ConsultationRequest } from '@/services/consultationService';
import { getUserTestimonials, createTestimonial, deleteTestimonial, Testimonial, CreateTestimonialData } from '@/services/testimonialsService';

// Component that uses useSearchParams
function ProfileContent() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState<UserType | null>(null);
  const [consultationRequests, setConsultationRequests] = useState<ConsultationRequest[]>([]);
  const [isLoadingRequests, setIsLoadingRequests] = useState(false);
  const [userTestimonials, setUserTestimonials] = useState<Testimonial[]>([]);
  const [isLoadingTestimonials, setIsLoadingTestimonials] = useState(false);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [testimonialFormData, setTestimonialFormData] = useState<CreateTestimonialData>({
    name: '',
    text: '',
    rating: 5
  });
  
  // فرم تغییر رمز عبور
  const [passwordData, setPasswordData] = useState<ChangePasswordData>({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  // دریافت اطلاعات کاربر و تنظیم تب از URL
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // دریافت اطلاعات کاربر
        const response = await getUserProfile();
        if (response.success && response.data) {
          setUserData(response.data);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setMounted(true);
      }
    };

    // تنظیم تب فعال از URL parameter
    const tabParam = searchParams.get('tab');
    if (tabParam && ['profile', 'settings', 'reviews', 'requests', 'notifications', 'support'].includes(tabParam)) {
      setActiveTab(tabParam);
    }

    loadUserData();
  }, [searchParams]);

  useEffect(() => {
    if (mounted && containerRef.current) {
      // Reset cards ref array for new tab
      cardsRef.current = []; 
      
      // GSAP animations for page load - right to left
      gsap.fromTo(containerRef.current, 
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
      );

      // Small delay to ensure cards are rendered before animating
      setTimeout(() => {
        if (cardsRef.current.length > 0) {
          // Stagger animation for cards - right to left
          gsap.fromTo(cardsRef.current,
            { opacity: 0, x: 30, scale: 0.95 }, 
            { 
              opacity: 1, 
              x: 0, 
              scale: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out"
            }
          );
        }
      }, 100);
    }
  }, [mounted, activeTab]);

  // Fetch consultation requests when the requests tab is active
  useEffect(() => {
    const fetchConsultationRequests = async () => {
      if (activeTab === 'requests') {
        setIsLoadingRequests(true);
        try {
          const response = await getUserConsultationRequests();
          if (response.success && response.data) {
            setConsultationRequests(response.data);
          }
        } catch (error) {
          console.error('Error fetching consultation requests:', error);
          toast.error('Failed to load consultation requests');
        } finally {
          setIsLoadingRequests(false);
        }
      }
    };

    fetchConsultationRequests();
  }, [activeTab]);

  // Fetch user testimonials when the reviews tab is active
  useEffect(() => {
    const fetchUserTestimonials = async () => {
      if (activeTab === 'reviews') {
        setIsLoadingTestimonials(true);
        try {
          const response = await getUserTestimonials();
          if (response.data) {
            setUserTestimonials(response.data);
          }
        } catch (error) {
          console.error('Error fetching user testimonials:', error);
          toast.error('Failed to load testimonials');
        } finally {
          setIsLoadingTestimonials(false);
        }
      }
    };

    fetchUserTestimonials();
  }, [activeTab]);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };
  
  // Update user information
  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userData) return;
    
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      const response = await updateUserProfile(formData);
      
      if (response.success && response.data) {
        setUserData(response.data);
        toast.success('Profile information updated successfully');
      }
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error('Error updating profile');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Change password
  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (passwordData.new_password !== passwordData.confirm_password) {
      toast.error('New password and confirmation do not match');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await changePassword(passwordData);
      
      if (response.success) {
        toast.success('Password changed successfully');
        setPasswordData({
          current_password: '',
          new_password: '',
          confirm_password: ''
        });
      }
    } catch (error) {
      console.error('Change password error:', error);
      toast.error('Error changing password');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Create new testimonial
  const handleCreateTestimonial = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    try {
      const response = await createTestimonial(testimonialFormData);
      
      if (response.success && response.data) {
        toast.success('Testimonial submitted successfully');
        setUserTestimonials([response.data, ...userTestimonials]);
        setShowTestimonialForm(false);
        setTestimonialFormData({
          name: '',
          text: '',
          rating: 5
        });
      }
    } catch (error) {
      console.error('Create testimonial error:', error);
      toast.error('Error submitting testimonial');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete testimonial
  const handleDeleteTestimonial = async (testimonialId: number) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    
    try {
      const response = await deleteTestimonial(testimonialId);
      
      if (response.success) {
        toast.success('Testimonial deleted successfully');
        setUserTestimonials(userTestimonials.filter(t => t.id !== testimonialId));
      }
    } catch (error) {
      console.error('Delete testimonial error:', error);
      toast.error('Error deleting testimonial');
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div ref={containerRef} className="container mx-auto px-4 py-8 pt-24 max-w-6xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-20 h-20 border-4 border-primary/20">
              <AvatarImage src={userData?.avatar || "/placeholder-avatar.jpg"} alt={userData?.name || "User"} />
              <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                {userData?.name ? userData.name.substring(0, 2).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                 {userData?.name || "User"}
                </h1>
                <p className="text-xl text-muted-foreground">{userData?.email || "Email"}</p>
                <Badge variant="secondary" className="mt-2">
                 <CheckCircle className="w-3 h-3 mr-1" />
                 Verified Account
                </Badge>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8 h-auto p-1 bg-muted/50">
            <TabsTrigger 
              value="profile"  
              className={cn(
                "flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2",
                "min-h-[3rem] sm:min-h-[2.5rem] p-1 sm:p-3",
                "text-[0.65rem] sm:text-sm font-medium",
                "data-[state=active]:bg-background data-[state=active]:text-foreground",
                "data-[state=active]:shadow-sm transition-all duration-200",
                "hover:bg-background/50"
              )}
            > 
              <User className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="hidden xs:block sm:block leading-none">Profile</span>
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className={cn(
                "flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2",
                "min-h-[3rem] sm:min-h-[2.5rem] p-1 sm:p-3",
                "text-[0.65rem] sm:text-sm font-medium",
                "data-[state=active]:bg-background data-[state=active]:text-foreground",
                "data-[state=active]:shadow-sm transition-all duration-200",
                "hover:bg-background/50"
              )}
            >
              <Settings className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="hidden xs:block sm:block leading-none">Settings</span>
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className={cn(
                "flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2",
                "min-h-[3rem] sm:min-h-[2.5rem] p-1 sm:p-3",
                "text-[0.65rem] sm:text-sm font-medium",
                "data-[state=active]:bg-background data-[state=active]:text-foreground",
                "data-[state=active]:shadow-sm transition-all duration-200",
                "hover:bg-background/50"
              )}
            >
              <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="hidden xs:block sm:block leading-none">Reviews</span>
            </TabsTrigger>
            <TabsTrigger 
              value="requests" 
              className={cn(
                "flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2",
                "min-h-[3rem] sm:min-h-[2.5rem] p-1 sm:p-3",
                "text-[0.65rem] sm:text-sm font-medium",
                "data-[state=active]:bg-background data-[state=active]:text-foreground",
                "data-[state=active]:shadow-sm transition-all duration-200",
                "hover:bg-background/50"
              )}
            >
              <ClipboardList className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="hidden xs:block sm:block leading-none">Requests</span>
            </TabsTrigger>
            <TabsTrigger 
              value="notifications" 
              className={cn(
                "flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2",
                "min-h-[3rem] sm:min-h-[2.5rem] p-1 sm:p-3",
                "text-[0.65rem] sm:text-sm font-medium",
                "data-[state=active]:bg-background data-[state=active]:text-foreground",
                "data-[state=active]:shadow-sm transition-all duration-200",
                "hover:bg-background/50"
              )}
            >
              <Bell className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="hidden xs:block sm:block leading-none">Notifications</span>
            </TabsTrigger>
            <TabsTrigger 
              value="support" 
              className={cn(
                "flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2",
                "min-h-[3rem] sm:min-h-[2.5rem] p-1 sm:p-3",
                "text-[0.65rem] sm:text-sm font-medium",
                "data-[state=active]:bg-background data-[state=active]:text-foreground",
                "data-[state=active]:shadow-sm transition-all duration-200",
                "hover:bg-background/50"
              )}
            >
              <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="hidden xs:block sm:block leading-none">Support</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card ref={addToRefs} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>
                    Update your personal details and profile information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleProfileUpdate}>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          defaultValue={userData?.name || ""} 
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          defaultValue={userData?.email || ""} 
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          defaultValue={userData?.phone || ""} 
                        />
                      </div>
                      <div>
                        <Label htmlFor="avatar">Profile Picture</Label>
                        <Input 
                          id="avatar" 
                          name="avatar" 
                          type="file" 
                          className="cursor-pointer" 
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                        ) : (
                          <Camera className="w-4 h-4 ml-2" />
                        )}
                        Update Profile
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card ref={addToRefs} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Address Information
                  </CardTitle>
                  <CardDescription>
                    Manage your address and location details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleProfileUpdate}>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address" 
                          name="address" 
                          defaultValue={userData?.address || ""} 
                        />
                      </div>
                      <Button 
                        type="submit" 
                        variant="outline" 
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                        ) : (
                          <MapPin className="w-4 h-4 ml-2" />
                        )}
                        Update Address
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card ref={addToRefs} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Appearance
                  </CardTitle>
                  <CardDescription>
                    Customize UI and theme settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Switch between light and dark themes
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Compact View</Label>
                      <p className="text-sm text-muted-foreground">
                        Use a more compact UI layout
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card ref={addToRefs} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Privacy & Security
                  </CardTitle>
                  <CardDescription>
                    Manage your privacy and security settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Profile Visibility</Label>
                      <p className="text-sm text-muted-foreground">
                        Control who can view your profile
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <form onSubmit={handlePasswordChange} className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="current_password">Current Password</Label>
                      <Input 
                        id="current_password" 
                        type="password" 
                        value={passwordData.current_password}
                        onChange={(e) => setPasswordData({...passwordData, current_password: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="new_password">New Password</Label>
                      <Input 
                        id="new_password" 
                        type="password" 
                        value={passwordData.new_password}
                        onChange={(e) => setPasswordData({...passwordData, new_password: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirm_password">Confirm New Password</Label>
                      <Input 
                        id="confirm_password" 
                        type="password" 
                        value={passwordData.confirm_password}
                        onChange={(e) => setPasswordData({...passwordData, confirm_password: e.target.value})}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      variant="outline" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                      ) : (
                        <Lock className="w-4 h-4 ml-2" />
                      )}
                      Change Password
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card ref={addToRefs} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    My Reviews
                  </CardTitle>
                  <CardDescription>
                    Reviews and testimonials you&apos;ve submitted
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isLoadingTestimonials ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                  ) : userTestimonials.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No testimonials found</p>
                      <p className="text-sm">Share your experience with our services</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {userTestimonials.map((testimonial) => (
                        <div key={testimonial.id} className="border rounded-lg p-4 bg-muted/50">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star 
                                      key={star} 
                                      className={`w-4 h-4 ${
                                        star <= testimonial.rating 
                                          ? 'fill-yellow-400 text-yellow-400' 
                                          : 'text-gray-300'
                                      }`} 
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-muted-foreground">{testimonial.name}</span>
                              </div>
                              <p className="text-sm">
                                &quot;{testimonial.text}&quot;
                              </p>
                              {testimonial.created_at && (
                                <p className="text-xs text-muted-foreground mt-2">
                                  Submitted on {new Date(testimonial.created_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteTestimonial(testimonial.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {!showTestimonialForm ? (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setShowTestimonialForm(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Write New Review
                    </Button>
                  ) : (
                    <div className="border rounded-lg p-4 bg-background">
                      <h4 className="font-medium mb-4">Write a New Review</h4>
                      <form onSubmit={handleCreateTestimonial} className="space-y-4">
                        <div>
                          <Label htmlFor="testimonial-name">Service Name</Label>
                          <Input
                            id="testimonial-name"
                            value={testimonialFormData.name}
                            onChange={(e) => setTestimonialFormData({
                              ...testimonialFormData,
                              name: e.target.value
                            })}
                            placeholder="e.g., Persian Rug Restoration"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="testimonial-text">Your Review</Label>
                          <Textarea
                            id="testimonial-text"
                            value={testimonialFormData.text}
                            onChange={(e) => setTestimonialFormData({
                              ...testimonialFormData,
                              text: e.target.value
                            })}
                            placeholder="Share your experience with our service..."
                            rows={4}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="testimonial-rating">Rating</Label>
                          <Select
                            value={testimonialFormData.rating.toString()}
                            onValueChange={(value) => setTestimonialFormData({
                              ...testimonialFormData,
                              rating: parseInt(value)
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[5, 4, 3, 2, 1].map((rating) => (
                                <SelectItem key={rating} value={rating.toString()}>
                                  <div className="flex items-center gap-2">
                                    <div className="flex">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <Star 
                                          key={star} 
                                          className={`w-3 h-3 ${
                                            star <= rating 
                                              ? 'fill-yellow-400 text-yellow-400' 
                                              : 'text-gray-300'
                                          }`} 
                                        />
                                      ))}
                                    </div>
                                    <span>{rating} star{rating !== 1 ? 's' : ''}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="flex-1"
                          >
                            {isSubmitting ? (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <MessageSquare className="w-4 h-4 mr-2" />
                            )}
                            Submit Review
                          </Button>
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => {
                              setShowTestimonialForm(false);
                              setTestimonialFormData({
                                name: '',
                                text: '',
                                rating: 5
                              });
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card ref={addToRefs} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    My Previews
                  </CardTitle>
                  <CardDescription>
                    Before and after photos you&apos;ve shared
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                        <Image 
                          src="/photo_rug_reweaving.jpg" 
                          alt="Before restoration" 
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs text-center text-muted-foreground">Before</p>
                    </div>
                    <div className="space-y-2">
                      <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                        <Image 
                          src="/portfolio.jpg" 
                          alt="After restoration" 
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs text-center text-muted-foreground">After</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Persian Rug Restoration</p>
                    <p className="text-xs text-muted-foreground">Uploaded on Dec 15, 2024</p>
                  </div>
                  <Button variant="outline" className="w-full">
                     <ImageIcon className="w-4 h-4 mr-2" />
                     Upload New Preview
                   </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <Card ref={addToRefs} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="w-5 h-5" />
                  My Service Requests
                </CardTitle>
                <CardDescription>
                  View and manage your consultation requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingRequests ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : consultationRequests.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No consultation requests found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {consultationRequests.map((request) => (
                      <div
                        key={request.id}
                        className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
                      >
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <p className="font-medium">{request.fullname}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Mail className="w-4 h-4" />
                              {request.email}
                            </div>
                            {request.phone && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone className="w-4 h-4" />
                                {request.phone}
                              </div>
                            )}
                          </div>
                          <Badge
                            variant={
                              request.status === 'pending'
                                ? 'secondary'
                                : request.status === 'completed'
                                ? 'default'
                                : 'outline'
                            }
                          >
                            {request.status}
                          </Badge>
                        </div>
                        <div className="mt-2 text-sm">{request.message}</div>
                        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {new Date(request.created_at).toLocaleDateString()}
                          </div>
                          {request.preferred_date && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Preferred: {new Date(request.preferred_date).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card ref={addToRefs} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose what notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via SMS
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Service Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about service status and updates
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Marketing Communications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive promotional offers and news
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support Tab */}
          <TabsContent value="support" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card ref={addToRefs} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5" />
                    Help & Support
                  </CardTitle>
                  <CardDescription>
                    Get help and support for your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Documentation
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Globe className="w-4 h-4 mr-2" />
                    Community Forum
                  </Button>
                </CardContent>
              </Card>

              <Card ref={addToRefs} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Your recent account activity
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="font-medium">Profile Updated</p>
                        <p className="text-sm text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <Mail className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Email Verified</p>
                        <p className="text-sm text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Main component wrapped with Suspense
export default function ProfilePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading profile...</span>
        </div>
      </div>
    }>
      <ProfileContent />
    </Suspense>
  );
}