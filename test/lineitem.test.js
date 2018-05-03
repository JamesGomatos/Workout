/*
Author: James Gomatos
5/3/2018
lineitem.test.js

purpose: This file is responsible for integration testing the lineitem route.
of the api.
created: 3/24/2018
updated: 4:20/2018

*/
var app = require('../app');
var chai = require('chai');
var request = require('supertest');
var expect = chai.expect;



describe('API Tests for lineitem', function() {
  var task = {
    name: 'integration test',
  };


  describe('Add a lineitem to a workout', function() {
    it('should delete a task', function(done) {
      var lineitem = {
        workout_id: 1,
        exercise_id:2
      }
      request(app)
        .post('/add/line-item')
        .send(lineitem)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('lineitem successfully added');
          done();
      });



    describe('Delete a lineitem from a workout', function() {
      it('should delete a task', function(done) {
        var lineitem = {
          workout_id: 1,
          exercise_id:2
        }
        request(app)
          .delete('/delete/line-item')
          .send(lineitem)
          .end(function(err, res) {
            expect(res.statusCode).to.equal(200);
            expect(res.body.message).to.equal('lineitem successfully deleted');
            done();
        });

      describe('Do not add a lineitem from a workout', function() {
        it('should delete a task', function(done) {
          var lineitem = {
            workout_id: 1,
            exercise_id:'adadad'
          }
          request(app)
            .delete('/add/line-item')
            .send(lineitem)
            .end(function(err, res) {
              expect(res.statusCode).to.equal(422);
              expect(res.body.message).to.equal('Invalid Input');
              done();
          });


        describe('Do no delete a lineitem from a workout', function() {
          it('should delete a task', function(done) {
            var lineitem = {
              workout_id: 1,
              exercise_id: 'adadead'
            }
            request(app)
              .delete('/delete/line-item')
              .send(lineitem)
              .end(function(err, res) {
                expect(res.statusCode).to.equal(422);
                expect(res.body.message).to.equal('Invalid Input');
                done();
            });
        });
  });
});
