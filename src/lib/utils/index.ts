/**
 * Barrel export para utilidades genéricas
 * Funciones que pueden ser reutilizadas en cualquier parte del proyecto
 */

/**
 * Obtiene la URL base (origin) real de la petición.
 * Usa x-forwarded-host y x-forwarded-proto cuando existe proxy (CloudFront, Amplify, etc.)
 * para evitar que se use localhost en producción.
 */
export function getRequestBaseUrl(request: { headers: Headers; url?: string }): string {
  const host = request.headers.get('x-forwarded-host');
  const proto = request.headers.get('x-forwarded-proto');
  const port = request.headers.get('x-forwarded-port');

  if (host) {
    const protocol = proto === 'http' ? 'http' : 'https';
    if (port && port !== '80' && port !== '443') {
      return `${protocol}://${host}:${port}`;
    }
    return `${protocol}://${host}`;
  }

  if (request.url) {
    try {
      const url = new URL(request.url);
      return url.origin;
    } catch {
      // fallback
    }
  }

  const fallbackHost = request.headers.get('host') || 'localhost:3000';
  return `https://${fallbackHost}`;
}

// Función para combinar clases de Tailwind CSS
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Función para generar IDs únicos
export function generateId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

// Función para formatear fechas
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Función para capitalizar texto
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// Función para truncar texto
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}
