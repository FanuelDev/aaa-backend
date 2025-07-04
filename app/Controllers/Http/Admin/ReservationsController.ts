// app/Controllers/Http/Admin/ReservationsController.ts
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Reservation, { StatutReservation } from 'App/Models/Reservation'

export default class ReservationsController {
    // 🔍 Liste des réservations
    public async index({ }: HttpContextContract) {
        const reservations = await Reservation.query()
            .preload('user', (query) => query.select(['id', 'name', 'email', 'piece_justificative']))
            .preload('car', (query) => query.select(['id', 'marque', 'modele']))
            .orderBy('created_at', 'desc')

        // formatage des données pour le frontend
        return reservations.map((r) => ({
            id: r.id,
            client: `${r.user.name} ${r.user.email}`,
            piece_justificative: `${r.user.pieceJustificative}`,
            voiture: `${r.car.marque} ${r.car.modele}`,
            dateReservation: r.createdAt.toFormat('dd/MM/yyyy'),
            dateDebut: r.startDate.toFormat('dd/MM/yyyy'),
            dateFin: r.endDate.toFormat('dd/MM/yyyy'),
            statut: r.statut,
            montant: r.prix_total,
        }))
    }

    // ✅ Valider une réservation
    public async validate({ params, response }: HttpContextContract) {
        const reservation = await Reservation.find(params.id)
        if (!reservation) {
            return response.notFound({ message: 'Réservation introuvable' })
        }

        reservation.statut = StatutReservation.VALIDEE
        await reservation.save()

        return { message: 'Réservation validée avec succès' }
    }
}
