const grpc = require('grpc');
// to compile the proto file into JS code
const protoLoader = require('@grpc/proto-loader');
// to load the proto (schema) file
const packageDef = protoLoader.loadSync('todo.proto', {});
// to load the package definition
const grpcObject = grpc.loadPackageDefinition(packageDef);
// get all the services defined in the proto file
const todoPackage = grpcObject.todoPackage;

const text = process.argv[2];
const client = new todoPackage.Todo('localhost:40000', grpc.credentials.createInsecure());

client.createTodo({
  "id": -1,
  text,
}, (err, response) => {
  console.log('Recieved from server: ', response);
});

// client.readTodos({}, (err, response) => {
  // console.log('Recieved from server: ', response);
//   if (response.items) {
//     response.items.forEach(item => console.log(item));
//   }
// });

const call = client.readTodosStream();
call.on('data', item => console.log("Recieved from server: ", item));

call.on('end', e => console.log("Server done!"));

// on the terminal, run the server first and then the client
// node client.js "Do stuff"