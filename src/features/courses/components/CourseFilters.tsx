'use client';

/**
 * Componente CourseFilters
 * Panel de filtros con React Hook Form + Zod
 * Aplica principios de Clean Code y Separation of Concerns
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search, RotateCcw, X } from 'lucide-react';
import { useEffect } from 'react';
import { useCourseContext } from '@/context/CourseContext';
import type { CourseFilters } from '@/features/courses/types';
import { Button, Input, Select, Checkbox } from '@/shared/components';
import {
  TEACHING_LEVEL_OPTIONS,
  COURSE_TYPE_OPTIONS,
  FACULTY_OPTIONS,
  PROGRAM_OPTIONS,
} from '@/features/courses/constants';
import { filterSchema, type FilterFormData } from '@/features/courses/validation';

export function CourseFilters(): React.JSX.Element {
  const { filters, updateFilters, performSearch, clearSearch, isLoading, error, clearError } = useCourseContext();

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
  const watchedFaculty = watch('faculty');

  /**
   * Selecciona automáticamente el primer tipo de curso al cargar el componente
   */
  useEffect(() => {
    if (watchedCourseTypes.length === 0) {
      setValue('courseTypes', [COURSE_TYPE_OPTIONS[0].value]);
    }
  }, [setValue, watchedCourseTypes.length]);

  /**
   * Handler para submit del formulario
   */
  const onSubmit = async (data: FilterFormData): Promise<void> => {
    updateFilters(data as CourseFilters);
    await performSearch();
  };

  /**
   * Handler para limpiar filtros
   */
  const handleClearFilters = (): void => {
    reset();
    clearSearch();
    clearError();
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
   * Handler para cambios en radio buttons de tipos de curso
   */
  const handleCourseTypeChange = (value: string): void => {
    setValue('courseTypes', [value]);
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
              <div key={option.value} className="flex items-center">
                <input
                  type="radio"
                  id={`course-type-${option.value}`}
                  name="courseTypes"
                  value={option.value}
                  checked={watchedCourseTypes.includes(option.value)}
                  onChange={() => handleCourseTypeChange(option.value)}
                  className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500 focus:ring-2"
                />
                <label
                  htmlFor={`course-type-${option.value}`}
                  className="ml-3 text-sm font-medium text-gray-700 cursor-pointer select-none"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Mensaje de error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-red-600">{error}</p>
              <button
                type="button"
                onClick={clearError}
                className="text-red-400 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Botones de acción */}
        <div className="space-y-3">
          <Button 
            type="submit" 
            variant="danger" 
            size="sm" 
            fullWidth 
            icon={<Search className="h-4 w-4" />}
            disabled={!watchedFaculty || watchedFaculty === '' || isLoading}
          >
            {isLoading ? 'Buscando...' : 'Buscar'}
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

