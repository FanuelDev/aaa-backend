import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name')
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.string('piece_justificative').nullable()
      table.string('preuve_adresse').nullable()
      table.string('remember_me_token').nullable()

      /// 0 = Super admin
      /// 1 = Caissier
      /// 2 = Gestionnaire de produit
      /// 3 = Gestionnaire de depense
      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
