import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Car from 'App/Models/Car'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import StoreCarValidator from 'App/Validators/StoreCarValidator'
import Application from '@ioc:Adonis/Core/Application'

export default class CarsController {
    public async public() {
        const cars = await Car.query().where('is_delete', false)
        return cars
    }

    public async show({ params, response }: HttpContextContract) {
        const car = await Car.find(params.id)

        if (!car) {
            return response.notFound({ message: 'Voiture non trouvée' })
        }

        return car
    }

    public async filter({ request }: HttpContextContract) {
        const {
            type_vehicule,
            gamme,
            energie,
            min_prix,
            max_prix,
            boite_auto,
            climatisation,
            gps,
            wifi,
            siege_bebe,
            chauffeur,
            longue_duree,
            mariage_event,
            marchandises,
            places,
            date_debut,
            date_fin
        } = request.qs()

        const cars = await Car.query().where('is_delete', false)
            .where('statut', 'Disponible')
            .if(type_vehicule && Array.isArray(type_vehicule), (q) => q.whereIn('type_vehicule', type_vehicule))
            .if(gamme && Array.isArray(gamme), (q) => q.whereIn('gamme', gamme))
            .if(energie && Array.isArray(energie), (q) => q.whereIn('energie', energie))
            .if(min_prix, (q) => q.where('prix_journalier', '>=', Number(min_prix)))
            .if(max_prix, (q) => q.where('prix_journalier', '<=', Number(max_prix)))
            .if(boite_auto !== undefined, (q) => q.where('boite_auto', boite_auto === 'true' ? 1 : 0))
            .if(climatisation !== undefined, (q) => q.where('climatisation', climatisation === 'true' ? 1 : 0))
            .if(gps !== undefined, (q) => q.where('gps', gps === 'true' ? 1 : 0))
            .if(wifi !== undefined, (q) => q.where('wifi', wifi === 'true' ? 1 : 0))
            .if(siege_bebe !== undefined, (q) => q.where('siege_bebe', siege_bebe === 'true' ? 1 : 0))
            .if(chauffeur !== undefined, (q) => q.where('chauffeur', chauffeur === 'true' ? 1 : 0))
            .if(longue_duree !== undefined, (q) => q.where('longue_duree', longue_duree === 'true' ? 1 : 0))
            .if(mariage_event !== undefined, (q) => q.where('mariage_event', mariage_event === 'true' ? 1 : 0))
            .if(marchandises !== undefined, (q) => q.where('marchandises', marchandises === 'true' ? 1 : 0))
            .if(places, (q) => q.where('places', '>=', Number(places)))
            .if(date_debut && date_fin, (q) => {
                q.whereNotExists((sub) => {
                    sub.from('reservations')
                        .whereRaw('reservations.car_id = cars.id')
                        .where('statut', 'Confirmée')
                        .where((builder) => {
                            builder
                                .whereBetween('start_date', [date_debut, date_fin])
                                .orWhereBetween('end_date', [date_debut, date_fin])
                                .orWhere((b) => {
                                    b.where('start_date', '<=', date_debut)
                                        .andWhere('end_date', '>=', date_fin)
                                })
                        })
                })
            })

        return cars
    }



    public async index({ request }: HttpContextContract) {
        const {
            type_vehicule,
            gamme,
            energie,
            min_prix,
            max_prix,
            boite_auto,
            climatisation,
            gps,
            wifi,
            siege_bebe,
            chauffeur,
            longue_duree,
            mariage_event,
            marchandises,
            places,
        } = request.qs()

        const cars = await Car.query().where('is_delete', false)
            .if(type_vehicule, (query) => query.where('type_vehicule', type_vehicule))
            .if(gamme, (query) => query.where('gamme', gamme))
            .if(energie, (query) => query.where('energie', energie))
            .if(min_prix, (query) => query.where('prix_journalier', '>=', Number(min_prix)))
            .if(max_prix, (query) => query.where('prix_journalier', '<=', Number(max_prix)))
            .if(boite_auto, (query) => query.where('boite_auto', boite_auto === 'true'))
            .if(climatisation, (query) => query.where('climatisation', climatisation === 'true'))
            .if(gps, (query) => query.where('gps', gps === 'true'))
            .if(wifi, (query) => query.where('wifi', wifi === 'true'))
            .if(siege_bebe, (query) => query.where('siege_bebe', siege_bebe === 'true'))
            .if(chauffeur, (query) => query.where('chauffeur', chauffeur === 'true'))
            .if(longue_duree, (query) => query.where('longue_duree', longue_duree === 'true'))
            .if(mariage_event, (query) => query.where('mariage_event', mariage_event === 'true'))
            .if(marchandises, (query) => query.where('marchandises', marchandises === 'true'))
            .if(places, (query) => query.where('places', '>=', Number(places)))

        return cars
    }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(StoreCarValidator)

