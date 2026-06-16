# WebSocket Demo

Ejemplo básico de WebSockets con Node.js y Express.

## ¿Qué es WebSocket?

WebSocket es un protocolo que permite comunicación **bidireccional en tiempo real** entre cliente y servidor, sin necesidad de hacer múltiples requests HTTP.

## Estructura del Proyecto

```
server.js          - Servidor WebSocket
public/index.html  - Cliente HTML
package.json       - Dependencias
```

## Cómo Ejecutar

### 1. Instalar dependencias

```bash
npm install
```

### 2. Iniciar el servidor

```bash
npm start
```

Deberías ver:
```
Servidor corriendo en http://localhost:8080
WebSocket en ws://localhost:8080
```

### 3. Abrir el cliente

Abre tu navegador en: **http://localhost:8080**

## ¿Cómo funciona?

1. **Cliente** (navegador): Se conecta al WebSocket del servidor
2. **Usuario** escribe un mensaje y lo envía
3. **Servidor** recibe el mensaje y lo reenvía a **todos** los clientes conectados
4. **Todos los clientes** reciben y muestran el mensaje

## Pruébalo

- Abre múltiples pestañas en `http://localhost:8080`
- Escribe en una pestaña y verás el mensaje en todas las demás al instante
- Abre la consola del navegador (F12) para ver los eventos

## Conceptos Clave

- **`ws.on('connection')` ** - Evento cuando un cliente se conecta
- **`ws.on('message')`** - Evento cuando llega un mensaje
- **`wss.clients.forEach()`** - Iterar todos los clientes conectados
- **`ws.send()`** - Enviar mensaje a un cliente
- **`new WebSocket()`** - Conectarse desde el navegador
