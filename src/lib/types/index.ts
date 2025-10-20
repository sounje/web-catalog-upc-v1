/**
 * Barrel export para tipos genéricos
 * Tipos que pueden ser reutilizados en cualquier parte del proyecto
 */

// Tipos para respuestas de API genéricas
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  count?: number;
}

// Tipos para paginación
export interface PaginationParams {
  page: number;
  limit: number;
  total?: number;
  totalPages?: number;
}

// Tipos para filtros genéricos
export interface BaseFilter {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Tipos para opciones de formulario
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// Tipos para estados de carga
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Tipos para modales
export interface ModalState<T = any> {
  isOpen: boolean;
  data: T | null;
}

// Tipos para formularios
export interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  helperText?: string;
}
