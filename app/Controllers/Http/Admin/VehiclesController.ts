// app/Controllers/Http/Admin/VehiclesController.ts
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Car from 'App/Models/Car'

export default class VehiclesController {
  public async index({}: HttpContextContract) {
    const cars = await Car.query().where('is_delete', false)
      .select('id', 'marque', 'modele', 'annee', 'prix_journalier', 'image', 'statut', 'gamme', 'climatisation', 'type_vehicule', 'energie', 'boite_auto', 'places')
      .orderBy('created_at', 'desc')

    return cars.map((car) => ({
      id: car.id,
      marque: car.marque,
      modele: car.modele,
      annee: car.annee,
      prix_journalier: car.prix_journalier,
      image: car.image,
      statut: car.statut,
      gamme: car.gamme,
      climatisation: car.climatisation,
    }))
  }
}
