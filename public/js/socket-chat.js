var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};



socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        //console.log('Usuarios conectados', resp);
        renderizarUsuarios(resp);

    });

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('crearMensaje', {
//     nombre: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {
    //console.log('Servidor:', mensaje);
    renderizarMensajes(mensaje, false);
    scrollBottom();

});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('listaPersona', function(personas) {
    //console.log(personas);
    renderizarUsuarios(personas);


});

// Mensajes privados
socket.on('mensajePrivado', function(mensaje) {

    console.log('Mensaje Privado:', mensaje);

});




/**
 
//para detectar cuando un usuario está escibiendo, 
video 206, comentario escrito por un usuario

// socket-chat-jquery.js
$('#txtMensaje').keypress(function(e) {
 
 console.log('keypress', e.target.value);
 socket.emit('typingText', { usuario: usuario, value: e.target.value });
 
});
 
 
// socket.js
client.on('typingText', (data) => {
   let persona = usuarios.getPersona(client.id);
   console.log(persona.nombre + ' Esta tipeando: ' + data.value);
   client.broadcast.to(data.usuario.sala).emit('typingText', { typing: true });
});

 */