'use client';

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon } from "lucide-react";
import { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  fullname: z.string().min(2, "Fullname must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

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

// Interface for the contact information state
interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  business_hours_monday_saturday: string;
  business_hours_sunday: string;
}

// Minimal AxiosError type for local use
type LocalAxiosError<T = unknown> = Error & {
  config?: unknown;
  code?: string;
  request?: unknown;
  response?: {
    data?: T;
    status?: number;
    headers?: unknown;
  };
  isAxiosError?: boolean;
  toJSON?: () => object;
};

// Local type guard for AxiosError
function isAxiosError(error: unknown): error is { isAxiosError: boolean } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'isAxiosError' in error &&
    (error as Record<string, unknown>).isAxiosError === true
  );
}

export function ContactSection() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [isLoadingContactInfo, setIsLoadingContactInfo] = useState(true);
  const [contactInfoError, setContactInfoError] = useState<string | null>(null);

  // State for Main Contact Form submission
  const [mainFormSubmitStatus, setMainFormSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // State for Consultation Modal
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [consultationSubmitStatus, setConsultationSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      message: "",
    },
  });

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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setMainFormSubmitStatus(null);
    try {
      // Define expected response type for successful message submission
      type MessageSuccessResponse = {
        message: string;
        data: { // Based on CONTACT_APIS.md
          fullname: string;
          email: string;
          message: string;
          updated_at: string;
          created_at: string;
          id: number;
        };
      };

      const response = await axiosInstance.post<MessageSuccessResponse>('/api/contact-messages', values);
      console.log('Message sent successfully:', response.data);
      setMainFormSubmitStatus({ type: 'success', message: response.data.message || 'Message sent successfully!' });
      form.reset(); 
    } catch (error: unknown) {
      console.error('Error sending message:', error);
      let errorMessage = 'An unexpected error occurred.';
      if (isAxiosError(error)) {
        const err = error as LocalAxiosError<{ message?: string; errors?: Record<string, string[]> }>;
        errorMessage = err.response?.data?.message || err.message;
        if (err.response?.data?.errors) {
          Object.entries(err.response.data.errors).forEach(([fieldName, fieldMessages]) => {
            const messages = fieldMessages as string[];
            form.setError(fieldName as keyof z.infer<typeof formSchema>, {
              type: 'server',
              message: messages.join(', '),
            });
          });
          errorMessage = "Please check the form for errors.";
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      setMainFormSubmitStatus({ type: 'error', message: errorMessage });
    }
  }

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
        const err = error as LocalAxiosError<{ message?: string; errors?: Record<string, string[]> }>;
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

  useEffect(() => {
    async function fetchContactInfo() {
      setIsLoadingContactInfo(true);
      setContactInfoError(null);
      try {
        const response = await axiosInstance.get<ContactInfo>('/api/contact-information');
        setContactInfo(response.data);
      } catch (error: unknown) {
        console.error('Error fetching contact info:', error);
        if (isAxiosError(error)) {
          const err = error as LocalAxiosError<{ message?: string }>;
          const serverMessage = err.response?.data?.message;
          setContactInfoError(serverMessage || err.message || 'An unexpected error occurred while fetching contact information.');
        } else if (error instanceof Error) {
          setContactInfoError(error.message || 'An unexpected error occurred.');
        } else {
          setContactInfoError('An unexpected error occurred.');
        }
      } finally {
        setIsLoadingContactInfo(false);
      }
    }

    fetchContactInfo();
  }, []);

  // Reset consultation submit status when modal is closed manually
  useEffect(() => {
    if (!isConsultationModalOpen) {
      setConsultationSubmitStatus(null);
      // consultationForm.reset(); // Optionally reset form when modal closes
    }
  }, [isConsultationModalOpen]);

  return (
    <section className="py-20 bg-background dark:bg-slate-900" id="contact">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl text-foreground dark:text-white font-bold mb-4"
          >
            Get in Touch
          </motion.h2>
          <p className="text-muted-foreground dark:text-slate-300 text-lg">
            Contact us for a free consultation and estimate
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="fullname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fullname</FormLabel>
                          <FormControl>
                            <Input placeholder="Your fullname" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your rug repair needs"
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                    {mainFormSubmitStatus && (
                      <div className={`p-3 mt-4 rounded-md text-sm ${
                        mainFormSubmitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {mainFormSubmitStatus.message}
                      </div>
                    )}
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Find us using the information below
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoadingContactInfo && <p>Loading contact information...</p>}
                {contactInfoError && <p className="text-red-500">Error: {contactInfoError}</p>}
                {contactInfo && !isLoadingContactInfo && !contactInfoError && (
                  <>
                    <div className="flex items-start gap-4">
                      <MapPinIcon className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <div className="font-semibold">Address</div>
                        <div className="text-gray-600">{contactInfo.address}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <PhoneIcon className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <div className="font-semibold">Phone</div>
                        <div className="text-gray-600">{contactInfo.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <MailIcon className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <div className="font-semibold">Email</div>
                        <div className="text-gray-600">{contactInfo.email}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <ClockIcon className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <div className="font-semibold">Business Hours</div>
                        <div className="text-gray-600">
                          {contactInfo.business_hours_monday_saturday}<br />
                          {contactInfo.business_hours_sunday}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekend Consultations</CardTitle>
                <CardDescription>
                  Schedule your carpet inspection and price quote for weekends
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  We offer weekend consultations for carpet inspection, price quotes, and repair estimates. 
                  Our experts will visit your location on Saturdays between 9:00 AM and 2:00 PM to assess 
                  your carpet&apos;s condition and provide detailed pricing information.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsConsultationModalOpen(true)} // Open modal
                >
                  Schedule Weekend Consultation
                </Button>

                {/* Weekend Consultation Modal */}
                <Dialog open={isConsultationModalOpen} onOpenChange={setIsConsultationModalOpen}>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Schedule Weekend Consultation</DialogTitle>
                      <DialogDescription>
                        Fill out the form below to request a consultation. We&apos;ll contact you to confirm.
                      </DialogDescription>
                    </DialogHeader>
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
                                      date < new Date(new Date().setHours(0,0,0,0)) // Disable past dates
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
                                  className="min-h-[100px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                         {consultationSubmitStatus && (
                          <div className={`p-3 rounded-md text-sm ${
                            consultationSubmitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {consultationSubmitStatus.message}
                          </div>
                        )}
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button type="submit" disabled={consultationForm.formState.isSubmitting}>
                            {consultationForm.formState.isSubmitting ? 'Submitting...' : 'Request Consultation'}
                          </Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// TODO: Implement WeekendConsultationModal component
// const WeekendConsultationModal = ({ isOpen, onClose, onSubmit }) => { ... }