// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Car from "App/Models/Car"
import Reservation from "App/Models/Reservation"
import User from "App/Models/User"

export default class DashboardController {
    public async index() {
    const accounts = await User.query().count('* as total')
    const reservations = await Reservation.query().count('* as total')
    const vehicles = await Car.query().count('* as total')
    const available = await Car.query().where('statut', 'Disponible').count('* as total')
    return {
      accounts: accounts[0].$extras.total,
      reservations: reservations[0].$extras.total,
      vehicles: vehicles[0].$extras.total,
      available: available[0].$extras.total,
    }
  }
}
