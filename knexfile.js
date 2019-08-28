module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/users.db'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    pool: {
      afterCreate: (conn, done) => conn.run('PRAGMA foreign_keys = ON', done)
    },
    useNullAsDefault: true
  }
};
