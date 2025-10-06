'use client';

/**
 * Componente CourseFilters
 * Panel de filtros con React Hook Form + Zod
 * Aplica principios de Clean Code y Separation of Concerns
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search, RotateCcw } from 'lucide-react';
import { useCourseContext } from '@/context/CourseContext';
import type { CourseFilters } from '@/lib/types/course.types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Checkbox } from '@/components/ui/Checkbox';
import {
  TEACHING_LEVEL_OPTIONS,
  COURSE_TYPE_OPTIONS,
  FACULTY_OPTIONS,
  PROGRAM_OPTIONS,
} from '@/lib/constants/courses.constants';
import { filterSchema, type FilterFormData } from '@/lib/validation/filter.schema';

export function CourseFilters(): React.JSX.Element {
  const { filters, updateFilters, performSearch, clearSearch } = useCourseContext();

  const { register, handleSubmit, watch, reset, setValue } = useForm<FilterFormData>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      searchTerm: '',
      teachingLevels: [],
      faculty: '',
      program: '',
      courseTypes: [],
    },
  });

  const watchedTeachingLevels = watch('teachingLevels');
  const watchedCourseTypes = watch('courseTypes');

  /**
   * Handler para submit del formulario
   */
  const onSubmit = (data: FilterFormData): void => {
    updateFilters(data as CourseFilters);
    performSearch();
  };

  /**
   * Handler para limpiar filtros
   */
  const handleClearFilters = (): void => {
    reset();
    clearSearch();
  };

  /**
   * Handler para cambios en checkboxes de niveles de enseñanza
   */
  const handleTeachingLevelChange = (value: string, checked: boolean): void => {
    const current = watchedTeachingLevels;
    const updated = checked ? [...current, value] : current.filter((v) => v !== value);
    setValue('teachingLevels', updated);
  };

  /**
   * Handler para cambios en checkboxes de tipos de curso
   */
  const handleCourseTypeChange = (value: string, checked: boolean): void => {
    const current = watchedCourseTypes;
    const updated = checked ? [...current, value] : current.filter((v) => v !== value);
    setValue('courseTypes', updated);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Filtros de Cursos</h2>
      <hr className="mb-6 border-gray-200" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Buscar Cursos */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Buscar Cursos</h3>
          <Input
            {...register('searchTerm')}
            type="text"
            placeholder="Ingresa el código o nombre del curso"
            icon={<Search className="h-5 w-5" />}
          />
        </div>

        {/* Nivel de Enseñanza */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Nivel de Enseñanza</h3>
          <div className="space-y-3">
            {TEACHING_LEVEL_OPTIONS.map((option) => (
              <Checkbox
                key={option.value}
                label={option.label}
                checked={watchedTeachingLevels.includes(option.value)}
                onChange={(e) => handleTeachingLevelChange(option.value, e.target.checked)}
              />
            ))}
          </div>
        </div>

        {/* Facultad */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Facultad</h3>
          <Select {...register('faculty')} options={FACULTY_OPTIONS} />
        </div>

        {/* Programa */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Programa</h3>
          <Select {...register('program')} options={PROGRAM_OPTIONS} />
        </div>

        {/* Tipo de Curso */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Tipo de Curso</h3>
          <div className="space-y-3">
            {COURSE_TYPE_OPTIONS.map((option) => (
              <Checkbox
                key={option.value}
                label={option.label}
                checked={watchedCourseTypes.includes(option.value)}
                onChange={(e) => handleCourseTypeChange(option.value, e.target.checked)}
              />
            ))}
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Botones de acción */}
        <div className="space-y-3">
          <Button type="submit" variant="danger" size="sm" fullWidth icon={<Search className="h-4 w-4" />}>
            Buscar
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            fullWidth
            onClick={handleClearFilters}
            icon={<RotateCcw className="h-4 w-4" />}
          >
            Limpiar Filtros
          </Button>
        </div>
      </form>
    </div>
  );
}

