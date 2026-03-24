'use client';

/**
 * Componente CourseFilters
 * Panel de filtros con React Hook Form + Zod
 * Aplica principios de Clean Code y Separation of Concerns
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search, RotateCcw, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { useCourseContext } from '@/context/CourseContext';
import type { CourseFilters, ApiFacultyResponse, ApiCareerResponse, TeachingLevel, CourseType } from '@/features/courses/types';
import { Button, Input, Select, Checkbox } from '@/shared/components';
import {
  TEACHING_LEVEL_OPTIONS,
  COURSE_TYPE_OPTIONS,
} from '@/features/courses/constants';
import { filterSchema, type FilterFormData } from '@/features/courses/validation';
import { getFaculties, getCareersByFaculty } from '@/features/courses/services';

export function CourseFilters(): React.JSX.Element {
  const auth = useAuth();
  const { updateFilters, performSearch, clearSearch, isLoading, error, clearError } = useCourseContext();

  // Estado local para opciones dinámicas de facultades y carreras
  const [facultyOptions, setFacultyOptions] = useState<ApiFacultyResponse[]>([]);
  const [careerOptions, setCareerOptions] = useState<ApiCareerResponse[]>([]);
  const [loadingFaculties, setLoadingFaculties] = useState(false);
  const [loadingCareers, setLoadingCareers] = useState(false);

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
  const watchedProgram = watch('program');
  const watchedSearchTerm = watch('searchTerm');

  /**
   * Carga las facultades al montar el componente
   */
  useEffect(() => {
    const loadFaculties = async () => {
      setLoadingFaculties(true);
      try {
        const faculties = await getFaculties({ idToken: auth.user?.id_token });
        setFacultyOptions(faculties);
      } catch {
      } finally {
        setLoadingFaculties(false);
      }
    };

    loadFaculties();
  }, [auth.user?.id_token]);

  /**
   * Carga las carreras cuando cambia la facultad seleccionada
   */
  useEffect(() => {
    const loadCareers = async () => {
      if (!watchedFaculty) {
        setCareerOptions([]);
        setValue('program', '');
        return;
      }

      setLoadingCareers(true);
      try {
        const careers = await getCareersByFaculty(watchedFaculty, { idToken: auth.user?.id_token });
        setCareerOptions(careers);
        // Limpiar el programa seleccionado al cambiar de facultad
        setValue('program', '');
      } catch {
        setCareerOptions([]);
      } finally {
        setLoadingCareers(false);
      }
    };

    loadCareers();
  }, [watchedFaculty, setValue, auth.user?.id_token]);

  /**
   * Handler para submit del formulario
   */
  const onSubmit = async (data: FilterFormData): Promise<void> => {
    // Convertir los datos del formulario a CourseFilters
    const searchFilters = data as CourseFilters;
    
    // Actualizar el estado del contexto
    updateFilters(searchFilters);
    
    // Realizar la búsqueda con los filtros actuales (sin esperar la actualización del estado)
    await performSearch(searchFilters);
  };

  /**
   * Handler para limpiar filtros
   */
  const handleClearFilters = (): void => {
    reset();
    setCareerOptions([]);
    clearSearch();
    clearError();
  };

  /**
   * Handler para cambios en checkboxes de niveles de enseñanza
   */
  const handleTeachingLevelChange = (value: TeachingLevel, checked: boolean): void => {
    const current = watchedTeachingLevels;
    const updated = checked ? [...current, value] : current.filter((v) => v !== value);
    setValue('teachingLevels', updated);
  };

  /**
   * Handler para cambios en tipos de curso (permite deseleccionar)
   * Permite seleccionar una opción o ninguna, pero no ambas
   */
  const handleCourseTypeChange = (value: CourseType): void => {
    const current = watchedCourseTypes;
    // Si el valor ya está seleccionado, deseleccionarlo (permitir ninguna opción)
    if (current.includes(value)) {
      setValue('courseTypes', []);
    } else {
      // Si no está seleccionado, seleccionar solo este valor
      setValue('courseTypes', [value]);
    }
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
                onChange={(e) => handleTeachingLevelChange(option.value as TeachingLevel, e.target.checked)}
              />
            ))}
          </div>
        </div>

        {/* Facultad */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Facultad</h3>
          <Select 
            {...register('faculty')} 
            options={[
              { value: '', label: loadingFaculties ? 'Cargando...' : 'Seleccionar...' },
              ...facultyOptions.map(faculty => ({
                value: faculty.id,
                label: faculty.name
              }))
            ]}
            disabled={loadingFaculties}
          />
        </div>

        {/* Programa */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Programa</h3>
          <Select 
            {...register('program')} 
            options={[
              { 
                value: '', 
                label: !watchedFaculty 
                  ? 'Selecciona una facultad primero' 
                  : loadingCareers 
                    ? 'Cargando...' 
                    : careerOptions.length === 0 
                      ? 'No hay programas disponibles'
                      : 'Seleccionar...' 
              },
              ...careerOptions.map(career => ({
                value: career.id,
                label: career.name
              }))
            ]}
            disabled={!watchedFaculty || loadingCareers}
          />
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
                  onChange={() => handleCourseTypeChange(option.value as CourseType)}
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
            disabled={isLoading || ((!watchedFaculty || !watchedProgram) && (!watchedSearchTerm || watchedSearchTerm.trim() === ''))}
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

