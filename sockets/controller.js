const socketController = (socket) => {

    console.log('cliente conectado', socket.id);
            
    //funcion para desconectar nuestro cliente
    socket.on('disconnect', () => {
        console.log('CLiente desconectado')
    })

    //escuchamos el envento enviado desde el frond end (button enviar)
    socket.on('enviar_mensaje', (data, collback) => {
        
        const id = 123456
        //retornamos un identificador al evento que realizo la accion de enviar data al servidor
        collback(id);

        //enviamos el eventos que escuchamos al front end (cliente)
        //broadcast nos permite enviar la infor a todos y duplicar la info para nosotros
        socket.broadcast.emit('enviar_mensaje', data)
    })

}

module.exports = {
    socketController
}