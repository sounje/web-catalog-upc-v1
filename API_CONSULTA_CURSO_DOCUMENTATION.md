# Documentación API: Consulta de Cursos

## Endpoint
```
POST {BACKEND_URL}/test/CursosSearch/GetCursosBySearch
```

**Variable de entorno:** `API_ENDPOINT_CONSULTA_CURSO`  
**Valor por defecto:** `test/CursosSearch/GetCursosBySearch`

---

## Request (Lo que envía el Frontend)

### Método
`POST`

### Headers
```json
{
  "Content-Type": "application/json"
}
```

### Body (Request)
```typescript
{
  name: string;        // Término de búsqueda (código o nombre del curso)
  facultad: string;    // GUID de la facultad (UUID) - puede ser string vacío ""
  programa: string;    // GUID del programa/carrera (UUID) - puede ser string vacío ""
  nivel: string;       // Nivel de enseñanza: "UAC" | "UFC" | "EMA" | "UAC-UFC" | "UAC-EMA" | "UFC-EMA" | "UAC-UFC-EMA" | ""
  tipo: string;        // Tipo de curso: "Obligatorio" | "Electivo" | ""
}
```

### Ejemplo de Request
```json
{
  "name": "ADMINISTRACIÓN",
  "facultad": "123e4567-e89b-12d3-a456-426614174000",
  "programa": "789e0123-e45b-67d8-a901-234567890123",
  "nivel": "UAC-UFC",
  "tipo": "Obligatorio"
}
```

### Validaciones del Frontend
- Al menos uno de estos campos debe estar presente: `name`, `facultad`, o `programa`
- Si no se cumple, retorna error 400

---

## Response (Lo que espera recibir el Frontend)

### Estructura de Respuesta Esperada

El backend debe retornar un **array de objetos** con la siguiente estructura:

```typescript
ApiCourseResponse[]
```

Donde cada objeto `ApiCourseResponse` tiene:

```typescript
{
  id: string;          // ID único del curso (GUID o string)
  code: string;        // Código del curso (ej: "ADM101")
  course: string;       // Nombre completo del curso
  career: string;       // Nombre del programa/carrera
  credits: number;      // Número de créditos (número entero)
  faculty: string;      // Nombre de la facultad
  tipo: string;        // "Obligatorio" | "Electivo" (puede venir en mayúsculas o minúsculas)
  incoming: string;     // Descripción del curso
  graduate: string;    // Logro esperado del curso
  requirement: string;  // Prerrequisitos del curso
  nivel: string;        // Nivel de enseñanza (ej: "UAC", "UFC", "EMA")
}
```

### Ejemplo de Response JSON
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "code": "ADM101",
    "course": "ADMINISTRACIÓN",
    "career": "Administración y Negocios Internacionales",
    "credits": 3,
    "faculty": "Facultad de Negocios",
    "tipo": "Obligatorio",
    "incoming": "El curso desarrolla competencias en gestión administrativa...",
    "graduate": "Al finalizar el curso, el estudiante será capaz de...",
    "requirement": "ADM100",
    "nivel": "UAC"
  },
  {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "code": "ETI201",
    "course": "ÉTICA Y RESPONSABILIDAD",
    "career": "Administración y Negocios Internacionales",
    "credits": 2,
    "faculty": "Facultad de Negocios",
    "tipo": "Obligatorio",
    "incoming": "El curso aborda principios éticos en el ámbito empresarial...",
    "graduate": "El estudiante desarrollará valores éticos y responsabilidad social...",
    "requirement": "",
    "nivel": "UAC"
  }
]
```

### Respuesta del API Route (Intermediario Next.js)

El API Route de Next.js envuelve la respuesta del backend:

```typescript
{
  success: boolean;     // true si fue exitoso
  data: ApiCourseResponse[];  // Array de cursos
  count: number;       // Cantidad de cursos retornados
}
```

**Ejemplo:**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "code": "ADM101",
      "course": "ADMINISTRACIÓN",
      "career": "Administración y Negocios Internacionales",
      "credits": 3,
      "faculty": "Facultad de Negocios",
      "tipo": "Obligatorio",
      "incoming": "El curso desarrolla competencias...",
      "graduate": "Al finalizar el curso...",
      "requirement": "ADM100",
      "nivel": "UAC"
    }
  ],
  "count": 1
}
```

---

## Mapeo de Campos

### Del Backend al Frontend

