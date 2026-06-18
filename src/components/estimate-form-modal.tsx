'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogOverlay } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { submitEstimate } from '@/services/estimateService';

interface EstimateFormModalProps {
  trigger?: React.ReactNode;
  className?: string;
}

export function EstimateFormModal({ trigger, className }: EstimateFormModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    phone: '', 
    email: '',
    address: '',
    description: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullname.trim()) {
      newErrors.fullname = 'Full name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s\-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (formData.description.trim() && formData.description.trim().length < 10) {
      newErrors.description = 'Please provide more details (at least 10 characters)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setApiError(null);
    
    try {
      await submitEstimate(formData);
      setIsSubmitted(true);
      
      setTimeout(() => {
        setOpen(false);
        setFormData({
          fullname: '',
          phone: '',
          email: '',
          address: '',
          description: ''
        });
        setIsSubmitted(false);
      }, 2000);
    } catch (error: unknown) {
      console.error('Error submitting form:', error);
      
      if (error && typeof error === 'object' && 'errors' in error) {
        const serverErrors: Record<string, string> = {};
        
        // Map server errors to component format
        Object.entries((error as {errors: Record<string, string[]>}).errors).forEach(([field, messages]) => {
          if (Array.isArray(messages) && messages.length > 0) {
            serverErrors[field] = messages[0];
          }
        });
        
        setErrors(serverErrors);
      } else if (error && typeof error === 'object' && 'message' in error) {
        // Show general error message
        setApiError((error as {message: string}).message);
      } else {
        setApiError('Connection error. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button 
            className={cn("bg-primary hover:bg-primary/90 text-primary-foreground", className)}
            size="lg"
          >
            Get Free Estimate
          </Button>
        )}
      </DialogTrigger>
      <DialogOverlay className="backdrop-blur-sm" />
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-background text-foreground border-border">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl font-bold text-center">Request a Free Estimate</DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Fill out the form below and we&apos;ll get back to you as soon as possible.
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-6 pt-2">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="mb-4 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
              <p className="text-muted-foreground">
                 Your estimate request has been submitted successfully. We&apos;ll contact you shortly.
               </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  id="fullname" 
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  className={errors.fullname ? 'border-red-500' : ''}
                  placeholder="John Doe"
                />
                {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={cn(errors.phone ? 'border-red-500' : '')}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'border-red-500' : ''}
                  placeholder="john.doe@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={errors.address ? 'border-red-500' : ''}
                  placeholder="123 Main St, City, State, ZIP"
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description of Service Needed</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={errors.description ? 'border-red-500 min-h-[100px]' : 'min-h-[100px]'}
                  placeholder="Describe your rug and the service you need (e.g., type of rug, damage, size)"
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
              </div>
              
              {apiError && (
                <div className="p-3 mb-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
                  {apiError}
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-white"
                disabled={isSubmitting} 
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </Button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}