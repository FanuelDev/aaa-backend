// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database"
import Controle from "App/Models/Controle"
import ResponseBody from "App/Models/ResponseBody"
import ControleRegistrationValidator from "App/Validators/ControleRegistrationValidator"

export default class CollectesController {
  public async list({ response }) {
    const controle = await Controle.all()

    /// generation de response
    const responseBody = new ResponseBody
    responseBody.status = true
    responseBody.data = controle
    responseBody.message = 'Liste des controle'
    return response.accepted(responseBody)
  }

  public async listById({ request, response }) {
      try {
          const controle = await Controle.findOrFail(request.params().id)
          return response.accepted({ status: true, data: controle, message: 'controle par id' })
      } catch {
          return response.accepted({ status: false, message: 'erreur! id nom trouvez' })
      }
  }

  public async listByIdCollecteur({ request, response }) {
    try {
        const controle = await Database.query()
                              .from("controles")
                              .where("id_collecteur", request.params().id_collecteur);
        return response.accepted({ status: true, data: controle, message: 'controle par id' })
    } catch {
        return response.accepted({ status: false, message: 'erreur! id nom trouvez' })
    }
}

public async listByIdClient({ request, response }) {
  try {
      const controle = await Database.query()
                            .from("controles")
                            .where("id_client", request.params().id_client);
      return response.accepted({ status: true, data: controle, message: 'controle par id' })
  } catch {
      return response.accepted({ status: false, message: 'erreur! id nom trouvez' })
  }
}

  public async save({ request, response }) {
      const data = await request.validate(ControleRegistrationValidator)

      console.log(data)
      if (data.errors && data.errors?.length != 0) {
          return data
      }

      const controle = new Controle()
      controle.id_collecteur = request.body().id_collecteur
      controle.id_client = request.body().id_client
      controle.id_carnet = request.body().id_carnet
      controle.nom_client = request.body().nom_client
      controle.nom_collecteur = request.body().nom_collecteur
      controle.nom_carnet = request.body().nom_carnet
      controle.id_mois = request.body().id_mois
      controle.nbr_jours = request.body().nbr_jours
      controle.mise = request.body().mise
      controle.cotisation_total = request.body().cotisation_total
      controle.etat = request.body().etat

      try {
          await controle.save()
          return response.accepted({ status: true, data: controle, message: 'controle créé avec success' })
      } catch {
          return response.accepted({ status: false, data: controle, message: 'erreur lors de l`\'enregistrement!' })
      }
  }

  public async update({ request, response }) {
      try {
          await Controle.query().where('id', request.params().id).update(request.body())
          const controle_value = await Controle.query().where('id', request.params().id)

          return response.accepted({ status: true, data: controle_value, message: 'Mise a jour effectuer avec success' })
      } catch {
          return response.accepted({ status: false, message: 'erreur lors de la mise a jour!' })
      }
  }
}
