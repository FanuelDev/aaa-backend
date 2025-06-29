import Admin from 'App/Models/Admin'
import Hash from '@ioc:Adonis/Core/Hash'

export default class AdminAuthController {
    public async login({ request, auth, response }) {
        const { email, password } = request.only(['email', 'password'])
        const admin = await Admin.findBy('email', email)
        if (!admin || !(await Hash.verify(admin.password, password))) {
            return response.unauthorized({ message: 'Invalid credentials' })
        }

        const token = await auth.use('admin').generate(admin)
        return { token, admin }
    }
}
