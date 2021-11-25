// objection js database model

import Knex from 'knex';
import pkg from 'objection'
const { Model } = pkg;
import knexConfig from '../../../knexfile.cjs'

const environment = process.env.NODE_ENV || 'development';

const knex = Knex(knexConfig[environment])

Model.knex(knex);

class Profile extends Model {
  static get tableName() {
    return 'profile';
  }

  static get relationMappings() {
    return {

      friends: {
        relation: Model.ManyToManyRelation,
        modelClass: Profile,
        join: {
          from: 'profile.id',
          through: {
            // If you have a model class for the join table
            // you need to specify it like this:
            // modelClass: PersonMovie,
            from: 'user_friends.userId',
            to: 'user_friends.friendId',
            extra: ['isCloseFriend', 'added_at']
          },
          to: 'profile.id',
        },
      },

    };
  }
}

export default Profile

