import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('JobApplication', (table: Knex.CreateTableBuilder) => {
    table.increments();
    table.integer('postingId').unsigned().notNullable().references('id').inTable('JobPosting');
    table.integer('userId').unsigned().notNullable().references('id');
    table.enum('status', ['submitted', 'selected-for-interview', 'not-selected-for-interview', 'offered', 'not-offered', 'offered-declined', 'offered-accepted']);
    table.timestamp('submittedAt').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('JobApplication');
}
