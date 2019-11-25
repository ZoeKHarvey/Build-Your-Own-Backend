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

// Gives endpoint for GET request
app.get('/api/v1/songs', (request, response) => {
  // queries the 'songs' table and selects each row in that table
  database('songs').select()
  .then((songs) => {
    // it'll JSON the fetched data, send it with a successful status code of 200
    response.status(200).json(songs);
  })
  // if there's an error, it'll send an internal server error response with an error code of 500
  .catch((error) => {
    response.status(500).json({ error })
  })
})

//Gives endpoint for GET single song request (by id)
app.get('/api/v1/songs/:id', (request, response) => {
  // queries the database
  database('songs').where('id', request.params.id).select()
  // finds the song that matches the id
    .then(songs => {
      // if array length is existent
      if(songs.length) {
        // send response w/ successful status code 200
        response.status(200).json(songs)
      } else {
        // if the array is 0
        response.status(404).json({
          // send error response code 404 and the corresponding message
          error: `Could not find song with id: ${request.params.id}`
        })
      }
    })
    // if there's an error, send the error code of 500
    .catch(error => {
      response.status(500).json({ error })
    })
})

// Gives endpoint for GET single album request by id
app.get('/api/v1/albums/:id', (request, response) => {
  // Queries the database
  database('albums').where('id', request.params.id).select()
  //find matching album based on id
    .then(albums => {
      //if array length is not 0
      if(albums.length) {
        //send response with successful status code of 200
        response.status(200).json(albums)
      } else {
        // if array is 0
        response.status(404).json({
          //send error response code 404 and the corresponding error message
          error: `Could not find album with id: ${request.params.id}`
        })
      }
    })
    // if there's an error, send error code of 500
    .catch(error => {
      response.status(500).json({ error })
    })
})

//Sets POST endpoint to add new song
app.post('/api/v1/songs', (request, response) => {
  // gets song object from body of request
  const song = request.body;
  // make a list of required parameters to be able to check our object with
  for (let requiredParameter of [collection_name, isStreamable]) {
    // if a required parameter is not present
    if(!song[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { collectionName: <String>, isStreammable: <Boolean> }. You're missing a "${requiredParameter}" property.`});
    }
  }

  // if all params are present, add object into the database
  database('songs').insert(song, 'id')
  // wait for the database to give us our id
    .then(song => {
      // send response of 201
      response.status(201).json({ id: song[0] })
    })
    // if there's an error, send a response status code of 500 and the error
    .catch(error => {
      response.status(500).json({ error });
    })
})

// Sets POST endpoint to add new album
app.post('/api/v1/albums', (request, response) => {
  // gets album object from body of request
  const song = request.body;
  //makes a lest of required params to be able to check object with
  for (let requiredParameter of [album_id, collection_name, release_date]) {
    // if a required param is not present, return response
    if(!album[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { collectionName: <String>, isStreammable: <Boolean> }. You're missing a "${requiredParameter}" property.`});
    }
  }

  // if all paramaters are met, add object into the database
  database('album').insert(album, 'id')
  // wait for the database to give us our id
    .then(album => {
      // send response of 201 and give it an id
      response.status(201).json({ id: album[0] })
    })
    // if there's an error, send a response status code of 500 and the error
    .catch(error => {
      response.status(500).json({ error });
    })
})

// DELETE endpoint for removing songs based on id
app.delete('/api/v1/songs/:id', (request, response) => {
  // id number is taken from param prop of the request
  database('songs').where('id', request.params.id).select().del()
  // query songs table in the database
  .then(song => {
    // if the song exists in the database
    if(song) {
      // return successful status code of 200 and message that it's been deleted
      response.status(200).json(`Song ${request.params.id} deleted`)
    } else {
      // if there's no found song in database that matches id
      response.status(404).json({
        // return unsuccessful 404 code with error message
        error: `Couldn't find song with id: ${request.params.id}`
      })
    }
  })
  //if there's an error with the request, send a response status code of 500 and the error 
  .catch(error => {
    response.status(500).json({ error })
  })
})

// DELETE endpoint for removing an album from the database based on id
app.delete('/api/v1/albums/:id', (request, response) => {
  // id number is taken from params prop of the request
  database('albums').where('id', request.params.id).select().del()
  //query albums table of the database
  .then(album => {
    // if the album exists in the database
    if(album) {
      // return successful status code of 200 and message that it's been deleted
      response.status(200).json(`album ${request.params.id} deleted`)
    } else {
      // if there's no found album in database
      response.status(404).json({
        // return unsuccessful 404 code with error message
        error: `Couldn't find album with id: ${request.params.id}`
      })
    }
  })
  // if there's an error with the request, send a response status code of 500 and the error 
  .catch(error => {
    response.status(500).json({ error })
  })
})

app.listen(app.get('port'), () => {
  console.log(`App is running on ${app.get('port')}`)
})

