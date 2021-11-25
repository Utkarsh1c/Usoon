// objection js database model

import Knex from 'knex';
import pkg from 'objection'
const { Model } = pkg;
import knexConfig from '../../../knexfile.cjs'
// import Profile from '../../temp3/config/db.js'

const environment = process.env.NODE_ENV || 'development';

const knex = Knex(knexConfig[environment])

Model.knex(knex);

class Profile extends Model {
  static get tableName() {
    return 'profile';
  }
}

class Account extends Model {
  static get tableName() {
    return 'account_settings';
  }
}

// User model.
class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    return {
      profile: {
        relation: Model.HasOneRelation,
        modelClass: Profile,
        join: {
          from: 'users.id',
          to: 'profile.id',
        },
      },
      account_settings: {
        relation: Model.HasOneRelation,
        modelClass: Account,
        join: {
          from: 'users.id',
          to: 'account_settings.id',
        },
      },
    };
  }
}

export default User


