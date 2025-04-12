import axios from "@/lib/axios";

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  description: string;
  tags: string[];
  created_at?: string;
  updated_at?: string;
}

export type CreatePortfolioItemData = Omit<PortfolioItem, "id" | "created_at" | "updated_at">;
export type UpdatePortfolioItemData = Partial<CreatePortfolioItemData>;

interface ApiResponse<T> {
  data?: T;
  message?: string;
  status?: number;
}

class PortfolioService {
  private readonly baseUrl = "/api/portfolio";

  async fetchPortfolioItems(): Promise<PortfolioItem[]> {
    const response = await axios.get<ApiResponse<PortfolioItem[]>>(this.baseUrl);
    // If the API returns data wrapped in a data property, unwrap it
    return response.data.data || [];
  }

  async createPortfolioItem(item: CreatePortfolioItemData): Promise<PortfolioItem> {
    const response = await axios.post<ApiResponse<PortfolioItem>>(this.baseUrl, item);
    if (!response.data.data) {
      throw new Error("Failed to create portfolio item");
    }
    return response.data.data;
  }

  async updatePortfolioItem(id: number, item: UpdatePortfolioItemData): Promise<PortfolioItem> {
    const response = await axios.put<ApiResponse<PortfolioItem>>(`${this.baseUrl}/${id}`, item);
    if (!response.data.data) {
      throw new Error("Failed to update portfolio item");
    }
    return response.data.data;
  }

  async deletePortfolioItem(id: number): Promise<void> {
    await axios.delete(`${this.baseUrl}/${id}`);
  }

  async getPortfolioItem(id: number): Promise<PortfolioItem> {
    const response = await axios.get<ApiResponse<PortfolioItem>>(`${this.baseUrl}/${id}`);
    if (!response.data.data) {
      throw new Error("Portfolio item not found");
    }
    return response.data.data;
  }
}

// Export a singleton instance
export const portfolioService = new PortfolioService(); 