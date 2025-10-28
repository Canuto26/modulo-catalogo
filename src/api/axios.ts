import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios';

//constante para la URL base de la API
const API_BASE_URL = 'http://127.0.0.1:8000/';

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
    })

    // Interceptor de respuesta para manejo global de errores
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const message =
          error.response?.data?.message ||
          `HTTP error! status: ${error.response?.status || 'unknown'}`
        return Promise.reject(new Error(message));
      }
    )
  }

  //Método GET
  async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.get(endpoint, config)
    return response.data;
  }


  //Método POST
  async post<T, D = Partial<T>>(endpoint: string, data: D, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(endpoint, data, config)
    return response.data;
  }


  //Método PUT
  async put<T, D = Partial<T>>(endpoint: string, data: D, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.put(endpoint, data, config)
    return response.data;
  }


    //Método DELETE
  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete(endpoint, config)
    return response.data;
  }

}
