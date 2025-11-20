'use client';

/**
 * Componente CourseModal
 * Modal de detalle de curso con Headless UI
 * Muestra información completa del curso seleccionado
 */

import { Fragment, JSX } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  X,
  BookOpen,
  Award,
  Building2,
  Tag,
  Info,
  Target,
  FileCheck,
} from 'lucide-react';
import { useCourseContext } from '@/context/CourseContext';
import { Button } from '@/shared/components';
import { getTeachingLevelLabel, getCourseTypeLabel, getNivelEnsenanzaLabel } from '@/features/courses/utils';

export function CourseModal(): JSX.Element {
  const { modalState, closeModal } = useCourseContext();
  const { isOpen, course } = modalState;

  if (!course) return <></>;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <div className="bg-red-600 px-6 py-4 flex items-center justify-between">
                  <Dialog.Title className="text-lg font-semibold text-white flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Detalle del Curso
                  </Dialog.Title>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Body */}
                <div className="p-6">
                  {/* Información principal */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
                          <BookOpen className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-red-600 mb-1">
                          {course.code} - {course.name}
                        </h3>
                        <p className="text-gray-600 flex items-center gap-2">
                          <Info className="h-4 w-4" />
                          Información detallada del curso académico
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Detalles del curso */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* Programa */}
                    <div className="border border-blue-200 rounded-lg overflow-hidden">
                      <div className="bg-blue-50 border-b border-blue-200 px-4 py-2">
                        <h4 className="text-sm font-semibold text-blue-900 flex items-center gap-2">
                          <Tag className="h-4 w-4" />
                          Programa Académico
                        </h4>
                      </div>
                      <div className="p-4">
                        <p className="text-lg font-medium text-gray-900">{course.program}</p>
                        <p className="text-sm text-gray-500 mt-1">Programa de estudios</p>
                      </div>
                    </div>

                    {/* Créditos */}
                    <div className="border border-green-200 rounded-lg overflow-hidden">
                      <div className="bg-green-50 border-b border-green-200 px-4 py-2">
                        <h4 className="text-sm font-semibold text-green-900 flex items-center gap-2">
                          <Award className="h-4 w-4" />
                          Créditos
                        </h4>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center justify-center bg-green-600 text-white text-2xl font-bold px-4 py-2 rounded-lg">
                            {course.credits}
                          </span>
                          <span className="text-gray-600">créditos</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Valor crediticio del curso</p>
                      </div>
                    </div>

                    {/* Facultad */}
                    <div className="border border-yellow-200 rounded-lg overflow-hidden">
                      <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2">
                        <h4 className="text-sm font-semibold text-yellow-900 flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          Facultad
                        </h4>
                      </div>
                      <div className="p-4">
                        <p className="text-lg font-medium text-gray-900">{course.faculty}</p>
                        <p className="text-sm text-gray-500 mt-1">Unidad académica responsable</p>
                      </div>
                    </div>

                    {/* Tipo de curso */}
                    <div className="border border-purple-200 rounded-lg overflow-hidden">
                      <div className="bg-purple-50 border-b border-purple-200 px-4 py-2">
                        <h4 className="text-sm font-semibold text-purple-900 flex items-center gap-2">
                          <FileCheck className="h-4 w-4" />
                          Tipo de Curso
                        </h4>
                      </div>
                      <div className="p-4">
                        <p className="text-lg font-medium text-gray-900">
                          {getCourseTypeLabel(course.courseType)}
                        </p>
                        <span className="inline-block mt-2 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {getNivelEnsenanzaLabel(course.nivel)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Información adicional */}
                  <div className="space-y-4">
                    {course.description && (
                      <InfoCard title="Descripción del curso" icon={<Info className="h-5 w-5" />}>
                        {course.description}
                      </InfoCard>
                    )}

                    {course.achievement && (
                      <InfoCard title="Logro del curso" icon={<Target className="h-5 w-5" />}>
                        {course.achievement}
                      </InfoCard>
                    )}

                    {course.prerequisites && (
                      <InfoCard
                        title="Pre requisito del curso"
                        icon={<FileCheck className="h-5 w-5" />}
                      >
                        {course.prerequisites}
                      </InfoCard>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex gap-2">
                  </div>
                  <div className="flex gap-2 ">
                    <Button variant="secondary" size="sm" onClick={closeModal}>
                      <X className="h-4 w-4" />
                      Cerrar
                    </Button>
            
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

/**
 * Componente helper para tarjetas de información
 */
interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function InfoCard({ title, icon, children }: InfoCardProps): JSX.Element {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="text-blue-600 mt-0.5">{icon}</div>
        <div className="flex-1">
          <h5 className="font-semibold text-gray-900 mb-1">{title}</h5>
          <p className="text-sm text-gray-700 leading-relaxed">{children}</p>
        </div>
      </div>
    </div>
  );
}

