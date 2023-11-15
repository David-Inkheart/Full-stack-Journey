"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var url = 'https://jsonplaceholder.typicode.com/todos/1';
axios_1.default.get(url).then(function (response) {
    var todo = response.data;
    var id = todo.id, title = todo.title, completed = todo.completed;
    logTodo({ id: id, completed: completed, title: title });
});
var logTodo = function (_a) {
    var id = _a.id, title = _a.title, completed = _a.completed;
    console.log("\n    The Todo with ID: ".concat(id, "\n    Has a title of: ").concat(title, "\n    Is it completed? ").concat(completed, "\n  "));
};
