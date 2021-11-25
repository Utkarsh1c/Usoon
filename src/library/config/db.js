// objection js database model

import Knex from 'knex';
import pkg from 'objection'
const { Model } = pkg;
import knexConfig from '../../../knexfile.cjs'

const environment = process.env.NODE_ENV || 'development';

const knex = Knex(knexConfig[environment])

Model.knex(knex);

// Playlist model.
class Library extends Model {
  static get tableName() {
    return 'library';
  }

  static get relationMappings() {
    return {
      
    };
  }
}

export default Library

