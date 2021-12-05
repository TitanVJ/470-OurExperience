import { Knex } from 'knex';
import tableNames from '../../constants/tableNames';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableNames.user, (table: Knex.CreateTableBuilder) => {
    table.increments().notNullable();
    table.string('username').notNullable();
    table.string('password', 127).notNullable();
    table.enum('role', ['Student', 'Staff']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableNames.user);
}
