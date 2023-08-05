import dgram from 'dgram';

const socket = dgram.createSocket('udp4');
socket.bind(5500, 'localhost');
socket.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

//use nc -u 127.0.0.1 5500 to specify the port and ip address
// this uses netcat to act as client and send a message to the server, so you can test it