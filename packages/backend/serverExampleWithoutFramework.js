/*
I started ti write server without framework, but then thought it would be better to show
how I usually build backend.
Still here would be sample (without dynamic routes, he-he).

const { Server } = require('http')
const fs = require('fs');
const url = require('url');

const server = new Server();

server.on('request', (req, res) => {

  const pathname = decodeURI(url.parse(req.url).pathname);

  if (req.method === 'GET') {
    if (pathname === '/') {
      res.statusCode = 200;
      res.end('jsonData');
    }

    if (pathname === '/api/users') {
      fs.readFile('data/data.json', (error, content) => {
        if (error) {
          console.log(error);
        }
        res.write(content);
        res.end();
      });
    }

    if (pathname == '/api/users/:id') {
      console.log(id);
      res.end('hui');
    }
  }
 //res.end('hello');
});
*/
