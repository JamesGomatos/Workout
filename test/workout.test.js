/*
Author: James Gomatos
5/3/2018
exercise.test.js

purpose: This file is responsible for integration testings the workout route
of the api.
created: 3/24/2018
updated: 4:20/2018

*/
var app = require('../app');
var chai = require('chai');
var request = require('supertest');
var expect = chai.expect;



describe('API Tests for workout', function() {
  var task = {
    name: 'integration test',
  };


  describe('## Create Workout ', function() {
    it('should create a Workout', function(done) {
      request(app)
        .post('/workout/create/workout')
        .send(Workout)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.name).to.equal('integration test');
          workout = res.body;
          done();
        });
    });
  });

    describe('# Get all workouts', function() {
      it('should get all user workouts', function(done) {
        request(app)
          .get('/workouts')
          .end(function(err, res) {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('array');
            done();
          });
      });
    });

    describe('Get a workout by id', function() {
      it('should get a workout', function(done) {
        request(app)
          .get('/workout/' + task._id)
          .end(function(err, res) {
            expect(res.statusCode).to.equal(200);
            expect(res.body.name).to.equal('integration test');
            done();
          });
      });
    });


    describe('Get a list of most liked workouts', function() {
      it('should get a workout', function(done) {
        request(app)
          .get('/workout/most-liked')
          .end(function(err, res) {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body.name).to.equal('integration test');
            done();
          });
      });
    });

    describe('Delete a workout by id', function() {
      it('should delete a task', function(done) {
        request(app)
          .delete('/workout/' + workout._id)
          .end(function(err, res) {
            expect(res.statusCode).to.equal(200);
            expect(res.body.message).to.equal('Workout successfully deleted');
            done();
        });

      describe('follow a workout by id', function() {
        it('should delete a task', function(done) {
          request(app)
            .delete('/follow/workout/' + workout._id)
            .end(function(err, res) {
              expect(res.statusCode).to.equal(200);
              expect(res.body.message).to.equal('Workout successfully followed');
              done();
        });


        describe('unfollow a workout by id', function() {
          it('should delete a task', function(done) {
            request(app)
              .delete('/unfollow/workout/' + workout._id)
              .end(function(err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body.message).to.equal('Workout successfully unfollowed');
                done();
          });
    });
  });
});
