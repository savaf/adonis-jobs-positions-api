'use strict'

/*
|--------------------------------------------------------------------------
| SearchSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class SearchSeeder {
  async run() {
    const searchsArray = await Factory
      .model('App/Models/Search')
      .createMany(5)

  }
}

module.exports = SearchSeeder
