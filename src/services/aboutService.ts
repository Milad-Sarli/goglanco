import axios from "@/lib/axios";

export interface AboutPageData {
  hero: {
    title: string;
    subtitle: string;
    image: string;
  };
  story: {
    items: Array<{
      title: string;
      year: string;
      content: string;
    }>;
  };
  values: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  timeline: Array<{
    year: string;
    title: string;
    description: string;
  }>;
  team: Array<{
    name: string;
    role: string;
    bio: string;
    image: string;
  }>;
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
  if (!url) return '';
  
  try {
    // If it's already an absolute URL (starts with http:// or https://)
    if (url.match(/^https?:\/\//)) {
      return url;
    }

    // In development, return the relative path
    if (process.env.NODE_ENV === 'development') {
      return url.startsWith('/') ? url : `/${url}`;
    }

    // For production, use the full API URL
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://admin.goglanco.com";
    const cleanBaseUrl = baseUrl.replace(/\/$/, '');
    const cleanPath = url.startsWith('/') ? url.slice(1) : url;
    
    return `${cleanBaseUrl}/${cleanPath}`;
  } catch (error) {
    console.error('Error formatting image URL:', error);
    return '';
  }
};

export const aboutService = {
  // Get about page data
  getAboutData: async (): Promise<AboutPageData> => {
    try {
      const response = await axios.get<ApiResponse<AboutPageData>>('/api/about');
      const data = response.data.data;

      // Ensure we have valid data structure with defaults
      return {
        hero: {
          title: data?.hero?.title || '',
          subtitle: data?.hero?.subtitle || '',
          image: formatImageUrl(data?.hero?.image || '')
        },
        story: {
          items: (data?.story?.items || []).map(item => ({
            title: item?.title || '',
            year: item?.year || '',
            content: item?.content || ''
          }))
        },
        values: (data?.values || []).map(value => ({
          title: value?.title || '',
          description: value?.description || '',
          icon: value?.icon || ''
        })),
        timeline: (data?.timeline || []).map(item => ({
          year: item?.year || '',
          title: item?.title || '',
          description: item?.description || ''
        })),
        team: (data?.team || []).map(member => ({
          name: member?.name || '',
          role: member?.role || '',
          bio: member?.bio || '',
          image: formatImageUrl(member?.image || '')
        }))
      };
    } catch (error) {
      console.error('Failed to fetch about page data:', error);
      // Return default data structure
      return {
        hero: {
          title: '',
          subtitle: '',
          image: ''
        },
        story: { items: [] },
        values: [],
        timeline: [],
        team: []
      };
    }
  },

  // Update about page data
  updateAboutData: async (data: AboutPageData): Promise<AboutPageData> => {
    try {
      const response = await axios.put<ApiResponse<AboutPageData>>('/api/about', data);
      const responseData = response.data.data;
      
      // Format image URLs in response
      return {
        ...responseData,
        hero: {
          ...responseData.hero,
          image: formatImageUrl(responseData.hero.image)
        },
        team: responseData.team.map(member => ({
          ...member,
          image: formatImageUrl(member.image)
        }))
      };
    } catch (error) {
      console.error('Failed to update about page data:', error);
      throw error;
    }
  },

  // Upload image
  uploadImage: async (file: File, section: 'hero' | 'team'): Promise<UploadResponse> => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('section', section);

      const response = await axios.post<ApiResponse<UploadResponse>>('/api/about/upload-image', formData, {
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
  }
};

export default aboutService; 