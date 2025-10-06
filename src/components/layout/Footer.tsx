/**
 * Componente Footer de la UPC
 * Footer completo con todos los enlaces institucionales
 */

import Image from 'next/image';
import { Facebook, Youtube, Twitter, Book } from 'lucide-react';
import { JSX } from 'react';

export function Footer(): JSX.Element {
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 pt-5 pb-3">
      {/* Sección superior con información de contacto */}
      <section className="bg-white pb-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Logo */}
            <div className="md:col-span-3 flex justify-center items-center">
              <Image
                src="https://upc-cdn.b-cdn.net/assets/images/institucional/logo-negro-wasc-desktop.svg"
                alt="UPC Logo"
                width={160}
                height={40}
                className="h-10 w-auto"
              />
            </div>

            {/* Información de contacto */}
            <div className="md:col-span-6 text-center md:text-left">
              <p className="text-sm text-gray-600 mb-2">
                Prolongación Primavera 2390, Monterrico, Santiago de Surco
                <br />
                Informes: 313-3333 - 610-5030, 0800-00021{' '}
                <span className="text-xs">(gratuito para fuera de Lima)</span> | Servicio al
                alumno 630-3333 | Fax: 313-3334
                <br />
                <a
                  href="https://www.upc.edu.pe/servicios/contacto-para-alumnos-upc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  Contacto
                </a>
                {' | '}
                <a
                  href="https://www.upc.edu.pe/html/politica-y-terminos/0/politica-privacidad.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  Política de Privacidad
                </a>
                {' | '}
                <a
                  href="https://upc.edu.pe/proteccion-de-datos/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  Política de Protección de Datos Personales y Derechos ARCO
                </a>
              </p>
            </div>

            {/* Redes sociales y libro de reclamaciones */}
            <div className="md:col-span-3 flex flex-col items-center gap-3">
              <div className="flex gap-2">
                <a
                  href="https://www.facebook.com/upcedu"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook de UPC"
                >
                  <Image
                    src="https://www.upc.edu.pe/static/img/iconos/ic_facebook.svg"
                    alt="Facebook"
                    width={32}
                    height={32}
                  />
                </a>
                <a
                  href="https://www.youtube.com/user/UPCedupe"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Youtube de UPC"
                >
                  <Image
                    src="https://www.upc.edu.pe/static/img/iconos/ic_youtube.svg"
                    alt="Youtube"
                    width={32}
                    height={32}
                  />
                </a>
                <a
                  href="https://twitter.com/upcedu"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter de UPC"
                >
                  <Image
                    src="https://www.upc.edu.pe/static/img/iconos/ic_twitter.svg"
                    alt="Twitter"
                    width={32}
                    height={32}
                  />
                </a>
              </div>
              <a
                href="https://librodereclamaciones.upc.edu.pe/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="https://www.upc.edu.pe/static/img/libro-reclamaciones.png"
                  alt="Libro de reclamaciones"
                  width={120}
                  height={40}
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sección principal del footer */}
      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Pregrado */}
          <FooterSection title="PREGRADO">
            <FooterLink href="https://pregrado.upc.edu.pe/facultad-de-administracion-en-hoteleria-y-turismo/">
              Administración en Hotelería y Turismo
            </FooterLink>
            <FooterLink href="https://pregrado.upc.edu.pe/facultad-de-arquitectura/">
              Arquitectura
            </FooterLink>
            <FooterLink href="https://pregrado.upc.edu.pe/facultad-de-artes-contemporaneas/">
              Artes Contemporáneas
            </FooterLink>
            <FooterLink href="https://pregrado.upc.edu.pe/facultad-de-ciencias-de-la-salud/">
              Ciencias de la Salud
            </FooterLink>
            <FooterLink href="https://pregrado.upc.edu.pe/facultad-de-ciencias-humanas/">
              Ciencias Humanas
            </FooterLink>
            <FooterLink href="https://pregrado.upc.edu.pe/facultad-de-comunicaciones/">
              Comunicaciones
            </FooterLink>
            <FooterLink href="https://pregrado.upc.edu.pe/facultad-de-derecho/">
              Derecho
            </FooterLink>
            <FooterLink href="https://pregrado.upc.edu.pe/facultad-de-diseno/">
              Diseño
            </FooterLink>
            <FooterLink href="https://pregrado.upc.edu.pe/facultad-de-economia/">
              Economía
            </FooterLink>
            <FooterLink href="https://pregrado.upc.edu.pe/facultad-de-educacion/">
              Educación
            </FooterLink>
            <FooterLink href="https://pregrado.upc.edu.pe/facultad-de-ingenieria/">
              Ingeniería
            </FooterLink>
            <FooterLink href="https://pregrado.upc.edu.pe/facultad-de-negocios/">
              Negocios
            </FooterLink>
            <FooterLink href="https://pregrado.upc.edu.pe/facultad-de-psicologia/">
              Psicología
            </FooterLink>
          </FooterSection>

          {/* EPE y Postgrado */}
          <div>
            <FooterSection title="EPE">
              <FooterLink href="https://epe.upc.edu.pe/carrera/">Carreras</FooterLink>
              <FooterLink href="https://epe.upc.edu.pe/acerca-de-epe/">Acerca de EPE</FooterLink>
              <FooterLink href="https://epe.upc.edu.pe/admision-epe/">Admisión EPE</FooterLink>
              <FooterLink href="https://epe.upc.edu.pe/landings/epe/simulador-de-convalidaciones/">
                Convalidaciones
              </FooterLink>
            </FooterSection>

            <FooterSection title="POSTGRADO" className="mt-6">
              <FooterLink href="https://postgrado.upc.edu.pe/acerca-de-la-escuela/">
                Acerca de la Escuela
              </FooterLink>
              <FooterLink href="https://postgrado.upc.edu.pe/landings/maestrias/">
                Maestrías
              </FooterLink>
              <FooterLink href="https://postgrado.upc.edu.pe/landings/maestrias/mba/">
                MBA
              </FooterLink>
              <FooterLink href="https://postgrado.upc.edu.pe/landings/programas-especializados/">
                Programas Especializados
              </FooterLink>
              <FooterLink href="https://postgrado.upc.edu.pe/landings/cursos-de-especializacion/">
                Cursos de Especialización
              </FooterLink>
              <FooterLink href="https://educacioncontinua.upc.edu.pe/">
                Educación Continua EPG
              </FooterLink>
            </FooterSection>
          </div>

          {/* Campus y Nosotros */}
          <div>
            <FooterSection title="CAMPUS">
              <FooterLink href="https://www.upc.edu.pe/nosotros/campus/campus-monterrico/">
                Monterrico
              </FooterLink>
              <FooterLink href="https://www.upc.edu.pe/nosotros/campus/campus-san-isidro/">
                San Isidro
              </FooterLink>
              <FooterLink href="https://www.upc.edu.pe/nosotros/campus/campus-san-miguel/">
                San Miguel
              </FooterLink>
              <FooterLink href="https://www.upc.edu.pe/nosotros/campus/campus-villa/">
                Villa
              </FooterLink>
            </FooterSection>

            <FooterSection title="NOSOTROS" className="mt-6">
              <FooterLink href="https://www.upc.edu.pe/nosotros/quienes-somos/mision-y-vision/">
                Quiénes Somos
              </FooterLink>
              <FooterLink href="https://www.upc.edu.pe/nosotros/autoridades-upc/">
                Autoridades UPC
              </FooterLink>
              <FooterLink href="https://www.upc.edu.pe/nosotros/acreditaciones/acreditacion-institucional/">
                Acreditación institucional
              </FooterLink>
              <FooterLink href="https://sica.upc.edu.pe/publico/reglamentos-upc">
                Políticas, Reglamentos y Normas
              </FooterLink>
              <FooterLink href="https://www.upc.edu.pe/transparencia-upc/">
                Transparencia
              </FooterLink>
              <FooterLink href="https://www.laureate.net/ethics-and-compliance/">
                Ética
              </FooterLink>
            </FooterSection>
          </div>

          {/* Blogs y Servicios */}
          <div>
            <FooterSection title="BLOGS">
              <FooterLink href="https://noticias.upc.edu.pe/">Noticias UPC</FooterLink>
              <FooterLink href="https://internacional.upc.edu.pe/">UPC Internacional</FooterLink>
              <FooterLink href="https://noticias.upc.edu.pe/alumni/">UPC Alumni</FooterLink>
              <FooterLink href="https://editorial.upc.edu.pe/">Editorial UPC</FooterLink>
            </FooterSection>

            <FooterSection title="TRABAJA CON NOSOTROS" className="mt-6">
              <FooterLink href="https://fa-evib-saasfaprod1.fa.ocs.oraclecloud.com/hcmUI/CandidateExperience/es/sites/CX_1/?mode=location">
                Trabaja con nosotros
              </FooterLink>
            </FooterSection>

            <FooterSection title="CENTROS DE SERVICIOS" className="mt-6">
              <FooterLink href="https://www.upc.edu.pe/centro-universitario-de-salud-upc/conocenos/">
                Centro Universitario de Salud
              </FooterLink>
              <FooterLink href="https://upc.edu.pe/servicios/centro-medico-veterinario/">
                Centro Médico Veterinario
              </FooterLink>
            </FooterSection>
          </div>
        </div>

        {/* Redes sociales - versión responsive */}
        <div className="text-center mb-8">
          <h6 className="text-red-600 font-semibold mb-3">¿Necesitas contactarte con nosotros?</h6>
          <div className="flex flex-wrap justify-center gap-2">
            <a
              href="https://www.facebook.com/upcedu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Facebook className="h-4 w-4" />
              Facebook de UPC
            </a>
            <a
              href="https://www.youtube.com/user/UPCedupe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Youtube className="h-4 w-4" />
              Youtube de UPC
            </a>
            <a
              href="https://twitter.com/upcedu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Twitter className="h-4 w-4" />
              Twitter de UPC
            </a>
            <a
              href="https://librodereclamaciones.upc.edu.pe/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Book className="h-4 w-4" />
              Libro de reclamaciones
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              Universidad Peruana de Ciencias Aplicadas S.A.C - R.U.C: 2021161454
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a
                href="https://www.upc.edu.pe/servicios/contacto-para-alumnos-upc/"
                className="text-gray-600 hover:text-red-600 transition-colors"
              >
                Contacto
              </a>
              <a
                href="https://www.upc.edu.pe/html/politica-y-terminos/0/politica-privacidad.htm"
                className="text-gray-600 hover:text-red-600 transition-colors"
              >
                Política de Privacidad
              </a>
              <a
                href="https://upc.edu.pe/proteccion-de-datos/"
                className="text-gray-600 hover:text-red-600 transition-colors"
              >
                Protección de Datos
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * Componente helper para secciones del footer
 */
interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

function FooterSection({ title, children, className }: FooterSectionProps): JSX.Element {
  return (
    <div className={className}>
      <h6 className="text-red-600 font-semibold text-sm uppercase tracking-wide mb-3">
        {title}
      </h6>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

/**
 * Componente helper para links del footer
 */
interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

function FooterLink({ href, children }: FooterLinkProps): JSX.Element {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-gray-600 hover:text-red-600 hover:translate-x-1 inline-block transition-all duration-200"
      >
        {children}
      </a>
    </li>
  );
}

