"use strict";

const http = require('http');
const url = require('url');
const querystring = require('querystring');

// Temporary in-memory store for characters
let characters = [];
let idCounter = 1;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const method = req.method;

  if (method === 'POST' && parsedUrl.pathname === '/create-character') {
    const query = querystring.parse(parsedUrl.query);
    const { class: characterClass, gender, funFact } = query;

    if (!characterClass || !gender || !funFact) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'All fields are required.' }));
    }

    const newCharacter = {
      id: idCounter++,
      class: characterClass,
      gender: gender,
      funFact: funFact
    };

    characters.push(newCharacter);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(newCharacter));
  }

  if (method === 'POST' && parsedUrl.pathname === '/confirm-creation') {
    const query = querystring.parse(parsedUrl.query);
    const { id } = query;

    const character = characters.find(c => c.id === parseInt(id));

    if (!character) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Character not found.' }));
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ message: 'Character creation confirmed!' }));
  }

  if (method === 'GET' && parsedUrl.pathname === '/view-character') {
    const query = querystring.parse(parsedUrl.query);
    const { id } = query;

    const character = characters.find(c => c.id === parseInt(id));

    if (!character) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Character not found.' }));
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(character));
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

module.exports = server;
