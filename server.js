const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration)

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json())

app.get('/api/v1/albums', (request, response) => {
  database('albums').select()
  .then((albums) => {
    response.status(200).json(albums)
  })
  .catch((error) => {
    response.status(500).json({ error })
  })
})

app.get('/api/v1/songs', (request, response) => {
  database('songs').select()
  .then((songs) => {
    response.status(200).json(songs);
  })
  .catch((error) => {
    response.status(500).json({ error })
  })
})

app.get('/api/v1/songs/:id', (request, response) => {
  database('songs').where('id', request.params.id).select()
    .then(songs => {
      if(songs.length) {
        response.status(200).json(songs)
      } else {
        response.status(404).json({
          error: `Could not find song with id: ${request.params.id}`
        })
      }
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.get('/api/v1/albums/:id', (request, response) => {
  database('albums').where('id', request.params.id).select()
    .then(albums => {
      if(albums.length) {
        response.status(200).json(albums)
      } else {
        response.status(404).json({
          error: `Could not find album with id: ${request.params.id}`
        })
      }
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.post('/api/v1/songs', (request, response) => {
  const song = request.body;
  for (let requiredParameter of [collection_name, isStreamable]) {
    if(!song[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { collectionName: <String>, isStreammable: <Boolean> }. You're missing a "${requiredParameter}" property.`});
    }
  }
  database('songs').insert(song, 'id')
    .then(id => response.status(201).json({ id: id[0], ...song }))
    .catch(error => response.status(500).json({ error }));
});


app.post('/api/v1/albums', (request, response) => {
  const song = request.body;
  for (let requiredParameter of [album_id, collection_name, release_date]) {
    if(!album[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { collectionName: <String>, isStreammable: <Boolean> }. You're missing a "${requiredParameter}" property.`});
    }
  }
  database('albums').insert(album, 'id')
  .then(id => response.status(201).json({ album_id: id[0], ...album}))
  .catch(error => response.status(500).json({ error }));
});

app.delete('/api/v1/songs/:id', (request, response) => {
  database('songs').where('id', request.params.id).select().del()
  .then(song => {
    if(song) {
      response.status(200).json(`Song ${request.params.id} deleted`)
    } else {
      response.status(404).json({
        error: `Couldn't find song with id: ${request.params.id}`
      })
    }
  })
  .catch(error => {
    response.status(500).json({ error })
  })
})

app.delete('/api/v1/albums/:id', (request, response) => {
  database('albums').where('id', request.params.id).select().del()
  .then(album => {
    if(album) {
      response.status(200).json(`album ${request.params.id} deleted`)
    } else {
      response.status(404).json({
        error: `Couldn't find album with id: ${request.params.id}`
      })
    }
  })
  .catch(error => {
    response.status(500).json({ error })
  })
})

app.listen(app.get('port'), () => {
  console.log(`App is running on ${app.get('port')}`)
})

