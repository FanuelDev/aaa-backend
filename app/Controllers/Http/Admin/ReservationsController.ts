// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Reservation, { StatutReservation } from "App/Models/Reservation"

export default class ReservationsController {
    public async index() {
        // return await Reservation.query().preload('User').preload('car')
    }

    public async validate({ params, response }) {
        const reservation = await Reservation.find(params.id)
        if (!reservation) return response.notFound()

        reservation.statut = StatutReservation.VALIDEE

        await reservation.save()
        return { message: 'Réservation validée' }
    }

}
