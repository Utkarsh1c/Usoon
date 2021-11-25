// objection js database model

import Knex from 'knex';
import pkg from 'objection'
const { Model } = pkg;
import knexConfig from '../../../knexfile.cjs'

const knex = Knex(knexConfig.development)

Model.knex(knex);

// Playlist model.
class Playlist extends Model {
  static get tableName() {
    return 'playlist';
  }

  static get relationMappings() {
    return {
      
    };
  }
}

export default Playlist

