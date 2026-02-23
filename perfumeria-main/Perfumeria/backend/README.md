# Perfumeria Backend

Este es el backend oficial para el e-commerce de Perfumeria, construido con Node.js, Express, MongoDB y Mercado Pago.

## Requisitos

- Node.js (v14 o superior)
- MongoDB (local o Atlas)

## Instalación

1. Navega a la carpeta `backend`:
   ```bash
   cd backend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

## Configuración

Crea un archivo `.env` en la raíz de `backend` con el siguiente contenido:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/perfumeria
JWT_SECRET=tu_clave_secreta_super_segura
MERCADOPAGO_ACCESS_TOKEN=TEST-tu-access-token-de-mercado-pago
```

## Ejecución

- **Modo Desarrollo** (requiere nodemon, puedes instalarlo con `npm i -D nodemon` o usar node simple):
  ```bash
  node server.js
  ```

## Endpoints Principales

### Auth
- `POST /api/auth/register`: Registro de usuario
- `POST /api/auth/login`: Login de usuario

### Productos
- `GET /api/products`: Listar todos los perfumes
- `GET /api/products/:id`: Detalle de un perfume
- `POST /api/products`: Clave admin requerida (implementar middleware si es necesario)

### Pagos
- `POST /api/payment/create-preference`: Crear preferencia de pago
- `POST /api/payment/webhook`: Webhook para notificaciones de pago

## Estructura de Proyecto

- `controllers/`: Lógica de negocio
- `models/`: Esquemas de Mongoose
- `routes/`: Definición de rutas
- `middlewares/`: Middlewares personalizados (Auth)
- `config/`: Conexión a DB
