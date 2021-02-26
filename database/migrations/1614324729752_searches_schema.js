'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SearchesSchema extends Schema {
  up () {
    this.create('searches', (table) => {
      table.increments()
      table.timestamps()
      table.string('location')
      table.string('description')
      table.string('userIp')
      table.json('content')
    })
  }

  down () {
    this.drop('searches')
  }
}

module.exports = SearchesSchema
