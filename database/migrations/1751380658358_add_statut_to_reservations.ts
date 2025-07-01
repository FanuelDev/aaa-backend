import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddStatutToReservations extends BaseSchema {
  protected tableName = 'reservations'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('statut').defaultTo('en_attente')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('statut')
    })
  }
}
