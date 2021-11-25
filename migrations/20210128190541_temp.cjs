// knex database schema

exports.up = function(knex) {
    return knex.schema
      .createTable('playlist', table => {
          table.increments('id').primary();
          table.integer('userId');
          table.string('playlist_url');
          table.string('image_url');
          table.string('name');
          table.integer('no_of_tracks');
          table.string('platform')
        })

        .createTable('experience', table => {
            table.increments('id').primary();
            table.integer('userId');
            table.string('image_url');
            table.string('visit_date');
            table.string('description');
            table.string('country');
            table.boolean('is_best_trip');
          })

          .createTable('library', table => {
            table.increments('id').primary();
            table.integer('userId');
            table.string('image_url');
            table.string('name');
            table.string('author');
            table.string('genre');
            table.string('description');
            table.string('book_url');
          })

          .createTable('users', table => {
            table.increments('id').primary();
            table.string('username');
            table.string('email');
            table.string('password').defaultTo(null);
            table.string('method').defaultTo(null);
          })

          .createTable('profile', table => {
            // table.increments('id').primary();
            // table.integer('id').references('id')
            // table.integer('id')
            // .inTable('users')/
            // .primary();
            // table.increments('id').primary();
            table
              .integer('id')
              .unsigned()
              .references('id')
              .inTable('users')
              .onDelete('CASCADE')
              .primary()
            table.string('image_url');
            table.string('country');
            table.string('city');
            table.string('state');
            table.string('phone');
            table
              .string('name')
              // .defaultTo("Test")
            table
              .string('continent')
              .defaultTo("Asia")
            table.specificType('languages', 'text ARRAY');
            table.string('home_latitude');
            table.string('home_longitude');
            table.string('bio');
            table.boolean('friends_see_selfies');
            table.boolean('friends_see_tagged_photos');
            table.string('current_latitude');
            table.string('current_longitude');
            table.timestamp('created_at').defaultTo(knex.fn.now())
          })

          .createTable('user_friends', table => {

            table
              .integer('userId')
              .unsigned()
              .references('id')
              .inTable('profile')
              .onDelete('CASCADE')
              .index()

            table
              .integer('friendId')
              .unsigned()
              .references('id')
              .inTable('profile')
              .onDelete('CASCADE')
              .index()

              table
              .boolean('isCloseFriend')
              .defaultTo(false)

              table.timestamp('added_at').defaultTo(knex.fn.now())
          })

          .createTable('account_settings', table => {
            table
              .integer('id')
              .unsigned()
              .references('id')
              .inTable('users')
              .onDelete('CASCADE')
              .primary()
  
            table.string('email');
            table.string('phone');
            table.string('alt_email')
            .defaultTo(null);
            table.string('alt_phone')
            .defaultTo(null);
          })
  

          

          

  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('playlist')
      .dropTableIfExists('experience')
      .dropTableIfExists('library')
      .dropTableIfExists('user_friends')
      .dropTableIfExists('prof')
      .dropTableIfExists('profile')
      .dropTableIfExists('account_settings')
      .dropTableIfExists('users')

  };
