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
  }).prefix('/auth')

  Route.resource('user', 'AuthController').apiOnly()


  Route.resource('cars', 'CarsController').apiOnly()

  // Liste complète sans auth
  Route.get('cars/list/public', 'CarsController.public')

  // Liste filtrée (via query string)
  Route.get('cars/list/filter', 'CarsController.filter')

  /// route pour les produit
  Route.group(() => {
    Route.get('/list', 'AuthController.list')
  }).prefix('/controlleur').middleware(['auth'])

  Route.group(() => {
    Route.resource('/reservations', 'ReservationsController').apiOnly()
  }).middleware('auth')
  Route.get('/reservations/me', 'ReservationsController.myReservations').middleware('auth')
  Route.post('/reservations/calculate-total', 'ReservationsController.calculateTotal')

}).prefix('/api')
