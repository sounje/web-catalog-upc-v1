# 📚 Catálogo de Cursos UPC

Sistema de catálogo de cursos para la Universidad Peruana de Ciencias Aplicadas (UPC), desarrollado con Next.js 15, React 19, TypeScript y Tailwind CSS siguiendo principios de Clean Code y arquitectura escalable.

## 🚀 Características

- ✅ **Filtrado avanzado** de cursos por múltiples criterios
- ✅ **Filtros dinámicos** con carga desde API (Facultades y Carreras en cascada)
- ✅ **Tabla interactiva** con ordenamiento y paginación
- ✅ **Exportación a Excel** con todos los detalles de los cursos
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
- **xlsx** (SheetJS) - Exportación a Excel
- **lucide-react** - Iconos SVG optimizados
- **clsx** - Utilidad para clases condicionales

## 📁 Estructura del Proyecto

```
src/
├── app/                          # App Router de Next.js
│   ├── api/                     # API Routes (Next.js middleware)
│   │   ├── courses/            
│   │   │   └── search/         # Búsqueda de cursos
│   │   │       └── route.ts
│   │   └── filter/             
│   │       ├── faculties/      # Obtener facultades
│   │       │   └── route.ts
│   │       └── careers/        # Obtener carreras
│   │           └── route.ts
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
- Backend API corriendo (puerto 5216 por defecto)

### Instalación

```bash
# Clonar el repositorio
git clone [URL_DEL_REPO]

# Navegar al directorio
cd upc-client-alumno

# Instalar dependencias
npm install

# Configurar variables de entorno (ver sección "Configuración")
# Crear archivo .env.local

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### ⚙️ Configuración

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# URL base del backend (sin trailing slash)
BACKEND_URL=http://localhost:5216

# Endpoint para consulta de cursos (relativo a BACKEND_URL)
API_ENDPOINT_CONSULTA_CURSO=api/curso/consultar-cursor
```

**Para producción**, actualiza las URLs según tu entorno:
```env
BACKEND_URL=https://api-produccion.upc.edu.pe
API_ENDPOINT_CONSULTA_CURSO=api/curso/consultar-cursor
```

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
- **Exportación**: Descarga todos los resultados a Excel (.xlsx) con un click

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

### Flujo de Filtros y Búsqueda
```
Usuario interactúa con filtros
         ↓
CourseContext actualiza state
         ↓
Service llama a API Route local (/api/...)
         ↓
API Route hace proxy al Backend externo
         ↓
CourseTable muestra resultados filtrados
         ↓
Usuario hace click en curso
         ↓
CourseModal se abre con detalles
```

### 🔌 Arquitectura de API Routes

Este proyecto usa **Next.js API Routes** como capa intermedia (BFF - Backend for Frontend) entre el cliente y las APIs externas:

```
Frontend (Browser) → API Route (Next.js) → Backend API (C#/.NET)
```

**Ventajas:**
- ✅ Oculta endpoints reales del backend
- ✅ Centraliza la lógica de comunicación HTTP
- ✅ Permite agregar autenticación/autorización
- ✅ Maneja certificados SSL en desarrollo
- ✅ Facilita el testing y debugging

**Endpoints disponibles:**

| Método | Ruta | Backend Real | Descripción |
|--------|------|--------------|-------------|
| GET | `/api/filter/faculties` | `{BACKEND_URL}/api/Filter/GetFaculties` | Obtiene lista de facultades |
| POST | `/api/filter/careers` | `{BACKEND_URL}/api/Filter/GetCareers` | Obtiene carreras por facultad |
| POST | `/api/courses/search` | `{BACKEND_URL}/api/curso/consultar-cursor` | Busca cursos con filtros |

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

- [x] ✅ **Integración con API real de backend**
  - [x] Búsqueda de cursos
  - [x] Carga dinámica de facultades
  - [x] Carga dinámica de carreras (filtro en cascada)
- [x] ✅ **Implementar exportación a Excel funcional** con todos los campos
- [ ] Agregar funcionalidad "Agregar a Mi Plan"
- [ ] Implementar búsqueda en tiempo real (debounce)
- [ ] Agregar más filtros (horarios, profesores, etc.)
- [ ] Agregar favoritos persistentes (localStorage)
- [ ] Implementar sistema de recomendaciones
- [ ] Agregar tests unitarios y de integración
- [ ] Implementar i18n (internacionalización)
- [ ] Mejorar SEO con metadata dinámica
- [ ] Agregar autenticación JWT en API Routes

## 📚 Integración con Backend

✅ El proyecto está **completamente integrado** con las APIs del backend:

### APIs Implementadas

1. **GET /api/Filter/GetFaculties**
   - Carga dinámica de facultades
   - Se consume al inicializar el componente de filtros

2. **POST /api/Filter/GetCareers**
   - Carga dinámica de carreras por facultad
   - Filtro en cascada (depende de la facultad seleccionada)
   - Envía el GUID de la facultad como parámetro

3. **POST /api/curso/consultar-cursor**
   - Búsqueda de cursos con múltiples filtros
   - Envía GUIDs de facultad y programa
   - Parámetros: name, facultad, programa, nivel, tipo

### Fallback a Data Mockeada

El proyecto incluye 49 cursos mockeados en `src/data/mock-courses.ts` que se usan como **fallback** si las APIs no están disponibles o fallan.

---

**Desarrollado con ❤️ siguiendo principios de Clean Code y arquitectura escalable**
