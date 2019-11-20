
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('albums', function(table) {
      table.increments('id').primary();
      table.integer('artist_id');
      table.integer('album_id');
      table.string('collection_name');
      table.string('release_date');

      table.timestamps(true, true);
    }),

    
  ])
};

exports.down = function(knex) {
  
};
