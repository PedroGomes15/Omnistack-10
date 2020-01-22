import socketio from 'socket.io-client'

const socket = socketio('http://10.0.1.130:1406',{
    autoConnect: false,
})

function subscribeToNewDevs(subscribeFunction){
    socket.on('new-dev', text =>{
        console.log(text)
        subscribeFunction
    })
}

function connect(latitude, longitude, techs){
    socket.io.opts.query={
        latitude,
        longitude,
        techs
    };

    socket.connect();
}

function disconnect(){
    if(socket.connected)
    {
        socket.disconnect();
    }
}

export{
    connect,
    disconnect,
    subscribeToNewDevs,
}