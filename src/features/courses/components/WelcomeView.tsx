/**
 * Componente WelcomeView
 * Vista que se muestra antes de realizar una búsqueda
 */

import Image from 'next/image';
import { JSX } from 'react';

export function WelcomeView(): JSX.Element {
  return (
    <div className="relative w-full h-full min-h-[600px] aspect-[16/9] rounded-lg overflow-hidden shadow-sm">
      {/* Imagen */}
      <Image
        src="/assets/img_1.png"
        alt="Universidad Peruana de Ciencias Aplicadas"
        fill
        className="object-cover object-center"
        priority
      />
      {/* Franja oscura que cubre solo la parte inferior */}
      <div className="absolute bottom-0 left-0 w-full bg-black/70 p-6 md:p-10">
        
        <h2 className="text-lg md:text-2xl font-bold text-white mb-4">
          CATALOGO DE CURSOS
        </h2>

        <p className="text-sm md:text-base leading-relaxed text-white max-w-5xl">
          El Catálogo de Cursos de la UPC presenta información clave de los cursos obligatorios y electivos que se dictan en la universidad, a nivel de pregrado y postgrado. Cada curso integra conocimientos que se articulan en competencias generales y específicas. Cada curso está diseñado según el modelo educativo por competencias de la UPC, a través del cual los estudiantes desarrollan progresivamente competencias generales y específicas que les permiten lograr un desempeño exitoso en su vida profesional.
        </p>

        <p className="text-xs md:text-sm italic text-white mt-4">
          Información actualizada a Marzo 2026
        </p>

      </div>
    </div>
  );
}

