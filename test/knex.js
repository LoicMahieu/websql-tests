
var Knex = require('knex');

describe('Test Knex Broken', function () {

  var knex

  beforeEach(function () {
    if (!window.openDatabase) {
      throw new Error('WebSQL not supported !')
    }

    knex = Knex({
      client: 'websql'
    });
  })

  it('Create table and insert book', function (done) {

    knex.schema.dropTableIfExists('books')
      .then(function () {
        return knex.schema.createTable('books', function (table) {
          table.increments();
          table.string('name');
          table.timestamps();
        });
      })
      .then(function () {
        return knex.insert({name: 'Old Books'}, 'id')
          .into('books');
      })
      .then(function () {
        return knex.select().table('books');
      })
      .then(function(books) {
        expect(books.length).toEqual(1);
        expect(books[0].name).toEqual('Old Books');
        done();
      });

  });

});
