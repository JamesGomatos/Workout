/*
Author: James Gomatos
5/3/2018
exercise.test.js

purpose: This file is responsible for integration testings the exercise route
of the api.
created: 3/24/2018
updated: 4:20/2018

*/
var app = require('../app');
var chai = require('chai');
var request = require('supertest');
var expect = chai.expect;



describe('API Tests for exercise', function() {
  var task = {
    name: 'integration test',
  };


      describe('## get exercise ', function() {
        it('should get a exercise by id', function(done) {
          request(app)
            .post('/exercise/' + exercise._id)
            .end(function(err, res) {
              expect(res.statusCode).to.equal(200);
              expect(res.body.name).to.equal('integration test');
              exercise = res.body;
              done();
            });
        });
      });


      describe('## get all weightlifting exercises ', function() {
        it('should get all weightlifting Workouts', function(done) {
          request(app)
            .get('/exercise/weightlifting')
            .end(function(err, res) {
              expect(res.statusCode).to.equal(200);
              expect(res.body.name).to.equal('integration test');
              exercise = res.body;
              done();
            });
        });
      });

      describe('## get weightlifting muscle_group: chest ', function() {
        it('should get all chest workouts', function(done) {
          request(app)
            .get('/exercise/weightlifting/chest')
            .end(function(err, res) {
              expect(res.statusCode).to.equal(200);
              expect(res.body.name).to.equal('integration test');
              exercise = res.body;
              done();
            });
        });
      });


        describe('## get weightlifting muscle_group: legs ', function() {
          it('should get all weightlifting leg Workouts', function(done) {
            request(app)
              .get('should get all leg workouts')
              .end(function(err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body.name).to.equal('integration test');
                exercise = res.body;
                done();
              });
          });
        });

        describe('## get all weightlifting muscle_group: biceps ', function() {
          it('should get all bicep workouts', function(done) {
            request(app)
              .get('/exercises/weightlifting/biceps')
              .end(function(err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body.name).to.equal('integration test');
                exercise = res.body;
                done();
              });
          });
        });

        describe('## get all weightlifting muscle_group: shoulders ', function() {
          it('should get all shoulder workouts', function(done) {
            request(app)
              .get('/exercises/weightlifting/shoulders')
              .end(function(err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body.name).to.equal('integration test');
                exercise = res.body;
                done();
              });
          });
        });

        describe('# Get all yoga exercises', function() {
          it('should get all yoga exercise', function(done) {
            request(app)
              .get('/exercise/yoga')
              .end(function(err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('array');
                done();
              });
          });
        });

        describe('Get all balance exercises', function() {
          it('should get all balance workout', function(done) {
            request(app)
              .get('/exercise/balance')
              .end(function(err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body.name).to.equal('integration test');
                done();

        });
    });
  });
