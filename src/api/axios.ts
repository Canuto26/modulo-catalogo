// En src/api/axios.ts - completamente tipado sin any
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import axios from 'axios';
import type { ApiErrorData } from '../types/ProductTypes';

const API_BASE_URL = 'http://127.0.0.1:8000';

const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

export class ApiService {
  private axiosInstance: AxiosInstance

  constructor(baseUrl: string = API_BASE_URL) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: defaultHeaders,
      timeout: 10000,
    })

    // Interceptor de request para debug
    this.axiosInstance.interceptors.request.use(
      (config) => {
        console.log('🚀 SENDING REQUEST:');
        console.log('URL:', config.baseURL + (config.url || ''));
        console.log('Method:', config.method?.toUpperCase());
        console.log('Data:', config.data);
        console.log('Headers:', config.headers);
        return config;
      },
      (error) => {
        console.error('❌ REQUEST ERROR:', error);
        return Promise.reject(error);
      }
    )

    // Interceptor de respuesta para debug
    this.axiosInstance.interceptors.response.use(
      (response) => {
        console.log('✅ RESPONSE SUCCESS:');
        console.log('Status:', response.status);
        console.log('Data:', response.data);
        return response;
      },
      (error: AxiosError<ApiErrorData>) => {
        console.log('❌ RESPONSE ERROR:');
        console.log('URL:', error.config?.url);
        console.log('Method:', error.config?.method?.toUpperCase());
        console.log('Status:', error.response?.status);
        console.log('Status Text:', error.response?.statusText);
        console.log('Data:', error.response?.data);
        
        const errorData = error.response?.data;
        const message =
          errorData?.detail ||
          errorData?.message ||
          errorData?.error ||
          `HTTP error! status: ${error.response?.status || 'unknown'}`;
        
        return Promise.reject(new Error(message));
      }
    )
  }

  async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.get(endpoint, config);
    return response.data;
  }

  async post<T, D>(endpoint: string, data: D, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(endpoint, data, config);
    return response.data;
  }

  async put<T, D>(endpoint: string, data: D, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.put(endpoint, data, config);
    return response.data;
  }

  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete(endpoint, config);
    return response.data;
  }
}