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
  description?: string;
  achievement?: string;
  prerequisites?: string;
  courseType: CourseType;
  teachingLevel: TeachingLevel;
}

/**
 * Tipos de curso disponibles
 */
export type CourseType = 'obligatorio' | 'electivo';

/**
 * Niveles de enseñanza
 */
export type TeachingLevel = 'pregrado-tradicional' | 'pregrado-epe' | 'postgrado';

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
 * Opciones de facultad
 */
export interface FacultyOption {
  value: string;
  label: string;
}

/**
 * Opciones de programa
 */
export interface ProgramOption {
  value: string;
  label: string;
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

