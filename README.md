# PWA CRUD - Instituto Management System

Sistema de gestión de institutos con arquitectura PWA (Progressive Web App) implementado con React, Node.js/Express y Firestore.

## 📋 Requisitos Previos

- **Node.js** (v18 o superior)
- **npm** o **yarn**
- **Firebase/Firestore** (Cuenta configurada)
- **Git**

## 🚀 Instalación

### 1. Clonar el Repositorio
```bash
git clone <tu_repositorio_url>
cd PWA
```

### 2. Instalar Dependencias del Frontend
```bash
cd PWA/apppwacrud
npm install
```

### 3. Instalar Dependencias del Backend
```bash
cd PWA5BUnidad4/api_res_invertions
npm install
```

## ⚙️ Configuración

### Frontend (.env)
1. Copiar el archivo `.env.example` a `.env`
```bash
copy .env.example .env
```

2. Configurar las variables (si usas diferente puerto de backend, actualizar URLs):
```
VITE_REST_API_SECURITY_EDUCATION=http://localhost:3000/api/v1
VITE_GET_ALL_INSTITUTES_URL=http://localhost:3000/api/v1/institutos
VITE_CAT_INSTITUTES_URL=http://localhost:3000/api/v1/institutos
VITE_CAT_ETIQUETAS_URL=http://localhost:3000/api/v1/etiquetas
```

### Backend (.env)
1. Copiar el archivo `.env.example` a `.env`
```bash
copy .env.example .env
```

2. Completar credenciales de Firebase:
```
FIREBASE_API_KEY=<tu_api_key>
FIREBASE_AUTH_DOMAIN=<tu_auth_domain>
FIREBASE_PROJECT_ID=<tu_project_id>
FIREBASE_STORAGE_BUCKET=<tu_storage_bucket>
FIREBASE_MESSAGING_SENDER_ID=<tu_sender_id>
FIREBASE_APP_ID=<tu_app_id>
```

3. Configurar puerto y entorno:
```
PORT=3000
NODE_ENV=development
API_URL=/api/v1
```

## 🏃 Ejecutar la Aplicación

### Terminal 1 - Backend
```bash
cd PWA5BUnidad4/api_res_invertions
npm run dev
```
Backend estará disponible en: `http://localhost:3000`

### Terminal 2 - Frontend
```bash
cd PWA/apppwacrud
npm run dev
```
Frontend estará disponible en: `http://localhost:5173` o `http://localhost:5174`

## 📁 Estructura del Proyecto

```
PWA/
├── apppwacrud/                    # Frontend (React + Vite)
│   ├── src/
│   │   ├── security/
│   │   │   ├── institutes/
│   │   │   │   ├── components/
│   │   │   │   │   ├── modals/AddInstituteModal.jsx
│   │   │   │   │   └── tables/InstitutesTable.jsx
│   │   │   │   ├── services/
│   │   │   │   └── redux/
│   │   │   └── labels/services/
│   │   └── App.jsx
│   ├── .env.example
│   └── package.json
│
└── PWA5BUnidad4/api_res_invertions/  # Backend (Node.js/Express)
    ├── src/api/v1/
    │   ├── controllers/
    │   ├── services/
    │   ├── routes/
    │   └── models/
    ├── config/
    ├── .env.example
    └── package.json
```

## 🔑 Variables de Entorno Necesarias

### Frontend (`PWA/apppwacrud/.env`)
```
VITE_REST_API_SECURITY_EDUCATION=
VITE_GET_ALL_INSTITUTES_URL=
VITE_CAT_INSTITUTES_URL=
VITE_CAT_ETIQUETAS_URL=
```

### Backend (`PWA5BUnidad4/api_res_invertions/.env`)
```
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
PORT=3000
NODE_ENV=development
API_URL=/api/v1
```

## 🔧 Tecnologías Utilizadas

### Frontend
- React 19
- Vite 8
- Material-UI (MUI)
- Material-React-Table
- Formik + Yup
- Redux Toolkit
- Axios

### Backend
- Node.js
- Express
- Firebase/Firestore
- Axios

## 📝 Funcionalidades

- ✅ CRUD de Institutos
- ✅ Tabla dinámica con datos de API
- ✅ Modal para agregar nuevos institutos
- ✅ Validación de formularios con Formik/Yup
- ✅ Gestión de estado con Redux
- ✅ Integración con Firestore
- ✅ Carga dinámica de datos

## 🐛 Solución de Problemas

### "Cannot GET /api/v1/..."
**Solución:** Asegurar que el backend está corriendo en puerto 3000

### "Cannot connect to localhost:3000"
**Solución:** Verificar que las variables de entorno en `.env` son correctas

### "Firebase credentials not found"
**Solución:** Completar el archivo `.env` del backend con credenciales válidas

## 📚 Documentación

Para más información sobre la arquitectura y funcionalidades, consultar el tutorial de 60 páginas incluido en el proyecto.

## 👥 Autores

- JAPV
- CGAC
- AGU
- CDCH
- BAFS
- MASU

## 📄 Licencia

MIT

---

**⚠️ NOTA IMPORTANTE:**
- Nunca subir archivos `.env` a Git (están en `.gitignore`)
- Siempre usar `.env.example` como plantilla
- Cada desarrollador debe crear su propio `.env` local
