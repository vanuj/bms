const { response } = require('express');
const request = require('supertest');
const app = require('./app');

describe('SEAT service APIs', () => {
  it(' GET : /seat ===> List of seats and Status : 200 OK' , () => {
    return request(app)
      .get('/seat')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining(
            [{
              mID: 1,
              tID: 1,
              seatInfoMap: expect.any(Array),
              showID: 1
            }]
          )
        )
      })
  });

  it(' GET : /seater ===> Not Found and Status : 404' , () => {
    return request(app)
      .get('/seater')
      .expect('Content-Type', /html/)
      .expect(404)
      .then((response) => {
        expect(response.text).toEqual('Not Found')
      })
  });
});