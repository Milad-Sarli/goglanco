import axios from '@/lib/axios';

export interface EstimateData {
  fullname: string;
  address: string;
  phone: string;
  email?: string;
  description: string;
}

export interface EstimateResponse {
  success: boolean;
  message: string;
  data?: {
    id: number;
    fullname: string;
    address: string;
    phone: string;
    email: string;
    description: string;
    created_at: string;
    updated_at: string;
  };
}

export interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

export async function submitEstimate(estimateData: EstimateData): Promise<EstimateResponse> {
  try {
    const response = await axios.post('/api/estimates', estimateData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    return { success: true, ...response.data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data || { message: `Server error (${error.response.status})`, errors: {} };
    }

    if (axios.isAxiosError(error) && error.request) {
      throw { message: 'No response from server. Please check your connection.', errors: {} };
    }

    throw { message: 'Failed to submit estimate. Please try again.', errors: {} };
  }
}