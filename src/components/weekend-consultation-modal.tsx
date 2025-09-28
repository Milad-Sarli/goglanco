'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import axiosInstance from "../lib/axios";
import { useTheme } from 'next-themes';

// Schema for the Weekend Consultation form
const consultationFormSchema = z.object({
  fullname: z.string().min(2, "Fullname must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  preferred_date: z.date().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Explicitly define the type for the consultation form values
type ConsultationFormValues = z.infer<typeof consultationFormSchema>;

// Local type guard for AxiosError
function isAxiosError(error: unknown): error is { isAxiosError: boolean } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'isAxiosError' in error &&
    (error as Record<string, unknown>).isAxiosError === true
  );
}

interface WeekendConsultationModalProps {
  children?: React.ReactNode;
  className?: string;
}

export function WeekendConsultationModal({ children, className }: WeekendConsultationModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [consultationSubmitStatus, setConsultationSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  useTheme(); // استفاده از useTheme بدون دریافت مقدار

  const consultationForm = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      preferred_date: undefined,
      message: "",
    },
  });

  async function onConsultationSubmit(values: ConsultationFormValues) {
    setConsultationSubmitStatus(null);
    try {
      // Define expected response type for successful consultation request
      type ConsultationSuccessResponse = {
        message: string;
        data: unknown;
      };

      // Prepare data for submission, formatting date if it exists
      const submissionData = {
        ...values,
        preferred_date: values.preferred_date 
          ? format(values.preferred_date, "yyyy-MM-dd") 
          : undefined,
      };

      const response = await axiosInstance.post<ConsultationSuccessResponse>('/api/consultation-requests', submissionData);
      console.log('Consultation request successful:', response.data);
      setConsultationSubmitStatus({ type: 'success', message: response.data.message || 'Consultation request sent successfully!' });
      consultationForm.reset();
    } catch (error: unknown) {
      console.error('Error submitting consultation request:', error);
      let errorMessage = 'An unexpected error occurred.';
      if (isAxiosError(error)) {
        const err = error as Error & {
          response?: {
            data?: { message?: string; errors?: Record<string, string[]> };
          };
        };
        errorMessage = err.response?.data?.message || err.message;
        if (err.response?.data?.errors) {
          Object.entries(err.response.data.errors).forEach(([fieldName, fieldMessages]) => {
            // Assert fieldMessages as string[] if confident about the API error structure
            const messages = fieldMessages as string[];
            consultationForm.setError(fieldName as keyof ConsultationFormValues, {
              type: 'server',
              message: messages.join(', '),
            });
          });
          errorMessage = "Please check the form for errors.";
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      setConsultationSubmitStatus({ type: 'error', message: errorMessage });
    }
  }

  // Reset consultation submit status when modal is closed manually
  useEffect(() => {
    if (!isOpen) {
      setConsultationSubmitStatus(null);
      // consultationForm.reset(); // Optionally reset form when modal closes
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="default" className={className}>
            Get Free Estimate
          </Button>
        )}
      </DialogTrigger>
      <DialogOverlay className="backdrop-blur-sm" />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule Weekend Consultation</DialogTitle>
          <DialogDescription>
            Fill out the form below to request a consultation. We&apos;ll contact you to confirm.
          </DialogDescription>
        </DialogHeader>
        {consultationSubmitStatus?.type === 'success' ? (
          <div className="text-center py-8">
            <div className="mb-4 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Thank You!</h3>
            <p className="text-muted-foreground mb-6">{consultationSubmitStatus.message}</p>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </div>
        ) : (
          <Form {...consultationForm}>
            <form onSubmit={consultationForm.handleSubmit(onConsultationSubmit)} className="space-y-6 py-4">
              <FormField
                control={consultationForm.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fullname</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={consultationForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={consultationForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={consultationForm.control}
                name="preferred_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Preferred Date (Optional)</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={consultationForm.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message / Requirements</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Briefly describe your needs or preferred time slots for Saturday (9 AM - 2 PM)"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {consultationSubmitStatus?.type === 'error' && (
                <div className="p-3 rounded-md bg-red-100 text-red-700 text-sm">
                  {consultationSubmitStatus.message}
                </div>
              )}
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={consultationForm.formState.isSubmitting}
                >
                  {consultationForm.formState.isSubmitting ? 'Submitting...' : 'Request Consultation'}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}