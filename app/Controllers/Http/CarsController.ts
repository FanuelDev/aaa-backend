import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Car from 'App/Models/Car'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import StoreCarValidator from 'App/Validators/StoreCarValidator'
import Application from '@ioc:Adonis/Core/Application'

export default class CarsController {
    public async public() {
        const cars = await Car.all()
        console.log(cars)
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
        } = request.qs()

        const cars = await Car.query()
            .where('statut', 'Disponible')
            .if(type_vehicule && Array.isArray(type_vehicule), (q) => q.whereIn('type_vehicule', type_vehicule)) // Vérifie si type_vehicule est un tableau et applique whereIn
            .if(gamme && Array.isArray(gamme), (q) => q.whereIn('gamme', gamme)) // Pareil pour gamme
            .if(energie && Array.isArray(energie), (q) => q.whereIn('energie', energie)) // Pareil pour energie
            .if(min_prix, (q) => q.where('prix_journalier', '>=', Number(min_prix)))
            .if(max_prix, (q) => q.where('prix_journalier', '<=', Number(max_prix)))
            .if(boite_auto, (q) => q.where('boite_auto', boite_auto === 'true'))
            .if(climatisation, (q) => q.where('climatisation', climatisation === 'true'))
            .if(gps, (q) => q.where('gps', gps === 'true'))
            .if(wifi, (q) => q.where('wifi', wifi === 'true'))
            .if(siege_bebe, (q) => q.where('siege_bebe', siege_bebe === 'true'))
            .if(chauffeur, (q) => q.where('chauffeur', chauffeur === 'true'))
            .if(longue_duree, (q) => q.where('longue_duree', longue_duree === 'true'))
            .if(mariage_event, (q) => q.where('mariage_event', mariage_event === 'true'))
            .if(marchandises, (q) => q.where('marchandises', marchandises === 'true'))
            .if(places, (q) => q.where('places', '>=', Number(places)))

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

        const cars = await Car.query()
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

        const image = payload.image

        // Enregistrement du fichier
        const fileName = `${cuid()}.${image.extname}`
        await image.move(Application.tmpPath('uploads/cars'), {
            name: fileName,
            overwrite: true,
        })

        // Récupération du reste du formulaire
        const data = request.only([
            'marque', 'modele', 'annee', 'gamme', 'prix_journalier',
            'type_vehicule', 'energie', 'boite_auto', 'climatisation',
            'gps', 'wifi', 'siege_bebe', 'chauffeur', 'longue_duree',
            'mariage_event', 'marchandises', 'places', 'statut'
        ])

        // Création du véhicule avec chemin de l'image
        const car = await Car.create({
            ...data,
            image: `uploads/cars/${fileName}`,
        })

        return response.created(car)
    }
}
