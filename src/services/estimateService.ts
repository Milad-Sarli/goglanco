import axios from '@/lib/axios';

export interface EstimateData {
  fullname: string;
  address: string;
  phone: string;
  email?: string;
  description: string;
}

export interface EstimateResponse {
  message: string;
  data: {
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

/**
 * ارسال درخواست تخمین به API
 * @param estimateData اطلاعات فرم تخمین
 * @returns پاسخ API در صورت موفقیت
 */
export async function submitEstimate(estimateData: EstimateData): Promise<EstimateResponse> {
  try {
    console.log('Sending estimate data:', estimateData);
    const response = await axios.post('/api/estimates', estimateData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    console.log('Response received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error details:', error);

    if (axios.isAxiosError(error) && error.response) {
      console.error('Response error:', error.response.status, error.response.data);
      throw error.response.data || { message: `Error ${error.response.status}: Server error` };
    }

    if (axios.isAxiosError(error) && error.request) {
      console.error('Request error - no response received');
      throw { message: 'No response from server. Please check your connection.' };
    }

    throw { message: error instanceof Error ? error.message : 'خطا در ارسال درخواست' };
  }
}