'use client';

/**
 * Context API para el estado global de cursos
 * Gestiona filtros, modal y datos de cursos
 * Siguiendo principios de Separation of Concerns
 */

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { useAuth } from 'react-oidc-context';
import type { Course, CourseFilters, CourseModalState } from '@/features/courses/types';
import { searchCourses } from '@/features/courses/services';

interface CourseContextValue {
  // Estado
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
  const auth = useAuth();
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
      
      // Llamar a la API con id_token para autorización
      const results = await searchCourses(filtersToUse, { idToken: auth.user?.id_token });
      setFilteredCourses(results);
      setIsSearchActive(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al buscar cursos. Por favor, intenta nuevamente.');
      
      // Limpiar resultados en caso de error
      setFilteredCourses([]);
      setIsSearchActive(false);
    } finally {
      setIsLoading(false);
    }
  }, [filters, auth.user?.id_token]);

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

