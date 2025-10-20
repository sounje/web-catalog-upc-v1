/**
 * Funciones de utilidad para el manejo de cursos
 * Siguiendo principios de Clean Code: funciones pequeñas y específicas
 */

import type { Course, CourseFilters } from '@/features/courses/types';

/**
 * Filtra cursos basándose en los criterios especificados
 * @param courses - Array de cursos a filtrar
 * @param filters - Filtros aplicables
 * @returns Array de cursos filtrados
 */
export function filterCourses(courses: Course[], filters: CourseFilters): Course[] {
  return courses.filter((course) => {
    // Filtro por término de búsqueda
    const matchesSearch = matchesSearchTerm(course, filters.searchTerm);
    
    // Filtro por nivel de enseñanza
    const matchesTeachingLevel = matchesTeachingLevels(course, filters.teachingLevels);
    
    // Filtro por facultad
    const matchesFaculty = matchesFacultyFilter(course, filters.faculty);
    
    // Filtro por programa
    const matchesProgram = matchesProgramFilter(course, filters.program);
    
    // Filtro por tipo de curso
    const matchesCourseType = matchesCourseTypes(course, filters.courseTypes);

    return matchesSearch && matchesTeachingLevel && matchesFaculty && matchesProgram && matchesCourseType;
  });
}

/**
 * Verifica si un curso coincide con el término de búsqueda
 */
function matchesSearchTerm(course: Course, searchTerm: string): boolean {
  if (!searchTerm.trim()) return true;
  
  const term = searchTerm.toLowerCase();
  return (
    course.code.toLowerCase().includes(term) ||
    course.name.toLowerCase().includes(term) ||
    course.program.toLowerCase().includes(term)
  );
}

/**
 * Verifica si un curso coincide con los niveles de enseñanza seleccionados
 */
function matchesTeachingLevels(course: Course, levels: string[]): boolean {
  if (levels.length === 0) return true;
  return levels.includes(course.teachingLevel);
}

/**
 * Verifica si un curso coincide con la facultad seleccionada
 */
function matchesFacultyFilter(course: Course, faculty: string): boolean {
  if (!faculty) return true;
  return course.faculty === faculty;
}

/**
 * Verifica si un curso coincide con el programa seleccionado
 */
function matchesProgramFilter(course: Course, program: string): boolean {
  if (!program) return true;
  return course.program === program;
}

/**
 * Verifica si un curso coincide con los tipos de curso seleccionados
 */
function matchesCourseTypes(course: Course, types: string[]): boolean {
  if (types.length === 0) return true;
  return types.includes(course.courseType);
}

/**
 * Función helper para combinar clases de Tailwind CSS
 * Útil para estilos condicionales
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Formatea el número de créditos para display
 */
export function formatCredits(credits: number): string {
  return `${credits} ${credits === 1 ? 'crédito' : 'créditos'}`;
}

/**
 * Obtiene el label del nivel de enseñanza
 */
export function getTeachingLevelLabel(level: string): string {
  const labels: Record<string, string> = {
    'pregrado-tradicional': 'Pregrado Tradicional',
    'pregrado-epe': 'Pregrado EPE',
    'postgrado': 'Postgrado',
  };
  return labels[level] || level;
}

/**
 * Obtiene el label del tipo de curso
 */
export function getCourseTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    'obligatorio': 'Obligatorio',
    'electivo': 'Electivo',
  };
  return labels[type] || type;
}

/**
 * Genera un ID único para elementos
 */
export function generateId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Exporta datos a CSV (simulado - para futura implementación)
 */
export function exportToCSV(courses: Course[], filename: string): void {
  // TODO: Implementar exportación real cuando se requiera
  console.log(`Exportando ${courses.length} cursos a ${filename}.csv`);
  alert(`Se exportarían ${courses.length} cursos. Funcionalidad pendiente de implementar.`);
}

