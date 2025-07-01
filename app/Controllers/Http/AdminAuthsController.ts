
export default class AdminAuthsController {
    public async login({ request, response }) {
        const { email, password } = request.only(['email', 'password'])

        console.log(email)
        console.log(password)
        if (email == 'admin@gmail.com' && password == 'Admin') {
            response.ok({ status: true, message: "Connexion effectuer avec success" })
        } else {
            return response.unauthorized({ error: 'Email ou mot de passe incorrect' })
        }
    }
}
