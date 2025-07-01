import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Admin from 'App/Models/Admin'
import Hash from '@ioc:Adonis/Core/Hash'

export default class extends BaseSeeder {
  public async run () {
    await Admin.updateOrCreate(
      { email: 'admin@gmail.com' },
      {
        password: await Hash.make('Admin'),
      }
    )
  }
}
