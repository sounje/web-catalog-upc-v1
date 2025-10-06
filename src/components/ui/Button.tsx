/**
 * Componente Button reutilizable
 * Siguiendo principios de Clean Code y composición
 */

import type { ButtonHTMLAttributes, JSX, ReactNode } from 'react';
import { cn } from '@/lib/utils/course.utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: ReactNode;
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 border-red-600',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 border-gray-300',
  outline: 'bg-transparent text-gray-700 hover:bg-gray-50 border-gray-300',
  danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 border-red-600',
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  className,
  disabled,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button
      className={cn(
        // Estilos base
        'inline-flex items-center justify-center gap-2',
        'font-medium rounded-md border',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        // Estilos variantes
        VARIANT_STYLES[variant],
        // Estilos de tamaño
        SIZE_STYLES[size],
        // Ancho completo
        fullWidth && 'w-full',
        // Estilos personalizados
        className
      )}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}

