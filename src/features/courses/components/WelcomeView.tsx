/**
 * Componente WelcomeView
 * Vista que se muestra antes de realizar una búsqueda
 */

import Image from 'next/image';
import { JSX } from 'react';

export function WelcomeView(): JSX.Element {
  return (
    <div className="relative w-full h-full min-h-[600px] rounded-lg overflow-hidden shadow-sm">
      <Image
        src="/assets/img_3.png"
        alt="Universidad Peruana de Ciencias Aplicadas"
        fill
        className="object-cover object-center"
        priority
      />
    </div>
  );
}

