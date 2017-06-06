"use strict";

const request = require('supertest');

describe('Valid request', () => {
  let server;
  
  beforeEach(() => {
    delete require.cache[require.resolve('./server')]; 
    server = require('./server');
  });
  afterEach((done) => {
    server.close(done);
  });
  
  it('respond to /1450137600', (done) => {
    request(server)
      .get('/1450137600')
      .expect(200, {
        unix: '1450137600',
        natural: 'December 15, 2015'
      }, done);
  });
  
  it('respond to /December%2015,%202015', (done) => {
    request(server)
      .get('/December%2015,%202015')
      .expect(200, {
        unix: '1450137600',
        natural: 'December 15, 2015'
      }, done);
  });
});

describe('Invalid request', () => {
  let server;
  
  beforeEach(() => {
    delete require.cache[require.resolve('./server')]; 
    server = require('./server');
  });
  afterEach((done) => {
    server.close(done);
  });
  
  it('respond to /14jajals50137600', (done) => {
    request(server)
      .get('/14jajals50137600')
      .expect(200, {
        unix: null,
        natural: null
      }, done);
  });
});