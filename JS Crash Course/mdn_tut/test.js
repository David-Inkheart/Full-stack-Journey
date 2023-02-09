#!/usr/bin/node

const request = require('request');
const url = 'https://jsonplaceholder.typicode.com/users';
request(url, function (error, response, body) {
  if (error) {
    console.log(error);
  } else {
    console.log(JSON.parse(body));
  }
});
