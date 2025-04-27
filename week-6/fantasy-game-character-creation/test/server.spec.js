"use strict";

const http = require('http');
const request = require('supertest');
const server = require('../src/server');

describe('Character Creation API', () => {
  let character = {};

  it('should create a character with valid data', async () => {
    const res = await request(server)
      .post('/create-character')
      .query({
        class: 'Warrior',
        gender: 'Male',
        funFact: 'Has a pet dragon'
      });

    // Save the created character for future use
    character = res.body;
    expect(res.status).toBe(200);
    expect(character).toHaveProperty('id');
    expect(character.class).toBe('Warrior');
    expect(character.gender).toBe('Male');
    expect(character.funFact).toBe('Has a pet dragon');
  });

  it('should confirm character creation', async () => {
    const res = await request(server)
      .post('/confirm-creation')
      .query({ id: character.id });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Character creation confirmed!');
  });

  it('should retrieve the created character', async () => {
    const res = await request(server).get(`/view-character?id=${character.id}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(character.id);
    expect(res.body.class).toBe('Warrior');
    expect(res.body.gender).toBe('Male');
    expect(res.body.funFact).toBe('Has a pet dragon');
  });
});
