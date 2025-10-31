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
    'maestria': 'Maestría',
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
 * Exporta cursos a un archivo Excel con todos los campos
 * @param courses - Array de cursos a exportar
 * @param filename - Nombre del archivo sin extensión
 */
export function exportToCSV(courses: Course[], filename: string): void {
  // Importación dinámica para evitar problemas con SSR
  import('xlsx').then((XLSX) => {
    try {
      // Mapear los datos del curso al formato deseado para el Excel
      const excelData = courses.map((course) => ({
        'Código': course.code,
        'Curso': course.name,
        'Programa': course.program,
        'Créditos': course.credits,
        'Facultad': course.faculty,
        'Tipo de Curso': getCourseTypeLabel(course.courseType),
        'Nivel de Enseñanza': getTeachingLevelLabel(course.teachingLevel),
        'Descripción del Curso': course.description || 'N/A',
        'Logro del Curso': course.achievement || 'N/A',
        'Pre Requisito del Curso': course.prerequisites || 'N/A',
      }));

      // Crear el libro de trabajo (workbook)
      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Cursos UPC');

      // Ajustar el ancho de las columnas automáticamente
      const columnWidths = [
        { wch: 12 },  // Código
        { wch: 40 },  // Curso
        { wch: 30 },  // Programa
        { wch: 10 },  // Créditos
        { wch: 35 },  // Facultad
        { wch: 15 },  // Tipo de Curso
        { wch: 20 },  // Nivel de Enseñanza
        { wch: 60 },  // Descripción del Curso
        { wch: 60 },  // Logro del Curso
        { wch: 40 },  // Pre Requisito del Curso
      ];
      worksheet['!cols'] = columnWidths;

      // Generar el archivo Excel
      XLSX.writeFile(workbook, `${filename}.xlsx`);

      console.log(`✅ Exportados ${courses.length} cursos a ${filename}.xlsx`);
    } catch (error) {
      console.error('Error al exportar a Excel:', error);
      alert('Ocurrió un error al exportar el archivo. Por favor, intenta nuevamente.');
    }
  }).catch((error) => {
    console.error('Error al cargar la librería XLSX:', error);
    alert('Error al cargar el módulo de exportación. Por favor, recarga la página.');
  });
}