| Campo Backend | Tipo | Campo Frontend | Tipo | Notas |
|--------------|------|----------------|------|-------|
| `id` | string | `id` | string | ID único del curso |
| `code` | string | `code` | string | Código del curso |
| `course` | string | `name` | string | Nombre del curso |
| `career` | string | `program` | string | Programa/carrera |
| `credits` | number | `credits` | number | Número de créditos |
| `faculty` | string | `faculty` | string | Nombre de la facultad |
| `tipo` | string | `courseType` | 'obligatorio'\|'electivo' | Se normaliza a minúsculas |
| `incoming` | string | `description` | string? | Descripción del curso |
| `graduate` | string | `achievement` | string? | Logro esperado |
| `requirement` | string | `prerequisites` | string? | Prerrequisitos |
| `nivel` | string | `nivel` | string | Nivel de enseñanza |
| - | - | `teachingLevel` | TeachingLevel | Se infiere del nombre de facultad |

### Transformaciones Aplicadas

1. **`tipo` → `courseType`**: 
   - Se convierte a minúsculas
   - Valores aceptados: "OBLIGATORIO" → "obligatorio", "ELECTIVO" → "electivo"
   - Si no coincide, por defecto es "obligatorio"

2. **`faculty` → `teachingLevel`**: 
   - Se infiere del nombre de la facultad (no viene del backend)
   - Si contiene "postgrado", "maestría" o "maestria" → `'maestria'`
   - Si contiene "epe" → `'pregrado-epe'`
   - Por defecto → `'pregrado-tradicional'`

---

## Códigos de Estado HTTP

### Éxito
- **200 OK**: La búsqueda fue exitosa y retorna datos

### Errores
- **400 Bad Request**: Al menos un filtro es requerido (`name`, `facultad`, o `programa`)
- **500 Internal Server Error**: Error al comunicarse con el backend o procesar la respuesta

---

## Notas Importantes

1. **Array de Respuesta**: El backend debe retornar directamente un array `[]`, no un objeto con una propiedad que contenga el array.

2. **Campos Opcionales**: Los campos `incoming`, `graduate`, y `requirement` pueden ser strings vacíos `""` si no hay información disponible.

3. **Tipo de Curso**: El campo `tipo` puede venir en mayúsculas o minúsculas, el frontend lo normaliza automáticamente.

4. **Nivel de Enseñanza**: El campo `nivel` puede contener valores como "UAC", "UFC", "EMA" o combinaciones separadas por guiones.

5. **IDs**: Los campos `facultad` y `programa` en el request deben ser GUIDs (UUIDs) válidos.

6. **Créditos**: Debe ser un número entero, no un string numérico.

---

## Ejemplo Completo de Flujo

### 1. Usuario busca cursos
```json
POST /api/courses/search
{
  "name": "",
  "facultad": "123e4567-e89b-12d3-a456-426614174000",
  "programa": "789e0123-e45b-67d8-a901-234567890123",
  "nivel": "UAC",
  "tipo": "Obligatorio"
}
```

### 2. API Route hace proxy al backend
```json
POST {BACKEND_URL}/test/CursosSearch/GetCursosBySearch
{
  "name": "",
  "facultad": "123e4567-e89b-12d3-a456-426614174000",
  "programa": "789e0123-e45b-67d8-a901-234567890123",
  "nivel": "UAC",
  "tipo": "Obligatorio"
}
```

### 3. Backend responde
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "code": "ADM101",
    "course": "ADMINISTRACIÓN",
    "career": "Administración y Negocios Internacionales",
    "credits": 3,
    "faculty": "Facultad de Negocios",
    "tipo": "Obligatorio",
    "incoming": "Descripción del curso...",
    "graduate": "Logro esperado...",
    "requirement": "ADM100",
    "nivel": "UAC"
  }
]
```

### 4. API Route envuelve la respuesta
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "code": "ADM101",
      "course": "ADMINISTRACIÓN",
      "career": "Administración y Negocios Internacionales",
      "credits": 3,
      "faculty": "Facultad de Negocios",
      "tipo": "Obligatorio",
      "incoming": "Descripción del curso...",
      "graduate": "Logro esperado...",
      "requirement": "ADM100",
      "nivel": "UAC"
    }
  ],
  "count": 1
}
```

### 5. Frontend transforma los datos
```typescript
{
  id: "550e8400-e29b-41d4-a716-446655440000",
  code: "ADM101",
  name: "ADMINISTRACIÓN",              // course → name
  program: "Administración y Negocios Internacionales",  // career → program
  credits: 3,
  faculty: "Facultad de Negocios",
  courseType: "obligatorio",           // tipo normalizado
  nivel: "UAC",
  description: "Descripción del curso...",  // incoming → description
  achievement: "Logro esperado...",     // graduate → achievement
  prerequisites: "ADM100",             // requirement → prerequisites
  teachingLevel: "pregrado-tradicional" // inferido de faculty
}
```

---

## Archivos Relacionados en el Código

- **API Route**: `src/app/api/courses/search/route.ts`
- **Tipos API**: `src/features/courses/types/api.types.ts`
- **Mapper**: `src/features/courses/mappers/course.mapper.ts`
- **Servicio**: `src/features/courses/services/course-api.service.ts`
- **Tipos Internos**: `src/features/courses/types/course.types.ts`
