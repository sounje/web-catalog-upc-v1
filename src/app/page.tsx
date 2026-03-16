'use client';

/**
 * Página principal del catálogo de cursos UPC
 * Integra todos los componentes siguiendo Clean Architecture
 * Protegida por middleware (validación de sesión Cognito server-side)
 */

import { CourseProvider, useCourseContext } from '@/context/CourseContext';
import { PageHeader } from '@/components/layout/PageHeader';
import { Footer } from '@/components/layout/Footer';
import { CourseFilters, CourseTable, WelcomeView, CourseModal } from '@/features/courses/components';
import { JSX } from 'react';

/**
 * Componente interno que usa el contexto
 */
function CatalogContent(): JSX.Element {
  const { isSearchActive } = useCourseContext();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <PageHeader />

      {/* Contenido principal */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar de filtros - 3 columnas en desktop */}
          <aside className="lg:col-span-3">
            <CourseFilters />
          </aside>

          {/* Área de contenido principal - 9 columnas en desktop */}
          <section className="lg:col-span-9">
            {isSearchActive ? <CourseTable /> : <WelcomeView />}
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modal de detalle */}
      <CourseModal />
    </div>
  );
}

/**
 * Componente principal exportado con el Provider
 * Middleware valida sesión; sin sesión redirige al proyecto de login
 */
export default function Home(): JSX.Element {
  return (
    <CourseProvider>
      <CatalogContent />
    </CourseProvider>
  );
}
