'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';
import gsap from 'gsap';
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
  Mail,
  MapPin,
  Shield,
  Palette,
  Lock,
  FileText,
  Star,
  Clock,
  CheckCircle,
  ClipboardList,
  Loader2,
  Phone, 
  Calendar,
  Trash2,
  Plus,
  EyeOff,
  Eye,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getAvatarUrl, generateInitialAvatar } from '@/lib/utils';
import { getUserProfile, updateUserProfile, changePassword, User as UserType, ChangePasswordData } from '@/services/userService';
import { getUserConsultationRequests, ConsultationRequest } from '@/services/consultationService';
import { getUserTestimonials, createTestimonial, deleteTestimonial, Testimonial, CreateTestimonialData } from '@/services/testimonialsService';
import { useTheme } from 'next-themes';

// Component that uses useSearchParams
function ProfileContent() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [isProfileSubmitting, setIsProfileSubmitting] = useState(false);
  const [isAddressSubmitting, setIsAddressSubmitting] = useState(false);
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false);
  const [isTestimonialSubmitting, setIsTestimonialSubmitting] = useState(false);
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

  // Profile form state
  const [profileFormData, setProfileFormData] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: null as File | null
  });

  // Address form state
  const [addressFormData, setAddressFormData] = useState({
    address: ''
  });
  
  // فرم تغییر رمز عبور
  const [passwordData, setPasswordData] = useState<ChangePasswordData>({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  const [passwordVisibility, setPasswordVisibility] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setPasswordVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Theme and layout density states
  const { theme, setTheme } = useTheme();
  const [compactView, setCompactView] = useState<boolean>(false);

  // دریافت اطلاعات کاربر و تنظیم تب از URL
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // دریافت اطلاعات کاربر
        const response = await getUserProfile();
        if (response.success && response.data) {
          setUserData(response.data);
          // Initialize form data with user data
          setProfileFormData({
            name: response.data.name || '',
            email: response.data.email || '',
            phone: response.data.phone || '',
            avatar: null
          });
          setAddressFormData({
            address: response.data.address || ''
          });
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

  // Restore compact view from localStorage
  useEffect(() => {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('compactView') : null;
      if (stored) {
        setCompactView(stored === 'true');
      }
    } catch {
      // ignore
    }
  }, []);

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
    
    if (profileFormData.avatar && profileFormData.avatar.size > 2 * 1024 * 1024) {
      toast.error('Avatar image size should not exceed 2MB.');
      setIsProfileSubmitting(false);
      return;
    }

    setIsProfileSubmitting(true);
    try {
      const formData = new FormData();
      
      // Add text fields (only if they have values)
      if (profileFormData.name && profileFormData.name.trim()) {
        formData.append('name', profileFormData.name.trim());
      }
      
      if (profileFormData.email && profileFormData.email.trim()) {
        formData.append('email', profileFormData.email.trim());
      }
      
      // Phone can be empty
      if (profileFormData.hasOwnProperty('phone')) {
        formData.append('phone', profileFormData.phone || '');
      }
      
      // Add avatar file (only if selected)
      if (profileFormData.avatar && profileFormData.avatar instanceof File) {
        formData.append('avatar', profileFormData.avatar);
      }
      
      // Log form data for debugging
      console.log('Profile form data entries:');
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      
      const response = await updateUserProfile(formData);
      
      if (response.success && response.data) {
        setUserData(response.data);
        // Update form state with new data
        setProfileFormData({
          name: response.data.name || '',
          email: response.data.email || '',
          phone: response.data.phone || '',
          avatar: null // Reset file input
        });
        toast.success('Profile information updated successfully');
      } else {
        toast.error(response.message || 'Failed to update profile');
      }
    } catch (error: unknown) {
      console.error('Update profile error:', error);
      
      // Handle validation errors
      if (error && typeof error === 'object' && 'errors' in error) {
        const errorMessages = Object.values(error.errors as Record<string, string[]>).flat();
        toast.error(errorMessages.join(', '));
      } else if (error instanceof Error) {
        toast.error(error.message || 'Error updating profile');
      } else {
        toast.error('Error updating profile');
      }
    } finally {
      setIsProfileSubmitting(false);
    }
  };

  // Update address information
  const handleAddressUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userData) return;
    
    setIsAddressSubmitting(true);
    try {
      const formData = new FormData();
      
      // Add address field (can be empty)
      if (addressFormData.hasOwnProperty('address')) {
        formData.append('address', addressFormData.address || '');
      }
      
      // Log form data for debugging
      console.log('Address form data entries:');
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      
      const response = await updateUserProfile(formData);
      
      if (response.success && response.data) {
        setUserData(response.data);
        // Update form state with new data
        setAddressFormData({
          address: response.data.address || ''
        });
        toast.success('Address updated successfully');
      } else {
        toast.error(response.message || 'Failed to update address');
      }
    } catch (error: unknown) {
      console.error('Update address error:', error);
      
      // Handle validation errors
      if (error && typeof error === 'object' && 'errors' in error) {
        const errorMessages = Object.values(error.errors as Record<string, string[]>).flat();
        toast.error(errorMessages.join(', '));
      } else if (error instanceof Error) {
        toast.error(error.message || 'Error updating address');
      } else {
        toast.error('Error updating address');
      }
    } finally {
      setIsAddressSubmitting(false);
    }
  };
  
  // Change password
  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (passwordData.new_password !== passwordData.confirm_password) {
      toast.error('New password and confirmation do not match');
      return;
    }
    
    setIsPasswordSubmitting(true);
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
    } catch (error: unknown) {
      console.error('Change password error:', error);
      
      // Handle specific error cases
      if (error && typeof error === 'object' && 'message' in error && error.message === 'Current password is incorrect') {
        toast.error('Current password is incorrect');
      } else if (error && typeof error === 'object' && 'errors' in error) {
        const errorMessages = Object.values(error.errors as Record<string, string[]>).flat();
        toast.error(errorMessages.join(', '));
      } else if (error instanceof Error) {
        toast.error(error.message || 'Error changing password');
      } else {
        toast.error('Error changing password');
      }
    } finally {
      setIsPasswordSubmitting(false);
    }
  };

  // Create new testimonial
  const handleCreateTestimonial = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setIsTestimonialSubmitting(true);
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
    } catch (error: unknown) {
      console.error('Create testimonial error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error submitting testimonial';
      toast.error(errorMessage);
    } finally {
      setIsTestimonialSubmitting(false);
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
    } catch (error: unknown) {
      console.error('Delete testimonial error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error deleting testimonial';
      toast.error(errorMessage);
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
      <div
        ref={containerRef}
        className={cn(
          'container mx-auto px-4',
          compactView ? 'py-4 pt-20' : 'py-8 pt-24',
          'max-w-6xl'
        )}
      >
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-20 h-20 border-4 border-primary/20">
              <AvatarImage 
                src={getAvatarUrl(userData?.avatar)} 
                alt={userData?.name || "User"} 
                onError={(e) => {
                  // On error, try to use generated avatar with initials
                  if (userData?.name) {
                    e.currentTarget.src = generateInitialAvatar(userData.name);
                  } else {
                    e.currentTarget.src = '/default-avatar.svg';
                  }
                }}
              />
              <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                {userData?.name ? userData.name.substring(0, 2).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                 {userData?.name || "User"}
                </h1>
                <p className="text-xl text-muted-foreground">{userData?.email || "Email"}</p>
                {/* <Badge variant="secondary" className="mt-2">
                 <CheckCircle className="w-3 h-3 mr-1" />
                 Verified Account
                </Badge> */}
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 h-auto p-1 bg-muted/50">
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
          <TabsContent value="profile" className={cn(compactView ? 'space-y-3' : 'space-y-6')}>
            <div className={cn('grid grid-cols-1 md:grid-cols-2', compactView ? 'gap-3' : 'gap-6')}>
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
                          value={profileFormData.name}
                          onChange={(e) => setProfileFormData(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={profileFormData.email}
                          onChange={(e) => setProfileFormData(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          value={profileFormData.phone}
                          onChange={(e) => setProfileFormData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="Enter your phone number (optional)"
                        />
                      </div>
                      <div>
                        <Label htmlFor="avatar">Profile Picture</Label>
                        <Input 
                          id="avatar" 
                          name="avatar" 
                          type="file" 
                          accept="image/jpeg,image/png,image/jpg,image/gif"
                          className="cursor-pointer"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setProfileFormData(prev => ({ ...prev, avatar: file }));
                          }}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Supported formats: JPEG, PNG, JPG, GIF (Max: 2MB)
                        </p>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isProfileSubmitting}
                      >
                        {isProfileSubmitting ? (
                          <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                        ) : (
                          <CheckCircle className="w-4 h-4 ml-2" />
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
                  <form onSubmit={handleAddressUpdate}>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address" 
                          name="address" 
                          value={addressFormData.address}
                          onChange={(e) => setAddressFormData(prev => ({ ...prev, address: e.target.value }))}
                        />
                      </div>
                      <Button 
                        type="submit" 
                        variant="outline" 
                        className="w-full"
                        disabled={isAddressSubmitting}
                      >
                        {isAddressSubmitting ? (
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
          <TabsContent value="settings" className={cn(compactView ? 'space-y-3' : 'space-y-6')}>
            <div className={cn('grid grid-cols-1 md:grid-cols-2', compactView ? 'gap-3' : 'gap-6')}>
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
                    <Switch
                      checked={mounted ? theme === 'dark' : false}
                      onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Compact View</Label>
                      <p className="text-sm text-muted-foreground">
                        Use a more compact UI layout
                      </p>
                    </div>
                    <Switch
                      checked={compactView}
                      onCheckedChange={(checked) => {
                        setCompactView(checked);
                        try {
                          localStorage.setItem('compactView', String(checked));
                        } catch {
                          // ignore
                        }
                      }}
                    />
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
                  {/* <div className="flex items-center justify-between">
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
                  </div> */}
                  <form onSubmit={handlePasswordChange} className="space-y-4 mt-4">
                    <div className="relative">
                      <Label htmlFor="current_password">Current Password</Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          id="current_password" 
                          type={passwordVisibility.current ? 'text' : 'password'}
                          value={passwordData.current_password}
                          onChange={(e) => setPasswordData({...passwordData, current_password: e.target.value})}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => togglePasswordVisibility('current')}
                          aria-label={passwordVisibility.current ? 'Hide password' : 'Show password'}
                        >
                          {passwordVisibility.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="relative">
                      <Label htmlFor="new_password">New Password</Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          id="new_password" 
                          type={passwordVisibility.new ? 'text' : 'password'}
                          value={passwordData.new_password}
                          onChange={(e) => setPasswordData({...passwordData, new_password: e.target.value})}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => togglePasswordVisibility('new')}
                          aria-label={passwordVisibility.new ? 'Hide password' : 'Show password'}
                        >
                          {passwordVisibility.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="relative">
                      <Label htmlFor="confirm_password">Confirm New Password</Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          id="confirm_password" 
                          type={passwordVisibility.confirm ? 'text' : 'password'}
                          value={passwordData.confirm_password}
                          onChange={(e) => setPasswordData({...passwordData, confirm_password: e.target.value})}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => togglePasswordVisibility('confirm')}
                          aria-label={passwordVisibility.confirm ? 'Hide password' : 'Show password'}
                        >
                          {passwordVisibility.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      variant="outline" 
                      className="w-full"
                      disabled={isPasswordSubmitting}
                    >
                      {isPasswordSubmitting ? (
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
          <TabsContent value="reviews" className={cn(compactView ? 'space-y-3' : 'space-y-6')}>
            <div className={cn('grid grid-cols-1 md:grid-cols-2', compactView ? 'gap-3' : 'gap-6')}>
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
                            disabled={isTestimonialSubmitting}
                            className="flex-1"
                          >
                            {isTestimonialSubmitting ? (
                              <Loader2 className="w-4 h-4 ml-2 animate-spin" />
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

              {/* <Card ref={addToRefs} className="hover:shadow-lg transition-all duration-300">
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
              </Card> */}
            </div>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className={cn(compactView ? 'space-y-3' : 'space-y-6')}>
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
          <TabsContent value="notifications" className={cn(compactView ? 'space-y-3' : 'space-y-6')}>
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
          <TabsContent value="support" className={cn(compactView ? 'space-y-3' : 'space-y-6')}>
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
                  <Button variant="outline" className="w-full cursor-pointer justify-start" onClick={() => window.open('/contact', '_self')}>
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Support
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
                    {userData?.updated_at && (
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <div>
                          <p className="font-medium">Profile Updated</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(userData.updated_at).toLocaleString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: 'numeric',
                              hour12: true
                            })}
                          </p>
                        </div>
                      </div>
                    )}
                    {userData?.email_verified_at && (
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Mail className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="font-medium">Email Verified</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(userData.email_verified_at).toLocaleString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: 'numeric',
                              hour12: true
                            })}
                          </p>
                        </div>
                      </div>
                    )}
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