exports.up = kn => {
  return kn
          .schema
          .createTable('users', tb => {
            tb
              .increments();

            tb
              .string('username')
              .notNullable()
              .unique();

            tb
              .string('password')
              .notNullable();
          });
};

exports.down = kn => {
  return kn
          .schema
          .dropTableIfExists('users');
};