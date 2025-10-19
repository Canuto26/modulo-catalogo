// Configuración base de la API
const API_BASE_URL = 'http://localhost:8000/api'; // URL del backend Django

// Configuración por defecto para fetch
const defaultHeaders = {
  'Content-Type': 'application/json',
};

// Función helper para manejar respuestas de la API
async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

// Clase base para servicios API
export class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // Método GET genérico
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'GET',
      headers: defaultHeaders,
    });
    return handleApiResponse<T>(response);
  }

  // Método POST genérico
  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(data),
    });
    return handleApiResponse<T>(response);
  }

  // Método PUT genérico
  async put<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: defaultHeaders,
      body: JSON.stringify(data),
    });
    return handleApiResponse<T>(response);
  }

  // Método DELETE genérico
  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: defaultHeaders,
    });
    return handleApiResponse<T>(response);
  }
}
