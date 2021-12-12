import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('JobApplication', (table: Knex.AlterTableBuilder) => {
    table.boolean('isDeleted').defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('JobApplication', (table: Knex.AlterTableBuilder) => {
    table.dropColumn('isDeleted');
  });
}
