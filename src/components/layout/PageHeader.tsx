/**
 * Componente PageHeader
 * Banner con título del catálogo de cursos UPC
 */

import { JSX } from "react";

export function PageHeader(): JSX.Element {
  return (
    <div className="w-full bg-red-700 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center">
          CATÁLOGO DE CURSOS UPC
        </h1>
      </div>
    </div>
  );
}

