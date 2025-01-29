import http from "http";
import app from './src/app.js';
import { Server } from 'socket.io';
import swaggerjsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || "3000");
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const swaggerOptions = {
  swaggerDefinition: {
      openapi: '3.1.0',
      info: {
          title: 'Grocery Store API',
          description: 'Grocery Store API Information',
      },
      servers: [
          {
              url: "http://localhost:3000"
          }
      ],
  },
  apis: ['./src/routes/*.js']
}

const swaggerDocs = swaggerjsdoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('Utilisateur connecté :', socket.id);

  socket.on('sendMessage', (message) => {
    console.log('Message reçu :', message);
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('Utilisateur déconnecté :', socket.id);
  });
});

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);
