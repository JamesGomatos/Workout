/*
Author: James Gomatos
5/3/2018
autehntication.test.js

purpose: This file is responsible for integration testing the authentication system
of the api.
created: 3/24/2018
updated: 4:20/2018

*/
var app = require('../app');
var chai = require('chai');
var request = require('supertest');
var expect = chai.expect;



describe('API Tests', function() {
  var task = {
    name: 'integration test',
  };


      describe('## Sign up User ', function() {
        it('should create a user in the DB', function(done) {
          var user: {
            username: "james",
            email: "james.gomatos@gmail.com",
            password: "dog"
          }
          request(app)
            .post('/sign-up')
            .send(user)
            .end(function(err, res) {
              expect(res.statusCode).to.equal(200);
              expect(res.body.name).to.equal('integration test');
              user = res.body;
              done();
            });
        });
      });

      describe('## Sign up User ', function() {
        it('should fail to create a user in the DB', function(done) {
          var user: {
            username: "james",
            email: 13131,
            password: "dog"
          }
          request(app)
            .post('/sign-up')
            .send(user)
            .end(function(err, res) {
              expect(res.statusCode).to.equal(422);
              expect(res.body.name).to.equal('integration test');
              user = res.body;
              done();
            });
        });
      });

      describe('## Sign in User ', function() {
        it('should sucessfully sign in a user', function(done) {
          var user: {
            username: "james",
            email: "james.gomatos@gmail.com",
            password: "dog"
          }
          request(app)
            .post('/sign-in')
            .send(user)
            .end(function(err, res) {
              expect(res.statusCode).to.equal(200);
              expect(res.body.name).to.equal('integration test');
              user = res.body;
              done();
            });
        });
      });

      describe('## Sign in User ', function() {
        it('should fail to sign in a user', function(done) {
          var user: {
            username: "james",
            password: "NOTMYPASSWORD"
          }
          request(app)
            .get('/sign-in')
            .end(function(err, res) {
              expect(res.statusCode).to.equal(422);
              expect(res.body.name).to.equal('integration test');
              exercise = res.body;
              done();
            });
        });
      });
