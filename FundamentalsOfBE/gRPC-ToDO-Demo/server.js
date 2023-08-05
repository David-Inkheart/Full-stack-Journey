const grpc = require('grpc');
// to compile the proto file into JS code
const protoLoader = require('@grpc/proto-loader');
// to load the proto (schema) file
const packageDef = protoLoader.loadSync('todo.proto', {});
// to load the package definition
const grpcObject = grpc.loadPackageDefinition(packageDef);
// get all the services defined in the proto file
const todoPackage = grpcObject.todoPackage;

const server = new grpc.Server();
// bind address and port(listen for connections), bypass http2 security and use insecure connection(must be secured in production)
server.bind("0.0.0.0:40000", grpc.ServerCredentials.createInsecure());

// add the service to the server
server.addService(todoPackage.Todo.service, {
  createTodo,
  readTodos,
  "readTodosStream": readStream, // To show that the name of the method doesn't matter
});

server.start();

// create an array to store the todos (ideally this would be a database)
const todos = [];
// methods in gRPC are called with a call object and a callback function (always)
function createTodo(call, callback) {
  // call.request is the request object
  const todoItem = {
    "id": todos.length + 1,
    "text": call.request.text,
  };
  todos.push(todoItem);
  // notify the client that the request was successful
  callback(null, todoItem);
}
// call object is used to read the request and all the metadata
// callback is used to send the response
function readTodos(call, callback) {
  callback(null, {"items": todos});
}
// a better way to send a bunch of data is to use a stream as against sending it all at once
function readStream(call, callback) {
  todos.forEach(item => call.write(item));
  call.end();
}