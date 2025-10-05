import axios from '@/lib/axios';

export interface ConsultationRequest {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  preferred_date: string;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export const getUserConsultationRequests = async () => {
  try {
    const response = await axios.get('/api/user/consultation-requests');
    return {
      success: true,
      data: response.data.data as ConsultationRequest[]
    };
  } catch (error) {
    console.error('Error fetching user consultation requests:', error);
    return {
      success: false,
      error: 'Failed to fetch consultation requests'
    };
  }
};