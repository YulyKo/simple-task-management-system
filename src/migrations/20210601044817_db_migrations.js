
exports.up = async function(knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema
    .createTable('users', table => {
      table.string('username').notNullable();
      table.string('email').notNullable();
      table.string('hash');
      table.boolean('confirmed').notNullable().defaultTo(false);
      table.uuid('token').notNullable().defaultTo(knex.raw('uuid_generate_v4()'));
      table.unique(['email']);
    })
    .createTable('tasks', table => {
      table.increments('id');
      table.string('title').notNullable();
      table.string('description').notNullable();
      table.boolean('isDone').defaultTo(false);
      table.integer('priority').notNullable();
      table.timestamp('due_date').defaultTo([knex.fn.now(), 1]);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.boolean('arcived').defaultTo(false);
      table
        .integer('id')
        .unsigned()
        .references('task_id')
        .inTable('user_tasks')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable('user_tasks', table => {
      table
      .integer('user_id')
      .unsigned()
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('user_tasks')
    .dropTable('users')
    .dropTable('tasks');
};
