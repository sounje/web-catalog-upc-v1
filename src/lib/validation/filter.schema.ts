/**
 * Esquemas de validación con Zod
 * Para validación de formularios de filtros
 */

import { z } from 'zod';

export const filterSchema = z.object({
  searchTerm: z.string(),
  teachingLevels: z.array(z.string()),
  faculty: z.string(),
  program: z.string(),
  courseTypes: z.array(z.string()),
});

export type FilterFormData = z.infer<typeof filterSchema>;

