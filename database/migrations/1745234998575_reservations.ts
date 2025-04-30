import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'reservations'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('car_id').unsigned().references('id').inTable('cars').onDelete('CASCADE')
      table.date('start_date')
      table.date('end_date')

      table.boolean('chauffeur').defaultTo(false)
      table.boolean('gps').defaultTo(false)
      table.boolean('wifi').defaultTo(false)
      table.boolean('siege_bebe').defaultTo(false)

      table.integer('prix_total')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
