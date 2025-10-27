# 📋 Gestor de Tareas — Docker + Nginx + Node.js + PostgreSQL

Aplicación web completa para gestionar tareas con arquitectura de microservicios containerizada en Docker.

---

## 📋 Tabla de Contenidos

- [Requisitos](#requisitos)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Setup](#instalación-y-setup)
- [Uso](#uso)
- [URLs de Acceso](#urls-de-acceso)
- [Variables de Entorno](#variables-de-entorno)
- [Solución de Problemas](#solución-de-problemas)
- [Arquitectura](#arquitectura)

---

## ✅ Requisitos

Antes de empezar, asegúrate de tener instalados:

- **Docker Desktop** (incluye Docker y Docker Compose)
  - Descarga desde: https://www.docker.com/products/docker-desktop
  - Windows: versión 4.0 o superior
  - WSL 2 backend habilitado (recomendado en Windows)

- **Git** (para clonar/trabajar con el repositorio)

- **Editor de código** (opcional, VSCode recomendado)

### Verificar instalación

```bash
# Verifica Docker
docker --version
docker compose version

# Verifica Git
git --version
```

---

## 📁 Estructura del Proyecto

```
Task_Nginx/
├── backend/                   
│   ├── src/
│   │   ├── app.ts             
│   │   ├── server.ts          
│   │   ├── config/            
│   │   ├── controllers/       
│   │   ├── routes/            
│   │   ├── models/            
│   │   └── db/               
│   ├── Dockerfile            
│   ├── .env                  
│   ├── .env.example          
│   ├── package.json          
│   └── tsconfig.json         
│
├── frontend/                  
│   ├── public/
│   │   ├── index.html        
│   │   ├── app.js            
│   │   └── styles.css        
│   └── Dockerfile           
│
├── nginx/                     
│   └── nginx.conf            
│
├── docker-compose.yml        
├── README.md                 
└── .gitignore               
```

---

## 🚀 Instalación y Setup

### Opción 1: Clonar el repositorio (recomendado)

```bash
# Clona el repo
git clone https://github.com/MatiasOrrego/task_nginx.git

# Entra a la carpeta
cd task_nginx
```

### Opción 2: Descargar como ZIP

- Descarga el ZIP del repositorio
- Extrae la carpeta
- Abre una terminal en la carpeta raíz

### Configurar Variables de Entorno

Antes de levantar los servicios, **debes crear el archivo `.env` en la carpeta `backend/`**:

```bash
# Desde la raíz del proyecto
cd backend

# Copia el archivo de ejemplo
cp .env.example .env

# (En Windows, si cp no funciona, usa: copy .env.example .env)
```

**El archivo `.env` contiene:**
- Puerto del backend
- Credenciales de Postgres
- URL de conexión a la base de datos

**Importante:**
- ✅ El archivo `.env.example` está en el repositorio (puedes verlo)
- ❌ El archivo `.env` NO debe ser commiteado (está en `.gitignore`)
- ℹ️ Cada persona debe crear su propio `.env` con sus credenciales

---

## ▶️ Uso

### 1️⃣ **Levantar todos los servicios**

Desde la carpeta raíz del proyecto, ejecuta:

```bash
docker compose up --build -d
```

### 2️⃣ **Verificar que todo está corriendo**

```bash
docker compose ps
```

**Salida esperada:**
```
NAME                    STATUS              PORTS
task_nginx-db-1         Up (healthy)        0.0.0.0:5433->5432/tcp
task_nginx-backend-1    Up                  0.0.0.0:3001->3000/tcp
task_nginx-frontend-1   Up                  80/tcp
task_nginx-nginx-1      Up                  0.0.0.0:80->80/tcp
```

Todos deben estar en estado **`Up`**.

### 3️⃣ **Acceder a la aplicación**

Abre tu navegador y ve a:
```
http://localhost/
```

### 4️⃣ **Usar la aplicación**

- **Crear tarea**: Completa los campos (título, descripción, estado) y haz click en "Crear"
- **Listar tareas**: Las tareas aparecen automáticamente en la lista
- **Editar tarea**: Haz click en "Editar", modifica los valores en los prompts
- **Eliminar tarea**: Haz click en "Eliminar"

---

## ⛔ Detener los servicios

Para parar todos los contenedores sin eliminar datos:

```bash
docker compose stop
```

Para parar y eliminar todo (incluyendo volúmenes):

```bash
docker compose down -v
```

---

## 🔄 Comandos útiles

### Ver logs en vivo
```bash
# Todos los servicios
docker compose logs -f

# Solo un servicio
docker compose logs -f backend
docker compose logs -f nginx
docker compose logs -f db
```

### Reconstruir una imagen específica
```bash
docker compose up --build backend -d
```

### Entrar en un contenedor
```bash
# Backend (Node.js)
docker compose exec backend sh

# Base de datos (Postgres)
docker compose exec db psql -U postgres -d task_nginx
```

### Limpiar todo (images, containers, volúmenes)
```bash
docker compose down -v
docker system prune -a
```

---

## 🆘 Solución de Problemas

### ❌ Error: "Cannot connect to Docker daemon"

**Causa:** Docker Desktop no está corriendo.

**Solución:**
1. Abre Docker Desktop desde el menú Inicio
2. Espera a que muestre "Docker Engine is running"
3. Vuelve a ejecutar `docker compose up --build -d`

---

### ❌ Error: "Port 80 already in use"

**Causa:** Otro servicio usa el puerto 80.

**Solución:** Edita `docker-compose.yml` y cambia `80:80` a `8080:80`, luego accede a http://localhost:8080/

---

### ❌ Backend no conecta a la BD

**Causa:** Postgres no está completamente inicializado.

**Solución:**
```bash
# Espera 30 segundos, luego reinicia backend
sleep 30
docker compose restart backend
```

---

### ❌ Ver logs si algo falla

```bash
docker compose logs backend
docker compose logs nginx
docker compose logs db
```

---


## 🔐 Seguridad (Producción)

**Para producción, debes:**

1. Cambiar credenciales de Postgres (usuario/contraseña)
2. Usar variables de entorno secretas (nunca commitear `.env`)
3. Habilitar HTTPS en Nginx
4. Añadir autenticación en la API
5. Implementar validaciones y rate limiting

---

## 📋 Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/tasks` | Listar todas las tareas |
| POST | `/api/tasks` | Crear una nueva tarea |
| PUT | `/api/tasks/:id` | Actualizar una tarea |
| DELETE | `/api/tasks/:id` | Eliminar una tarea |

### Ejemplo de uso con curl

```bash
# Listar tareas
curl http://localhost/api/tasks

# Crear tarea
curl -X POST http://localhost/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Mi tarea","descripcion":"Descripción","estado":"pendiente"}'

# Actualizar tarea
curl -X PUT http://localhost/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"estado":"completada"}'

# Eliminar tarea
curl -X DELETE http://localhost/api/tasks/1
```

---

## 🛠️ Desarrollo Local (sin Docker)

Si quieres desarrollar localmente sin Docker:

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend corre en `http://localhost:3000`

### Frontend

```bash
# Desde otra terminal
npx http-server frontend/public -p 8080
```

Frontend corre en `http://localhost:8080`

**Nota:** Necesitas Postgres corriendo localmente. Actualiza `backend/.env`:
```
DATABASE_URL=postgresql://postgres:PASSWORD@localhost:5432/task_nginx
```

---

## 📞 Soporte

Si algo no funciona:

1. **Revisa los logs:** `docker compose logs`
2. **Verifica que Docker corre:** `docker ps`
3. **Reinicia todo:** `docker compose down && docker compose up --build -d`
4. **Limpia todo:** `docker compose down -v && docker compose up --build -d`

---

## 📄 Licencia

Este proyecto es de código abierto. Úsalo libremente.

---

**¡Listo! Tu aplicación debería estar corriendo en http://localhost/**
