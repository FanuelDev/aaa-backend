/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  //// authetication route
  Route.group(() => {
    Route.post('/login', 'AuthController.login')
    Route.post('/register', 'AuthController.register')
    Route.post('/list', 'AuthController.list')
  }).prefix('/auth')

  /// route pour les produit
  Route.group(() => {
    Route.get('/list', 'AuthController.list')
  }).prefix('/controlleur').middleware(['auth'])

  /// route pour les produit
  Route.group(() => {
    Route.get('/list', 'CollectesController.list')
    Route.get('/getById/:id', 'CollectesController.listById')
    Route.get('/getByIdCollecteur/:id_collecteur', 'CollectesController.listByIdCollecteur')
    Route.get('/getByIdClient/:id_client', 'CollectesController.listByIdClient')
    Route.get('/getByIdCollecteur/verification/:id_collecteur', 'CollectesController.verificationByIdCollecteur')
    Route.get('/getByIdClient/verification/:id_client', 'CollectesController.verificationByIdClient')
    Route.get('/getByIdCarnet/verification/:id_carnet', 'CollectesController.verificationByIdCarnet')
    Route.post('/save', 'CollectesController.save')
    Route.post('/update/:id', 'CollectesController.update')
  }).prefix('/collecte').middleware(['auth'])


  /// route pour les mois
  Route.group(() => {
    Route.get('/list', 'MoisController.list')
    Route.get('/getById/:id', 'MoisController.listById')
  }).prefix('/mois').middleware(['auth'])
}).prefix('/api')
