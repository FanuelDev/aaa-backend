// app/Controllers/Http/ReservationsController.ts
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Reservation from 'App/Models/Reservation'
import StoreReservationValidator from 'App/Validators/StoreReservationValidator'
import Car from 'App/Models/Car'
import dayjs from 'dayjs'
import CalculateTotalValidator from 'App/Validators/CalculateTotalValidator'

export default class ReservationsController {

    public async store({ auth, request, response }: HttpContextContract) {
        await auth.use('api').authenticate()
        const user = auth.user!



        const payload = await request.validate(StoreReservationValidator)
        const car = await Car.findOrFail(payload.car_id)


        const existing = await Reservation
            .query()
            .where('id', payload.car_id)
            .where(q => {
                q.whereBetween('start_date', [payload.start_date.toJSDate(), payload.end_date.toJSDate()])
                    .orWhereBetween('end_date', [payload.start_date.toJSDate(), payload.end_date.toJSDate()])
                    .orWhereRaw('? BETWEEN start_date AND end_date', [payload.start_date.toJSDate()])
                    .orWhereRaw('? BETWEEN start_date AND end_date', [payload.end_date.toJSDate()])
            })
            .first()

        if (existing) {
            return response.badRequest({ message: 'Ce véhicule est déjà réservé sur cette période.' })
        }

        // calcul des jours
        const start = dayjs(payload.start_date.toJSDate())
        const end = dayjs(payload.end_date.toJSDate())
        const days = end.diff(start, 'day') + 1

        if (days <= 0) {
            return response.badRequest({ message: 'Dates invalides' })
        }

        // Prix options supplémentaires
        // const optionsPrice = [
        //     payload.chauffeur ? 20000 : 0,
        //     payload.gps ? 10000 : 0,
        //     payload.wifi ? 10000 : 0,
        //     payload.siege_bebe ? 10000 : 0,
        // ].reduce((a, b) => a + b, 0)

        const optionsPrice = 0

        const prixTotal = (car.prix_journalier * days) + optionsPrice

        const reservation = await Reservation.create({
            userId: user.id,
            carId: car.id,
            startDate: payload.start_date,
            endDate: payload.end_date,
            prix_total: prixTotal,
        })

        return response.created(reservation)
    }

    public async calculateTotal({ request, response }: HttpContextContract) {
        const payload = await request.validate(CalculateTotalValidator)

        const {
            carId,
            startDate,
            endDate,
            chauffeur = false,
            gps = false,
            wifi = false,
            siegeBebe = false,
            climatisation = false,
            boiteAuto = false,
        } = payload

        const car = await Car.findOrFail(carId)

        if (!car) {
            return response.status(404).json({ message: 'Véhicule introuvable' })
        }

        const start = new Date(startDate.toJSDate())
        const end = new Date(endDate.toJSDate())
        const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24))

        if (days <= 0) {
            return response.status(400).json({ message: 'Période invalide' })
        }

        const base = car.prix_journalier * days

        // Montants des options (tu peux les modifier à volonté)
        const PRIX_OPTIONS = {
            chauffeur: 10000,
            gps: 5000,
            wifi: 5000,
            siegeBebe: 3000,
            climatisation: 4000,
            boiteAuto: 4000,
        }

        const totalOptions =
            (chauffeur ? PRIX_OPTIONS.chauffeur : 0) +
            (gps ? PRIX_OPTIONS.gps : 0) +
            (wifi ? PRIX_OPTIONS.wifi : 0) +
            (siegeBebe ? PRIX_OPTIONS.siegeBebe : 0) +
            (climatisation ? PRIX_OPTIONS.climatisation : 0) +
            (boiteAuto ? PRIX_OPTIONS.boiteAuto : 0)

        const total = base + totalOptions

        return {
            jours: days,
            prixJournalier: car.prix_journalier,
            montantBase: base,
            totalOptions,
            total,
        }
    }
}
