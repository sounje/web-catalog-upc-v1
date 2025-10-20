/**
 * Barrel export para tipos compartidos
 * Tipos para componentes y hooks reutilizables
 */

// Props base para componentes
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

// Props para componentes de formulario
export interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  helperText?: string;
  disabled?: boolean;
}

// Props para botones
export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

// Props para inputs
export interface InputProps extends FormFieldProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  icon?: React.ReactNode;
}

// Props para selects
export interface SelectProps extends FormFieldProps {
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

// Props para checkboxes
export interface CheckboxProps extends FormFieldProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  description?: string;
}

// Props para modales
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closable?: boolean;
}

// Props para tablas
export interface TableProps<T = any> extends BaseComponentProps {
  data: T[];
  columns: Array<{
    key: string;
    label: string;
    sortable?: boolean;
    render?: (value: any, row: T) => React.ReactNode;
  }>;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
  };
  loading?: boolean;
  emptyMessage?: string;
}
