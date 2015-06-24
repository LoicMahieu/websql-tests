
describe('Test WebSQL Broken', function () {

  var db

  beforeEach(function () {
    if (!window.openDatabase) {
      throw new Error('WebSQL not supported !')
    }

    // No way to remove existing database
    var dbName = 'test_db' + parseInt(Math.random() * 10000000)
    db = openDatabase(dbName, '0.1', 'A Test Database', 1024 * 1024)
  })

  function createUserTable (t, done) {
    t.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id unique, name)',
      [],
      done,
      onError
    )
  }

  function createUser (t, done) {
    t.executeSql(
      'INSERT INTO users (name) VALUES ("Marc")',
      [],
      done,
      onError
    )
  }

  function getUsers (t, done) {
    t.executeSql(
      'SELECT * FROM users',
      [],
      done,
      onError
    )
  }

  function onError (tx, err) {
    console.error('Got SQLError:' + err.message)
    throw err;
  }

  function defer (done) {
    setTimeout(done, 10);
  }


  it('Create table and insert user', function (done) {
    db.transaction(function (t) {
    createUserTable(t, function () {
    createUser(t, function () {
    getUsers(t, function (tx, res) {

      expect(res.rows.length == 1).toBe(true)
      done()

    })
    })
    })
    })
  })

})
