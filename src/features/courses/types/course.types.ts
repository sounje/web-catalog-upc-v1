/**
 * Tipos y interfaces para el sistema de catálogo de cursos UPC
 * Siguiendo principios de Clean Code y TypeScript estricto
 */

/**
 * Representa un curso en el catálogo académico
 */
export interface Course {
  id: string;
  code: string;
  name: string;
  program: string;
  credits: number;
  faculty: string;
  direction: string;
  description?: string;
  achievement?: string;
  prerequisites?: string;
  courseType: CourseType;
  nivel: string;
  teachingLevel: TeachingLevel;
}

/**
 * Tipos de curso disponibles
 */
export type CourseType = 'obligatorio' | 'electivo';

/**
 * Niveles de enseñanza
 */
export type TeachingLevel = 'pregrado-tradicional' | 'pregrado-epe' | 'maestria';

/**
 * Filtros aplicables a la búsqueda de cursos
 */
export interface CourseFilters {
  searchTerm: string;
  teachingLevels: TeachingLevel[];
  faculty: string;
  program: string;
  courseTypes: CourseType[];
}

/**
 * Estado del modal de curso
 */
export interface CourseModalState {
  isOpen: boolean;
  course: Course | null;
}

/**
 * Props comunes para componentes de formulario
 */
export interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
}

/**
 * Re-exportar tipos de API para uso interno
 */
export type { 
  ApiCourseResponse, 
  ApiCourseFilter, 
  ApiCourseRequest,
  ApiFacultyResponse,
  ApiCareerResponse
} from './api.types';

