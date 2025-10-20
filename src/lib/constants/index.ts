/**
 * Barrel export para constantes genéricas
 * Constantes que pueden ser reutilizadas en cualquier parte del proyecto
 */

// Configuración de la aplicación
export const APP_CONFIG = {
  NAME: 'Catálogo de Cursos UPC',
  VERSION: '1.0.0',
  DESCRIPTION: 'Sistema de catálogo de cursos de la Universidad Peruana de Ciencias Aplicadas',
} as const;

// Rutas de la aplicación
export const ROUTES = {
  HOME: '/',
  COURSES: '/courses',
  ABOUT: '/about',
  CONTACT: '/contact',
} as const;

// Configuración de API
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

// Configuración de paginación por defecto
export const DEFAULT_PAGINATION = {
  PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
  MAX_PAGE_SIZE: 100,
} as const;

// Mensajes genéricos
export const GENERIC_MESSAGES = {
  LOADING: 'Cargando...',
  ERROR: 'Ocurrió un error inesperado',
  SUCCESS: 'Operación exitosa',
  NO_DATA: 'No hay datos disponibles',
  SEARCH_PLACEHOLDER: 'Buscar...',
  SELECT_PLACEHOLDER: 'Seleccionar...',
} as const;

// Colores corporativos UPC
export const UPC_COLORS = {
  PRIMARY_RED: '#dc3545',
  DARK_RED: '#c82333',
  LIGHT_GRAY: '#f8f9fa',
  DARK_GRAY: '#343a40',
  WHITE: '#ffffff',
  BLACK: '#000000',
} as const;

// Configuración de validación
export const VALIDATION_CONFIG = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_TEXT_LENGTH: 255,
  MAX_DESCRIPTION_LENGTH: 1000,
} as const;