    const imagePaths: string[] = []

    if (payload.images && payload.images.length > 0) {
      for (const image of payload.images) {
        const fileName = `${cuid()}.${image.extname}`
        await image.move(Application.tmpPath('uploads/cars'), {
          name: fileName,
          overwrite: true,
        })
        imagePaths.push(`uploads/cars/${fileName}`)
      }
    }

    // Récupération des champs envoyés
    const rawData = request.only([
      'marque', 'modele', 'annee', 'gamme', 'prix_journalier',
      'type_vehicule', 'energie', 'boite_auto', 'climatisation',
      'gps', 'wifi', 'siege_bebe', 'chauffeur', 'longue_duree',
      'mariage_event', 'marchandises', 'places', 'statut'
    ])

    // Cast booléens → 0 ou 1
    const booleanFields = [
      'boite_auto', 'climatisation', 'gps', 'wifi', 'siege_bebe',
      'chauffeur', 'longue_duree', 'mariage_event', 'marchandises',
    ]

    for (const field of booleanFields) {
      if (rawData[field] !== undefined) {
        rawData[field] = rawData[field] === 'true' || rawData[field] === true ? 1 : 0
      }
    }

    // Création de la voiture
    const car = await Car.create({
      ...rawData,
      image: JSON.stringify(imagePaths),
    })

    return response.created(car)
  }


  public async update({ params, request, response }: HttpContextContract) {
    const car = await Car.find(params.id)
    if (!car) {
      return response.notFound({ message: 'Voiture non trouvée' })
    }

    let imagePaths: string[] = car.image ? JSON.parse(car.image) : []

    const newImages = request.files('images', {
      size: '5mb',
      extnames: ['jpg', 'png', 'jpeg', 'webp'],
    })

    if (newImages) {

      if (newImages.length >= 4) {
        imagePaths = [];
        for (const image of newImages) {
          if (imagePaths.length >= 4) break
          const fileName = `${cuid()}.${image.extname}`
          await image.move(Application.tmpPath('uploads/cars'), {
            name: fileName,
            overwrite: true,
          })
          imagePaths.push(`uploads/cars/${fileName}`)
        }
      } else {
        return response.notFound({ message: 'Ajouter plus d\'image, 4 images' })
      }
    } else {
      imagePaths = JSON.parse(car.image)
    }


    // Données
    const rawData = request.only([
      'marque', 'modele', 'annee', 'gamme', 'prix_journalier',
      'type_vehicule', 'energie', 'boite_auto', 'climatisation',
      'gps', 'wifi', 'siege_bebe', 'chauffeur', 'longue_duree',
      'mariage_event', 'marchandises', 'places', 'statut'
    ])

    // Cast booléens → 0 ou 1
    const booleanFields = [
      'boite_auto', 'climatisation', 'gps', 'wifi', 'siege_bebe',
      'chauffeur', 'longue_duree', 'mariage_event', 'marchandises',
    ]

    for (const field of booleanFields) {
      if (rawData[field] !== undefined) {
        rawData[field] = rawData[field] === 'true' || rawData[field] === true ? 1 : 0
      }
    }

    // Convertir "places" en entier ou NULL
    if (rawData['places'] !== undefined) {
      rawData['places'] = rawData['places'] === null || rawData['places'] === 'null' || rawData['places'] === ''
        ? null
        : Number(rawData['places'])
    }

    car.merge({
      ...rawData,
      image: JSON.stringify(imagePaths),
    })

    await car.save()

    return response.ok({ message: 'Voiture mise à jour', car })
  }


  public async destroy({ params, response }: HttpContextContract) {
    const car = await Car.find(params.id)

    if (!car) {
      return response.notFound({ message: 'Voiture non trouvée' })
    }

    car.isDelete = true
    await car.save()

    return response.ok({ message: 'Voiture supprimée (soft delete)', car })
  }

}
