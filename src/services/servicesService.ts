import axios from "@/lib/axios";

export interface ServiceItem {
  id?: number;
  title: string;
  description: string;
  icon: string;
  image: string;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

interface UploadResponse {
  url: string;
  filename: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://admin.goglanco.com/";

// Utility function to ensure URL has correct domain
const formatImageUrl = (url: string): string => {
  if (!url) return url;
  
  // If it's already an absolute URL (starts with http:// or https://)
  if (url.match(/^https?:\/\//)) {
    return url;
  }

  // If it starts with a slash, remove it
  const cleanPath = url.startsWith('/') ? url.slice(1) : url;
  
  // Join with API base URL, ensuring no double slashes
  return `${API_BASE_URL.replace(/\/$/, '')}/storage/${cleanPath}`;
};

export const servicesService = {
  // Get all services
  getServices: async (): Promise<ServiceItem[]> => {
    try {
      const response = await axios.get<ApiResponse<ServiceItem[]>>('/api/services');
      const services = response.data.data;
      
      // Format image URLs
      return services.map(service => ({
        ...service,
        image: formatImageUrl(service.image)
      }));
    } catch (error) {
      console.error('Failed to fetch services:', error);
      throw error;
    }
  },

  // Get a single service
  getService: async (id: number): Promise<ServiceItem> => {
    try {
      const response = await axios.get<ApiResponse<ServiceItem>>(`/api/services/${id}`);
      const service = response.data.data;
      
      return {
        ...service,
        image: formatImageUrl(service.image)
      };
    } catch (error) {
      console.error('Failed to fetch service:', error);
      throw error;
    }
  },

  // Create a new service
  createService: async (service: ServiceItem): Promise<ServiceItem> => {
    try {
      const response = await axios.post<ApiResponse<ServiceItem>>('/api/services', service);
      const newService = response.data.data;
      
      return {
        ...newService,
        image: formatImageUrl(newService.image)
      };
    } catch (error) {
      console.error('Failed to create service:', error);
      throw error;
    }
  },

  // Update a service
  updateService: async (id: number, service: ServiceItem): Promise<ServiceItem> => {
    try {
      const response = await axios.put<ApiResponse<ServiceItem>>(`/api/services/${id}`, service);
      const updatedService = response.data.data;
      
      return {
        ...updatedService,
        image: formatImageUrl(updatedService.image)
      };
    } catch (error) {
      console.error('Failed to update service:', error);
      throw error;
    }
  },

  // Delete a service
  deleteService: async (id: number): Promise<void> => {
    try {
      await axios.delete(`/api/services/${id}`);
    } catch (error) {
      console.error('Failed to delete service:', error);
      throw error;
    }
  },

  // Upload image for a service
  uploadImage: async (file: File): Promise<UploadResponse> => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post<ApiResponse<UploadResponse>>('/api/services/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const uploadResponse = response.data.data;
      
      return {
        ...uploadResponse,
        url: formatImageUrl(uploadResponse.url)
      };
    } catch (error) {
      console.error('Failed to upload image:', error);
      throw error;
    }
  },

  // Reorder services
  reorderServices: async (serviceIds: number[]): Promise<void> => {
    try {
      await axios.put('/api/services/reorder', { serviceIds });
    } catch (error) {
      console.error('Failed to reorder services:', error);
      throw error;
    }
  }
};

export default servicesService; 