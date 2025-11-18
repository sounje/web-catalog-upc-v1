/**
 * Componente PageHeader
 * Banner con título del catálogo de cursos UPC
 */

import Image from "next/image";
import { JSX } from "react";

export function PageHeader(): JSX.Element {
  return (
    <div className="w-full bg-red-700 py-2">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative">
        
        {/* Columna izquierda (solo visible en pantallas medianas en adelante) */}
        <div className="hidden md:block md:w-1/3 lg:block lg:w-1/3"></div>

        {/* Título centrado */}
        <h1 className="w-full md:w-1/3 lg:w-1/3 text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center">
          CATÁLOGO DE CURSOS UPC
        </h1>

        {/* Imagen derecha */}
        <div className="w-[60%] h-[60%] w-full md:w-1/3 flex justify-center md:justify-end relative h-full lg:min-h-[90px] aspect-[16/9] lg:h-10 lg:w-40 md:h-8 md:w-32 h-6 w-24">
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

