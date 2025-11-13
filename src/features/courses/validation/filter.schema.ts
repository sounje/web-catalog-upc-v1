/**
 * Esquemas de validación con Zod
 * Para validación de formularios de filtros
 */

import { z } from 'zod';

// Valores válidos para niveles de enseñanza
const teachingLevelEnum = z.enum(['pregrado-tradicional', 'pregrado-epe', 'maestria']);

// Valores válidos para tipos de curso
const courseTypeEnum = z.enum(['obligatorio', 'electivo']);

export const filterSchema = z.object({
  searchTerm: z.string(),
  teachingLevels: z.array(teachingLevelEnum),
  faculty: z.string(),
  program: z.string(),
  courseTypes: z.array(courseTypeEnum),
});

export type FilterFormData = z.infer<typeof filterSchema>;

