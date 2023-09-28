const express = require('express')
const cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {
    /**
     * manejamos el "this".xxx para manejar las varibles como propiedad de nuestra clase
     */
    constructor() {
        this.app = express(); // Utiliza express() para crear una instancia de la aplicación.
        this.port = process.env.PORT; // Definimos el puerto
        /* 
         CONFIGURACION PARA TRABAJAR CON SOCKET.IO NODE
        */
        this.server = require('http').createServer(this.app); 
        this.io = require('socket.io')(this.server); //Nuestro servidor de socket
        this.path = {}
    
        this.middlewares();
        //RUTAS DE MI APLICACION
        this.router();

        this.sockets();
    }

    //MIDDLEWARES SE EJECUNTAN A NIVEL DE SERVIDOR ANTES DE INGRESAR A A LAS RUTAS
    middlewares() {
        //CORS
        this.app.use(cors())
        //LECTURA Y PARSEO DEL DEL BODY
        this.app.use(express.json());
        //DIRECCION PUBLICA
        this.app.use(express.static('public'));

    }

    router() {
        /* this.app.use(this.path.usuariosPath, require('../routes/usuarios')); */

    }
    
    sockets(){
        /***
         * SOCKET ENVIO DE ENVENTO
         */
        this.io.on("connection", socketController );
    }
    
    //EJECUTAMOS NUESTRO LISTEN(cambiamos el this.app por el this.server)
    listen() {
        this.server.listen(this.port, () => console.log(`Example app listening on port ${this.port}!`)); // Usa this.port en lugar de port.
    }
    
}

module.exports = {
    Server
};
