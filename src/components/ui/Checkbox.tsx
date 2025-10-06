/**
 * Componente Checkbox reutilizable
 * Checkbox personalizado con label integrado
 */

import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/course.utils';
import { Check } from 'lucide-react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export function Checkbox({
  label,
  description,
  className,
  id,
  checked,
  ...props
}: CheckboxProps): React.JSX.Element {
  const generatedId = useId();
  const checkboxId = id || generatedId;

  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <div className="relative">
          <input
            type="checkbox"
            id={checkboxId}
            checked={checked}
            className={cn(
              // Estilos base
              'h-4 w-4 rounded border-2',
              'focus:ring-2 focus:ring-offset-0',
              'disabled:bg-gray-50 disabled:cursor-not-allowed',
              'transition-colors duration-200 cursor-pointer',
              // Ocultar el checkbox nativo para customizar
              'appearance-none',
              // Estilos condicionales
              checked
                ? 'bg-blue-600 border-blue-600 focus:ring-blue-500'
                : 'bg-white border-gray-300 focus:ring-gray-400',
              // Estilos personalizados
              className
            )}
            {...props}
          />
          
          {/* Icono de check customizado */}
          {checked && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Check className="h-3 w-3 text-white" strokeWidth={3} />
            </div>
          )}
        </div>
      </div>

      {(label || description) && (
        <div className="ml-3 text-sm">
          {label && (
            <label
              htmlFor={checkboxId}
              className="font-medium text-gray-700 cursor-pointer select-none"
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-gray-500 mt-0.5">{description}</p>
          )}
        </div>
      )}
    </div>
  );
}

