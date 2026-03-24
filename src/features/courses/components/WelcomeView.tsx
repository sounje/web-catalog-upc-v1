'use client';

/**
 * Componente WelcomeView
 * Vista que se muestra antes de realizar una búsqueda
 */

import Image from 'next/image';
import { JSX, useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { getPeriodDetails } from '@/features/courses/services';
import type { ApiPeriodDetailsResponse } from '@/features/courses/types';

export function WelcomeView(): JSX.Element {
  const auth = useAuth();
  const [periodDetails, setPeriodDetails] = useState<ApiPeriodDetailsResponse | null>(null);
  const [isLoadingPeriod, setIsLoadingPeriod] = useState(true);
  const [periodError, setPeriodError] = useState<string | null>(null);

  /**
   * Carga los detalles del periodo al montar el componente
   * Ultimos detalles del periodo (semestre y fecha de actualización)
   */
  useEffect(() => {
    const loadPeriodDetails = async () => {
      setIsLoadingPeriod(true);
      setPeriodError(null);
      try {
        const details = await getPeriodDetails({ idToken: auth.user?.id_token });
        setPeriodDetails(details);
      } catch (error) {
        setPeriodError(error instanceof Error ? error.message : 'Error al cargar periodo');
      } finally {
        setIsLoadingPeriod(false);
      }
    };

    loadPeriodDetails();
  }, [auth.user?.id_token]);

  //creamos una funcion que recibe el periodo numerico y devuelve el texto correspondiente
  function getTextSemestre(period:number): string {
      switch (period) {
        case 1:
          return 'primer semestre';
        case 2:
          return 'segundo semestre';
        case 3:
          return 'tercer trimestre';
        case 4:
          return 'cuarto cuatrimestre';
        case 5:
          return 'quinto quinquemestre';
        case 6:
          return 'sexto bimestre';
        default:
      return '';
    }
  }
  /**
   * Formatea el texto de información actualizada
   */
  const getUpdatedInfoText = (): string => {
    if (isLoadingPeriod) return 'Información actualizada...';
    if (periodError) return `Error: ${periodError}`;
    if (periodDetails) {
      const semestreText = getTextSemestre(periodDetails.Semestre);
      return `Información actualizada al ${semestreText} del ${periodDetails.Fecha}`;
    }
    return 'Información actualizada';
  };

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
          {getUpdatedInfoText()}
        </p>

      </div>
    </div>
  );
}

