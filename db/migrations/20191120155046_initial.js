
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('albums', function(table) {
      table.increments('id').primary();
      table.integer('album_id');
      table.string('collection_name');
      table.string('release_date');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('songs', function(table) {
      table.increments('id').primary();
      table.integer('album_id');
      table.string('collection_name');
      table.boolean('is_streamable');

      table.timestamps(true, true);
    })
    
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('songs'),
    knex.schema.dropTable('albums')
  ])
  
};
