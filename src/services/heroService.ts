import axios from "@/lib/axios";
import { AxiosError } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://admin.goglanco.com/";

// Utility function to get error message from server response
const getErrorMessage = (error: any): string => {
  if (error instanceof AxiosError) {
    // Get the error message from the response if it exists
    const serverMessage = error.response?.data?.message;
    if (serverMessage) return serverMessage;
    
    // If no server message, return the error status text
    if (error.response?.statusText) {
      return `Error: ${error.response.statusText}`;
    }
  }
  
  // Fallback error message
  return error?.message || "An unexpected error occurred";
};

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
  return `${API_BASE_URL.replace(/\/$/, '')}/${cleanPath}`;
};

export interface HeroData {
  title: string;
  subtitle: string;
  mainImage: string;
  backgroundImages: string[];
  stats: {
    rugsRestored: number;
    yearsExperience: number;
    satisfactionRate: number;
  };
}

interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

interface UploadResponse {
  url: string;
  filename: string;
}

export const heroService = {
  // Get hero section data
  getHeroData: async (): Promise<HeroData> => {
    try {
      const response = await axios.get<ApiResponse<HeroData>>('/api/hero');
      const data = response.data.data;
      
      // Format all image URLs
      return {
        ...data,
        mainImage: formatImageUrl(data.mainImage),
        backgroundImages: data.backgroundImages.map(formatImageUrl)
      };
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Update hero section data
  updateHeroData: async (data: HeroData): Promise<HeroData> => {
    try {
      const response = await axios.put<ApiResponse<HeroData>>('/api/hero', data);
      const responseData = response.data.data;
      
      // Format all image URLs in the response
      return {
        ...responseData,
        mainImage: formatImageUrl(responseData.mainImage),
        backgroundImages: responseData.backgroundImages.map(formatImageUrl)
      };
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Upload image
  uploadImage: async (file: File): Promise<UploadResponse> => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post<ApiResponse<UploadResponse>>('/api/hero/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const uploadResponse = response.data.data;
      
      // Format the uploaded image URL
      return {
        ...uploadResponse,
        url: formatImageUrl(uploadResponse.url)
      };
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }
};

export default heroService; 