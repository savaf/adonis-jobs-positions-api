"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const PositionsService = use("App/Services/PositionsService");

const Search = use("App/Models/Search");

class PositionController {
  async index({ request, response }) {
    const { location = null, description = null } = request.only([
      "description",
      "location",
    ]);

    // Get search with same terms cached for a hour ago
    const searches = await Search.query()
      .whereRaw(`
        created_at < DATE_SUB(NOW(), INTERVAL '1' HOUR)
        AND (UPPER(location) LIKE ? OR UPPER(description) LIKE ?)`, [
        `%${location}%`,
        `%${description}%`,
      ])
      .orderBy("created_at", "desc")
      .limit(1)
      .fetch();

    let positions = []
    if (searches[0]) {
      positions = JSON.parse(searches[0].content)
    } else {
      positions = await PositionsService.getByLocationAndDescription({
        location,
        description,
      });

      const search = new Search();
      search.userIp = request.ip();
      search.location = location;
      search.description = description;
      search.content = JSON.stringify(positions);

      // Insert
      await search.save()
    }


    return positions;
  }
}

module.exports = PositionController;
