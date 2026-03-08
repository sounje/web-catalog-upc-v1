/**
 * Mapper para convertir datos entre la API y los tipos internos
 * Siguiendo principios de Single Responsibility y Clean Code
 *  prueba
 */

import type { Course, CourseFilters } from '@/features/courses/types';
import type { 
  ApiCourseResponse, 
  ApiCourseFilter,
} from '@/features/courses/types';
import { 
  COURSE_TYPE_MAPPING,
} from '@/features/courses/types';

/**
 * Mapea los filtros del frontend al formato de la API
 * Nueva estructura: { name, facultad, programa, nivel, tipo }
 */
export function mapFiltersToApi(filters: CourseFilters): ApiCourseFilter {
  // Mapear nivel de enseñanza
  const nivel = mapTeachingLevelsToApi(filters.teachingLevels);
  
  // Mapear tipo de curso (radio button - solo uno seleccionado)
  const tipo = filters.courseTypes.length > 0 
    ? COURSE_TYPE_MAPPING[filters.courseTypes[0]] 
    : '';

  return {
    name: filters.searchTerm,
    facultad: filters.faculty || '',  // ID de la facultad seleccionada (GUID)
    programa: filters.program || '',  // ID del programa seleccionado (GUID)
    nivel: nivel,
    tipo: tipo,
  };
}

/**
 * Mapea los niveles de enseñanza seleccionados al formato de la API
 * - pregrado-epe → UAC
 * - pregrado-tradicional → UFC
 * - maestria → EMA
 * - Combinaciones: UAC-UFC, UAC-EMA, UFC-EMA, UAC-UFC-EMA
 * - Ninguno → ""
 */
function mapTeachingLevelsToApi(teachingLevels: string[]): string {
  const hasUAC = teachingLevels.includes('pregrado-tradicional');
  const hasUFC = teachingLevels.includes('pregrado-epe');
  const hasEMA = teachingLevels.includes('maestria');
  
  // Construir el string según las combinaciones seleccionadas
  const niveles: string[] = [];
  
  if (hasUAC) niveles.push('UAC');
  if (hasUFC) niveles.push('UFC');
  if (hasEMA) niveles.push('EMA');
  
  // Unir con guiones si hay múltiples niveles seleccionados
  return niveles.join('-');
}

/**
 * Mapea la respuesta de la API al formato interno
 * Actualizado según nueva estructura del backend
 */
export function mapApiResponseToCourse(apiCourse: ApiCourseResponse): Course {
  return {
    id: apiCourse.id, // Ahora la API proporciona el ID directamente
    code: apiCourse.code,
    name: apiCourse.course,
    program: apiCourse.career,
    credits: apiCourse.credits,
    faculty: apiCourse.faculty,
    direction: apiCourse.direction,
    description: apiCourse.incoming,
    achievement: apiCourse.graduate,
    prerequisites: apiCourse.requirement,
    nivel: apiCourse.nivel,
    courseType: mapCourseTypeFromApi(apiCourse.tipo),
    teachingLevel: mapTeachingLevelFromApi(apiCourse.faculty),
  };
}

/**
 * Mapea múltiples respuestas de la API
 */
export function mapApiResponseToCourses(apiCourses: ApiCourseResponse[]): Course[] {
  return apiCourses.map(mapApiResponseToCourse);
}

/**
 * Mapea el tipo de curso de la API al tipo interno
 * Actualizado para soportar mayúsculas
 */
function mapCourseTypeFromApi(apiType: string): 'obligatorio' | 'electivo' {
  const normalizedType = apiType.toUpperCase();
  
  const mapping: Record<string, 'obligatorio' | 'electivo'> = {
    'OBLIGATORIO': 'obligatorio',
    'ELECTIVO': 'electivo',
  };
  
  return mapping[normalizedType] || 'obligatorio';
}

/**
 * Mapea el nivel de enseñanza basado en la facultad
 * (Esto es una aproximación, idealmente la API debería devolver el nivel)
 */
function mapTeachingLevelFromApi(facultyName: string): 'pregrado-tradicional' | 'pregrado-epe' | 'maestria' {
  // Lógica simple basada en el nombre de la facultad
  if (facultyName.toLowerCase().includes('postgrado') || 
      facultyName.toLowerCase().includes('maestría') || 
      facultyName.toLowerCase().includes('maestria')) {
    return 'maestria';
  }
  
  if (facultyName.toLowerCase().includes('epe')) {
    return 'pregrado-epe';
  }
  
  // Por defecto, asumimos pregrado tradicional
  return 'pregrado-tradicional';
}

/**
 * Mapea un curso interno al formato de la API (para futuras funcionalidades)
 * Actualizado según nueva estructura del backend
 */
export function mapCourseToApi(course: Course): ApiCourseResponse {
  return {
    id: course.id,
    code: course.code,
    course: course.name,
    career: course.program,
    credits: course.credits,
    faculty: course.faculty,
    tipo: mapCourseTypeToApi(course.courseType),
    nivel: course.nivel,
    incoming: course.description || 'N/A',
    graduate: course.achievement || 'N/A',
    requirement: course.prerequisites || 'N/A',
    direction: course.direction,
  };
}

/**
 * Mapea el tipo de curso interno al formato de la API
 * Actualizado para generar mayúsculas
 */
function mapCourseTypeToApi(courseType: 'obligatorio' | 'electivo'): string {
  const mapping: Record<'obligatorio' | 'electivo', string> = {
    'obligatorio': 'OBLIGATORIO',
    'electivo': 'ELECTIVO',
  };
  
  return mapping[courseType];
}
