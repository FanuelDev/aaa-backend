import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Mois from 'App/Models/Mois'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Mois.createMany([
      { libelle: 'Janvier' },
      { libelle: 'Fevrier' },
      { libelle: 'Mars' },
      { libelle: 'Avril' },
      { libelle: 'Mai' },
      { libelle: 'Juin' },
      { libelle: 'Juillet' },
      { libelle: 'Aout' },
      { libelle: 'Septembre' },
      { libelle: 'Octobre' },
      { libelle: 'Novembre' },
      { libelle: 'Decembre' },
    ])
  }
}
