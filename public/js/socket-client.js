//Para que la app escuche al servidor tenemos que usar un objeto que expone 
//la siguiente libreria que esta declarado en el index.html(<script src = "./socket.io/socket.io.js"></script>)

// este sera el socket del cliente es decir llamara al metodo socket() que se encuntra en nuestro server.js
const socket = io();

const lblConnect = document.querySelector('#lblOnline')
const lblDisconnect = document.querySelector('#lblOffline')

const button = document.querySelector('#btnEnviar')
const input = document.querySelector('#inputEnviar')


/* 
listener son commo una especie de observables que estan escuchando cambios o eventos
 */
 //el "on" sirve para escuchar eventos -- en este caso escuchamos cuando nos conectamos al servidor
socket.on('connect', () => {
    console.log('Conectado');
    lblDisconnect.style.display = 'none';
    lblConnect.style.display = '';
}) 

socket.on('disconnect', () => {
    console.log('Desconectado');

    lblConnect.style.display = 'none';
    lblDisconnect.style.display = '';
}) 


/***
 *COMUNICACION  
 ***/ 
 //(1)ENVIAMOS AL SERVIDOR
button.addEventListener('click', () => {
    console.log('dddd');
    const mensaje = input.value;
    const data = {
        mensaje,
        id:'123ABC',
        dni: 123456
    }
    //creamos un nuevo listener que por el lado del servidor tiene que estar escuchando lo emito
    //ojo se debe crear un escuchador por el lado del servidos
    socket.emit('enviar_mensaje', data, (id) => {
        console.log('desde el server: ' + id );
    })
})

//RECIVIMOS LA INFORMACION ENVIADA AL SERVIDOR
//UNA VES ENVINDA LA INFORMACION(1) Y PROCESADA O ESCUCHADA POR EL SERVIDOR QUE INMEDIATAMENTE LO ENVIA
//RECEPCIONAMOS LA INFORMACION DE ESTA MANERA
socket.on('enviar_mensaje', (data) => {
    console.log(data);
})
 
