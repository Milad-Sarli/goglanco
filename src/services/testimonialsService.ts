import axios from '@/lib/axios';

export interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
  user_id?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreateTestimonialData {
  name: string;
  text: string;
  rating: number;
}

export interface TestimonialsResponse {
  data: Testimonial[];
  status: number;
}

export interface TestimonialResponse {
  success: boolean;
  data: Testimonial;
  status: number;
}

export interface DeleteTestimonialResponse {
  success: boolean;
  status: number;
}

// Get all testimonials (public)
export const getAllTestimonials = async (): Promise<TestimonialsResponse> => {
  try {
    const response = await axios.get('/api/portfolio/testimonials');
    return response.data;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    throw error;
  }
};

// Create new testimonial (requires authentication)
export const createTestimonial = async (data: CreateTestimonialData): Promise<TestimonialResponse> => {
  try {
    const response = await axios.post('/api/portfolio/testimonials', data);
    return response.data;
  } catch (error) {
    console.error('Error creating testimonial:', error);
    throw error;
  }
};

// Get user's testimonials (requires authentication)
export const getUserTestimonials = async (): Promise<TestimonialsResponse> => {
  try {
    const response = await axios.get('/api/user/testimonials');
    return response.data;
  } catch (error) {
    console.error('Error fetching user testimonials:', error);
    throw error;
  }
};

// Delete testimonial (requires authentication)
export const deleteTestimonial = async (testimonialId: number): Promise<DeleteTestimonialResponse> => {
  try {
    const response = await axios.delete(`/api/portfolio/testimonials/${testimonialId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    throw error;
  }
};