// Tells server to use http / allows use of http requests/bodies/headers
const express = require('express');
// imports Express
const app = express();
// Extracts entire body portion of incoming request and exposes it on req.body / parses the JSON, string and URL encoded data submitted by the POST request) 
const bodyParser = require('body-parser')

//Tells our app what environment it's in, it's default will be 'development'
const environment = process.env.NODE_ENV || 'development';
// Configures knexfile based on given environment
const configuration = require('./knexfile')[environment];
// What knex uses to configure our database (based on environment)
const database = require('knex')(configuration)

//Sets port of server with environment. If it can't find an environtment it's set to 3000
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json())

// Gives the endpoint for a GET request
app.get('/api/v1/albums', (request, response) => {
  // queries the 'albums' table, selects each row in table
  database('albums').select()
  .then((albums) => {
    // it will now JSON the fetched data, send it with a successful status code of 200
    response.status(200).json(albums)
  })
  // if there's an error, it'll send an internal server error response with an error code of 500
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
    .then(song => {
      response.status(201).json({ id: song[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    })
})

app.post('/api/v1/albums', (request, response) => {
  const song = request.body;
  for (let requiredParameter of [album_id, collection_name, release_date]) {
    if(!album[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { collectionName: <String>, isStreammable: <Boolean> }. You're missing a "${requiredParameter}" property.`});
    }
  }

  database('album').insert(album, 'id')
    .then(album => {
      response.status(201).json({ id: album[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    })
})

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

