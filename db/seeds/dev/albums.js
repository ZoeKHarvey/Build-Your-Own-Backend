const albumsData = require('../../../data/albumsData')

// exports.seed = function(knex) {
//  return knex('songs').del()
//   .then(() => knex('albums').del())
//   .then(() => {
//     return Promise.all([
//       knex('albums').insert({
//         album_id: 1, 
//         collection_name: 'First Album',
//         release_date: 'I am a date'
//       }, 'id')
//       .then(songID => {
//         return knex('songs').insert([
//           { album_id: 1,
//             collection_name: 'A Song!',
//             is_streamable: true
//           }
//         ])
//       })
//       .then(() => console.log('Seeding complete!'))
//       .catch(error => console.log(`Error seeding data: ${error}`))
//     ])
//   })
//   .catch(error => console.log(`Error seeding data: ${error}`))
// };

const createAlbum = (knex, album) => {
  return knex('albums').insert({
    album_id: album.collectionId, 
    collection_name: album.collectionName,
    release_date: album.releaseDate
  })
}


exports.seed = (knex) => {
  return knex('songs').del()
    .then(() => knex('albums').del())
    .then(() => {
      let albumPromises = [];
      albumsData.forEach(album => {
        albumPromises.push(createAlbum(knex, album))
      });
      return Promise.all(albumPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`))
}

