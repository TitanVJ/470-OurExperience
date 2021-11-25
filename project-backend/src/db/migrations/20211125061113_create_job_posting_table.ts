import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('JobPosting', (table: Knex.CreateTableBuilder) => {
    table.increments();
    table.integer('companyId').unsigned().notNullable().references('id').inTable('Company').onDelete('CASCADE');
    table.timestamp('deadline').notNullable();
    table.text('description').notNullable();
    table.string('title', 100).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('JobPosting');
}
