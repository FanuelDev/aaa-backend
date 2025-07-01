import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AccountsController {
  public async index({}: HttpContextContract) {
    return await User.query().select('id', 'name', 'email', 'piece_justificative', 'preuve_adresse')
  }
}