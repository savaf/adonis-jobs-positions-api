"use strict";
const axios = require("axios");

class PositionsService {
  static async getByLocationAndDescription({ description, location }) {
    try {
      const response = await axios.get(
        "https://jobs.github.com/positions.json",
        {
          params: {
            description,
            location,
          },
        }
      );
      const positions = response.data;

      if (!positions && !positions[0].id) {
        throw [];
      }
      return positions;
    } catch {
      return [];
    }
  }
}

module.exports = PositionsService;
