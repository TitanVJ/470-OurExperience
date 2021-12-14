import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Event', (table: Knex.CreateTableBuilder) => {
    table.increments();
    table.string('title', 100).notNullable();
    table.text('description').notNullable();
    table.timestamp('date').notNullable().defaultTo(knex.fn.now());
    table.string('location', 100).notNullable();
    table.integer('capacity').unsigned();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('Event');
}
