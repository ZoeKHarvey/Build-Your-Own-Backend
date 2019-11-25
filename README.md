# Build-Your-Own-Backend
## Rolling Stones API

## List All Albums
A successful response returns an array of all Rolling Stones albums.

```
GET /api/v1/albums
```

### Parameters

| Name | Type | Description |
|------|------|-------------|
|id|integer| Unique identifier of the album|
|album_id|integer|Identifier that connects songs to albums|
|collection_name|string| Name of the album|
|release_date|string| Album's release date in string form|

### Response

Example: ```[ 
              { "album_id": 1234, "collection_name": "Tattoo You", "release_date": "1980-06-20T07:00:00Z" },
              { "album_id": 2341, "collection_name": "Sticky Fingers", "release_date": "1976-04-20T07:00:00Z" }
              ]```
              
              
## List All Songs
A successful response returns an array of all Rolling Stones songs.

```
GET /api/v1/songs
```

### Parameters

| Name | Type | Description |
|------|------|-------------|
|id|integer| Unique id for each song|
|collection_name|string| Name of the song|
|isStreamable|boolean| Identifies whether the song is streamable or not|

### Response

Example: ```[ 
              { "id": 1234, "collection_name": "Tattoo You", "isStreamable: true" },
              { "id": 2341, "collection_name": "Sticky Fingers", "isStreamable: true" }
              ]```
              
## Display Specific Album

A successful response returns data for a certain album selected by id.

```
GET /api/v1/albums/:id
```

### Parameters

| Name | Type | Description |
|------|------|-------------|
|id|integer| Unique identifier of the album|
|album_id|integer|Identifier that connects songs to albums|
|collection_name|string| Name of the album|
|release_date|string| Album's release date|

### Response

Example: ```{ "album_id": 2341, "collection_name": "Sticky Fingers", "release_date": "1976-04-20T07:00:00Z" }```


## Display Specific Song

A successful response returns data for a certain song selected by id.

```
GET /api/v1/songs/:id
```

### Parameters

| Name | Type | Description |
|------|------|-------------|
|id|integer| Unique identifier of the song|
|collection_name|string| Name of the song|
|isStreammable|boolean| Boolean to identify whether or not the song is streamable|

### Response

Example: ```{ "id": 1234, "collection_name": "Tattoo You", "isStreamable: true" }```


## Add New Album

A successful response returns the id of the new album that was just added.

```
POST /api/v1/albums
```

### Parameters

| Name | Type | Description |
|------|------|-------------|
|id|integer| Unique identifier of the album|
|album_id|integer|Identifier that connects songs to albums|
|collection_name|string| Name of the album|
|release_date|string| Album's release date|

### Required Body

Example: ```{ "album_id": 2341, "collection_name": "Sticky Fingers", "release_date": "1976-04-20T07:00:00Z" }```

### Response

Example: ```{ "id": 3 }```

## Add New Song

A successful response returns the id of the new song that was just added.

```
POST /api/v1/songs
```

### Parameters

| Name | Type | Description |
|------|------|-------------|
|id|integer| Unique identifier of the song|
|collection_name|string| Name of the song|
|isStreammable|boolean| Boolean to identify whether or not the song is streamable|

### Required Body

Example: ```{"collection_name": "Tattoo You", "isStreamable: true" }```

### Response

Example: ```{ "id": 3 }```

## Remove Existing Album

A successful response returns a message confirming that the album matching the provided id was deleted.

```
DELETE /api/v1/albums/:id
```

### Parameters

| Name | Type | Description |
|------|------|-------------|
|id|integer| Unique identifier of the album|
|album_id|integer|Identifier that connects songs to albums|
|collection_name|string| Name of the album|
|release_date|string| Album's release date|

### Response

Example: ```Album 1234 deleted```

## Remove Existing Song

A successful response returns a message confirming that the song matching the provided id was deleted.

```
DELETE /api/v1/songs/:id
```

### Parameters

| Name | Type | Description |
|------|------|-------------|
|id|integer| Unique identifier of the song|
|collection_name|string| Name of the song|
|isStreammable|boolean| Boolean to identify whether or not the song is streamable|

### Response

Example: ```Song 1234 deleted```

### [Project Board](https://github.com/ZoeKHarvey/Build-Your-Own-Backend/projects)




