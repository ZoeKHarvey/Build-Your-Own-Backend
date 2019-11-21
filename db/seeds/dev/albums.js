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
    album_id: song.collectionId, 
    collection_name: song.collectionName,
    is_streamable: song.isStreamable
  })
}

exports.seed = (knex) => {
  return knex('songs').del()
    .then(() => {
      let songPromises = [];
      songsData.forEach(song => {
        songPromises.push(createSong(knex, song))
    });
    return Promise.all(songPromises)
  })
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




