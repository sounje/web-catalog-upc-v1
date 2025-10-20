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
import { ChevronUp, ChevronDown, ChevronsUpDown, Download } from 'lucide-react';
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
        accessorKey: 'program',
        header: 'Programa',
        cell: (info) => <span className="text-gray-700">{info.getValue() as string}</span>,
      },
      {
        accessorKey: 'credits',
        header: 'Crédito',
        cell: (info) => <span className="text-gray-700">{info.getValue() as number}</span>,
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
          className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition-colors"
        >
          <Download className="h-4 w-4" />
          Exportar todos los resultados como Excel
        </button>
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
                      <div
                        className={
                          header.column.getCanSort()
                            ? 'cursor-pointer select-none flex items-center gap-2 hover:text-gray-900'
                            : ''
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <span className="text-gray-400">
                            {header.column.getIsSorted() === 'asc' ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : header.column.getIsSorted() === 'desc' ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronsUpDown className="h-4 w-4" />
                            )}
                          </span>
                        )}
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

