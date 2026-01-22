'use client';

/**
 * Componente CourseTable
 * Tabla de cursos con @tanstack/react-table
 * Incluye paginación, búsqueda y ordenamiento
 */

import { useState, useMemo, JSX } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import { ChevronUp, ChevronDown, Download } from 'lucide-react';
import { useCourseContext } from '@/context/CourseContext';
import type { Course } from '@/features/courses/types';
import { Button } from '@/shared/components';
import { exportToCSV } from '@/features/courses/utils';
import { TABLE_PAGINATION_CONFIG, MESSAGES } from '@/features/courses/constants';

export function CourseTable(): JSX.Element {
  const { filteredCourses, openModal, isLoading, error } = useCourseContext();
  const [sorting, setSorting] = useState<SortingState>([]);

  /**
   * Definición de columnas de la tabla
   */
  const columns = useMemo<ColumnDef<Course>[]>(
    () => [
      {
        accessorKey: 'code',
        header: 'Cod Curso',
        cell: (info) => <span className="font-medium text-gray-900">{info.getValue() as string}</span>,
      },
      {
        accessorKey: 'name',
        header: 'Curso',
        cell: (info) => <span className="text-gray-900">{info.getValue() as string}</span>,
      },
      {
        accessorKey: 'credits',
        header: 'Créditos',
        cell: (info) => <span className="text-gray-700">{info.getValue() as number}</span>,
      },
      {
        accessorKey: 'program',
        header: 'Programa',
        cell: (info) => <span className="text-gray-700">{info.getValue() as string}</span>,
      },
      {
        accessorKey: 'faculty',
        header: 'Facultad',
        cell: (info) => <span className="text-gray-700">{info.getValue() as string}</span>,
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredCourses,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: TABLE_PAGINATION_CONFIG.DEFAULT_PAGE_SIZE,
      },
    },
  });

  /**
   * Handler para ordenamiento por columna
   */
  const handleSort = (columnId: string): void => {
    const currentSort = sorting.find(s => s.id === columnId);
    
    if (!currentSort) {
      // No está ordenado, ordenar ascendente
      setSorting([{ id: columnId, desc: false }]);
    } else if (!currentSort.desc) {
      // Está ascendente, cambiar a descendente
      setSorting([{ id: columnId, desc: true }]);
    } else {
      // Está descendente, quitar ordenamiento
      setSorting([]);
    }
  };

  /**
   * Obtener el estado de ordenamiento de una columna
   */
  const getSortState = (columnId: string): 'asc' | 'desc' | null => {
    const currentSort = sorting.find(s => s.id === columnId);
    if (!currentSort) return null;
    return currentSort.desc ? 'desc' : 'asc';
  };

  /**
   * Handler para click en fila
   */
  const handleRowClick = (course: Course): void => {
    openModal(course);
  };

  /**
   * Handler para exportar resultados
   */
  const handleExport = (): void => {
    exportToCSV(filteredCourses, 'cursos-upc');
  };

  if (isLoading) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
        <div className="flex items-center justify-center gap-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
          <p className="text-gray-600 text-lg">Buscando cursos...</p>
        </div>
      </div>
    );
  }

  if (filteredCourses.length === 0 && !error) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
        <p className="text-gray-500 text-lg">{MESSAGES.NO_RESULTS}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Resultado de búsqueda</h2>
        <button
          onClick={handleExport}
          className="inline-flex items-center gap-2 text-sm text-red-500 hover:text-red-700 transition-colors cursor-pointer"
        >
          <Download className="h-4 w-4" />
          Exportar todos los resultados como Excel
        </button>
      </div>

      {/* Botones de Ordenamiento */}
      <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm font-medium text-gray-700 mb-3">Ordenar por:</p>
        <div className="flex flex-wrap gap-2">
          {columns.map((column) => {
            // Type guard: verificar que la columna tenga accessorKey
            if (!('accessorKey' in column)) return null;
            const columnId = column.accessorKey as string;
            const sortState = getSortState(columnId);
            const isActive = sortState !== null;
            
            return (
              <button
                key={columnId}
                onClick={() => handleSort(columnId)}
                className={
                  `inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
                  transition-all duration-200 border
                  ${isActive 
                    ? 'bg-red-600 text-white border-red-600 shadow-sm hover:bg-red-700' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                  }`
                }
              >
                {column.header as string}
                {sortState === 'asc' && <ChevronUp className="h-4 w-4" />}
                {sortState === 'desc' && <ChevronDown className="h-4 w-4" />}
              </button>
            );
          })}
        </div>
        {sorting.length > 0 && (
          <button
            onClick={() => setSorting([])}
            className="mt-3 text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Limpiar ordenamiento
          </button>
        )}
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200"
                  >
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => handleRowClick(row.original)}
                className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors group"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-700">
          Mostrando{' '}
          <span className="font-medium">
            {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
          </span>{' '}
          a{' '}
          <span className="font-medium">
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              filteredCourses.length
            )}
          </span>{' '}
          de <span className="font-medium">{filteredCourses.length}</span> resultados
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <span className="text-sm text-gray-700">
            Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}

