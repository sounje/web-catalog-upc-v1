/**
 * Componente PageHeader
 * Banner con título del catálogo de cursos UPC
 */

import Image from "next/image";
import { JSX } from "react";

export function PageHeader(): JSX.Element {
  return (
    <div className="w-full bg-red-700 py-8">
      <div className="container mx-auto px-4 flex items-center relative">
        
        {/* Columna izquierda (para balancear el centrado) */}
        <div className="w-1/3"></div>

        {/* Título centrado */}
        <h1 className="w-1/3 text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center">
          CATÁLOGO DE CURSOS UPC
        </h1>

        {/* Imagen derecha */}
        <div className="w-1/3 flex text-right justify-end relative lg:h-10 lg:w-40 md:h-8 md:w-32 h-6 w-24">
          <Image
              src="/assets/logo_upc.png"
              alt="Logo UPC"
              fill
              className="h-16 w-auto"
            />
        </div>
      </div>
    </div>
  );
}

