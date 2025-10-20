/**
 * Mapper para convertir datos entre la API y los tipos internos
 * Siguiendo principios de Single Responsibility y Clean Code
 */

import type { Course, CourseFilters } from '@/features/courses/types';
import type { 
  ApiCourseResponse, 
  ApiCourseFilter,
  TEACHING_LEVEL_MAPPING,
  COURSE_TYPE_MAPPING,
  COURSE_TYPE_REVERSE_MAPPING,
  TEACHING_LEVEL_REVERSE_MAPPING
} from '@/features/courses/types';

/**
 * Mapea los filtros del frontend al formato de la API
 */
export function mapFiltersToApi(filters: CourseFilters): ApiCourseFilter {
  // Mapear niveles de enseñanza
  const levelOfEducation = {
    PregradoTraditional: filters.teachingLevels.includes('pregrado-tradicional'),
    PregradoEpe: filters.teachingLevels.includes('pregrado-epe'),
    mastery: filters.teachingLevels.includes('postgrado'),
  };

  // Mapear tipos de curso
  const typeCourse = {
    mandatory: filters.courseTypes.includes('obligatorio'),
    elective: filters.courseTypes.includes('electivo'),
  };

  return {
    nameCuse: filters.searchTerm,
    LevelOfEducation: levelOfEducation,
    Faculty: filters.faculty,
    program: filters.program,
    TypeCurtse: typeCourse,
  };
}

/**
 * Mapea la respuesta de la API al formato interno
 */
export function mapApiResponseToCourse(apiCourse: ApiCourseResponse): Course {
  return {
    id: generateCourseId(apiCourse.curseCode),
    code: apiCourse.curseCode,
    name: apiCourse.curseName,
    program: apiCourse.careerName,
    credits: apiCourse.credit,
    faculty: apiCourse.facultyName,
    description: apiCourse.carrerCourseDescription,
    achievement: apiCourse.graduateProfile,
    prerequisites: apiCourse.requirement,
    courseType: mapCourseTypeFromApi(apiCourse.courseTypeName),
    teachingLevel: mapTeachingLevelFromApi(apiCourse.facultyName),
  };
}

/**
 * Mapea múltiples respuestas de la API
 */
export function mapApiResponseToCourses(apiCourses: ApiCourseResponse[]): Course[] {
  return apiCourses.map(mapApiResponseToCourse);
}

/**
 * Genera un ID único para el curso
 */
function generateCourseId(code: string): string {
  return `course-${code.toLowerCase().replace(/\s+/g, '-')}`;
}

/**
 * Mapea el tipo de curso de la API al tipo interno
 */
function mapCourseTypeFromApi(apiType: string): 'obligatorio' | 'electivo' {
  const mapping: Record<string, 'obligatorio' | 'electivo'> = {
    'Obligatorio': 'obligatorio',
    'Electivo': 'electivo',
  };
  
  return mapping[apiType] || 'obligatorio';
}

/**
 * Mapea el nivel de enseñanza basado en la facultad
 * (Esto es una aproximación, idealmente la API debería devolver el nivel)
 */
function mapTeachingLevelFromApi(facultyName: string): 'pregrado-tradicional' | 'pregrado-epe' | 'postgrado' {
  // Lógica simple basada en el nombre de la facultad
  if (facultyName.toLowerCase().includes('postgrado') || facultyName.toLowerCase().includes('maestría')) {
    return 'postgrado';
  }
  
  // Por defecto, asumimos pregrado tradicional
  return 'pregrado-tradicional';
}

/**
 * Mapea un curso interno al formato de la API (para futuras funcionalidades)
 */
export function mapCourseToApi(course: Course): ApiCourseResponse {
  return {
    curseCode: course.code,
    curseName: course.name,
    careerName: course.program,
    facultyName: course.faculty,
    credit: course.credits,
    courseTypeName: mapCourseTypeToApi(course.courseType),
    carrerCourseDescription: course.description,
    graduateProfile: course.achievement,
    requirement: course.prerequisites,
  };
}

/**
 * Mapea el tipo de curso interno al formato de la API
 */
function mapCourseTypeToApi(courseType: 'obligatorio' | 'electivo'): string {
  const mapping: Record<'obligatorio' | 'electivo', string> = {
    'obligatorio': 'Obligatorio',
    'electivo': 'Electivo',
  };
  
  return mapping[courseType];
}
