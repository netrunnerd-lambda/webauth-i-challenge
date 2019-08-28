const db = require('../database');
const tb = 'users';

exports.list = input => {
  if (input) {
    return isNaN(input) ? db(tb).where({ username: input }).first()
                        : db(tb).where({ id: input }).first();
  }

  return db(tb);
};

exports.new = user => {
  return db(tb)
          .insert(user)
          .then(([ id ]) => this.list(id));
};

exports.remove = id => {
  return db(tb)
          .where({ id })
          .del();
};

exports.update = (id, user) => {
  return db(tb)
          .where({ id })
          .update(user)
          .then(() => this.list(id));
};