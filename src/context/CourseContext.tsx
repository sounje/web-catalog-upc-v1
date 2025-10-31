'use client';

/**
 * Context API para el estado global de cursos
 * Gestiona filtros, modal y datos de cursos
 * Siguiendo principios de Separation of Concerns
 */

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Course, CourseFilters, CourseModalState } from '@/features/courses/types';
import { filterCourses } from '@/features/courses/utils';
import { MOCK_COURSES } from '@/data/mock-courses';
import { searchCourses } from '@/features/courses/services';

interface CourseContextValue {
  // Estado
  allCourses: Course[];
  filteredCourses: Course[];
  filters: CourseFilters;
  modalState: CourseModalState;
  isSearchActive: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Acciones
  updateFilters: (newFilters: Partial<CourseFilters>) => void;
  resetFilters: () => void;
  performSearch: (searchFilters?: CourseFilters) => Promise<void>;
  openModal: (course: Course) => void;
  closeModal: () => void;
  clearSearch: () => void;
  clearError: () => void;
}

const CourseContext = createContext<CourseContextValue | undefined>(undefined);

const INITIAL_FILTERS: CourseFilters = {
  searchTerm: '',
  teachingLevels: [],
  faculty: '',
  program: '',
  courseTypes: [],
};

interface CourseProviderProps {
  children: ReactNode;
}

export function CourseProvider({ children }: CourseProviderProps): React.JSX.Element {
  const [allCourses] = useState<Course[]>(MOCK_COURSES);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [filters, setFilters] = useState<CourseFilters>(INITIAL_FILTERS);
  const [modalState, setModalState] = useState<CourseModalState>({
    isOpen: false,
    course: null,
  });
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Actualiza los filtros parcialmente
   */
  const updateFilters = useCallback((newFilters: Partial<CourseFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  /**
   * Resetea todos los filtros a sus valores iniciales
   */
  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    setFilteredCourses([]);
    setIsSearchActive(false);
  }, []);

  /**
   * Ejecuta la búsqueda aplicando los filtros proporcionados o los actuales
   * @param searchFilters - Filtros a aplicar (opcional, usa el estado actual si no se proporciona)
   */
  const performSearch = useCallback(async (searchFilters?: CourseFilters) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Usar los filtros proporcionados o los del estado
      const filtersToUse = searchFilters || filters;
      
      // Usar la API real en lugar de datos mockeados
      const results = await searchCourses(filtersToUse);
      setFilteredCourses(results);
      setIsSearchActive(true);
    } catch (err) {
      console.error('Error en performSearch:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
      
      // Fallback a datos mockeados en caso de error
      const filtersToUse = searchFilters || filters;
      const fallbackResults = filterCourses(allCourses, filtersToUse);
      setFilteredCourses(fallbackResults);
      setIsSearchActive(true);
    } finally {
      setIsLoading(false);
    }
  }, [filters, allCourses]);

  /**
   * Abre el modal con la información del curso
   */
  const openModal = useCallback((course: Course) => {
    setModalState({
      isOpen: true,
      course,
    });
  }, []);

  /**
   * Cierra el modal
   */
  const closeModal = useCallback(() => {
    setModalState({
      isOpen: false,
      course: null,
    });
  }, []);

  /**
   * Limpia la búsqueda y vuelve al estado inicial
   */
  const clearSearch = useCallback(() => {
    resetFilters();
    setError(null);
  }, [resetFilters]);

  /**
   * Limpia el error actual
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: CourseContextValue = {
    allCourses,
    filteredCourses,
    filters,
    modalState,
    isSearchActive,
    isLoading,
    error,
    updateFilters,
    resetFilters,
    performSearch,
    openModal,
    closeModal,
    clearSearch,
    clearError,
  };

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
}

/**
 * Hook para usar el contexto de cursos
 * Lanza error si se usa fuera del provider
 */
export function useCourseContext(): CourseContextValue {
  const context = useContext(CourseContext);
  
  if (context === undefined) {
    throw new Error('useCourseContext must be used within a CourseProvider');
  }
  
  return context;
}

