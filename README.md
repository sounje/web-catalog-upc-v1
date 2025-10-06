# 📚 Catálogo de Cursos UPC

Sistema de catálogo de cursos para la Universidad Peruana de Ciencias Aplicadas (UPC), desarrollado con Next.js 15, React 19, TypeScript y Tailwind CSS siguiendo principios de Clean Code y arquitectura escalable.

## 🚀 Características

- ✅ **Filtrado avanzado** de cursos por múltiples criterios
- ✅ **Tabla interactiva** con ordenamiento y paginación
- ✅ **Modal detallado** con información completa de cada curso
- ✅ **Diseño responsive** optimizado para móvil, tablet y desktop
- ✅ **TypeScript estricto** para máxima seguridad de tipos
- ✅ **Arquitectura limpia** con separación de responsabilidades
- ✅ **Componentes reutilizables** siguiendo principios SOLID
- ✅ **Validación de formularios** con React Hook Form + Zod
- ✅ **Estado global** con Context API
- ✅ **Accesibilidad** siguiendo estándares WCAG

## 🛠️ Stack Tecnológico

### Core
- **Next.js 15.5.4** - Framework React con App Router
- **React 19.1.0** - Librería de interfaz de usuario
- **TypeScript 5** - Tipado estático
- **Tailwind CSS 4** - Framework CSS utility-first

### Librerías Principales
- **@tanstack/react-table** - Tabla avanzada con funcionalidades completas
- **@headlessui/react** - Componentes UI accesibles (Modal)
- **react-hook-form** - Manejo de formularios
- **zod** - Validación de esquemas
- **lucide-react** - Iconos SVG optimizados
- **clsx** - Utilidad para clases condicionales

## 📁 Estructura del Proyecto

```
src/
├── app/                          # App Router de Next.js
│   ├── layout.tsx               # Layout raíz
│   ├── page.tsx                 # Página principal
│   └── globals.css              # Estilos globales
│
├── components/
│   ├── layout/                  # Componentes de layout
│   │   ├── Footer.tsx          # Footer institucional
│   │   ├── PageHeader.tsx      # Header con título
│   │   └── index.ts            # Barrel export
│   │
│   ├── courses/                 # Componentes de cursos
│   │   ├── CourseFilters.tsx   # Panel de filtros
│   │   ├── CourseTable.tsx     # Tabla de resultados
│   │   ├── CourseModal.tsx     # Modal de detalle
│   │   ├── WelcomeView.tsx     # Vista inicial
│   │   └── index.ts            # Barrel export
│   │
│   └── ui/                      # Componentes UI reutilizables
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Select.tsx
│       ├── Checkbox.tsx
│       └── index.ts             # Barrel export
│
├── context/
│   └── CourseContext.tsx        # Context API para estado global
│
├── hooks/                        # Custom hooks (futuro)
│
├── lib/
│   ├── types/
│   │   └── course.types.ts      # Interfaces TypeScript
│   ├── constants/
│   │   └── courses.constants.ts # Constantes de la aplicación
│   ├── utils/
│   │   └── course.utils.ts      # Funciones de utilidad
│   └── validation/
│       └── filter.schema.ts     # Esquemas Zod
│
└── data/
    └── mock-courses.ts           # Data mockeada (49 cursos)
```

## 🎨 Principios de Diseño

### Clean Code
- ✅ Nombres descriptivos y significativos
- ✅ Funciones pequeñas con una sola responsabilidad
- ✅ Evitar magic numbers/strings (uso de constantes)
- ✅ Comentarios solo cuando agregan valor

### SOLID
- ✅ **Single Responsibility**: Cada componente tiene una responsabilidad
- ✅ **Open/Closed**: Componentes abiertos a extensión, cerrados a modificación
- ✅ **Liskov Substitution**: Props e interfaces bien definidas
- ✅ **Interface Segregation**: Interfaces específicas y pequeñas
- ✅ **Dependency Inversion**: Dependencias mediante Context/Props

### Separation of Concerns
- ✅ **Componentes presentacionales**: Solo UI, reciben props
- ✅ **Custom hooks**: Lógica de negocio reutilizable
- ✅ **Context API**: Estado global desacoplado
- ✅ **Utilities**: Funciones puras separadas

## 🚦 Cómo Empezar

### Prerrequisitos
- Node.js 18+ 
- npm o yarn o pnpm

### Instalación

```bash
# Clonar el repositorio
git clone [URL_DEL_REPO]

# Navegar al directorio
cd upc-client

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📝 Scripts Disponibles

```bash
npm run dev          # Inicia servidor de desarrollo con Turbopack
npm run build        # Compila para producción
npm run start        # Inicia servidor de producción
npm run lint         # Ejecuta ESLint
```

## 🎯 Funcionalidades Principales

### Filtros de Búsqueda
- **Búsqueda por texto**: Código o nombre del curso
- **Nivel de enseñanza**: Pregrado Tradicional, Pregrado EPE, Postgrado
- **Facultad**: 20+ facultades disponibles
- **Programa**: 30+ programas académicos
- **Tipo de curso**: Obligatorio o Electivo

### Tabla de Cursos
- **Ordenamiento**: Click en headers para ordenar
- **Paginación**: 10 resultados por página (configurable)
- **Navegación**: Anterior/Siguiente
- **Click en filas**: Abre modal con detalles completos

### Modal de Detalle
- Información completa del curso
- Código y nombre
- Programa académico
- Créditos
- Facultad
- Tipo de curso
- Descripción
- Logro esperado
- Prerrequisitos

## 🔄 Flujo de Datos

```
Usuario interactúa con filtros
         ↓
CourseContext actualiza state
         ↓
Filtros se aplican a data mockeada
         ↓
CourseTable muestra resultados filtrados
         ↓
Usuario hace click en curso
         ↓
CourseModal se abre con detalles
```

## 🎨 Guía de Estilos

### Colores UPC
```css
--upc-red: #dc3545          /* Rojo principal */
--upc-dark-red: #c82333     /* Rojo oscuro (hover) */
--upc-light-gray: #f8f9fa   /* Gris claro */
--upc-dark-gray: #343a40    /* Gris oscuro */
```

### Tipografía
- **Font Family**: Roboto (300, 400, 500, 700)
- **Line Height**: 1.6

## 🔮 Próximos Pasos / Roadmap

- [ ] Integración con API real de backend
- [ ] Implementar exportación a Excel/CSV funcional
- [ ] Agregar funcionalidad "Agregar a Mi Plan"
- [ ] Implementar búsqueda en tiempo real
- [ ] Agregar más filtros (horarios, profesores, etc.)
- [ ] Agregar favoritos persistentes (localStorage)
- [ ] Implementar sistema de recomendaciones
- [ ] Agregar tests unitarios y de integración
- [ ] Implementar i18n (internacionalización)
- [ ] Mejorar SEO con metadata dinámica

## 📚 Data Mockeada

El proyecto incluye 49 cursos mockeados con información completa para desarrollo y pruebas. Esta data está en `src/data/mock-courses.ts` y será reemplazada por llamadas a API en el futuro.



---

**Nota**: Este proyecto está en desarrollo activo. La data es mockeada y será reemplazada por integraciones reales con APIs en futuras versiones.
