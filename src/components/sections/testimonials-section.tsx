'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { motion } from "motion/react";
import { StarIcon, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getAllTestimonials, createTestimonial, Testimonial, CreateTestimonialData } from "@/services/testimonialsService";
import { authService } from "@/services/authService";
 
export function TestimonialsSection() {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState<CreateTestimonialData>({
    name: '',
    text: '',
    rating: 5
  });

  // Check authentication status
  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  // Fetch testimonials on component mount
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await getAllTestimonials();
        if (response.data) {
          setTestimonials(response.data);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        toast.error('Failed to load testimonials');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Handle form submission
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please login to submit a review');
      router.push('/auth/login');
      return;
    }

    if (!formData.name.trim() || !formData.text.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await createTestimonial(formData);
      if (response.success && response.data) {
        toast.success('Review submitted successfully!');
        setTestimonials([response.data, ...testimonials]);
        setFormData({ name: '', text: '', rating: 5 });
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle login redirect
  const handleLoginRedirect = () => {
    router.push('/auth/login');
  };
  return (
    <section className="py-20 bg-muted dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4 text-foreground dark:text-white"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted-foreground dark:text-slate-300 text-lg"
          >
            Discover why our clients trust us with their most precious rugs and textiles
          </motion.p>
          
          {/* Add Review Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-6"
          >
            {!isAuthenticated ? (
              <Button
                onClick={handleLoginRedirect}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Plus className="w-4 h-4 mr-2" />
                Login to Add Review
              </Button>
            ) : (
              <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your Review
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-center">Share Your Experience</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="rating">Rating</Label>
                      <Select
                        value={formData.rating.toString()}
                        onValueChange={(value) => setFormData({ ...formData, rating: parseInt(value) })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 Stars - Excellent</SelectItem>
                          <SelectItem value="4">4 Stars - Very Good</SelectItem>
                          <SelectItem value="3">3 Stars - Good</SelectItem>
                          <SelectItem value="2">2 Stars - Fair</SelectItem>
                          <SelectItem value="1">1 Star - Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="review">Your Review</Label>
                      <Textarea
                        id="review"
                        value={formData.text}
                        onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                        placeholder="Share your experience with our services..."
                        rows={4}
                        required
                      />
                    </div>
                    
                    <DialogFooter className="flex flex-col sm:flex-row gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowModal(false)}
                        disabled={isSubmitting}
                        className="w-full sm:w-auto"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          'Submit Review'
                        )}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </motion.div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          /* Testimonials Carousel */
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.id || index} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-1"
                  >
                    <Card className="bg-card dark:bg-slate-800">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <Avatar>
                            <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold text-foreground dark:text-white">{testimonial.name}</div>
                            <div className="text-sm text-muted-foreground dark:text-slate-400">Customer</div>
                          </div>
                        </div>
                        <div className="flex gap-0.5 mb-4">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <StarIcon key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-muted-foreground dark:text-slate-300">{testimonial.text}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>
    </section>
  );
}