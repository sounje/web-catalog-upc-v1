'use client';

/**
 * Context API para el estado global de cursos
 * Gestiona filtros, modal y datos de cursos
 * Siguiendo principios de Separation of Concerns
 */

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Course, CourseFilters, CourseModalState } from '@/lib/types/course.types';
import { filterCourses } from '@/lib/utils/course.utils';
import { MOCK_COURSES } from '@/data/mock-courses';

interface CourseContextValue {
  // Estado
  allCourses: Course[];
  filteredCourses: Course[];
  filters: CourseFilters;
  modalState: CourseModalState;
  isSearchActive: boolean;
  
  // Acciones
  updateFilters: (newFilters: Partial<CourseFilters>) => void;
  resetFilters: () => void;
  performSearch: () => void;
  openModal: (course: Course) => void;
  closeModal: () => void;
  clearSearch: () => void;
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
   * Ejecuta la búsqueda aplicando los filtros actuales
   */
  const performSearch = useCallback(() => {
    const results = filterCourses(allCourses, filters);
    setFilteredCourses(results);
    setIsSearchActive(true);
  }, [allCourses, filters]);

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
  }, [resetFilters]);

  const value: CourseContextValue = {
    allCourses,
    filteredCourses,
    filters,
    modalState,
    isSearchActive,
    updateFilters,
    resetFilters,
    performSearch,
    openModal,
    closeModal,
    clearSearch,
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

