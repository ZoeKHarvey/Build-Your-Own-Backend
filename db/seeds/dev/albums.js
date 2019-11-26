const albumsData = require('../../../data/albumsData')
const songsData = require('../../../data/songsData')


const createAlbum = (knex, album) => {
  return knex('albums').insert({
    album_id: album.collectionId, 
    collection_name: album.collectionName,
    release_date: album.releaseDate
  })
}
  const createSong = (knex, song) => {
    return knex('songs').insert({
       // album_id: song.collectionId, 
       collection_name: song.collectionName,
       is_streamable: song.isStreamable
    })
 }


exports.seed = (knex) => {
  return knex('albums').del()
    .then(() => {
      const albumsPromise = [];
      albumsData.forEach(album => {
        albumsPromise.push(createAlbum(knex, album));
      });
      return Promise.all(albumsPromise);
    })
    .then(() => knex('songs').del())
    .then(() => {
      const songsPromise = [];
      songsData.forEach(song => {
        songsPromise.push(createSong(knex, song));
      });
      return Promise.all(songsPromise);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
}





