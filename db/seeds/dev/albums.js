
exports.seed = function(knex) {
  // Deletes ALL existing entries
 return knex('songs').del()
  .then(() => knex('albums').del())
  .then(() => {
    return Promise.all([
      knex('albums').insert({
        album_id: 1, 
        collection_name: 'First Album',
        release_date: 'I am a date'
      }, 'id')
      .then(songID => {
        return knex('songs').insert([
          { album_id: 1,
            collection_name: 'A Song!',
            is_streamable: true
          }
        ])
      })
      .then(() => console.log('Seeding complete!'))
      .catch(error => console.log(`Error seeding data: ${error}`))
    ])
  })
  .catch(error => console.log(`Error seeding data: ${error}`))
};
